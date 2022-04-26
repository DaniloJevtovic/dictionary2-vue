<template>
  <form>
    <h4 style="margin: 0px; background: cyan; color: darkslateblue">
      App settings
    </h4>

    <p>dictionary direction -> yourt languate -> foreign language</p>

    <div>
      <input
        type="radio"
        @select="settingsStore.wgroupDirection = 'left'"
        v-model="settingsStore.wgroupDirection"
        id="wg"
        name="wg"
        value="left"
      />
      <label for="html">words -> groups</label><br />

      <input
        type="radio"
        @select="settingsStore.wgroupDirection = 'right'"
        v-model="settingsStore.wgroupDirection"
        id="css"
        name="wg"
        value="right"
      />
      <label for="css">groups -> words</label><br />
    </div>

    <br />

    <button @click="saveChanges">Save changes</button>
  </form>
</template>

<script setup>
import { useSettingsStore } from "../../stores/settings.js";

const settingsStore = useSettingsStore();
</script>

<style scoped>
</style>