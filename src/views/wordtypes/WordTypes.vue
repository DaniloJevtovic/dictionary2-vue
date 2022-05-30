<template>
  <div class="type-div">
    <h4 style="margin: 2px">word types</h4>
    <div class="types">
      <div v-for="(type, index) in typeStore.types" :key="type.name">
        <WordType :type="type" :idx="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWordTypeStore } from "../../stores/wordtypes.js";
import WordType from "./WordType.vue";

const typeStore = useWordTypeStore();
</script>

<style scoped>
.type-div {
  border: 1px solid darkgray;
  padding: 4px;
  margin-top: 4px;
}

.types {
  border: 1px solid whitesmoke;
  display: flex;
  flex-wrap: wrap;
}
</style>