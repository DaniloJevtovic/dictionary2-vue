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

    showToast2(message, color) {
      this.message = message;
      this.color = color;
      this.show = true;

      setTimeout(() => {
        this.show = false;
        this.message = "";
        this.color = "cyan";
      }, this.duration);
    },
  },
  // persist: true,
});
