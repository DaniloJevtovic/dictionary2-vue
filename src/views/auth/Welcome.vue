<template>
  <div>
    <h4>Welcome to dictionary app</h4>

    <div>
      <router-link :to="{ name: 'AllDictionaries' }" active-class="active">
        My dictionaries
      </router-link>
    </div>

    <div>
      <router-link :to="{ name: 'User' }">Profile & settings</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
a {
  color: darkblue;
}
</style>