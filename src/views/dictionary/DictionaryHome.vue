<template>
  <div class="home">
    <div class="navbar">
      <DictionaryNavbar />
    </div>

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

.navbar {
  display: none;
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