<template>
  <div>
    <div class="word">
      <div @click="showModal = true">
        {{ wword.word }} - {{ wword.translate }}
        <p style="margin: 0px">
          <small>{{ wword.description }}</small>
        </p>
      </div>
      <button @click.prevent="deleteWord" class="del-btn">x</button>
    </div>

    <!-- modal -->
    <AddEditWordModal
      v-if="showModal"
      :word="wword"
      :show="showModal"
      :mode="'update'"
      @update="updateWord"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";

//pinia - rjeci
import { useWordsStore } from "../../stores/words/words.js";
const wordsStore = useWordsStore();

const { deleteFun } = useCrud();

const props = defineProps({
  word: Object,
  idx: Number,
});

const emit = defineEmits(["deleteFromList", "changeGroup"]);

const wword = reactive({ ...props.word });

//brisanje na bekendu
async function deleteWord() {
  await deleteFun("words", props.word.id);
  wordsStore.removeWord(props.idx);
}

function updateWord(updatedWord) {
  Object.assign(wword, updatedWord);

  // ako je doslo do promjene grupe rjeci - promjeni grupu
  if (props.word.wgId !== updatedWord.wgId) {
    emit("changeGroup", wword.wgId); // poziv promjene grupe
  }
}

import AddEditWordModal from "./AddEditWordModal.vue";
const showModal = ref(false);
</script>

<style scoped>
.word {
  border: 1px solid darkblue;
  border-radius: 3px;
  margin: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
}

.del-btn {
  margin-left: 15px;
  margin-right: 0px;
  background: red;
  border-radius: 2px;
  border: none;
}
</style>