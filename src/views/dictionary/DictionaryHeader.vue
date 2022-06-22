<template>
  <div class="dic-header">
    <!-- dugme za temu -->
    <button
      @click.prevent="settingsStore.dark = !settingsStore.dark"
      class="theme-btn"
    >
      <span v-if="settingsStore.dark">&#9789;</span>
      <span v-else>&#x263C;</span>
    </button>

    <!-- naziv rjecnika -->
    <h4 @click="showModal = true" class="dic-name">
      {{ dictionaryStore.dictionary.name }}
    </h4>

    <!-- tabovi - dugmici -->
    <TabButtons :tabs="tabs" />

    <!-- dugme za brisanje -->
    <button @click.prevent="showConfirmDialog = true" class="del-dic-btn">
      &#x2715;
    </button>

    <ConfirmDialog
      v-if="showConfirmDialog"
      @answer="deleteDic"
      :title="'Delete Dictionary'"
      :dlgType="'del-type'"
      :message="'Da li ste sigurni da zelite obrisati rjecnik? Brisanjem rjecnika brise se sve iz njega!'"
    />

    <AddEditDictionaryModal
      v-if="showModal"
      :show="showModal"
      :dictionary="dictionaryStore.dictionary"
      :mode="'update'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useSettingsStore } from "../../stores/settings.js";
import { useToastStore } from "../../stores/toast.js";
import { useRouter } from "vue-router";

import TabButtons from "./tabs/TabButtons.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";

const props = defineProps({
  tabs: [Object],
});

const router = useRouter();

const dictionaryStore = useDictionaryStore();
const settingsStore = useSettingsStore();
const toastStore = useToastStore();

const showModal = ref(false);
const showConfirmDialog = ref(false);

async function deleteDic(answer) {
  if (answer === "yes") {
    dictionaryStore.deleteDic();
    router.push({ name: "AllDictionaries" });
    toastStore.showToast("rjecnik obrisan", "warningss");
  }

  showConfirmDialog.value = false;
}
</script>

<style scoped>
.dic-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: v-bind("dictionaryStore.dictionary.color");
}

.theme-btn {
  background: transparent;
}

.del-dic-btn {
  background: red;
}

.dic-name {
  margin: 0px;
  width: 100%;
  text-align: left;
  margin-left: 20px;
}

@media only screen and (max-width: 700px) {
  .dic-name {
    text-align: center;
  }
}
</style>