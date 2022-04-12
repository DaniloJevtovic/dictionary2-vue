<template>
  <div class="type">{{ type.name.toLowerCase() }}</div>
</template>

<script setup>
const props = defineProps({
  type: Object,
  idx: Number,
});
</script>

<style scoped>
.type {
  margin: 3px;
  /* border: 1px solid darkblue; */
  background: v-bind("props.type.color");
  padding: 2px;
  display: block;
  /* border: 2px solid v-bind("props.type.color"); */
  border-radius: 2px;

}
</style>