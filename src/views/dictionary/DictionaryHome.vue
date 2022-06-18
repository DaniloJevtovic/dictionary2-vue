<template>
  <div class="home">
    <div class="navbar">
      <DictionaryNavbar />
    </div>

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

.navbar {
  display: none; /**samo kad je sirina manja od 700px */
}

.container {
  height: 100%;
}

@media only screen and (max-width: 700px) {
  .navbar {
    display: block;
  }
}
</style>