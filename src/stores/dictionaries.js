import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";
import { useUserStore } from "./users.js";

import router from "../router/index.js";

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

    removeDictionary(dictionary) {
      this.dictionaries.splice(this.findIndex(dictionary), 1);
    },

    //rjecnici za ulogovanog korisnika - id korisnika
    async getDictionaries() {
      this.$reset();
      const userStore = useUserStore();

      // let res = await readFun("dictionaries"); //svi rjecnici
      let res = await readFun("dictionaries/user/" + userStore.user.id);

      setTimeout(() => {
        this.dictionaries = res.data;
        console.log("ucitao rjecnike sa bekenda");
      }, 500);
    },

    //bekend
    async saveDictionary(dictionary) {
      let res = await createFun("dictionaries", dictionary);
      this.addDictionary(res.data);
      this.dictionary = res.data;
      //preusmjeravanje na taj novokreirani rjecnik
      router.push({ name: "Dictionary", params: { id: res.data.id } });
    },

    async editDictionary(dictionary) {
      let res = await createFun("dictionaries", dictionary);
      this.updateDictionary(dictionary);
    },

    async deleteDic() {
      console.log("brisem rjecnik");
      await deleteFun("dictionaries", this.dictionary.id);
      this.removeDictionary(this.dictionary);
      this.dictionary = "";
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
