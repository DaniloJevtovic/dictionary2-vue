import { defineStore } from "pinia";

export const useDictionaryStore = defineStore("dictionaries", {
  state: () => {
    return { dictionary: "", dictionaries: [], sidebar: false };
  },

  actions: {
    addDictionary(dictionary) {
      this.dictionaries.push(dictionary);
    },

    updateDictionary(dictionary) {
      // let dic = this.getDictionaryById(dictionary.id)
      this.dictionary = dictionary;
    },

    removeDictionary(idx) {
      this.dictionaries.splice(idx, 1);
    },
  },
  getters: {
    getDictionaryById: (state) => {
      return (dicId) =>
        state.dictionaries.find((dictionary) => dictionary.id === dicId);
    },
  },
  persist: true,
});
