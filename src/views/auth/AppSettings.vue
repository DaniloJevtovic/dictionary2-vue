<template>
  <form>
    <h4 style="margin: 0px; background: cyan; color: darkslateblue">
      App settings
    </h4>

    <p>dictionary direction -> yourt languate -> foreign language</p>

    <div class="settings">
      <h4 style="margin: 0px">Word settings</h4>
      <div class="radio-settings">
        <div>
          <input
            type="radio"
            @select="settingsStore.wgroupDirection = 'left'"
            v-model="settingsStore.wgroupDirection"
            id="w-g"
            name="w-g"
            value="left"
          />
          <label for="w-g">words -> groups</label><br />
        </div>
        <div>
          <input
            type="radio"
            @select="settingsStore.wgroupDirection = 'right'"
            v-model="settingsStore.wgroupDirection"
            id="g-w"
            name="g-w"
            value="right"
          />
          <label for="g-w">groups -> words</label><br />
        </div>
      </div>
    </div>

    <div class="settings">
      <h4 style="margin: 0px">Sentence settings</h4>
      <div class="radio-settings">
        <div>
          <input
            type="radio"
            @select="settingsStore.sgroupDirection = 'left'"
            v-model="settingsStore.sgroupDirection"
            id="s-g"
            name="s-g"
            value="left"
          />
          <label for="s-g">sentences -> groups</label><br />
        </div>
        <div>
          <input
            type="radio"
            @select="settingsStore.sgroupDirection = 'right'"
            v-model="settingsStore.sgroupDirection"
            id="g-s"
            name="g-s"
            value="right"
          />
          <label for="g-s">groups -> sentences</label><br />
        </div>
      </div>
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
.settings {
  border: 1px solid darkgray;
  margin-top: 3px;
}

.radio-settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>