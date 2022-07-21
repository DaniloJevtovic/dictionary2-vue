<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" :class="mode">
        <div class="modal-header">
          <h3>{{ mode }} grammar</h3>
        </div>

        <div class="modal-body">
          <input
            type="text"
            v-model="updateGrammar.grammar"
            placeholder="grammar"
            required
          />

          <textarea
            v-model="updateGrammar.content"
            placeholder="content"
            rows="15"
          ></textarea>

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
import { useGrammarStore } from "../../stores/grammars.js";
import { useToastStore } from "../../stores/toast.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  grammar: Object,
  show: Boolean,
  mode: String,
  idx: Number,
});

const emit = defineEmits(["close"]);

const grammarStore = useGrammarStore();
const toastStore = useToastStore();
const dictionaryStore = useDictionaryStore();

const updateGrammar = reactive({ ...props.grammar });

async function save() {
  if (props.mode === "new") {
    grammarStore.saveGrammar(updateGrammar);
    // toastStore.showToast("gramatika dodata", "success");
    toastStore.showToast2("gramatika dodata", dictionaryStore.dictionary.color);
  } else {
    grammarStore.editGrammar(updateGrammar, props.idx);
    // toastStore.showToast("gramatika izmjenjena", "info");
    toastStore.showToast2("gramatika izmjenjena", dictionaryStore.dictionary.color);
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

@media only screen and (max-width: 700px) {
  .modal-container {
    width: auto;
  }
}
</style>