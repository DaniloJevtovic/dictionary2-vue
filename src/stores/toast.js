import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => {
    return {
      message: "poruka",
      duration: 2000,
      show: false,
      type: "info",
      color: "cyan",
    };
  },

  actions: {
    showToast(message, type) {
      this.message = message;
      this.show = true;
      this.type = type;

      setTimeout(() => {
        this.show = false;
        this.message = "";
        this.type = "info";
      }, this.duration);
    },
  },
  // persist: true,
});
