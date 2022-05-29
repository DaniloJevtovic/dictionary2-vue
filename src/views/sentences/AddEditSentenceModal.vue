<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header" :class="mode">
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

          <div class="group-select">
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
            <button @click="showModal = true" class="new-group-btn">+</button>
          </div>

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

    <AddEditGroupModal
      v-if="showModal"
      :show="showModal"
      :group="newGroup"
      :mode="'new'"
      @close="switchSg"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";
import AddEditGroupModal from "../../views/groups/AddEditGroupModal.vue";
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
  if (props.mode === "new") {
    sentenceStore.saveSentence(updateSentence);
  } else {
    sentenceStore.editSentence(updateSentence, props.idx);

    //provjeri ako se ne poklapaju grupe - u jednoj oduzimas u drugoj dodaje
    if (props.sentence.sgId !== updateSentence.sgId) {
      sentenceStore.decreaseNumOfSentencesInGroup(props.sentence.sgId);
      sentenceStore.increaseNumOfSentencesInGroup(updateSentence.sgId);
    }
  }

  if (updateSentence.sgId !== groupStore.activeSgId) {
    groupStore.activeSgId = updateSentence.sgId;
    sentenceStore.getSentences("SG", updateSentence.sgId);
  }

  closeModal();
}

const numOfGroups = ref(groupStore.sgroups.length);
function switchSg() {
  //provjera da li je dodata nova grupe ako jeste - prebaci na tu grupu
  if (groupStore.sgroups.length > numOfGroups.value) {
    console.log("vece je");
    updateSentence.sgId = groupStore.sgroups[0].id;
  }

  showModal.value = false;
}

const showModal = ref(false);

const newGroup = reactive({
  name: "",
  description: "",
  dicId: props.sentence.dicId,
  color: "#ffffff",
  numOfItems: 0,
  type: "SGROUP",
});

function closeModal() {
  emit("close");
}
</script>

<style scoped>
.modal-container {
  width: 300px;
}

.group-select {
  display: flex;
  align-content: center;
  align-items: center;
}

.new-group-btn {
  padding: 3px;
  margin-left: 3px;
  background: blue;
  color: cyan;
}
</style>