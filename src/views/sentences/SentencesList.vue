<template>
  <div>
    <div v-if="sentenceStore.sentences.length">
      <div
        v-for="(sentence, index) in sentenceStore.sentences"
        :key="sentence.id"
      >
        <Sentence :sentence="sentence" :idx="index" />
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import Sentence from "./Sentence.vue";
import Spinner from "../../components/Spinner.vue";

import { useSentenceStore } from "../../stores/sentences.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import { onMounted } from "@vue/runtime-core";

const sentenceStore = useSentenceStore();
const dictionaryStore = useDictionaryStore();

onMounted(() => {
  sentenceStore.filter = "sort=id,desc";
  sentenceStore.search = "";
  sentenceStore.getSentences("DIC", dictionaryStore.dictionary.id);
});
</script>

<style scoped>
</style>