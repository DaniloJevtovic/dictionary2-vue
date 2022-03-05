<template>
  <div class="home">
    <!-- lista rjecnika - sidebar -->
    <div class="left">
      <DictionariesList />
    </div>

    <div class="right">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup>
import DictionariesList from "./DictionariesList.vue";
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 4fr;
  border: 1px solid indigo;
  padding: 4px;
  min-height: 500px;
}

.left {
  border: 1px solid orange;
}

.right {
  border: 1px solid indigo;
}
</style>