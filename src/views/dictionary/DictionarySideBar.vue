<template>
  <div class="sidebar">
    <div class="nav">
      <router-link :to="{ name: 'User' }"> Hi, Lemur </router-link> |
      <router-link :to="{ name: 'Login' }">Logout</router-link>
    </div>

    <!-- lista korisnikovih rjecnika -->
    <AllDictionaries />
  </div>
</template>

<script setup>
import AllDictionaries from "./AllDictionaries.vue";
</script>

<style scoped>
.sidebar {
  margin: 2px;
  padding: 3px;
  border: 1px solid darkgray;
}

.nav {
  border: 1px solid whitesmoke;
  color: rgb(111, 111, 180);
  color: orangered;
  margin-bottom: 3px;
}

.nav a {
  color: rgb(111, 111, 180);
  color: orangered;
}

@media only screen and (max-width: 700px) {
  .sidebar {
    display: none;
  }
}
</style>