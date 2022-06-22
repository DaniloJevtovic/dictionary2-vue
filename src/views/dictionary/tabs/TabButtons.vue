<template>
  <!-- tabovi u header-u rjecnika -->
  <div class="tab-btns">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: tabStore.currentTab === tab }]"
      @click="tabStore.currentTab = tab"
    >
      {{ tab }}
    </button>
  </div>
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
.tab-button.active {
  background: v-bind("dictionaryStore.dictionary.color");
  color: black;
}

@media only screen and (max-width: 700px) {
  .tab-btns {
    display: none;
  }
}
</style>