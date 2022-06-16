<template>
  <input
    class="search-input"
    type="text"
    v-model="searchInput"
    :placeholder="'search ' + type"
  />
</template>

<script setup>
import { ref, watch } from "vue";

import { useDictionaryStore } from "../stores/dictionaries.js";
import { useGroupStore } from "../stores/groups.js";
import { useWordStore } from "../stores/words.js";
import { useSentenceStore } from "../stores/sentences.js";
import { useGrammarStore } from "../stores/grammars.js";

const dictionaryStore = useDictionaryStore();
const groupStore = useGroupStore();
const wordStore = useWordStore();
const sentenceStore = useSentenceStore();
const grammarStore = useGrammarStore();

const props = defineProps({
  type: String,
});

const searchInput = ref("");

watch(searchInput, () => {
  if (searchInput.value) {
    if (props.type === "words") {
      wordStore.search = searchInput.value;
      wordStore.searchWords();
    } else if (props.type === "sentences") {
      sentenceStore.search = searchInput.value;
      sentenceStore.searchSentences();
    } else {
      grammarStore.search = searchInput.value;
      grammarStore.searchGrammars();
    }
  } else {
    if (props.type === "words") {
      wordStore.search = "";
      groupStore.getWGroupsForDictionary(dictionaryStore.dictionary.id);

      if (groupStore.activeWgId !== "all") {
        wordStore.getWords("WG", groupStore.activeWgId);
      } else {
        wordStore.getWords("DIC", dictionaryStore.dictionary.id);
      }
    } else if (props.type === "sentences") {
      sentenceStore.search = "";
      groupStore.getSGroupsForDictionary(dictionaryStore.dictionary.id);

      if (groupStore.activeSgId !== "all") {
        sentenceStore.getSentences("SG", groupStore.activeSgId);
      } else {
        sentenceStore.getSentences("DIC", dictionaryStore.dictionary.id);
      }
    } else {
      grammarStore.search = "";
      grammarStore.getGrammars();
    }
  }
});
</script>

<style scoped>
</style>