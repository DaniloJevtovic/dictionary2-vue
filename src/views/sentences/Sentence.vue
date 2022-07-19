<template>
  <div>
    <div class="sentence">
      <button
        @click.prevent="updateFav"
        :class="sentence.favorite === true ? 'fav-btn' : 'unfav-btn'"
      >
        &#x2665;
      </button>

      <div @click="showModal = true" class="details">
        <span>{{ idx + 1 }}.</span> {{ sentence.sentence }} &#8594;
        {{ sentence.translate }}
        <p style="margin: 0px">
          <small> {{ sentence.description }}</small> |

          <small
            v-if="groupStore.getSGroupById(sentence.sgId)"
            :style="{
              background: groupStore.getSGroupById(sentence.sgId).color,
            }"
          >
            {{ groupStore.getSGroupById(sentence.sgId).name }}</small
          >
        </p>
      </div>

      <button @click.prevent="showConfirmDialog = true" class="del-btn">
        &#x2715;
      </button>
    </div>

    <ConfirmDialog
      v-if="showConfirmDialog"
      @answer="deleteSentence"
      :title="'Delete Sentence'"
      :dlgType="'del-type'"
      :message="'Da li ste sigurni da zelite obrisati recenicu?'"
    />

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
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";
import { useToastStore } from "../../stores/toast.js";

const props = defineProps({
  sentence: Object,
  idx: Number,
});

const { deleteFun, patchFun } = useCrud();
const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();
const toastStore = useToastStore();

async function deleteSentence(answer) {
  if (answer === "yes") {
    sentenceStore.deleteSentence(props.sentence, props.idx);
    toastStore.showToast("recenica uklonjena", "warning");
  }

  showConfirmDialog.value = false;
}

async function updateFav() {
  props.sentence.favorite = !props.sentence.favorite;
  await patchFun(
    "sentences/" + props.sentence.id + "/favorite/" + props.sentence.favorite
  );

  if (props.sentence.favorite) {
    toastStore.showToast("recenica dodata u omiljene", "fav");
    toastStore.showToast2(
      "recenica dodata u omiljene",
      groupStore.getSgColor()
    );
  } else {
    toastStore.showToast("recenica uklonjena iz omiljenih", "white");
  }
}

const showModal = ref(false);
const showConfirmDialog = ref(false);
</script>

<style scoped>
.sentence {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  margin-top: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
}

.sentence:hover {
  background: whitesmoke;
}

.fav-btn {
  color: black;
  background: v-bind("groupStore.getSgColor()");
}
</style>