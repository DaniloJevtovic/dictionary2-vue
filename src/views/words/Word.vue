<template>
  <div>
    <div class="word" @click="showModal = true">
      {{ wword.word }} - {{ wword.translate }}
      <button @click.prevent="deleteWord" class="del-btn">x</button>

      <p style="margin: 0px">
        <small>{{ wword.description }}</small>
      </p>
    </div>

    <!-- modal -->
    <UpdateWordModal
      v-if="showModal"
      :word="wword"
      :show="showModal"
      @update="updateWord"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";

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
  emit("deleteFromList", props.idx); // poziv brisanja iz liste
}

function updateWord(updatedWord) {
  Object.assign(wword, updatedWord);

  // ako je doslo do promjene grupe rjeci - promjeni grupu
  if (props.word.wgId !== updatedWord.wgId) {
    emit("changeGroup", wword.wgId); // poziv promjene grupe
  }
}

import UpdateWordModal from "./AddEditWordModal.vue";
const showModal = ref(false);
</script>

<style scoped>
.word {
  border: 1px solid darkblue;
  border-radius: 3px;
  margin: 4px;
  padding: 2px;
  text-align: center;
}

.del-btn {
  /* margin: -13px -8px; */
  padding: 3px;
  background: red;
  color: white;
  border: none;
  /* float: right; */
}
</style>