<template>
  <div>
    <div v-if="showSpinner" class="spin"></div>
    <div v-else>
      <!-- ako posle 5s ne ucita podatke ispisi poruku -->
      <h4>can't load data / no data</h4>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";

const showSpinner = ref(true);

onMounted(() => {
  setTimeout(() => {
    showSpinner.value = false;
  }, 5000);
});
</script>

<style>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: slateblue;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>