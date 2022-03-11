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
  show: Boolean,
  mode: String,
});

const emit = defineEmits(["close", "changeGroup"]);

const wordStore = useWordStore();
const groupStore = useGroupStore();

const { createFun } = useCrud();
const updateWord = reactive({ ...props.word });

async function save() {
  let res = await createFun("words", updateWord);

  if (props.mode === "new") {
    wordStore.addWord(res.data);
    // ako je bilo dodavanje nove recenice - update broja recenica u grupi
    groupStore.updateNumOfItems(res.data.wgId, "increase", "WGROUP");
  } else {
    wordStore.updateWord(res.data, props.idx);
  }

  // ako je bilo promjene grupe u odnosu na slektovanu grupu
  if (props.word.wgId !== res.data.wgId) {
    //update grupe - u jednoj grupi smanjujes br. recenica a drugoj povecavas
    emit("changeGroup", res.data.wgId);
    groupStore.updateNumOfItems(props.word.wgId, "decrease", "WGROUP");
    groupStore.updateNumOfItems(res.data.wgId, "increase", "WGROUP");
  }

  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped>
</style>