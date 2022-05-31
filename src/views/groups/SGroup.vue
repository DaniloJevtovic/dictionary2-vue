<template>
  <div class="sgroups">
    <!-- <input type="text" v-model="searchInput" placeholder="search" /> -->

    <h4 style="margin: 5px">sentence groups</h4>

    <button
      @click.prevent="showModal = true"
      class="new-btn"
      :style="{ background: dictionaryStore.dictionary.color }"
    >
      + new group
    </button>

    <div class="groups">
      <div v-for="(group, index) in groupStore.sgroups" :key="group.id">
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

async function getGroups() {
  let res = await readFun("groups/dic/" + props.dicId + "/group/SGROUP");
  groupStore.sgroups = res.data;
}

onMounted(() => {
  getGroups();
});

const searchInput = ref("");

const newGroup = reactive({
  name: "",
  description: "",
  dicId: props.dicId,
  color: "#ffffff",
  numOfItems: 0,
  type: "SGROUP",
});

const showModal = ref(false);
</script>

<style scoped>
.sgroups {
  border: 1px solid darkgray;
  padding: 10px;
}

.groups {
  overflow-y: auto;
  /* max-height: 320px; */
}
</style>