import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      wgroupDirection: "left",
      sgroupDirection: "left",
      dark: false,
    };
  },

  actions: {},
  persist: true,
});
