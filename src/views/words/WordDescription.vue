<template>
  <div>
    <div
      class="new-word-div"
      @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
    >
      <div class="details">
        <small>
          <p>word &#8594; translate</p>
          <p>
            <small>word type</small> | <small>word description</small> |
            <small>word group</small>
          </p>
        </small>
      </div>
    </div>

    <!-- modal - dodavanje nove rjeci -->
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
import { ref, reactive } from "vue";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import AddEditWordModal from "./AddEditWordModal.vue";

const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  type: "NOUN",
  dicId: dictionaryStore.dictionary.id,
  wgId: "all",
});

const showModal = ref(false);
</script>

<style scoped>
.new-word-div {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  margin-top: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
  cursor: pointer;
  background: v-bind("groupStore.getWgColor()");
}
</style>