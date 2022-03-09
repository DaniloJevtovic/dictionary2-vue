<template>
  <div>
    <div class="sentence">
      <div @click="showModal = true" class="details">
        {{ sentence.sentence }} - {{ sentence.translate }}
        <p style="margin: 0px">
          <small> {{ sentence.description }}</small>
        </p>
      </div>
      <button @click.prevent="deleteSentence" class="del-btn">x</button>
    </div>

    <AddEditSentenceModal
      v-if="showModal"
      :show="showModal"
      :sentence="sentence"
      :idx="idx"
      :mode="'update'"
      @changeGroup="promjeniGrupu"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";
import AddEditSentenceModal from "./AddEditSentenceModal.vue";

import { useSentencesStore } from "../../stores/sentences.js";
const sentenceStore = useSentencesStore();

const { deleteFun } = useCrud();

const props = defineProps({
  sentence: Object,
  idx: Number,
});

const emit = defineEmits(["changeGroup"]);

const ssentence = reactive({ ...props.sentence });

async function deleteSentence() {
  await deleteFun("sentences", props.sentence.id);
  sentenceStore.removeSentence(props.idx);
}

function promjeniGrupu(id) {
  emit("changeGroup", id);
}

const showModal = ref(false);
</script>

<style scoped>
.sentence {
  margin: 3px 0px;
  padding: 3px;
  border: 1px solid blue;
  display: flex;
}
</style>