<template>
  <div class="grammars-div">
    <input type="text" v-model="searchInput" placeholder="search by title" />

    <button @click="showModal = true" class="new-btn" style="width: 100%">
      new grammar
    </button>

    <div class="grammars">
      <div v-for="(grammar, index) in grammarStore.grammars" :key="grammar.id">
        <Grammar :grammar="grammar" :idx="index" />
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
import useCrud from "../../composables/useCRUD.js";
import Grammar from "./Grammar.vue";
import AddEditGrammarModal from "./AddEditGrammarModal.vue";
import { useGrammarStore } from "../../stores/grammars.js";

const props = defineProps({
  dicId: String,
});

const { readFun } = useCrud();
const grammarStore = useGrammarStore();

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
  margin: 2px;
  border: 1px solid darkgray;
}

.grammars {
  overflow-y: auto;
  /* max-height: 320px; */
}
</style>