<template>
  <div>
    <div class="word">
      <div @click="showModal = true">
        {{ word.word }} - {{ wword.translate }}
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
      :show="showModal"
      :mode="'update'"
      @changeGroup="promjeniGrupu"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";
import AddEditWordModal from "./AddEditWordModal.vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  word: Object,
  idx: Number,
  wgId: Number, //ako iz grupe pristupas rjecima -> preusmjeri
});

const emit = defineEmits(["deleteFromList", "changeGroup"]);

const wordStore = useWordStore();
const groupStore = useGroupStore();

const { deleteFun } = useCrud();
const wword = reactive({ ...props.word });

async function deleteWord() {
  await deleteFun("words", props.word.id);
  wordStore.removeWord(props.idx);
  //smanjivanje broja recenica u grupi
  groupStore.updateNumOfItems(props.word.wgId, "decrease", "WGROUP");
}

function promjeniGrupu(id) {
  emit("changeGroup", id);
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