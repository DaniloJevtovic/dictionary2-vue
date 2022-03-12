import { defineStore } from "pinia";

import useCrud from "../composables/useCRUD.js";
const { createFun, readFun, deleteFun } = useCrud();

import { useGroupStore } from "./groups.js";
const groupStore = useGroupStore();

export const useWordStore = defineStore("words", {
  state: () => {
    return { words: [] };
  },

  actions: {
    async addWord(word) {
      let res = await createFun("words", word);
      this.words.push(res.data);
      this.isChangeWg(word.wgId);
    },

    async updateWord(word, idx) {
      this.words[idx] = word;
      await createFun("words", word);
      this.isChangeWg(word.wgId);
    },

    async removeWord(idx, id) {
      this.words.splice(idx, 1);
      await deleteFun("words", id);
    },

    isChangeWg(wgId) {
      if (groupStore.activeWgId !== wgId) {
        groupStore.activeWgId = wgId;
        this.getWordsForWgroup(wgId);

        //ovdje mozda pozvati update broja stavki u grupi
        return true;
      }
    },

    async getWordsForDictionary(dicId) {
      let res = await readFun("words/dic/" + dicId);
      this.words = res.data.content;
    },

    async getWordsForWgroup(wgId) {
      let res = await readFun("words/wg/" + wgId);
      this.words = res.data.content;
    },
  },
});
