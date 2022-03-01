<template>
  <Navbar />

  <router-view :key="$route.path" />
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<style>
</style>