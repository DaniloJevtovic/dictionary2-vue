import { defineStore } from "pinia";

export const useSentencesStore = defineStore("sentences", {
  state: () => {
    return { sentences: [] };
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
  },
});