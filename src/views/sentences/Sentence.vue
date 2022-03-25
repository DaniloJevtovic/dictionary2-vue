<template>
  <div>
    <div class="sentence">
      <div @click="showModal = true" class="details">
        {{ sentence.sentence }} -{{ sentence.translate }}
        <p style="margin: 0px">
          <small> {{ sentence.description }}</small>
        </p>
      </div>
      <button
        @click.prevent="updateFav"
        :style="{
          background: sentence.favorite === true ? 'yellow' : 'white',
        }"
      >
        &#x2665;
      </button>
      <button @click.prevent="deleteSentence" class="del-btn">x</button>
    </div>

    <AddEditSentenceModal
      v-if="showModal"
      :show="showModal"
      :sentence="sentence"
      :idx="idx"
      :mode="'update'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import useCrud from "../../composables/useCRUD.js";
import AddEditSentenceModal from "./AddEditSentenceModal.vue";
import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  sentence: Object,
  idx: Number,
});

const { deleteFun, patchFun } = useCrud();
const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();

async function deleteSentence() {
  await deleteFun("sentences", props.sentence.id);
  sentenceStore.removeSentence(props.idx);

  let group = groupStore.getSGroupById(props.sentence.sgId);
  group.numOfItems = group.numOfItems - 1;
  await updateNumOfSentences(props.sentence.sgId, group.numOfItems);
}

async function updateFav() {
  props.sentence.favorite = !props.sentence.favorite;
  await patchFun(
    "sentences/" + props.sentence.id + "/favorite/" + props.sentence.favorite
  );
}

async function updateNumOfSentences(sgId, numOfItems) {
  await patchFun("groups/" + sgId + "/num/" + numOfItems);
}

const showModal = ref(false);
</script>

<style scoped>
.sentence {
  margin: 4px;
  padding: 3px;
  border: 1px solid blue;
  display: flex;
  /* flex-wrap: wrap; */
}
</style>