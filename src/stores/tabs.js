import { defineStore } from "pinia";

export const useTabStore = defineStore("tabs", {
  state: () => {
    return { tabs: [], currentTab: "Word" };
  },

  actions: {
    setCurretTab(tab) {
      this.currentTab = tab;
    },
  },
  persist: true,
});
