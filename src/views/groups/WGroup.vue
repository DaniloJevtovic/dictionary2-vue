<template>
  <div class="wgroups">
    <!-- <input type="text" v-model="searchInput" placeholder="search wgroup" /> -->

    <GroupsHeader :gType="'WGROUP'" />

    <div v-if="groupStore.wgroups.length" class="groups">
      <div v-for="(group, index) in groupStore.wgroups" :key="group.id">
        <Group :group="group" :idx="index" />
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

import Group from "./Group.vue";
import GroupsHeader from "./GroupsHeader.vue";
import Spinner from "../../components/Spinner.vue";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dicId: String,
  gType: String,
});

const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

onMounted(() => {
  if (dictionaryStore.dictionary.id !== props.dicId) {
    groupStore.getWGroupsForDictionary(props.dicId);
  }
});
</script>

<style scoped>
.wgroups {
  border: 1px solid darkgray;
  /* border: 1px solid v-bind("groupStore.getWgColor()"); */
  /* padding: 1px; */
}

.groups {
  padding: 4px;
  overflow-y: auto;
  max-height: 390px;
}

::-webkit-scrollbar-thumb {
  background: v-bind("groupStore.getWgColor()");
}

@media only screen and (max-width: 700px) {
  .groups {
    max-height: 100%;
  }
}
</style>