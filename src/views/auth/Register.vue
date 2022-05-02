<template>
  <form>
    <h4 style="margin: 0px; background: cyan; color: darkslateblue">
      Register
    </h4>

    <input type="text" placeholder="full name" required />
    <input type="text" placeholder="your language" />
    <input type="email" placeholder="email" required />
    <input type="password" placeholder="password" required />
    <input type="password" placeholder="repeat password" required />
    <input type="text" placeholder="your language" />

    <button>Register</button>
  </form>
</template>

<script setup>
</script>

<style scoped>
.register-form {
  width: 50%;
  margin: auto;
}
</style>