import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";

import { useWordStore } from "./words.js";
import { useSentenceStore } from "./sentences.js";
import { useDictionaryStore } from "./dictionaries.js";

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
      const wordStore = useWordStore();
      const sentenceStore = useSentenceStore();

      if (group.type == "WGROUP") {
        this.wgroups.unshift(group);
        this.activeWgId = group.id; // ta nova grupa postaje aktivna
        wordStore.resetState();
      } else {
        this.sgroups.unshift(group);
        this.activeSgId = group.id;
        sentenceStore.resetState();
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

    getWgColor() {
      const dicStore = useDictionaryStore();

      if (this.activeWgId === "all") {
        return dicStore.dictionary.color;
      } else {
        return this.getWGroupById(this.activeWgId).color;
      }
    },

    getSgColor() {
      const dicStore = useDictionaryStore();

      if (this.activeSgId === "all") {
        return dicStore.dictionary.color;
      } else {
        return this.getSGroupById(this.activeSgId).color;
      }
    },

    //bekend
    async getWGroupsForDictionary(id) {
      this.wgroups = [];
      let res = await readFun("groups/dic/" + id + "/group/WGROUP");

      setTimeout(() => {
        this.wgroups = res.data;
        return res.data;
      }, 300);
    },

    async getSGroupsForDictionary(id) {
      this.sgroups = [];
      let res = await readFun("groups/dic/" + id + "/group/SGROUP");

      setTimeout(() => {
        this.sgroups = res.data;
      }, 300);
    },

    async saveGroup(group) {
      let res = await createFun("groups", group);
      this.addGroup(res.data);
    },

    async editGroup(group) {
      let res = await createFun("groups", group);
      this.updateGroup(group);
    },

    async deleteGroup(group) {
      this.removeGroup(group);
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

    getActiveWg: (state) => {
      this.getWGroupById(state.activeWgId);
    },

    getActiveSg: (state) => {
      this.getSGroupById(state.activeWgId);
    },
  },
  persist: true,
});
