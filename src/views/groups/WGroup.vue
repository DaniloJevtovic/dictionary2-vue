<template>
  <div>
    <input type="text" v-model="searchInput" placeholder="search" />

    <button @click.prevent="showModal = true" class="new-btn">new group</button>

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
import Group from "./Group.vue";
import AddEditGroupModal from "./AddEditGroupModal.vue";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  dicId: String,
  gType: String,
});

const groupStore = useGroupStore();

onMounted(() => {
  groupStore.getWGroupsForDictionary(props.dicId);
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
.groups {
  overflow-y: auto;
  max-height: 320px;
}
</style>