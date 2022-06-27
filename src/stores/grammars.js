import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";
import { useDictionaryStore } from "./dictionaries.js";

const { readFun, createFun, deleteFun } = useCRUD();

export const useGrammarStore = defineStore("grammars", {
  state: () => {
    return {
      grammars: [],
      search: "",
      filter: "sort=id,desc",
      size: 5,
      totalPages: "",
      currentPage: 0,
    };
  },

  actions: {
    addGrammar(grammar) {
      this.grammars.unshift(grammar);
    },

    updateGrammar(grammar, idx) {
      this.grammars[idx] = grammar;
    },

    removeGrammar(idx) {
      this.grammars.splice(idx, 1);
    },

    //bekend

    async getGrammars() {
      this.$reset();
      const dictionaryStore = useDictionaryStore();

      if (this.search !== "") {
        this.searchGrammars();
      } else {
        let res = await readFun(
          "grammars/dic/" +
            dictionaryStore.dictionary.id +
            "/?" +
            this.filter +
            "&size=" +
            this.size
        );

        setTimeout(() => {
          this.grammars = res.data.content;

          this.currentPage = 0;
          this.totalPages = res.data.totalPages;
          this.search = "";
        }, 500);
      }
    },

    async loadMoreGrammars(id) {
      this.currentPage++;
      let res;

      res = await readFun(
        "grammars/dic/" +
          id +
          "/?page=" +
          this.currentPage +
          "&" +
          this.filter +
          "&size=" +
          this.size
      );

      res.data.content.forEach((grammar) => {
        this.addGrammar(grammar);
      });

      this.totalPages = res.data.totalPages;
    },

    async saveGrammar(grammar) {
      let res = await createFun("grammars", grammar);

      if (this.search !== "") {
        if (grammar.grammar.includes(this.search)) {
          this.addGrammar(res.data);
        }
      } else {
        this.addGrammar(res.data);
      }
    },

    async editGrammar(grammar, idx) {
      let res = await createFun("grammars", grammar);

      //ako je nesto ukucano u search
      if (this.search !== "") {
        //ideja ako se skroz promjeni naziv - ukloniti tu gramatiku iz liste
        if (!grammar.grammar.includes(this.search)) {
          this.removeGrammar(idx);
        } else {
          this.updateGrammar(res.data, idx);
        }
      } else {
        this.updateGrammar(res.data, idx);
      }
    },

    async deleteGrammar(grammar, idx) {
      await deleteFun("grammars", grammar.id);
      this.removeGrammar(idx);
    },

    async searchGrammars() {
      console.log(this.search);

      const dictionaryStore = useDictionaryStore();

      let url =
        "/dic/" +
        dictionaryStore.dictionary.id +
        "/search/" +
        this.search +
        "/?" +
        this.filter;

      let res = await readFun("grammars" + url);
      console.log(res.data.content);

      this.grammars = res.data.content;
    },
  },

  persist: true,
});
