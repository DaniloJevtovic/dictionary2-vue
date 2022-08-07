<template>
  <div>
    <div class="new-grammar-div" @click="showModal = true">
      <div class="details">
        <small>
          <p>grammar</p>
          <p>
            <small>grammar content</small>
          </p>
        </small>
      </div>
    </div>

    <AddEditGrammarModal
      v-if="showModal"
      :show="showModal"
      :grammar="newGrammar"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGrammarStore } from "../../stores/grammars.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import AddEditGrammarModal from "./AddEditGrammarModal.vue";

const grammarStore = useGrammarStore();
const dictionaryStore = useDictionaryStore();

const newGrammar = reactive({
  grammar: "",
  content: "",
  dicId: dictionaryStore.dictionary.id,
});

const showModal = ref(false);
</script>

<style scoped>
.new-grammar-div {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  padding: 2px;
  text-align: center;
  display: flex;
  background: v-bind("dictionaryStore.dictionary.color");
}
</style>