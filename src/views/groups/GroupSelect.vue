<template>
  <!-- defaultni select grupe za header -->
  <select class="groups" @change="changeGroup($event)" v-model="model">
    <option value="all">all groups</option>
    <option
      v-for="group in groups"
      :key="group.id"
      :value="group.id"
      :style="{ background: group.color }"
    >
      group: {{ group.name }} -- [{{ group.numOfItems }}w]
    </option>
  </select>
</template>

<script setup>
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordStore } from "../../stores/words.js";
import { useSentenceStore } from "../../stores/sentences.js";
import { ref } from "@vue/reactivity";

const props = defineProps({
  groups: [Object],
  model: String,
  type: String,
});

const dictionaryStore = useDictionaryStore();
const groupStore = useGroupStore();
const wordStore = useWordStore();
const sentenceStore = useSentenceStore();

function getColor() {
  if (props.type === "WG") {
    return groupStore.getWgColor();
  } else {
    return groupStore.getSgColor();
  }
}

function changeGroup(event) {
  let id = event.target.value;

  if (props.type === "WG") {
    groupStore.activeWgId = id;
    wordStore.currentPage = 0;

    if (id === "all") {
      wordStore.getWords("DIC", dictionaryStore.dictionary.id);
    } else {
      wordStore.getWords("WG", id);
    }
  } else {
    groupStore.activeSgId = id;
    sentenceStore.currentPage = 0;

    if (id === "all") {
      sentenceStore.getSentences("DIC", dictionaryStore.dictionary.id);
    } else {
      sentenceStore.getSentences("SG", id);
    }
  }
}
</script>

<style scoped>
.groups {
  text-align: center;
  background: v-bind("getColor()");
}
</style>