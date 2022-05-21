<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ mode }} word</h3>
        </div>

        <div class="modal-body">
          <input
            type="text"
            v-model="updateWord.word"
            placeholder="word"
            required
          />
          <input
            type="text"
            v-model="updateWord.translate"
            placeholder="translate"
          />

          <textarea
            v-model="updateWord.description"
            placeholder="description"
            rows="5"
          ></textarea>

          <!-- grupa rjeci -->
          <select
            class="wgs"
            v-model="updateWord.wgId"
            :style="{
              background:
                updateWord.wgId != 'all'
                  ? groupStore.getWGroupById(updateWord.wgId).color
                  : 'white',
            }"
            required
          >
            <option value="all" disabled>odaberi grupu</option>
            <option
              v-for="group in groupStore.wgroups"
              :key="group.id"
              :value="group.id"
              :style="{ background: group.color }"
            >
              group: {{ group.name }} -- [{{ group.numOfItems }}]
            </option>
            <option value="create">kreiraj novu grupu</option>
          </select>

          <!-- tip rjeci -->
          <select class="type" name="type" v-model="updateWord.type" required>
            <option
              v-for="type in typeStore.types"
              :key="type.name"
              :value="type.name"
              :style="{ background: type.color }"
            >
              type: {{ type.name }}
            </option>
          </select>

          <br />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click="save" class="save-btn">save</button>
            <button @click.prevent="closeModal" class="cancel-btn">
              cancel
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordTypeStore } from "../../stores/wordtypes.js";

const props = defineProps({
  word: Object,
  idx: Number,
  show: Boolean,
  mode: String,
});

const emit = defineEmits(["close"]);

const { createFun, readFun, patchFun } = useCrud();
const wordStore = useWordStore();
const groupStore = useGroupStore();
const typeStore = useWordTypeStore();

const updateWord = reactive({ ...props.word });

async function save() {
  if (props.mode === "new") {
    wordStore.saveWord(updateWord);

    let group = groupStore.getWGroupById(updateWord.wgId);
    group.numOfItems = group.numOfItems + 1;
    await updateNumOfWords(updateWord.wgId, group.numOfItems);
  } else {
    wordStore.editWord(updateWord, props.idx);

    //provjeri ako se ne poklapaju grupe - u jednoj oduzimas u drugoj dodaje
    if (props.word.wgId !== updateWord.wgId) {
      let oldGroup = groupStore.getWGroupById(props.word.wgId);
      oldGroup.numOfItems = oldGroup.numOfItems - 1;

      let newGroup = groupStore.getWGroupById(updateWord.wgId);
      newGroup.numOfItems = newGroup.numOfItems + 1;

      await updateNumOfWords(props.word.wgId, oldGroup.numOfItems);
      await updateNumOfWords(updateWord.wgId, newGroup.numOfItems);
    }
  }

  // provjera da li je bilo promjene grupe u odnosnu na selektovanu
  // ako jeste - dobavi rjeci za tu grupu
  // osim za sve rjeci iz rjecnika - za njih ne mjenjaj grupu
  if (
    updateWord.wgId !== groupStore.activeWgId &&
    groupStore.activeWgId !== "all"
  ) {
    groupStore.activeWgId = updateWord.wgId;
    wordStore.getWords("WG", updateWord.wgId);
  }

  closeModal();
}

function closeModal() {
  emit("close");
}

async function updateNumOfWords(wgId, numOfItems) {
  await patchFun("groups/" + wgId + "/num/" + numOfItems);
}
</script>

<style scoped>
/* .type {
  color: springgreen;
  background: rgb(19, 51, 20);
} */
</style>