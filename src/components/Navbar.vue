<template>
  <div class="navbar">
    <router-link to="/login" active-class="active">Login</router-link> |
    <router-link to="/register" active-class="active">Register</router-link>
    <!-- | <router-link to="/dictionaries">Dictionary</router-link> -->
  </div>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  color: cyan;
  background: rgb(7, 41, 68);
  margin: 5px;
  text-align: center;
}
a {
  color: cyan;
  text-decoration: none;
}

a.active {
  color: red;
}
</style>