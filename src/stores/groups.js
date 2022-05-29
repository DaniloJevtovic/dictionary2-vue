import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";

// grupe rjeci i recenica za rjecnik

const { readFun, createFun, deleteFun, patchFun } = useCRUD();

export const useGroupStore = defineStore("groups", {
  state: () => {
    return {
      wgroups: [],
      activeWgId: "all",
      sgroups: [],
      activeSgId: "all",
    };
  },

  actions: {
    // za prosljedjenu grupu vraca njen index u nizu
    getIndex(group) {
      if (group.type === "WGROUP") {
        return this.wgroups.findIndex((gr) => gr.id === group.id);
      } else {
        return this.sgroups.findIndex((gr) => gr.id === group.id);
      }
    },

    addGroup(group) {
      if (group.type == "WGROUP") {
        this.wgroups.unshift(group);
      } else {
        this.sgroups.unshift(group);
      }
    },

    updateGroup(group) {
      if (group.type == "WGROUP") {
        this.wgroups[this.getIndex(group)] = group;
      } else {
        this.sgroups[this.getIndex(group)] = group;
      }
    },

    removeGroup(group) {
      if (group.type == "WGROUP") {
        this.wgroups.splice(this.getIndex(group), 1);
      } else {
        this.sgroups.splice(this.getIndex(group), 1);
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
      return res.data;
    },

    async getSGroupsForDictionary(id) {
      let res = await readFun("groups/dic/" + id + "/group/SGROUP");
      this.sgroups = res.data;
    },

    async saveGroup(group) {
      let res = await createFun("groups", group);
      this.addGroup(res.data);
    },

    async editGroup(group, idx) {
      let res = await createFun("groups", group);
      this.updateGroup(group, idx);
    },

    async deleteGroup(group, idx) {
      this.removeGroup(group, idx);
      await deleteFun("groups", group.id);
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
  persist: true,
});
