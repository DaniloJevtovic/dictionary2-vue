import { defineStore } from "pinia";

export const useDictionaryStore = defineStore("dictionaries", {
  state: () => {
    return { dictionary: "", dictionaries: [] };
  },

  actions: {
    addDictionary(dictionary) {
      this.dictionaries.push(dictionary);
    },

    updateDictionary(dictionary) {
      this.dictionary = dictionary;
    },

    removeDictionary(idx) {
      this.dictionaries.splice(idx, 1);
    },
  },
});
