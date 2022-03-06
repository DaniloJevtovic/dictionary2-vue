<template>
  <div>
    <div class="header">
      <Search :url="searchUrl" ref="pretraga" @searched="updateWords" />

      <!-- grupe -->
      <GroupsSelect
        :dicId="dicId"
        :gtype="'WGROUP'"
        :enableAll="true"
        :setSelect="selectedGroup"
        @selected="changeGroup"
      />
    </div>

    <!-- lista rjeci -->
    <div class="words">
      <button @click="showModal = true" style="margin: 3px; padding: 4px">
        +
      </button>
      <div v-for="(word, index) in words" :key="word.id">
        <Word
          :word="word"
          :idx="index"
          @deleteFromList="deleteFromList"
          @changeGroup="changeGroup"
        />
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
import { onMounted, ref, reactive, watch } from "vue";
import useCrud from "../../composables/useCRUD.js";
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
}
onMounted(() => {
  getWords(dicUrl);
});

// komponenta za selekciju grupe
import GroupsSelect from "../groups/GroupsSelect.vue";
const selectedGroup = ref("all");
// promjena grupe
function changeGroup(id) {
  if (id == "all") {
    getWords(dicUrl);
    searchUrl.value = "words/dic/" + props.dicId + "/search/";
  } else {
    getWords("words/wg/" + id);
    searchUrl.value = "words/wg/" + selectedGroup.value + "/search/";
  }

  // this.$refs.pretraga.searchFun();
  selectedGroup.value = id;
}

import Search from "../../components/Search.vue";
const searchUrl = ref("words/dic/" + props.dicId + "/search/");
function updateWords(rjeci) {
  words.value = rjeci;
}

// dodavanje rjeci u listu rjeci
function addWord(word) {
  // ako je promjenjena grupa
  if (selectedGroup !== word.wgId) {
    changeGroup(word.wgId);
  }

  words.value.push(word);
}

// uklanja rjec iz liste
function deleteFromList(idx) {
  words.value.splice(idx, 1);
}

//modal
import AddEditWordModal from "./AddEditWordModal.vue";
// rjec koja se prosljedjuje modalu - ako se kreira nova rjec
const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  wgId: selectedGroup.value != "all" ? selectedGroup.value : "odaberi",
});
const showModal = ref(false);
</script>

<style scoped>
.header {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  border: 1px solid rgb(76, 110, 173);
}

.words {
  /* min-height: 350px;
  max-height: 350px; */
  overflow-y: auto;
  border: 1px solid red;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
}
</style>