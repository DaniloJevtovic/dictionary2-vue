<template>
  <div class="wgroups">
    <input type="text" v-model="searchInput" placeholder="search wgroup" />

    <button
      @click.prevent="showModal = true"
      class="new-btn"
      style="width: 100%"
    >
      new group
    </button>

    <div class="groups">
      <div v-for="(group, index) in groupStore.wgroups" :key="group.id">
        <Group :group="group" :idx="index" />
      </div>
    </div>

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
import { onMounted, reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Group from "./Group.vue";
import AddEditGroupModal from "./AddEditGroupModal.vue";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dicId: String,
  gType: String,
});

const { readFun } = useCrud();
const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

async function getWgroups() {
  let res = await readFun("groups/dic/" + props.dicId + "/group/WGROUP");
  groupStore.wgroups = res.data;
}

onMounted(() => {
  if (dictionaryStore.dictionary.id !== props.dicId) {
    getWgroups();
  }
});

const searchInput = ref("");

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
  border: 1px solid red;
  padding: 10px;
}

.groups {
  overflow-y: auto;
  /* max-height: 320px; */
}
</style>