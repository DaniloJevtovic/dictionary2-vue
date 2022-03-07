import { defineStore } from "pinia";

// grupe rjeci i recenica za rjecnik

export const useGroupStore = defineStore("groups", {
  state: () => {
    return { wgroups: [], sgroups: [] };
  },

  actions: {
    addGroup(item, type) {
      if (type == "wgroup") {
        this.wgroups.push(item);
      } else {
        this.sgroups.push(item);
      }
    },

    removeGroup(idx) {
      if (type == "wgroup") {
        this.wgroups.splice(idx, 1);
      } else {
        this.sgroups.splice(idx, 1);
      }
    },
  },
});
