import { defineStore } from "pinia";

export const useWordsStore = defineStore("words", {
  state: () => {
    return { words: [] };
  },

  actions: {
    addToWords(item) {
      this.words.push(item);
    },

    removeWord(idx) {
      this.words.splice(idx, 1);
    },
  },
});
