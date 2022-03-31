import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";

const { readFun, createFun, deleteFun } = useCRUD();

export const useSentenceStore = defineStore("sentences", {
  state: () => {
    return {
      sentences: [],
      totalPages: "",
      currentPage: 0,
      filter: "sort=id,desc",
    };
  },

  actions: {
    addSentence(sentence) {
      this.sentences.push(sentence);
    },

    updateSentence(sentence, idx) {
      this.sentences[idx] = sentence;
    },

    removeSentence(idx) {
      this.sentences.splice(idx, 1);
    },

    //BEKEND

    async getSentences(type, id) {
      let res;

      if (type === "DIC") {
        res = await readFun("sentences/dic/" + id + "/?" + this.filter);
      } else {
        res = await readFun("sentences/wg/" + id + "/?" + this.filter);
      }

      this.sentences = res.data.content;
      this.currentPage = 0;
      this.totalPages = res.data.totalPages;
    },

    //ucitavanje jos recenica - (paginacija)
    async loadMoreSentences(type, id) {
      this.currentPage++;
      let res;

      if (type === "DIC") {
        res = await readFun(
          "sentences/dic/" +
            id +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter
        );
      } else {
        res = await readFun(
          "words/wg/" + id + "/?page=" + this.currentPage + "&" + this.filter
        );
      }

      res.data.content.forEach((sentence) => {
        this.addSentence(sentence);
      });

      this.totalPages = res.data.totalPages;
    },

    async saveSentence(sentence) {
      let res = await createFun("sentences", word);

      //dobavljanje najnovijih recenica
      this.filter = "sort=id,desc";
      this.getSentences("SG", sentence.sgId);
    },

    async editeSentence(sentence, idx) {
      let res = await createFun("sentences", sentence);
      this.updateSentence(sentence, idx);
    },

    async deleteSentence(sentence, idx) {
      await deleteFun("sentences/" + sentence.id);
      this.removeSentence(idx);
    },
  },
  persist: true,
});
