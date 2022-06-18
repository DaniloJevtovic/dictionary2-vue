<template>
  <div class="load">
    <button
      v-if="
        sentenceStore.currentPage + 1 < sentenceStore.totalPages &&
        sentenceStore.search === ''
      "
      @click="loadMoreSentences"
      class="new-btn"
    >
      load more sentences [{{ sentenceStore.currentPage + 1 }} /
      {{ sentenceStore.totalPages }}]
    </button>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useGroupStore } from "../../stores/groups.js";
import { useSentenceStore } from "../../stores/sentences.js";

const dictionaryStore = useDictionaryStore();
const groupStore = useGroupStore();
const sentenceStore = useSentenceStore();

async function loadMoreSentences() {
  if (groupStore.activeSgId === "all") {
    sentenceStore.loadMoreSentences("DIC", dictionaryStore.dictionary.id);
  } else {
    sentenceStore.loadMoreSentences("WG", groupStore.activeSgId);
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