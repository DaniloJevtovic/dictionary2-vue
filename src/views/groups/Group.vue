<template>
  <div>
    <div
      class="group"
      :class="
        groupStore.activeWgId === group.id || groupStore.activeSgId === group.id
          ? 'active-group'
          : 'group'
      "
    >
      <!-- broj rjeci/recenica -->
      <button
        class="details-btn"
        :class="
          groupStore.activeWgId === group.id ||
          groupStore.activeSgId === group.id
            ? 'details-btn-active'
            : 'details-btn'
        "
        @click="viewItems(group)"
      >
        {{ group.numOfItems }}
        <span v-if="group.type === 'WGROUP'"><small>words</small></span>
        <span v-else><small>sentences</small></span>
      </button>

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
import { ref, reactive } from "vue";
import AddEditGroupModal from "./AddEditGroupModal.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import useCrud from "../../composables/useCRUD.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordStore } from "../../stores/words.js";
import { useSentenceStore } from "../../stores/sentences.js";
import { useTabStore } from "../../stores/tabs.js";
import { useToastStore } from "../../stores/toast.js";

const props = defineProps({
  group: Object,
  idx: Number,
});

const { deleteFun, readFun } = useCrud();
const groupStore = useGroupStore();
const wordStore = useWordStore();
const sentenceStore = useSentenceStore();
const tabStore = useTabStore();
const toastStore = useToastStore();

async function deleteGroup(answer) {
  if (answer === "yes") {
    groupStore.deleteGroup(props.group, props.idx);

    // ako je u rjecima/recenicama selektovana bas ta grupa koja se brise - prebaci na sve grupe
    // vodi racuna i ako se obrise grupa a nije selektovana da moraju da se uklone rjeci iz te grupe!
    if (
      groupStore.activeWgId === props.group.id ||
      groupStore.activeSgId === props.group.id
    ) {
      if (props.group.type === "WGROUP") {
        groupStore.activeWgId = "all";
        wordStore.getWords("DIC", props.group.dicId);
      } else {
        groupStore.activeSgId = "all";
        await getSentences("sentences/dic/" + props.group.dicId);
      }
    }

    toastStore.showToast("grupa uklonjena", "warning");
  }

  showConfirmDialog.value = false;
}

async function viewItems(group) {
  if (group.type === "WGROUP") {
    tabStore.currentTab = "Words";
    // da ne bi ucitavao sa bekenda, ako je u tabu rjeci vec aktivna ta grupa
    if (group.id !== groupStore.activeWgId) {
      // await getWords("words/wg/" + group.id);
      groupStore.activeWgId = group.id;
      // wordStore.currentPage = 0;
      wordStore.getWords("WG", group.id);
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

  wordStore.totalPages = res.data.totalPages;
}

async function getSentences(url) {
  let res = await readFun(url);
  sentenceStore.sentences = res.data.content;
}

const showModal = ref(false);
const showConfirmDialog = ref(false);
</script>

<style scoped>
.group {
  margin: 3px 0px;
  padding: 4px;
  border: 1px solid whitesmoke;
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
  background: red;
  margin: 0px 0px 0px auto;
}

.details-btn {
  padding: 2px;
  color: springgreen;
  background: rgb(19, 51, 20);

  color: hotpink;
  background: rgb(34, 11, 61);
  border-radius: 0px;
}

.details-btn-active {
  color: yellow;
}

.details-btn:hover {
  background: rgb(10, 31, 16);
  background: rgb(34, 11, 61);

  color: yellow;
}

@media only screen and (max-width: 700px) {
  /* .details-btn {
    display: none;
  } */
}
</style>