<template>
  <div>
    <div class="word">
      <div @click="showModal = true">
        {{ word.word }} - {{ word.translate }}
        <p style="margin: 0px">
          <small>{{ word.description }}</small>
        </p>
      </div>
      <button @click.prevent="deleteWord" class="del-btn">x</button>
    </div>

    <!-- modal -->
    <AddEditWordModal
      v-if="showModal"
      :word="word"
      :idx="idx"
      :show="showModal"
      :mode="'update'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import AddEditWordModal from "./AddEditWordModal.vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  word: Object,
  idx: Number,
});

const wordStore = useWordStore();
const groupStore = useGroupStore();

const wword = reactive({ ...props.word });

function deleteWord() {
  wordStore.removeWord(props.idx, props.word.id);
}

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
  margin-left: 5px;
  margin-right: 0px;
  background: red;
  border-radius: 2px;
  border: none;
}
</style>