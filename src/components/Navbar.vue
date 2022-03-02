<template>
  <div class="navbar">
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/dictionaries">Dictionary</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  color: cyan;
  background: rgb(7, 41, 68);
  margin: 10px;
  text-align: center;
}
a {
  color: cyan;
  text-decoration: none;
}

a:active {
  color: red;
}
</style>