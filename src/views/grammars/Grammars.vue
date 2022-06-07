<template>
  <div>
    <div class="grammars-div">
      <div class="search-gr">
        <input
          type="text"
          v-model="searchInput"
          placeholder="search by title"
        />
        <button
          @click="showModal = true"
          class="new-grammar"
          :style="{ background: dictionaryStore.dictionary.color }"
        >
          new
        </button>
      </div>

      <div class="new-grammar-div" @click="showModal = true">
        <div class="details">
          <small>
            <p>grammar title</p>
            <p>
              <small>grammar content</small>
            </p>
          </small>
        </div>
      </div>

      <div class="grammars-list">
        <div
          v-for="(grammar, index) in grammarStore.grammars"
          :key="grammar.id"
        >
          <Grammar :grammar="grammar" :idx="index" />
        </div>
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
import { onMounted, ref, reactive, watch } from "vue";

import Grammar from "./Grammar.vue";
import AddEditGrammarModal from "./AddEditGrammarModal.vue";
import { useGrammarStore } from "../../stores/grammars.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dicId: String,
});

const grammarStore = useGrammarStore();
const dictionaryStore = useDictionaryStore();

onMounted(() => {
  grammarStore.getGrammars();
});

const newGrammar = reactive({
  title: "",
  content: "",
  dicId: props.dicId,
});

const showModal = ref(false);

//pretraga
const searchInput = ref("");

watch(searchInput, () => {
  if (searchInput.value) {
    grammarStore.search = searchInput.value;
    grammarStore.searchGrammars();
  } else {
    grammarStore.search = "";

    grammarStore.getGrammars();
  }
});
</script>

<style scoped>
.grammars-div {
  overflow-y: auto;
  border: 1px solid darkgray;
}

.search-gr {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-bottom: 1px solid slateblue;
}

.grammars-list {
  margin: 4px;
}

.new-grammar-div {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  margin: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
}

@media only screen and (max-width: 700px) {
  .search-gr {
    display: block;
  }

  .new-grammar {
    width: 100%;
  }
}
</style>