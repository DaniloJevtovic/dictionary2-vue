<template>
  <div class="home">
    <DictionaryNavbar />

    <div class="container">
      <router-view :key="$route.path" />
    </div>

    <ToastNotificaion />
  </div>
</template>

<script setup>
import ToastNotificaion from "../../components/ToastNotification.vue";
import DictionaryNavbar from "./DictionaryNavbar.vue";
</script>

<style scoped>
.home {
  padding: 5px;
}

.container {
  height: 100%;
}
</style>