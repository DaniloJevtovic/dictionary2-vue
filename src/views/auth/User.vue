<template>
  <div class="settings" :class="settingsStore.dark === true ? 'dark-theme' : 'white-theme'">
    <!-- <button @click="$router.go(-1)" class="back-btn">&#8592; Go Back</button> -->

    <form style="margin: 2px auto;">
      <h4 style="margin: 0px; background: cyan; color: darkslateblue">
        User settings
      </h4>

      <input
        type="text"
        v-model="updateUser.firstName"
        placeholder="first name"
        required
      />

      <input
        type="text"
        v-model="updateUser.lastName"
        placeholder="first name"
        required
      />

      <input
        type="email"
        v-model="updateUser.email"
        placeholder="email"
        disabled
        required
      />
      <input type="password" placeholder="password" required />
      <input type="password" placeholder="repeat password" required />

      <input
        type="text"
        v-model="updateUser.language"
        placeholder="your language"
      />

      <button @click.prevent="saveChanges" :disabled="disabledBtns">
        Save changes
      </button>
      <!-- &nbsp;
      <button @click.prevent="cancelChanges">Cancel</button> -->
    </form>

    <AppSettings />

    <br />
  </div>
</template>

<script setup>
import { reactive, watch, ref, computed } from "@vue/runtime-core";
import { useSettingsStore } from "../../stores/settings.js";
import { useUserStore } from "../../stores/users.js";
import AppSettings from "./AppSettings.vue";

const settingsStore = useSettingsStore();
const userStore = useUserStore();

const updateUser = ref({ ...userStore.user });
const disabledBtns = ref(true);

watch(updateUser.value, () => {
  disabledBtns.value = false;
});

async function saveChanges() {
  console.log(updateUser.value);
  disabledBtns.value = true;
}

// function cancelChanges() {
//   disabledBtns.value = true;
//   updateUser.value = { ...userStore.user };
// }
</script>

<style scoped>
.back-btn {
  margin-top: 20px;
  background: cyan;
}

.settings {
  margin-top: 0px;
  padding-top: 10px;
}
</style>