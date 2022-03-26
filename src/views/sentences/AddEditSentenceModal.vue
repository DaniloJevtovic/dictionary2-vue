<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ mode }} sentence</h3>
        </div>

        <div class="modal-body">
          <input
            type="text"
            v-model="updateSentence.sentence"
            placeholder="sentence"
            required
          />

          <input
            type="text"
            v-model="updateSentence.translate"
            placeholder="translate"
          />

          <textarea
            v-model="updateSentence.description"
            placeholder="description"
            rows="5"
          ></textarea>

          <select
            class="sgs"
            v-model="updateSentence.sgId"
            :style="{
              background:
                updateSentence.sgId != 'all'
                  ? groupStore.getSGroupById(updateSentence.sgId).color
                  : 'white',
            }"
            required
          >
            <option value="all" disabled>odaberi</option>
            <option
              v-for="group in groupStore.sgroups"
              :key="group.id"
              :value="group.id"
              :style="{ background: group.color }"
            >
              Grupa: {{ group.name }} -- [{{ group.numOfItems }}]
            </option>
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
import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  sentence: Object,
  idx: Number,
  show: Boolean,
  mode: String,
});

const emit = defineEmits(["close"]);

const { createFun, readFun, patchFun } = useCrud();
const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();

const updateSentence = reactive({ ...props.sentence });

async function save() {
  let res = await createFun("sentences", updateSentence);

  if (props.mode === "new") {
    sentenceStore.addSentence(res.data);

    let group = groupStore.getSGroupById(updateSentence.sgId);
    group.numOfItems = group.numOfItems + 1;
    await updateNumOfSentences(updateSentence.sgId, group.numOfItems);
  } else {
    sentenceStore.updateSentence(updateSentence, props.idx);

    //provjeri ako se ne poklapaju grupe - u jednoj oduzimas u drugoj dodaje
    if (props.sentence.sgId !== updateSentence.sgId) {
      let oldGroup = groupStore.getSGroupById(props.sentence.sgId);
      oldGroup.numOfItems = oldGroup.numOfItems - 1;

      let newGroup = groupStore.getSGroupById(updateSentence.sgId);
      newGroup.numOfItems = newGroup.numOfItems + 1;

      await updateNumOfSentences(props.sentence.sgId, oldGroup.numOfItems);
      await updateNumOfSentences(updateSentence.sgId, newGroup.numOfItems);
    }
  }

  if (updateSentence.sgId !== groupStore.activeSgId) {
    groupStore.activeSgId = updateSentence.sgId;
    let res = await readFun("sentences/sg/" + updateSentence.sgId);
    sentenceStore.sentences = res.data.content;
  }

  closeModal();
}

function closeModal() {
  emit("close");
}

async function updateNumOfSentences(sgId, numOfItems) {
  await patchFun("groups/" + sgId + "/num/" + numOfItems);
}
</script>

<style scoped>
.modal-container {
  width: 300px;
}
</style>