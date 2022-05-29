<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header" :class="mode">
          <h3>{{ mode }} dictionary</h3>
        </div>

        <div class="modal-body">
          <input
            type="text"
            v-model="updateDictionary.name"
            placeholder="dictionary name"
            required
          />

          <textarea
            v-model="updateDictionary.description"
            placeholder="description"
            rows="5"
          ></textarea>

          <!-- <input type="color" v-model="updateDictionary.color" /> -->

          <div class="ccolor">
            Color
            <input type="color" v-model="updateDictionary.color" />
          </div>

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
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dictionary: Object,
  show: Boolean,
  mode: String,
  idx: Number,
});

const emit = defineEmits(["close"]);

const dictionaryStore = useDictionaryStore();

const updateDictionary = reactive({ ...props.dictionary });

async function save() {
  if (props.mode === "new") {
    dictionaryStore.saveDictionary(updateDictionary);
    //preusmjeri na taj novi rjecnik
  } else {
    dictionaryStore.editDictionary(updateDictionary);
  }

  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped>
.ccolor {
  background: v-bind("updateDictionary.color");
}
</style>