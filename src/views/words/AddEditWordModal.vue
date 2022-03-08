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

          <select class="wgs" v-model="updateWord.wgId" required>
            <option value="all" disabled>odaberi</option>
            <option
              v-for="group in groupStore.wgroups"
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

//pinia - grupe
import { useGroupStore } from "../../stores/groups.js";
const groupStore = useGroupStore();

const { createFun } = useCrud();

const props = defineProps({
  word: Object,
  show: Boolean,
  mode: String,
});

const emit = defineEmits(["close", "save", "update"]);

const updateWord = reactive({ ...props.word });

async function save() {
  let res = await createFun("words", updateWord);

  if (props.mode === "new") {
    emit("save", updateWord);
  } else {
    emit("update", updateWord);
  }

  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped>
</style>