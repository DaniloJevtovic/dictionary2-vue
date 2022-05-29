<template>
  <div v-if="toastStore.show">
    <div class="toast" :class="toastStore.type">
      {{ toastStore.message }}
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from "../stores/toast.js";

const toastStore = useToastStore();
</script>

<style scoped>
.toast {
  background: cyan;
  text-align: center;
  position: fixed;
  /* z-index: 9998; */
  /* top: 0; */
  bottom: 0;
  left: 0;
  width: 100%;
}

.info {
  background: cyan;
}

.indigo {
  background: indigo;
}

.success {
  background: springgreen;
}

.error {
  background: red;
}
</style>