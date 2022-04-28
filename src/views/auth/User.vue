<template>
  <div>
    <form>
      <h4 style="margin: 0px; background: cyan; color: darkslateblue">
        User settings
      </h4>

      <input type="text" placeholder="full name" required />
      <input type="text" placeholder="your language" />
      <input type="email" placeholder="email" required />
      <input type="password" placeholder="password" required />
      <input type="password" placeholder="repeat password" required />
      <input type="text" placeholder="your language" />

      <button @click="saveChanges">Save changes</button>
    </form>

    <AppSettings />
  </div>
</template>

<script setup>
import AppSettings from "./AppSettings.vue";

async function saveChanges() {}
</script>

<style scoped>
</style>