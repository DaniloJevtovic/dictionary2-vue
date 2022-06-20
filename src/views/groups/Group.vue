<template>
  <div>
    <div class="group" :class="isActiveGroup() ? 'active-group' : 'group'">
      <!-- broj rjeci/recenica -->
      <NumOfItems :group="group" />

      <!--grupa  -->
      <div
        @click="showModal = true"
        :style="{ background: group.color }"
        class="details"
      >
        {{ group.name }}
        <p style="margin: 0px">
          <small>{{ group.description }}</small>
        </p>
      </div>

      <button @click="showConfirmDialog = true" class="del-btn">
        &#x2715;
      </button>
    </div>

    <ConfirmDialog
      v-if="showConfirmDialog"
      @answer="deleteGroup"
      :title="'Delete Group'"
      :dlgType="'del-type'"
      :message="'Da li ste sigurni da zelite obrisati grupu? Brisanjem grupe brisu se sve rjeci/recenice iz nje!'"
    />

    <AddEditGroupModal
      v-if="showModal"
      :show="showModal"
      :group="group"
      :idx="idx"
      :mode="'update'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NumOfItems from "./NumOfItems.vue";
import AddEditGroupModal from "./AddEditGroupModal.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import { useGroupStore } from "../../stores/groups.js";
import { useWordStore } from "../../stores/words.js";
import { useSentenceStore } from "../../stores/sentences.js";
import { useToastStore } from "../../stores/toast.js";

const props = defineProps({
  group: Object,
  idx: Number,
});

const groupStore = useGroupStore();
const wordStore = useWordStore();
const sentenceStore = useSentenceStore();
const toastStore = useToastStore();

function isActiveGroup() {
  return groupStore.activeWgId === props.group.id ||
    groupStore.activeSgId === props.group.id
    ? true
    : false;
}

async function deleteGroup(answer) {
  if (answer === "yes") {
    groupStore.deleteGroup(props.group);

    // ako je u rjecima/recenicama selektovana bas ta grupa koja se brise - prebaci na sve grupe
    // vodi racuna i ako se obrise grupa a nije selektovana da moraju da se uklone rjeci iz te grupe!
    if (isActiveGroup()) {
      if (props.group.type === "WGROUP") {
        groupStore.activeWgId = "all";
        wordStore.getWords("DIC", props.group.dicId);
      } else {
        groupStore.activeSgId = "all";
        sentenceStore.getSentences("DIC", props.group.dicId);
      }
    }

    toastStore.showToast("grupa uklonjena", "warning");
  }

  showConfirmDialog.value = false;
}

const showModal = ref(false);
const showConfirmDialog = ref(false);
</script>

<style scoped>
.group {
  margin: 3px;
  padding: 4px;
  border: 1px solid transparent;
  display: flex;
}

.active-group {
  background: v-bind("props.group.color");
  border: 1px solid darkblue;
}

.group:hover {
  border: 1px solid darkblue;
}

.del-btn {
  margin: 0px 0px 0px auto;
}

@media only screen and (max-width: 700px) {
  /* .details-btn {
    display: none;
  } */
}
</style>