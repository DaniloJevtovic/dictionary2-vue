<template>
  <div>
    <div class="grammar">
      <button @click="showModal = true" class="edit-btn">&#9998;</button>
      <div @click="expandGrammar = !expandGrammar" class="details">
        {{ idx + 1 }}. {{ grammar.grammar }}
        <p v-if="expandGrammar" style="margin: 0px; background: cyan">
          <small> {{ grammar.content }}</small>
        </p>

        <p v-else style="margin: 0px">
          <small> {{ grammar.content.substring(0, 30) }}...</small>
        </p>
      </div>
      <button @click.prevent="showConfirmDialog = true" class="del-btn">
        &#x2715;
      </button>
    </div>

    <ConfirmDialog
      v-if="showConfirmDialog"
      @answer="deleteGrammar"
      :title="'Delete Grammar'"
      :dlgType="'del-type'"
      :message="'Da li ste sigurni da zelite obrisati gramatiku?'"
    />

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
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import { useGrammarStore } from "../../stores/grammars.js";
import { useToastStore } from "../../stores/toast.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const { deleteFun } = useCrud();
const grammarStore = useGrammarStore();
const toastStore = useToastStore();
const dictionaryStore = useDictionaryStore();

const props = defineProps({
  grammar: Object,
  idx: Number,
});

async function deleteGrammar(answer) {
  if (answer === "yes") {
    grammarStore.deleteGrammar(props.grammar, props.idx);
    toastStore.showToast("gramatika obrisana", "warning");
  }

  showConfirmDialog.value = false;
}

const showModal = ref(false);
const showConfirmDialog = ref(false);
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
  background: whitesmoke;
}

.edit-btn {
  background: slategray;
  background: v-bind("dictionaryStore.dictionary.color");
}
</style>