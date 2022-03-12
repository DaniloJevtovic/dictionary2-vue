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
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  word: Object,
  idx: Number,
  show: Boolean,
  mode: String,
});

const emit = defineEmits(["close"]);

const wordStore = useWordStore();
const groupStore = useGroupStore();

const updateWord = reactive({ ...props.word });

async function save() {
  if (props.mode === "new") {
    await wordStore.addWord(updateWord);
  } else {
    await wordStore.updateWord(updateWord, props.idx);
  }

  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped>
</style>