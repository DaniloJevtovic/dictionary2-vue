<template>
  <input
    class="search-input"
    type="text"
    v-model="searchInput"
    placeholder="pretraga"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import useCrud from "../composables/useCRUD.js";

const props = defineProps({
  url: String,
});
const emit = defineEmits(["searched"]);

const searchInput = ref("");
watch(searchInput, () => {
  searchFun();
});

// nadgledanje ako se promjeni url (selektuje neka druga grupa)
// - ponovi pretragu za tu novu grupu
watch(
  () => props.url,
  () => {
    // searchInput.value = "";
    searchFun();
  }
);

const { readFun } = useCrud();
const searchFun = async () => {
  if (searchInput.value !== "") {
    console.log(searchInput.value);
    let res = await readFun(props.url + searchInput.value);
    emit("searched", res.data);
  } else {
    emit("searched", null);
  }
};
</script>

<style scoped>
</style>