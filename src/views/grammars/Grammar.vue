<template>
  <div>
    <div class="grammar">
      <button @click="showModal = true">&#9998;</button>
      <div @click="expandGrammar = !expandGrammar" class="details">
        {{ grammar.title }}
        <p v-if="expandGrammar" style="margin: 0px">
          <small> {{ grammar.content }}</small>
        </p>

        <p v-else style="margin: 0px">
          <small> {{ grammar.content.substring(0, 30) }}...</small>
        </p>
      </div>
      <button @click.prevent="deleteGrammar" class="del-btn">&#x2715;</button>
    </div>

    <AddEditGrammarModal
      v-if="showModal"
      :show="showModal"
      :grammar="grammar"
      :idx="idx"
      :mode="'update'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";
import AddEditGrammarModal from "./AddEditGrammarModal.vue";
import { useGrammarStore } from "../../stores/grammars.js";

const { deleteFun } = useCrud();
const grammarStore = useGrammarStore();

const props = defineProps({
  grammar: Object,
  idx: Number,
});

async function deleteGrammar() {
  grammarStore.deleteGrammar(props.grammar, props.idx);
}

const showModal = ref(false);

const expandGrammar = ref(false);
</script>

<style scoped>
.grammar {
  margin: 3px 0px;
  padding: 2px;
  border: 1px solid blue;
  display: flex;
}

.grammar:hover {
  background: rgb(120, 127, 223);
}
</style>