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

          <select class="sgs" v-model="updateSentence.sgId" required>
            <option value="all" disabled>odaberi</option>
            <option
              v-for="group in groupStore.sgroups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
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

//pinia - recenice
import { useSentencesStore } from "../../stores/sentences.js";
const sentenceStore = useSentencesStore();

import { useGroupStore } from "../../stores/groups.js";
const groupStore = useGroupStore();

const { createFun } = useCrud();

const props = defineProps({
  sentence: Object,
  show: Boolean,
  mode: String,
  idx: Number,
});

const emit = defineEmits(["close", "changeGroup"]);

const updateSentence = reactive({ ...props.sentence });

async function save() {
  let res = await createFun("sentences", updateSentence);

  if (props.mode === "new") {
    sentenceStore.addSentence(res.data);
  } else {
    sentenceStore.updateSentence(res.data, props.idx);
  }

  // ako je bilo promjene grupe u odnosu na slektovanu grupu
  if (props.sentence.sgId !== res.data.sgId) {
    emit("changeGroup", res.data.sgId);
  }

  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped>
.modal-container {
  width: 500px;
}
</style>