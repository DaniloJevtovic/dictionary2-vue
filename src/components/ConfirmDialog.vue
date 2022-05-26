<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Dialog</h3>
        </div>

        <div class="modal-body">{{ message }}</div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click.prevent="yes" class="save-btn">yes</button>
            <button @click.prevent="no" class="cancel-btn">no</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
});

const emit = defineEmits(["answer"]);

function yes() {
  emit("answer", "yes");
}

function no() {
  emit("answer", "no");
}
</script>

<style>
</style>