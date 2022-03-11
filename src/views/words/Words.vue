<template>
  <div>
    <input class="search" type="text" placeholder="sarch" />
    <!-- <Search :url="searchUrl" ref="pretraga" @searched="updateWords" /> -->

    <!-- selekcija grupe -->
    <select
      class="wgs"
      @change="changeWg($event)"
      v-model="selectedGroup"
      :style="{
        background:
          selectedGroup != 'all'
            ? groupStore.getWGroupById(selectedGroup).color
            : 'white',
      }"
    >
      <option value="all">sve</option>
      <option
        v-for="group in groupStore.wgroups"
        :key="group.id"
        :value="group.id"
        :style="{ background: group.color }"
      >
        Grupa: {{ group.name }} -- [{{ group.numOfItems }}]
      </option>
    </select>

    <button @click="showModal = true" class="new-btn">new word</button>

    <!-- lista rjeci -->
    <div class="words">
      <div v-for="(word, index) in wordStore.words" :key="word.id">
        <Word :word="word" :idx="index" @changeGroup="promjeniGrupu" />
      </div>
    </div>

    <!-- modal -->
    <AddEditWordModal
      v-if="showModal"
      :word="newWord"
      :show="showModal"
      :mode="'new'"
      @changeGroup="promjeniGrupu"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Word from "./Word.vue";
import AddEditWordModal from "./AddEditWordModal.vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  dicId: String,
});

const wordStore = useWordStore();
const groupStore = useGroupStore();

const dicUrl = "words/dic/" + props.dicId; //adresa do rjecnika
const { readFun } = useCrud();

//f-ja za dobavljanje rjeci iz rjecnika ili grupe
async function getWords(url) {
  let res = await readFun(url);
  wordStore.words = res.data.content;
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
  selectedGroup.value = newWord.wgId = id;
}

import Search from "../../components/Search.vue";
const searchUrl = ref("words/dic/" + props.dicId + "/search/");
function updateWords(rjeci) {
  wordStore.words = rjeci;
}

const showModal = ref(false);

// rjec koja se prosljedjuje modalu - ako se kreira nova rjec
const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  wgId: selectedGroup.value,
});
</script>

<style scoped>
.words {
  overflow-y: auto;
  display: flex;
  flex-grow: 4;
  flex-wrap: wrap;
  max-height: 320px;
  flex-direction: row;
  align-items: stretch;
}
</style>