<template>
  <div>
    <div class="search-wg">
      <!-- polje za pretragu -->
      <Search :type="'words'" />

      <!-- selekcija grupe -->
      <GroupSelect
        :groups="groupStore.wgroups"
        :model="groupStore.activeWgId"
        :type="'WG'"
      />

      <!-- filtriranje rjeci -->
      <Filter
        :type="'word'"
        :filterModel="wordStore.filter"
        :style="{ background: groupStore.getWgColor() }"
      />

      <!-- dugme za novu rjeci -->
      <button
        @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
        class="new-word"
      >
        new
      </button>
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
      v-if="wordStore.search"
      @click="newSearchWord"
    >
      + {{ wordStore.search }}
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import AddEditWordModal from "./AddEditWordModal.vue";
import Search from "../../components/Search.vue";
import Filter from "../../components/Filter.vue";
import GroupSelect from "../groups/GroupSelect.vue";

const wordStore = useWordStore();
const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

const props = defineProps({
  dicId: String,
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
  newWord.word = wordStore.search;
  newWord.wgId = groupStore.activeWgId;
  showModal.value = true;
}

const showModal = ref(false);
</script>

<style scoped>
.search-wg {
  display: flex;
  gap: 5px;
  /* margin: 4px; */
  padding: 8px;
  align-items: center;
  border-bottom: 2px solid slateblue;
  border-bottom: 2px solid v-bind("groupStore.getWgColor()");
}

.new-word:hover {
  background: springgreen;
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