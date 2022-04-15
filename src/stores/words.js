import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";
import { useGroupStore } from "./groups.js";
import { useDictionaryStore } from "./dictionaries.js";

const { readFun, createFun, deleteFun } = useCRUD();

export const useWordStore = defineStore("words", {
  state: () => {
    return {
      words: [],
      totalPages: "",
      currentPage: 0,
      size: 30,
      filter: "sort=id,desc",
    };
  },

  actions: {
    addWord(word) {
      this.words.push(word);
    },

    updateWord(word, idx) {
      this.words[idx] = word;
    },

    removeWord(idx) {
      this.words.splice(idx, 1);
    },

    //BEKEND

    async getWords(type, id) {
      let res;

      if (type === "DIC") {
        res = await readFun(
          "words/dic/" + id + "/?" + this.filter + "&size=" + this.size
        );
      } else {
        res = await readFun(
          "words/wg/" + id + "/?" + this.filter + "&size=" + this.size
        );
      }

      this.words = res.data.content;
      this.currentPage = 0;
      this.totalPages = res.data.totalPages;
    },

    //ucitavanje jos rjeci - (paginacija)
    async loadMoreWords(type, id) {
      this.currentPage++;
      let res;

      if (type === "DIC") {
        res = await readFun(
          "words/dic/" +
            id +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter +
            "&size=" +
            this.size
        );
      } else {
        res = await readFun(
          "words/wg/" +
            id +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter +
            "&size=" +
            this.size
        );
      }

      res.data.content.forEach((word) => {
        this.addWord(word);
      });

      this.totalPages = res.data.totalPages;
    },

    async saveWord(word) {
      let res = await createFun("words", word);
      this.words.unshift(res.data); //dodavanje na pocetak

      // dobavljanje najnovijih rjeci
      // this.filter = "sort=id,desc";
      // this.getWords("WG", word.wgId);
    },

    async editWord(word, idx) {
      let res = await createFun("words", word);
      this.updateWord(word, idx);
    },

    async deleteWord(word, idx) {
      this.removeWord(idx);
      await deleteFun("words", word.id);

      //this.getNextWord();
    },

    // smisliti nesto pametnije
    async getNextWord() {
      const groupStore = useGroupStore();
      const dicStore = useDictionaryStore();

      let res;

      if (groupStore.activeWgId === "all") {
        res = await readFun(
          "words/dic/" +
            dicStore.dictionary.id +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter +
            "&size=" +
            this.size
        );
      } else {
        res = await readFun(
          "words/wg/" +
            groupStore.activeWgId +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter +
            "&size=" +
            this.size
        );
      }

      this.totalPages = res.data.totalPages;

      if (res.data.content[this.size] !== undefined) {
        this.addWord(res.data.content[this.size]);
      }
    },
  },
  persist: true,
});
