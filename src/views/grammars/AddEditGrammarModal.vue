<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ mode }} grammar</h3>
        </div>

        <div class="modal-body">
          <input
            type="text"
            v-model="updateGrammar.title"
            placeholder="grammar title"
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
import { update } from "lodash";
import { reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import { useGrammarStore } from "../../stores/grammars.js";

const props = defineProps({
  grammar: Object,
  show: Boolean,
  mode: String,
  idx: Number,
});

const emit = defineEmits(["close"]);

const { createFun } = useCrud();
const grammarStore = useGrammarStore();

const updateGrammar = reactive({ ...props.grammar });

async function save() {
  if (props.mode === "new") {
    grammarStore.saveGrammar(updateGrammar);
  } else {
    grammarStore.editGrammar(updateGrammar, props.idx);
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