<template>
  <div class="load">
    <button
      v-if="
        wordStore.currentPage + 1 < wordStore.totalPages &&
        wordStore.search === ''
      "
      @click="loadMoreWords"
      class="new-btn"
    >
      load more words [{{ wordStore.currentPage + 1 }} /
      {{ wordStore.totalPages }}]
    </button>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordStore } from "../../stores/words.js";

const dictionaryStore = useDictionaryStore();
const groupStore = useGroupStore();
const wordStore = useWordStore();

async function loadMoreWords() {
  if (groupStore.activeWgId === "all") {
    wordStore.loadMoreWords("DIC", dictionaryStore.dictionary.id);
  } else {
    wordStore.loadMoreWords("WG", groupStore.activeWgId);
  }
}
</script>

<style scoped>
.load {
  margin-top: 4px;
}

.new-btn {
  background: v-bind("groupStore.getWgColor()");
  text-align: "center";
}
</style>