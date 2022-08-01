<template>
  <div class="wordsList">
    <div v-if="wordStore.words.length">
      <div v-for="(word, index) in wordStore.words" :key="word.id">
        <Word :word="word" :idx="index" />
      </div>
    </div>
    <div v-else>
      <Spiner />
    </div>
  </div>
</template>

<script setup>
import Word from "./Word.vue";
import Spiner from "../../components/Spinner.vue";

import { useWordStore } from "../../stores/words.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { onMounted } from "@vue/runtime-core";

const wordStore = useWordStore();
const dictionaryStore = useDictionaryStore();

onMounted(() => {
  wordStore.filter = "sort=id,desc";
  wordStore.search = "";
  wordStore.getWords("DIC", dictionaryStore.dictionary.id);
});
</script>

<style scoped>
/* .wordsList {
  background: cyan;
} */
</style>