<template>
  <div class="load">
    <button
      v-if="
        grammarStore.currentPage + 1 < grammarStore.totalPages &&
        grammarStore.search === ''
      "
      @click="loadMoreGrammars"
      class="new-btn"
    >
      load more grammars [{{ grammarStore.currentPage + 1 }} /
      {{ grammarStore.totalPages }}]
    </button>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useGrammarStore } from "../../stores/grammars.js";

const dictionaryStore = useDictionaryStore();
const grammarStore = useGrammarStore();

async function loadMoreGrammars() {
  grammarStore.loadMoreGrammars(dictionaryStore.dictionary.id);
}
</script>

<style scoped>
.load {
  margin-top: 4px;
}

.new-btn {
  background: v-bind("dictionaryStore.dictionary.color");
  text-align: "center";
}
</style>