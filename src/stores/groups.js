import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD";

const { patchFun } = useCRUD();

// grupe rjeci i recenica za rjecnik

export const useGroupStore = defineStore("groups", {
  state: () => {
    return { wgroups: [], sgroups: [] };
  },

  actions: {
    addGroup(item) {
      if (item.type == "WGROUP") {
        this.wgroups.push(item);
      } else {
        this.sgroups.push(item);
      }
    },

    updateGroup(item, idx) {
      if (item.type == "WGROUP") {
        this.wgroups[idx] = item;
      } else {
        this.sgroups[idx] = item;
      }
    },

    removeGroup(idx, type) {
      if (type == "WGROUP") {
        this.wgroups.splice(idx, 1);
      } else {
        this.sgroups.splice(idx, 1);
      }
    },

    // id - id grupe kojoj se azurira broj stavki
    //mode - da li eje uvecenje ili umanjenje
    //type - da li e grupa rjeci ili grupa recenica
    async updateNumOfItems(id, mode, type) {
      let res;

      if (type == "WGROUP") {
        res = this.getWGroupById(id);
        res.numOfItems =
          mode == "increase" ? res.numOfItems + 1 : res.numOfItems - 1;
      } else {
        res = this.getSGroupById(id);
        res.numOfItems =
          mode === "increase" ? res.numOfItems + 1 : res.numOfItems - 1;
      }

      //poziv na bekendu
      await patchFun("groups/" + id + "/num/" + res.numOfItems);
    },
  },

  getters: {
    getWGroupById: (state) => {
      return (groupId) => state.wgroups.find((group) => group.id === groupId);
    },

    getSGroupById: (state) => {
      return (groupId) => state.sgroups.find((group) => group.id === groupId);
    },
  },
});
