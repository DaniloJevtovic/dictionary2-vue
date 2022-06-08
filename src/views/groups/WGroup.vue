<template>
  <div class="wgroups">
    <!-- <input type="text" v-model="searchInput" placeholder="search wgroup" /> -->

    <div class="wg-header">
      <h4 style="margin: 2px">word groups</h4>

      <button
        @click.prevent="showModal = true"
        class="new-group"
        :style="{ background: dictionaryStore.dictionary.color }"
      >
        + new group
      </button>
    </div>

    <div class="groups">
      <div v-for="(group, index) in groupStore.wgroups" :key="group.id">
        <Group :group="group" :idx="index" />
      </div>
    </div>

    <!-- <div class="groups">
      <div v-for="(group, index) in searchedWgs" :key="group.id">
        <Group :group="group" :idx="index" />
      </div>
    </div> -->

    <AddEditGroupModal
      v-if="showModal"
      :show="showModal"
      :group="newGroup"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";

import Group from "./Group.vue";
import AddEditGroupModal from "./AddEditGroupModal.vue";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dicId: String,
  gType: String,
});

const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

const searchedWgs = ref([]);

onMounted(() => {
  if (dictionaryStore.dictionary.id !== props.dicId) {
    //getWgroups(); // dobavljanje za bekenda
    searchedWgs.value = groupStore.getWGroupsForDictionary(props.dicId);
  }

  searchedWgs.value = groupStore.wgroups;
});

const searchInput = ref("");

watch(searchInput, () => {
  console.log(searchInput.value);

  if (searchInput.value !== "") {
    // searchedWgs.value = groupStore.wgroups.filter((wg) =>
    //   wg.name.includes(searchInput.value)
    // );

    searchedWgs.value = JSON.parse(JSON.stringify(groupStore.wgroups)).filter(
      (wg) => wg.name.includes(searchInput.value)
    );
  } else {
    searchedWgs.value = [...groupStore.wgroups];
  }
});

const newGroup = reactive({
  name: "",
  description: "",
  dicId: props.dicId,
  color: "#ffffff",
  numOfItems: 0,
  type: "WGROUP",
});

const showModal = ref(false);
</script>

<style scoped>
.wgroups {
  border: 1px solid darkgray;
  padding: 8px;
}

.wg-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 10px;
}

.groups {
  overflow-y: auto;
  max-height: 390px;
}

@media only screen and (max-width: 700px) {
  .wg-header {
    display: block;
  }

  .new-group {
    width: 100%;
  }

  .groups {
    max-height: 100%;
  }
}
</style>