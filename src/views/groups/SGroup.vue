<template>
  <div class="sgroups">
    <GroupsHeader :gType="'SGROUP'" />

    <div v-if="groupStore.sgroups.length" class="groups">
      <div v-for="(group, index) in groupStore.sgroups" :key="group.id">
        <Group :group="group" :idx="index" />
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import GroupsHeader from "./GroupsHeader.vue";
import Group from "./Group.vue";
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
  groupStore.getSGroupsForDictionary(props.dicId);
});
</script>

<style scoped>
.sgroups {
  border: 1px solid darkgray;
  /* padding: 10px; */
}

.groups {
  padding: 4px;
  overflow-y: auto;
  max-height: 480px;
}

::-webkit-scrollbar-thumb {
  background: v-bind("groupStore.getSgColor()");
}

@media only screen and (max-width: 700px) {
  .groups {
    max-height: 100%;
  }
}
</style>