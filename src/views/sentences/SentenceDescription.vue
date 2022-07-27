<template>
  <div>
    <div
      class="new-sentence-div"
      @click="(showModal = true), (newSentence.sgId = groupStore.activeSgId)"
    >
      <div class="details">
        <small>
          <p>sentence &#8594; translate</p>
          <p>
            <small>sentence description</small> |
            <small>sentence group</small>
          </p>
        </small>
      </div>
    </div>

    <!-- modal - dodavanje nove recenice -->
    <AddEditSentenceModal
      v-if="showModal"
      :sentence="newSentence"
      :show="showModal"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import AddEditSentenceModal from "./AddEditSentenceModal.vue";

const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

const newSentence = reactive({
  sentence: "",
  translate: "",
  description: "",
  dicId: dictionaryStore.dictionary.id,
  sgId: "all",
});

const showModal = ref(false);
</script>

<style scoped>
.new-sentence-div {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  margin-top: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
  cursor: pointer;
}
</style>