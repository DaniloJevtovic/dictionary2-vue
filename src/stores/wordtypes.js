import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";
const { readFun, createFun, deleteFun } = useCRUD();

export const useWordTypeStore = defineStore("types", {
  state: () => {
    return {
      types: [
        { name: "NOUN", color: "springgreen" },
        { name: "PRONOUN", color: "purple" },
        { name: "ADJECTIVE", color: "orange" },
        { name: "VERB", color: "blue" },
        { name: "ADVERB", color: "yellow" },
        { name: "PREPOSITION", color: "hotpink" },
        { name: "CONJUNCTION", color: "orangered" },
        { name: "INTERJECTION", color: "skyblue" },
      ],
    };
  },

  actions: {},

  getters: {
    getTypeColor: (state) => {
      return (name) => state.types.find((type) => type.name === name);
    },
  },
  persist: true,
});
