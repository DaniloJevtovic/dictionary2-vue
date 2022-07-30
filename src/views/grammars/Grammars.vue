<template>
  <div>
    <div class="grammars-div">
      <GrammarHeader />

      <div class="grammars-list">
        <GrammarDescription />

        <!-- <div v-if="grammarStore.grammars.length">
          <div
            v-for="(grammar, index) in grammarStore.grammars"
            :key="grammar.id"
          >
            <Grammar :grammar="grammar" :idx="index" />
          </div>
        </div>
        <div v-else>
          <Spinner />
        </div> -->

        <GrammarsList />

        <LoadMoreGrammars />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useGrammarStore } from "../../stores/grammars.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import GrammarHeader from "./GrammarsHeader.vue";
import GrammarDescription from "./GrammarDescription.vue";
import Grammar from "./Grammar.vue";
import LoadMoreGrammars from "./LoadMoreGrammars.vue";
import Spinner from "../../components/Spinner.vue";
import GrammarsList from "./GrammarsList.vue";

const props = defineProps({
  dicId: String,
});

const grammarStore = useGrammarStore();
const dictionaryStore = useDictionaryStore();

// onMounted(() => {
//   grammarStore.filter = "sort=id,desc";
//   grammarStore.search = "";
//   grammarStore.getGrammars();
// });

const newGrammar = reactive({
  grammar: "",
  content: "",
  dicId: props.dicId,
});

const showModal = ref(false);
</script>

<style scoped>
.grammars-div {
  overflow-y: auto;
  border: 1px solid darkgray;
}

.grammars-list {
  margin: 10px;
}

@media only screen and (max-width: 700px) {
  .new-grammar {
    width: 100%;
  }
}
</style>