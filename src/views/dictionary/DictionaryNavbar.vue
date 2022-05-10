<template>
  <div class="navbar">
    <router-link :to="{ name: 'User' }"> Hi, Lemur </router-link> |
    <!-- <button @click="showList = !showList">Rjecnici</button> -->
    <router-link :to="{ name: 'AllDictionaries' }"> Rjecnici </router-link> |
    <router-link :to="{ name: 'Login' }">Logout</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>