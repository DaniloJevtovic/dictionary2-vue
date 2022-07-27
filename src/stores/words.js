import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";
import { useGroupStore } from "./groups.js";
import { useDictionaryStore } from "./dictionaries.js";

const { readFun, createFun, deleteFun } = useCRUD();

export const useWordStore = defineStore("words", {
  state: () => {
    return {
      words: [],
      totalPages: 0,
      currentPage: 0,
      size: 30,
      filter: "sort=id,desc",
      search: "",
      totalWords: 0,
      loadingWords: true,
    };
  },

  actions: {
    addWord(word) {
      this.words.unshift(word);
    },

    updateWord(word, idx) {
      this.words[idx] = word;
    },

    removeWord(idx) {
      this.words.splice(idx, 1);
    },

    increaseNumOfWordsInGroup(wgId) {
      const groupStore = useGroupStore();
      let group = groupStore.getWGroupById(wgId);
      group.numOfItems = group.numOfItems + 1;
    },

    decreaseNumOfWordsInGroup(wgId) {
      const groupStore = useGroupStore();
      let group = groupStore.getWGroupById(wgId);
      group.numOfItems = group.numOfItems - 1;
    },

    resetState() {
      this.words = [];
      this.totalPages = 0;
      this.currentPage = 0;
      this.size = 30;
      // this.filter = "sort=id,desc";
      // this.search = "";
    },

    //BEKEND

    async getWords(type, id) {
      // this.words = [];
      // this.$reset();
      this.resetState();

      if (this.search !== "") {
        this.searchWords();
      } else {
        let res;

        if (type === "DIC") {
          res = await readFun(
            "words/dic/" + id + "/?" + this.filter + "&size=" + this.size
          );
        } else {
          res = await readFun(
            "words/wg/" + id + "/?" + this.filter + "&size=" + this.size
          );
        }

        setTimeout(() => {
          this.words = res.data.content;
          this.currentPage = 0;
          this.totalPages = res.data.totalPages;
          this.search = "";
          this.totalWords = res.data.totalElements;
        }, 500);

        this.loadingWords = false;
      }
    },

    //ucitavanje jos rjeci - (paginacija)
    async loadMoreWords(type, id) {
      this.currentPage++;
      let res;

      if (type === "DIC") {
        res = await readFun(
          "words/dic/" +
            id +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter +
            "&size=" +
            this.size
        );
      } else {
        res = await readFun(
          "words/wg/" +
            id +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter +
            "&size=" +
            this.size
        );
      }

      res.data.content.forEach((word) => {
        // this.addWord(word); // pazi dodace rjeci na vrh! - nije dobro kod filtera fav
        this.words.push(word);
      });

      this.totalPages = res.data.totalPages;
    },

    async saveWord(word) {
      // let res = await createFun("words", word);
      let res = await createFun("words/mode/new", word);

      if (this.search !== "") {
        if (
          word.word.includes(this.search) ||
          word.translate.includes(this.search)
        ) {
          this.addWord(res.data);
          this.increaseNumOfWordsInGroup(res.data.wgId);
        }
      } else {
        this.addWord(res.data); //dodavanje na pocetak
        this.increaseNumOfWordsInGroup(res.data.wgId);
      }
    },

    async editWord(word, idx) {
      // let res = await createFun("words", word);
      let res = await createFun("words/mode/update", word);

      //ako je nesto ukucano u search
      if (this.search !== "") {
        //ideja ako se skroz promjeni rjeci ili prevod - ukloniti tu rjec iz liste
        if (
          !word.word.includes(this.search) &&
          !word.translate.includes(this.search)
        ) {
          this.removeWord(idx);
        } else {
          this.updateWord(word, idx);
        }
      } else {
        this.updateWord(word, idx);
      }
    },

    async deleteWord(word, idx) {
      this.removeWord(idx);
      this.decreaseNumOfWordsInGroup(word.wgId);
      await deleteFun("words", word.id);

      // todo: ucitati prvu rjec sa sledece stranice
    },

    async searchWords() {
      let url;
      const groupStore = useGroupStore();
      const dictionaryStore = useDictionaryStore();

      if (groupStore.activeWgId !== "all") {
        url =
          "/wg/" +
          groupStore.activeWgId +
          "/search/" +
          this.search +
          "/?" +
          this.filter;

        let group = groupStore.getWGroupById(groupStore.activeWgId);

        groupStore.wgroups[groupStore.getIndex(group)].numOfItems = 0;
      } else {
        url =
          "/dic/" +
          dictionaryStore.dictionary.id +
          "/search/" +
          this.search +
          "/?" +
          this.filter;

        groupStore.wgroups.forEach((wg) => {
          wg.numOfItems = 0;
        });
      }

      // ideja da se pretraga vrsi u cijelom rjecniku, ako je selektovana neka grupa da se za tu grupu vrate
      // rjeci, a za ostale grupe da se vrati broj rjeci (zelena)

      let res = await readFun("words" + url);
      this.words = res.data.content;

      for (let i = 0; i < res.data.content.length; i++) {
        for (let j = 0; j < groupStore.wgroups.length; j++) {
          if (res.data.content[i].wgId === groupStore.wgroups[j].id) {
            groupStore.wgroups[j].numOfItems++;
          }
        }
      }
    },
  },
  persist: true,
});
