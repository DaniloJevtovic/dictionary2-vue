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
      search: "",
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
      if (this.search !== "") {
        this.searchWords();
      } else {
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
        this.search = "";
      }
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
    },

    async editWord(word, idx) {
      let res = await createFun("words", word);
      this.updateWord(word, idx);
    },

    async deleteWord(word, idx) {
      this.removeWord(idx);
      await deleteFun("words", word.id);

      // todo: ucitati prvu rjec sa sledece stranice
    },

    async searchWords() {
      let url;
      const groupStore = useGroupStore();
      const dictionaryStore = useDictionaryStore();

      if (groupStore.activeWgId !== "all") {
        url =
          "/wg/" +
          groupStore.activeWgId +
          "/search/" +
          this.search +
          "/?" +
          this.filter;
      } else {
        url =
          "/dic/" +
          dictionaryStore.dictionary.id +
          "/search/" +
          this.search +
          "/?" +
          this.filter;
      }

      let res = await readFun("words" + url);
      this.words = res.data;
    },
  },
  persist: true,
});
