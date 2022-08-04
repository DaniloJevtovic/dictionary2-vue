<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header" :class="mode">
          <h3>{{ mode }} group</h3>
        </div>

        <div class="modal-body">
          <input
            type="text"
            v-model="updateGroup.name"
            placeholder="group name"
            required
            :style="{ background: updateGroup.color }"
          />

          <textarea
            v-model="updateGroup.description"
            placeholder="description"
            rows="5"
            :style="{ background: updateGroup.color }"
          ></textarea>

          <div class="ccolor">
            Color
            <input type="color" v-model="updateGroup.color" />
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

import { useGroupStore } from "../../stores/groups.js";
import { useToastStore } from "../../stores/toast.js";

const props = defineProps({
  group: Object,
  show: Boolean,
  mode: String,
  idx: Number,
});

const emit = defineEmits(["close"]);

const groupStore = useGroupStore();
const toastStore = useToastStore();

const updateGroup = reactive({ ...props.group });

async function save() {
  if (props.mode === "new") {
    groupStore.saveGroup(updateGroup);
    // toastStore.showToast("grupa dodata", "success");
    toastStore.showToast2("grupa dodata", updateGroup.color);
  } else {
    groupStore.editGroup(updateGroup);
    // toastStore.showToast("grupa azurirana", "info");
    toastStore.showToast2("grupa azurirana", updateGroup.color);
  }

  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped>
.ccolor {
  background: v-bind("updateGroup.color");
}
</style>