<template>
  <div>
    <div v-if="grammarStore.grammars.length">
      <div v-for="(grammar, index) in grammarStore.grammars" :key="grammar.id">
        <Grammar :grammar="grammar" :idx="index" />
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import { useGrammarStore } from "../../stores/grammars.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { onMounted } from "@vue/runtime-core";

import Grammar from "./Grammar.vue";
import Spinner from "../../components/Spinner.vue";

const grammarStore = useGrammarStore();
const dictionaryStore = useDictionaryStore();

onMounted(() => {
  grammarStore.filter = "sort=id,desc";
  grammarStore.search = "";
  grammarStore.getGrammars();
});
</script>

<style scoped>
</style>