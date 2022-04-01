<template>
  <div class="sgroups">
    <input type="text" v-model="searchInput" placeholder="search" />

    <button
      @click.prevent="showModal = true"
      class="new-btn"
      style="width: 100%"
    >
      new group
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

const props = defineProps({
  dicId: String,
  gType: String,
});

const { readFun } = useCrud();
const groupStore = useGroupStore();

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
  border: 1px solid red;
  padding: 10px;
}

.groups {
  overflow-y: auto;
  /* max-height: 320px; */
}
</style>