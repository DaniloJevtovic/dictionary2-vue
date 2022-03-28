import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";

const { readFun, createFun, deleteFun } = useCRUD();

export const useWordStore = defineStore("words", {
  state: () => {
    return {
      words: [],
      totalPages: "",
      currentPage: 0,
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
        res = await readFun("words/dic/" + id + "/?" + this.filter);
      } else {
        res = await readFun("words/wg/" + id + "/?" + this.filter);
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
          "words/dic/" + id + "/?page=" + this.currentPage + "&" + this.filter
        );
      } else {
        res = await readFun(
          "words/wg/" + id + "/?page=" + this.currentPage + "&" + this.filter
        );
      }

      res.data.content.forEach((word) => {
        this.addWord(word);
      });
    },

    async saveWord(word) {
      let res = await createFun("words", word);
      this.addWord(res.data);
    },

    async editWord(word, idx) {
      let res = await createFun("words", word);
      this.updateWord(word, idx);
    },

    async deleteWord(word, idx) {
      await deleteFun("words/" + word.id);
      this.removeWord(idx);
    },
  },
  persist: true,
});
