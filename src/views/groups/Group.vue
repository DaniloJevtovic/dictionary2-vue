<template>
  <div>
    <div class="group">
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
      <button @click="viewItems(group)">
        {{ group.numOfItems }}
        <span v-if="group.type === 'WGROUP'"><small>words</small></span>
        <span v-else><small>sentences</small></span>
      </button>

      <button
        :disabled="group.numOfItems > 0"
        @click="deleteGroup"
        :class="[group.numOfItems > 0 ? 'disable-btn' : 'del-btn']"
      >
        x
      </button>
    </div>

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
import { ref, reactive } from "vue";
import AddEditGroupModal from "./AddEditGroupModal.vue";
import useCrud from "../../composables/useCRUD.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordStore } from "../../stores/words.js";
import { useSentencesStore } from "../../stores/sentences.js";
import { useTabStore } from "../../stores/tabs.js";

const props = defineProps({
  group: Object,
  idx: Number,
});

const { deleteFun, readFun } = useCrud();
const groupStore = useGroupStore();
const wordStore = useWordStore();
const sentenceStore = useSentencesStore();
const tabStore = useTabStore();

async function deleteGroup() {
  await deleteFun("groups", props.group.id);
  groupStore.removeGroup(props.group, props.idx);

  // ako je u rjecima/recenicama selektovana bas ta grupa koja se brise - prebaci na sve grupe
  if (
    groupStore.activeWgId === props.group.id ||
    groupStore.activeSgId === props.group.id
  ) {
    if (props.group.type === "WGROUP") {
      groupStore.activeWgId = "all";
      await getWords("words/dic/" + props.group.dicId);
    } else {
      groupStore.activeSgId = "all";
      await getSentences("sentences/dic/" + props.group.dicId);
    }
  }
}

async function viewItems(group) {
  if (group.type === "WGROUP") {
    tabStore.currentTab = "Words";
    // da ne bi ucitavao sa bekenda, ako je u tabu rjeci vec aktivna ta grupa
    if (group.id !== groupStore.activeWgId) {
      await getWords("words/wg/" + group.id);
      groupStore.activeWgId = group.id;
    }
  } else {
    tabStore.currentTab = "Sentences";

    if (group.id !== groupStore.activeSgId) {
      await getSentences("sentences/sg/" + group.id);
      groupStore.activeSgId = group.id;
    }
  }
}

async function getWords(url) {
  let res = await readFun(url);
  wordStore.words = res.data.content;
}

async function getSentences(url) {
  let res = await readFun(url);
  sentenceStore.sentences = res.data.content;
}

const showModal = ref(false);
</script>

<style scoped>
.group {
  margin: 3px 0px;
  padding: 4px;
  border: 1px solid skyblue;
  display: flex;
}
.del-btn {
  background: red;
  margin: 0px 0px 0px auto;
}
</style>