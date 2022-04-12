<template>
  <div class="type-div">
    <h4 style="margin: 2px">word types</h4>
    <div class="types">
      <div v-for="(type, index) in typeStore.types" :key="type.name">
        <!-- {{ type.name }} -->

        <WordType :type="type" :idx="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWordTypeStore } from "../../stores/wordtypes.js";
import WordType from "./WordType.vue";

const typeStore = useWordTypeStore();

// const wordTypes = [
//   { name: "NOUN", color: "springgreen" },
//   { name: "PRONOUN", color: "cyan" },
//   { name: "PRONOUN", color: "purple" },
//   { name: "ADJECTIVE", color: "orange" },
//   { name: "VERB", color: "blue" },
//   { name: "ADVERB", color: "yellow" },
//   { name: "PREPOSITION", color: "hotpink" },
//   { name: "CONJUNCTION", color: "orangered" },
//   { name: "INTERJECTION", color: "skyblue" },
// ];
</script>

<style scoped>
.type-div {
  border: 1px solid darkblue;
  padding: 4px;
  margin-top: 4px;
}

.types {
  border: 1px solid orange;
  display: flex;
  flex-wrap: wrap;
}
</style>