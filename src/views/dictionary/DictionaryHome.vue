<template>
  <div class="home">
    <DictionaryNavbar />

    <div class="container">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup>
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