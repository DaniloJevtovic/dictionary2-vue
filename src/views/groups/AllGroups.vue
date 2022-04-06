<template>
  <!-- tab za grupe rjeci i recenica -->
  <div class="de">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>

    <KeepAlive>
      <component
        :is="tabs[currentTab]"
        :dicId="dicId"
        :gType="currentTab"
        class="tab"
      >
      </component>
    </KeepAlive>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WGroup from "./WGroup.vue";
import SGroup from "./SGroup.vue";

const props = defineProps({
  dicId: String,
});

const currentTab = ref("WGroup");

const tabs = {
  WGroup,
  SGroup,
};
</script>

<style scoped>
.de {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  user-select: none;
  overflow-x: auto;
  text-align: center;
}

.tab-button {
  padding: 3px 15px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid cyan;
  cursor: pointer;
  background: white;
  margin-bottom: -1px;
  margin-right: -1px;
  /* width: 50%; */
}

.tab-button.active {
  background: rgb(0, 217, 255);
  color: white;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 300px;
}
</style>