import { defineStore } from "pinia";

export const useGrammarStore = defineStore("grammars", {
  state: () => {
    return { grammars: [] };
  },

  actions: {
    addGrammar(grammar) {
      this.grammars.push(grammar);
    },

    updateGrammar(grammar, idx) {
      this.grammars[idx] = grammar;
    },

    removeGrammar(idx) {
      this.grammars.splice(idx, 1);
    },
  },
});
