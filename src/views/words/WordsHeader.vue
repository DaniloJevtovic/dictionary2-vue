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
        :style="{
          background:
            groupStore.activeWgId != 'all'
              ? groupStore.getWGroupById(groupStore.activeWgId).color
              : 'white',
          textAlign: 'center',
        }"
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

      <Filter
        :type="'word'"
        :filterModel="wordStore.filter"
        @filter="changeFilter"
      />
    </div>

    <AddEditWordModal
      v-if="showModal"
      :word="newWord"
      :show="showModal"
      :mode="'new'"
      @close="showModal = false"
    />

    <button
      class="new-word-btn-search"
      v-if="searchInput"
      @click="newSearchWord"
      style="background: springgreen"
    >
      + {{ searchInput }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";

import AddEditWordModal from "./AddEditWordModal.vue";
import Filter from "../../components/Filter.vue";

const wordStore = useWordStore();
const groupStore = useGroupStore();

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
  margin: 4px;
}
</style>