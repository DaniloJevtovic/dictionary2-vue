<template>
  <button
    class="details-btn"
    :class="
      groupStore.activeWgId === group.id || groupStore.activeSgId === group.id
        ? 'details-btn-active'
        : 'details-btn'
    "
    @click="viewItems(group)"
  >
    {{ group.numOfItems }}
    <span v-if="group.type === 'WGROUP'"><small>words</small></span>
    <span v-else><small>sntcs</small></span>
  </button>
</template>

<script setup>
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useSentenceStore } from "../../stores/sentences.js";

const props = defineProps({
  group: Object,
});

const groupStore = useGroupStore();
const wordStore = useWordStore();
const sentenceStore = useSentenceStore();

async function viewItems(group) {
  if (group.type === "WGROUP") {
    // da ne bi ucitavao sa bekenda, ako je u tabu rjeci vec aktivna ta grupa
    if (group.id !== groupStore.activeWgId) {
      groupStore.activeWgId = group.id;
      wordStore.getWords("WG", group.id);
    }
  } else {
    if (group.id !== groupStore.activeSgId) {
      groupStore.activeSgId = group.id;
      sentenceStore.getSentences("SG", group.id);
    }
  }
}
</script>

<style scoped>
.details-btn {
  padding: 2px;
  color: springgreen;
  background: rgb(19, 51, 20);

  color: hotpink;
  background: rgb(34, 11, 61);
}

.details-btn-active {
  color: yellow;
}

.details-btn:hover {
  background: rgb(10, 31, 16);
  background: rgb(34, 11, 61);

  color: yellow;
}
</style>