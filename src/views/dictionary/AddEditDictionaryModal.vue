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
import { useRouter } from "vue-router";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useToastStore } from "../../stores/toast.js";

const props = defineProps({
  dictionary: Object,
  show: Boolean,
  mode: String,
  idx: Number,
});

const emit = defineEmits(["close"]);

const dictionaryStore = useDictionaryStore();
const toastStore = useToastStore();

const router = useRouter();

const updateDictionary = reactive({ ...props.dictionary });

async function save() {
  if (props.mode === "new") {
    dictionaryStore.saveDictionary(updateDictionary);
    //toastStore.showToast("rjecnik kreiran", "success");
    toastStore.showToast2("rjecnik kreiran", updateDictionary.color);
  } else {
    dictionaryStore.editDictionary(updateDictionary);
    //toastStore.showToast("rjecnik izmjenjen", "info");
    toastStore.showToast2("rjecnik izmjenjen", updateDictionary.color);
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