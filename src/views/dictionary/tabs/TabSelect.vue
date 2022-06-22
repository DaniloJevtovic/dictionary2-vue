<template>
  <select class="tab-select" v-show="true" v-model="tabStore.currentTab">
    <option :value="tab" v-for="(_, tab) in tabs" :key="tab">
      {{ tab }}
    </option>
  </select>
</template>

<script setup>
import { useTabStore } from "../../../stores/tabs.js";
import { useDictionaryStore } from "../../../stores/dictionaries.js";

const props = defineProps({
  tabs: [Object],
});

const tabStore = useTabStore();
const dictionaryStore = useDictionaryStore();
</script>

<style scoped>
.tab-select {
  color: black;
  background: v-bind("dictionaryStore.dictionary.color");
  display: none;
}

@media only screen and (max-width: 700px) {
  .tab-select {
    display: block;
  }
}
</style>