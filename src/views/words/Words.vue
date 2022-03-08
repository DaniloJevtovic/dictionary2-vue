<template>
  <div>
    <div class="header">
      <input class="search" type="text" placeholder="sarch" />

      <!-- <Search :url="searchUrl" ref="pretraga" @searched="updateWords" /> -->

      <!-- selekcija grupe -->
      <select class="wgs" @change="changeWg($event)" v-model="selectedGroup">
        <option value="all">sve</option>
        <option
          v-for="group in groupStore.wgroups"
          :key="group.id"
          :value="group.id"
        >
          {{ group.name }}
        </option>
      </select>
    </div>

    <!-- lista rjeci -->
    <div class="words">
      <button @click="showModal = true" class="new-btn">new word</button>
      <div v-for="(word, index) in wordsStore.words" :key="word.id">
        <Word :word="word" :idx="index" @changeGroup="promjeniGrupu" />
      </div>
    </div>

    <!-- modal -->
    <AddEditWordModal
      v-if="showModal"
      :word="newWord"
      :show="showModal"
      :mode="'new'"
      @save="addWord"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";

//pinia - grupe
import { useGroupStore } from "../../stores/groups.js";
const groupStore = useGroupStore();

//pinia - rjeci
import { useWordsStore } from "../../stores/words/words.js";
const wordsStore = useWordsStore();

import Word from "./Word.vue";

const { readFun } = useCrud();

const props = defineProps({
  dicId: String,
});

const dicUrl = "words/dic/" + props.dicId; //adresa do rjecnika

//f-ja za dobavljanje rjeci iz rjecnika ili grupe
const words = ref([]);
async function getWords(url) {
  let res = await readFun(url);
  words.value = res.data.content;
  wordsStore.words = res.data.content;
}

// grupe rjeci za rjecnik
async function getGroups() {
  let res = await readFun("groups/dic/" + props.dicId + "/group/WGROUP");
  groupStore.wgroups = res.data;
}

onMounted(() => {
  getWords(dicUrl);
  getGroups();
});

const selectedGroup = ref("all");
function changeWg(event) {
  let id = event.target.value;
  promjeniGrupu(id);
}

function promjeniGrupu(id) {
  if (id == "all") {
    getWords(dicUrl);
    searchUrl.value = "words/dic/" + props.dicId + "/search/";
  } else {
    getWords("words/wg/" + id);
    searchUrl.value = "words/wg/" + selectedGroup.value + "/search/";
  }
  selectedGroup.value = id;
  console.log(selectedGroup.value);
}

import Search from "../../components/Search.vue";
const searchUrl = ref("words/dic/" + props.dicId + "/search/");
function updateWords(rjeci) {
  //words.value = rjeci;
  wordsStore.words = rjeci;
}

//modal
import AddEditWordModal from "./AddEditWordModal.vue";
// rjec koja se prosljedjuje modalu - ako se kreira nova rjec
const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  wgId: selectedGroup.value,
});
const showModal = ref(false);
function addWord(word) {
  wordsStore.addToWords(word);

  if (word.wgId !== selectedGroup.value) {
    promjeniGrupu(word.wgId);
  }
}
</script>

<style scoped>
.header {
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
  border: 1px solid rgb(76, 110, 173);
}

.search {
  width: auto;
}

.wgs {
  width: auto;
}

.words {
  overflow-y: auto;
  border: 1px solid rgb(0, 119, 255);
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
}
</style>