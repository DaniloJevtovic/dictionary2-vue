import { defineStore } from "pinia";

export const useWordStore = defineStore("words", {
  state: () => {
    return { words: [] };
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
  },
});
