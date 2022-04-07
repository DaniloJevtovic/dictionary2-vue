<template>
  <div>
    <input type="text" placeholder="search" />

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
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Grammar from "./Grammar.vue";
import AddEditGrammarModal from "./AddEditGrammarModal.vue";
import { useGrammarStore } from "../../stores/grammars.js";

const props = defineProps({
  dicId: String,
});

const { readFun } = useCrud();
const grammarStore = useGrammarStore();

const getGrammars = async () => {
  let res = await readFun("/grammars/dic/" + props.dicId);
  grammarStore.grammars = res.data.content;
};

onMounted(() => getGrammars());

const newGrammar = reactive({
  title: "",
  content: "",
  dicId: props.dicId,
});

const showModal = ref(false);
</script>

<style scoped>
.grammars {
  overflow-y: auto;
  /* max-height: 320px; */
}
</style>