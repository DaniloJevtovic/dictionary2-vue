<template>
  <div>
    <div class="search-gr">
      <Search :type="'grammars'" />

      <Filter
        :type="'grammar'"
        :filterModel="grammarStore.filter"
        :style="{ background: dictionaryStore.dictionary.color }"
      />

      <button
        @click="showModal = true"
        class="new-grammar"
        :style="{ background: dictionaryStore.dictionary.color }"
      >
        new
      </button>
    </div>

    <AddEditGrammarModal
      v-if="showModal"
      :show="showModal"
      :grammar="newGrammar"
      :mode="'new'"
      @close="showModal = false"
    />

    <!-- dugme za kreiranje nove gramatike iz pretrage -->
    <button
      class="new-grammar-btn-search"
      v-if="grammarStore.search"
      @click="newSearchGrammar"
    >
      + {{ grammarStore.search }}
      <!-- <p><small>click to add</small></p> -->
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGrammarStore } from "../../stores/grammars.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import AddEditGrammarModal from "./AddEditGrammarModal.vue";
import Search from "../../components/Search.vue";
import Filter from "../../components/Filter.vue";

const grammarStore = useGrammarStore();
const dictionaryStore = useDictionaryStore();

const newGrammar = reactive({
  grammar: "",
  content: "",
  dicId: dictionaryStore.dictionary.id,
});

// poziv f-je za novu gramatiku iz pretrage
function newSearchGrammar() {
  newGrammar.grammar = grammarStore.search;
  showModal.value = true;
}

const showModal = ref(false);
</script>

<style scoped>
.search-gr {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-bottom: 2px solid slateblue;
  border-bottom: 2px solid v-bind("dictionaryStore.dictionary.color");
}

.new-grammar-btn-search {
  margin-top: 10px;
  padding: 5px;
  animation: blinker 2s linear infinite;
}

@media only screen and (max-width: 700px) {
  .search-gr {
    display: block;
  }

  .new-grammar {
    /* display: none; */
    display: block;
    width: 100%;
  }

  .new-grammar::after {
    content: " grammar";
  }
}
</style>