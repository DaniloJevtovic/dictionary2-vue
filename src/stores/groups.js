import { defineStore } from "pinia";

// grupe rjeci i recenica za rjecnik

export const useGroupStore = defineStore("groups", {
  state: () => {
    return { wgroups: [], activeWgId: "all", sgroups: [], activeSgId: "all" };
  },

  actions: {
    addGroup(group) {
      if (group.type == "WGROUP") {
        this.wgroups.push(group);
      } else {
        this.sgroups.push(group);
      }
    },

    updateGroup(group, idx) {
      if (group.type == "WGROUP") {
        this.wgroups[idx] = group;
      } else {
        this.sgroups[idx] = group;
      }
    },

    removeGroup(group, idx) {
      if (group.type == "WGROUP") {
        this.wgroups.splice(idx, 1);
      } else {
        this.sgroups.splice(idx, 1);
      }
    },

    // ako se promjeni rjecnik da se id grupa postave na 'all'
    resetActiveGroups() {
      this.activeWgId = this.activeSgId = "all";
    },

    //bekend
    async getWGroupsForDictionary(id) {
      let res = await readFun("groups/dic/" + id + "/group/WGROUP");
      this.wgroups = res.data;
    },

    async getSGroupsForDictionary(id) {
      let res = await readFun("groups/dic/" + id + "/group/SGROUP");
      this.sgroups = res.data;
    },
  },

  getters: {
    getWGroupById: (state) => {
      return (groupId) => state.wgroups.find((group) => group.id === groupId);
    },

    getSGroupById: (state) => {
      return (groupId) => state.sgroups.find((group) => group.id === groupId);
    },

    getActiveWg() {
      this.getWGroupById(state.activeWgId);
    },

    getActiveSg() {
      this.getSGroupById(state.activeWgId);
    },
  },
  persist: true
});
