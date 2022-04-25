import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => {
    return { wgroupDirection: "right", sgroupDirection: "right" };
  },

  actions: {},
  persist: true,
});
