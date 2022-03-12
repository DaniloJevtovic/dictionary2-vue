<template>
  <div>
    <input class="search" type="text" placeholder="search" />

    <!-- selekcija grupe -->
    <select
      class="wgs"
      @change="changeWg($event)"
      v-model="groupStore.activeWgId"
      :style="{
        background:
          groupStore.activeWgId != 'all'
            ? groupStore.getWGroupById(groupStore.activeWgId).color
            : 'white',
      }"
    >
      <option value="all">sve</option>
      <option
        v-for="group in groupStore.wgroups"
        :key="group.id"
        :value="group.id"
        :style="{ background: group.color }"
      >
        Grupa: {{ group.name }} -- [{{ group.numOfItems }}]
      </option>
    </select>

    <button @click="showModal = true" class="new-btn">new word</button>

    <!-- lista rjeci -->
    <div class="words">
      <div v-for="(word, index) in wordStore.words" :key="word.id">
        <Word :word="word" :idx="index" />
      </div>
    </div>

    <!-- modal -->
    <AddEditWordModal
      v-if="showModal"
      :word="newWord"
      :show="showModal"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import Word from "./Word.vue";
import AddEditWordModal from "./AddEditWordModal.vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  dicId: String,
});

const wordStore = useWordStore();
const groupStore = useGroupStore();

onMounted(() => {
  wordStore.getWordsForDictionary(props.dicId);
  groupStore.getWGroupsForDictionary(props.dicId);
});

function changeWg(event) {
  let id = event.target.value;

  if (id === "all") {
    wordStore.getWordsForDictionary(props.dicId);
  } else {
    wordStore.getWordsForWgroup(id);
  }

  groupStore.activeWgId = newWord.wgId = id;
}

const showModal = ref(false);

// rjec koja se prosljedjuje modalu - ako se kreira nova rjec
const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  wgId: "all",
});
</script>

<style scoped>
.words {
  overflow-y: auto;
  display: flex;
  flex-grow: 4;
  flex-wrap: wrap;
  max-height: 320px;
  flex-direction: row;
  align-items: stretch;
}
</style>