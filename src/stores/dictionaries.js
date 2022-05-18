import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";

const { readFun, createFun, deleteFun } = useCRUD();

export const useDictionaryStore = defineStore("dictionaries", {
  state: () => {
    return { dictionary: "", dictionaries: [], sidebar: false };
  },

  actions: {
    findIndex(dictionary) {
      return this.dictionaries.findIndex((dic) => dic.id === dictionary.id);
    },

    addDictionary(dictionary) {
      this.dictionaries.unshift(dictionary);
    },

    updateDictionary(dictionary) {
      this.dictionaries[this.findIndex(dictionary)] = dictionary;
      this.dictionary = dictionary;
    },

    removeDictionary(idx) {
      this.dictionaries.splice(idx, 1);
    },

    //bekend
    async saveDictionary(dictionary) {
      let res = await createFun("dictionaries", dictionary);
      this.addDictionary(res.data);
    },

    async editDictionary(dictionary) {
      let res = await createFun("dictionaries", dictionary);
      this.updateDictionary(dictionary);
    },

    //rjecnici za ulogovanog korisnika - id korisnika
    async getDictionaries() {
      let res = await readFun("/dictionaries");
      this.dictionaries = res.data;
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
