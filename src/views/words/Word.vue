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
        @click.prevent="showModal = true"
        class="details"
        v-if="groupStore.getWGroupById(word.wgId)"
        draggable="true"
      >
        <!-- @mouseover="showDetails = true"
        @mouseleave="showDetails = false" -->
        <p>
          <span>{{ idx + 1 }}.</span> {{ word.word }} &#8594;
          {{ word.translate }}
        </p>

        <!-- <p v-if="showDetails"> -->
        <p>
          <small class="word-type"> {{ word.type.toLowerCase() }}</small> |
          <small>{{ word.description }}</small> |
          <small v-if="groupStore.getWGroupById(word.wgId)" class="word-wg">
            {{ groupStore.getWGroupById(word.wgId).name }}</small
          >
        </p>
      </div>

      <!-- dugme za brisanje -->
      <button @click.prevent="showConfirmDialog = true" class="del-btn">
        &#x2715;
      </button>
    </div>

    <ConfirmDialog
      v-if="showConfirmDialog"
      @answer="deleteWord"
      :title="'Delete Word'"
      :dlgType="'del-type'"
      :message="'Da li ste sigurni da zelite obrisati rjec?'"
    />

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
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import useCrud from "../../composables/useCRUD.js";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordTypeStore } from "../../stores/wordtypes.js";
import { useToastStore } from "../../stores/toast.js";

const props = defineProps({
  word: Object,
  idx: Number,
});

const { patchFun } = useCrud();
const wordStore = useWordStore();
const wTypeStore = useWordTypeStore();
const groupStore = useGroupStore();
const toastStore = useToastStore();

async function deleteWord(answer) {
  if (answer === "yes") {
    wordStore.deleteWord(props.word, props.idx);
    toastStore.showToast("rjec je obrisana", "warning");
  }

  showConfirmDialog.value = false;
}

async function updateFav() {
  props.word.favorite = !props.word.favorite;
  await patchFun("words/" + props.word.id + "/favorite/" + props.word.favorite);

  if (props.word.favorite) {
    // toastStore.showToast("rjec dodata u omiljene", "fav");
    toastStore.showToast2("rjec dodata u omiljene", groupStore.getWgColor());
  } else {
    toastStore.showToast2("rjec uklonjena iz omiljenih", "white");
  }
}

const showModal = ref(false);
const showConfirmDialog = ref(false);

// const showDetails = ref(false);
</script>

<style scoped>
.word {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  margin-top: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
  /* align-items: center; */
  cursor: pointer;
}

.word:hover {
  background: whitesmoke;
  /* background: v-bind('groupStore.getWGroupById(props.word.wgId).color') */
}

.fav-btn {
  color: black;
  background: v-bind("groupStore.getWgColor()");
}

.fav-word {
  background: red;
}

.word-type {
  background: v-bind("wTypeStore.getTypeColor(props.word.type).color");
}

.word-wg {
  background: v-bind("groupStore.getWGroupById(props.word.wgId).color");
}
</style>