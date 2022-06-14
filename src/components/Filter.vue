<template>
  <select v-model="filterModel" @change="changeFilter($event)" class="filter">
    <option value="sort=id,desc">&#10041; newest</option>
    <option value="sort=id,asc">&bull; oldest</option>
    <option value="sort=favorite,desc">&#x2665; favorite</option>
    <option :value="'sort=' + type + ',asc'">&#8595; [a-z]</option>
    <option :value="'sort=' + type + ',desc'">&#8593; [z-a]</option>

    <option v-if="type === 'word'" value="sort=wgId, asc">
      &#9634; wgroup
    </option>
    <option v-else value="sort=sgId, asc">&#9634; sgroup</option>
  </select>
</template>

<script setup>
import { useDictionaryStore } from "../stores/dictionaries.js";
import { useGroupStore } from "../stores/groups.js";
import { useWordStore } from "../stores/words.js";
import { useSentenceStore } from "../stores/sentences.js";

defineProps({
  filterModel: String,
  type: String,
});
const emit = defineEmits(["filter"]);

const dictionaryStore = useDictionaryStore();
const groupStore = useGroupStore();
const wordStore = useWordStore();
const sentenceStore = useSentenceStore();

function changeFilter(event) {
  let filter = event.target.value;

  console.log(filter);
  emit("filter", filter);
}

//ako neces nista da se emituje u roditeljsku komponentu
function changeFilter2(filter) {
  if (props.type === "word") {
    wordStore.filter = filter; // mora biti ovdje na pocetku

    if (groupStore.activeWgId === "all") {
      wordStore.getWords("DIC", dictionaryStore.dictionary.id);
    } else {
      wordStore.getWords("WG", groupStore.activeWgId);
    }

    wordStore.currentPage = 0;
  } else {
    sentenceStore.filter = filter; // mora biti ovdje na pocetku

    if (groupStore.activeWgId === "all") {
      sentenceStore.getSentences("DIC", dictionaryStore.dictionary.id);
    } else {
      sentenceStore.getSentences("SG", groupStore.activeSgId);
    }

    wordStore.currentPage = 0;
  }
}
</script>

<style scoped>
.filter {
  width: auto;
  text-align: center;
  /* color: springgreen;
  background: rgb(19, 51, 20); */
}

@media only screen and (max-width: 700px) {
  .filter {
    width: 100%;
  }
}
</style>