import { defineStore } from "pinia";

// grupe rjeci za rjecnik

export const useGroupStore = defineStore("groups", {
  state: () => {
    return { groups: [] };
  },

  actions: {
    addToGroup(item) {
      this.groups.push(item);
    },
  },
});
