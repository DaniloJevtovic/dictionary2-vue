<template>
  <div class="wg-header">
    <h4 style="margin: 0px">{{ gType }}</h4>

    <button
      @click.prevent="showModal = true"
      class="new-group"
      :style="{ background: dictionaryStore.dictionary.color }"
    >
      + new group
    </button>

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
import { ref, reactive } from "vue";
import AddEditGroupModal from "./AddEditGroupModal.vue";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  gType: String,
});

const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

const newGroup = reactive({
  name: "",
  description: "",
  dicId: dictionaryStore.dictionary.id,
  color: "#ffffff",
  numOfItems: 0,
  type: props.gType,
});

function getColor() {
  if (props.gType === "WGROUP") {
    return groupStore.getWgColor();
  } else {
    return groupStore.getSgColor();
  }
}

const showModal = ref(false);
</script>

<style scoped>
.wg-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 12px;
  border-bottom: 2px solid v-bind("getColor()");
}

.new-group:hover {
  background: springgreen;
}

@media only screen and (max-width: 700px) {
  .wg-header {
    display: block;
  }

  .new-group {
    width: 100%;
  }
}
</style>