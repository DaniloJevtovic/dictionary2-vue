<template>
  <div>
    <div class="grammar">
      <button @click="expandGrammar">V</button>
      <div @click="showModal = true" class="details">
        {{ grammar.title }}
        <p style="margin: 0px">
          <small> {{ grammar.content }}</small>
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
  await deleteFun("grammars", props.grammar.id);
  grammarStore.removeGrammar(props.idx);
}

const showModal = ref(false);
</script>

<style scoped>
.grammar {
  margin: 3px 0px;
  padding: 3px;
  border: 1px solid blue;
  display: flex;
}

.grammar:hover {
  background: rgb(248, 107, 25);
}
</style>