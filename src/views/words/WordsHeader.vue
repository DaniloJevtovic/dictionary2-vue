<template>
  <div>
    <div class="search-wg">
      <!-- polje za pretragu -->
      <input
        class="search"
        v-model="searchInput"
        type="text"
        placeholder="search words"
      />

      <!-- selekcija grupe -->
      <select
        class="wgs"
        @change="changeWg($event)"
        v-model="groupStore.activeWgId"
      >
        <option value="all">sve rjeci</option>
        <option
          v-for="group in groupStore.wgroups"
          :key="group.id"
          :value="group.id"
          :style="{ background: group.color }"
        >
          group: {{ group.name }} -- [{{ group.numOfItems }}w]
        </option>
      </select>

      <!-- filtriranje rjeci -->
      <Filter
        :type="'word'"
        :filterModel="wordStore.filter"
        @filter="changeFilter"
      />

      <!-- dugme za novu rjeci -->
      <button @click="showModal = true" class="new-word">new</button>
    </div>

    <!-- modal za novu rjec -->
    <AddEditWordModal
      v-if="showModal"
      :word="newWord"
      :show="showModal"
      :mode="'new'"
      @close="showModal = false"
    />

    <!-- dugme za kreiranje nove rjeci iz pretrage -->
    <button
      class="new-word-btn-search"
      v-if="searchInput"
      @click="newSearchWord"
    >
      + {{ searchInput }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import AddEditWordModal from "./AddEditWordModal.vue";
import Filter from "../../components/Filter.vue";

const wordStore = useWordStore();
const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

const props = defineProps({
  dicId: String,
});

// promjena grupe
function changeWg(event) {
  let id = event.target.value;

  groupStore.activeWgId = id;
  wordStore.currentPage = 0;

  if (id === "all") {
    wordStore.getWords("DIC", props.dicId);
  } else {
    wordStore.getWords("WG", id);
  }
}

// pretraga
const searchInput = ref("");

watch(searchInput, () => {
  if (searchInput.value) {
    wordStore.search = searchInput.value;
    wordStore.searchWords();
  } else {
    wordStore.search = "";

    groupStore.getWGroupsForDictionary(props.dicId);

    if (groupStore.activeWgId !== "all") {
      wordStore.getWords("WG", groupStore.activeWgId);
    } else {
      wordStore.getWords("DIC", props.dicId);
    }
  }
});

// rjec koja se prosljedjuje modalu - ako se kreira nova rjec
const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  type: "NOUN",
  dicId: props.dicId,
  wgId: "all",
});

// poziv f-je za novu rjec iz pretrage
function newSearchWord() {
  newWord.word = searchInput.value;
  newWord.wgId = groupStore.activeWgId;
  showModal.value = true;
}

const showModal = ref(false);

// filter/sort
function changeFilter(filter) {
  wordStore.filter = filter; // mora biti ovdje na pocetku

  if (groupStore.activeWgId === "all") {
    wordStore.getWords("DIC", props.dicId);
  } else {
    wordStore.getWords("WG", groupStore.activeWgId);
  }

  wordStore.currentPage = 0;
}
</script>

<style scoped>
.search-wg {
  display: flex;
  gap: 5px;
  /* margin: 4px; */
  padding: 8px;
  align-items: center;
  border-bottom: 2px solid slateblue;
}

.wgs,
.new-word,
.new-word-btn-search {
  text-align: center;
  background: v-bind("groupStore.getWgColor()");
}

.new-word-btn-search {
  margin-top: 10px;
  padding: 5px;
  animation: blinker 2s linear infinite;
}

@media only screen and (max-width: 700px) {
  .search-wg {
    display: block;
  }

  .new-word {
    /* display: none; */
    display: block;
    width: 100%;
  }

  .new-word::after {
    content: " word";
  }
}
</style>