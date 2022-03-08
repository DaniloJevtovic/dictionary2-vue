import { defineStore } from "pinia";

// grupe rjeci za rjecnik

export const useWGroupStore = defineStore("wgroups", {
  state: () => {
    return { wgroups: [] };
  },

  actions: {
    addToWGroups(item) {
      this.wgroups.push(item);
    },

    removeWGroup(idx) {
      this.wgroups.splice(idx, 1);
    },
  },
});
