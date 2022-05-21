<template>
  <div>
    <div class="word">
      <!-- favorite button -->
      <button
        @click.prevent="updateFav"
        :class="word.favorite === true ? 'fav-btn' : 'unfav-btn'"
      >
        &#x2665;
      </button>

      <!-- RJEC -->
      <div
        @click="showModal = true"
        class="details"
        v-if="groupStore.getWGroupById(word.wgId)"
      >
        <p style="margin: 0px">
          <span>{{ idx + 1 }}.</span> {{ word.word }} -
          {{ word.translate }}
        </p>

        <p style="margin: 0px">
          <small
            :style="{
              background: wTypeStore.getTypeColor(word.type).color,
            }"
          >
            {{ word.type.toLowerCase() }}</small
          >
          |

          <small>{{ word.description }}</small> |

          <small
            v-if="groupStore.getWGroupById(word.wgId)"
            :style="{
              background: groupStore.getWGroupById(word.wgId).color,
            }"
          >
            {{ groupStore.getWGroupById(word.wgId).name }}</small
          >
        </p>
      </div>

      <!-- dugme za brisanje -->
      <button @click.prevent="deleteWord" class="del-btn">&#x2715;</button>
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
import { ref } from "vue";
import AddEditWordModal from "./AddEditWordModal.vue";
import useCrud from "../../composables/useCRUD.js";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordTypeStore } from "../../stores/wordtypes.js";

const props = defineProps({
  word: Object,
  idx: Number,
});

const { deleteFun, patchFun } = useCrud();
const wordStore = useWordStore();
const wTypeStore = useWordTypeStore();
const groupStore = useGroupStore();

async function deleteWord() {
  wordStore.deleteWord(props.word, props.idx);

  // u grupi smanji broj rjeci za 1
  let group = groupStore.getWGroupById(props.word.wgId);
  group.numOfItems = group.numOfItems - 1;
  await updateNumOfWords(props.word.wgId, group.numOfItems);
}

async function updateFav() {
  props.word.favorite = !props.word.favorite;
  await patchFun("words/" + props.word.id + "/favorite/" + props.word.favorite);
}

async function updateNumOfWords(wgId, numOfItems) {
  await patchFun("groups/" + wgId + "/num/" + numOfItems);
}

const showModal = ref(false);
</script>

<style scoped>
.word {
  border: 1px solid rgb(214, 238, 238);
  /* border-radius: 3px; */
  margin: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
  /* align-items: center; */
}

.word:hover {
  background: cyan;
  /* background: v-bind('groupStore.getWGroupById(props.word.wgId).color') */
}

.fav-word {
  background: red;
}
</style>