import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";
import { useGroupStore } from "./groups.js";
import { useDictionaryStore } from "./dictionaries.js";

const { readFun, createFun, deleteFun } = useCRUD();

export const useSentenceStore = defineStore("sentences", {
  state: () => {
    return {
      sentences: [],
      totalPages: "",
      currentPage: 0,
      size: 10,
      filter: "sort=id,desc",
      search: "",
    };
  },

  actions: {
    addSentence(sentence) {
      this.sentences.unshift(sentence);
    },

    updateSentence(sentence, idx) {
      this.sentences[idx] = sentence;
    },

    removeSentence(idx) {
      this.sentences.splice(idx, 1);
    },

    increaseNumOfSentencesInGroup(sgId) {
      const groupStore = useGroupStore();
      let group = groupStore.getSGroupById(sgId);
      group.numOfItems = group.numOfItems + 1;
    },

    decreaseNumOfSentencesInGroup(sgId) {
      const groupStore = useGroupStore();
      let group = groupStore.getSGroupById(sgId);
      group.numOfItems = group.numOfItems - 1;
    },

    //BEKEND

    async getSentences(type, id) {
      if (this.search !== "") {
        this.searchSentences();
      } else {
        let res;

        if (type === "DIC") {
          res = await readFun(
            "sentences/dic/" + id + "/?" + this.filter + "&size=" + this.size
          );
        } else {
          res = await readFun(
            "sentences/sg/" + id + "/?" + this.filter + "&size=" + this.size
          );
        }

        this.sentences = res.data.content;
        this.currentPage = 0;
        this.totalPages = res.data.totalPages;
        this.search = "";
      }
    },

    //ucitavanje jos recenica - (paginacija)
    async loadMoreSentences(type, id) {
      this.currentPage++;
      let res;

      if (type === "DIC") {
        res = await readFun(
          "sentences/dic/" +
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
          "sentences/sg/" +
            id +
            "/?page=" +
            this.currentPage +
            "&" +
            this.filter +
            "&size=" +
            this.size
        );
      }

      res.data.content.forEach((sentence) => {
        this.addSentence(sentence);
      });

      this.totalPages = res.data.totalPages;
    },

    async saveSentence(sentence) {
      // let res = await createFun("sentences", sentence);
      let res = await createFun("sentences/mode/new", sentence);

      if (this.search !== "") {
        if (
          sentence.sentence.includes(this.search) ||
          sentence.translate.includes(this.search)
        ) {
          this.addSentence(res.data);
          this.increaseNumOfSentencesInGroup(sentence.sgId);
        }
      } else {
        this.addSentence(res.data);
        this.increaseNumOfSentencesInGroup(sentence.sgId);
      }
    },

    async editSentence(sentence, idx) {
      //let res = await createFun("sentences", sentence);
      let res = await createFun("sentences/mode/update", sentence);

      //ako je nesto ukucano u search
      if (this.search !== "") {
        //ideja ako se skroz promjeni recenica ili prevod - ukloniti tu rjec iz liste
        if (
          !sentence.sentence.includes(this.search) &&
          !sentence.translate.includes(this.search)
        ) {
          this.removeSentence(idx);
        } else {
          this.updateSentence(sentence, idx);
        }
      } else {
        this.updateSentence(sentence, idx);
      }
    },

    async deleteSentence(sentence, idx) {
      this.removeSentence(idx);
      this.decreaseNumOfSentencesInGroup(sentence.sgId);
      await deleteFun("sentences", sentence.id);
    },

    async searchSentences() {
      let url;
      const groupStore = useGroupStore();
      const dictionaryStore = useDictionaryStore();

      if (groupStore.activeSgId !== "all") {
        url =
          "/sg/" +
          groupStore.activeSgId +
          "/search/" +
          this.search +
          "/?" +
          this.filter;

        let group = groupStore.getSGroupById(groupStore.activeSgId);

        groupStore.sgroups[groupStore.getIndex(group)].numOfItems = 0;
      } else {
        url =
          "/dic/" +
          dictionaryStore.dictionary.id +
          "/search/" +
          this.search +
          "/?" +
          this.filter;

        groupStore.sgroups.forEach((sg) => {
          sg.numOfItems = 0;
        });
      }

      // ideja da se pretraga vrsi u cijelom rjecniku, ako je selektovana neka grupa da se za tu grupu vrate
      // rjeci, a za ostale grupe da se vrati broj rjeci (zelena)

      let res = await readFun("sentences" + url);
      this.sentences = res.data.content;

      for (let i = 0; i < res.data.content.length; i++) {
        for (let j = 0; j < groupStore.sgroups.length; j++) {
          if (res.data.content[i].sgId === groupStore.sgroups[j].id) {
            groupStore.sgroups[j].numOfItems++;
          }
        }
      }
    },
  },
  persist: true,
});
