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
            <option value="all" disabled>odaberi</option>
            <option
              v-for="group in groupStore.wgroups"
              :key="group.id"
              :value="group.id"
              :style="{ background: group.color }"
            >
              Grupa: {{ group.name }} -- [{{ group.numOfItems }}]
            </option>
            <option value="create">kreiraj novu grupu</option>
          </select>

          <br />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click="save">save</button>
            <button @click.prevent="closeModal">cancel</button>
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

const updateWord = reactive({ ...props.word });

async function save() {
  //let res = await createFun("words", updateWord);

  if (props.mode === "new") {
    //wordStore.addWord(res.data);
    wordStore.saveWord(updateWord);

    let group = groupStore.getWGroupById(updateWord.wgId);
    group.numOfItems = group.numOfItems + 1;
    await updateNumOfWords(updateWord.wgId, group.numOfItems);
  } else {
    // wordStore.updateWord(updateWord, props.idx);

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
  if (updateWord.wgId !== groupStore.activeWgId) {
    groupStore.activeWgId = updateWord.wgId;
    // let res = await readFun("words/wg/" + updateWord.wgId);
    // wordStore.words = res.data.content;

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
</style>