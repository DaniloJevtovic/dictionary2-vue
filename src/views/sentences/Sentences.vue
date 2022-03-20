<template>
  <div>
    <div class="search-sg">
      <input type="text" placeholder="search" />

      <!-- grupe -->
      <select
        class="sgs"
        @change="changeSg($event)"
        v-model="groupStore.activeSgId"
        :style="{
          background:
            groupStore.activeSgId != 'all'
              ? groupStore.getSGroupById(groupStore.activeSgId).color
              : 'white',
        }"
      >
        <option value="all">sve recenice</option>
        <option
          v-for="group in groupStore.sgroups"
          :key="group.id"
          :value="group.id"
          :style="{ background: group.color }"
        >
          Grupa: {{ group.name }} -- [{{ group.numOfItems }}]
        </option>
      </select>
    </div>

    <button @click="showModal = true" class="new-btn">new sentence</button>

    <button @click="showGroups = !showGroups" class="new-btn">groups</button>

    <div v-if="showGroups">
      <SGroup :dicId="dicId" :gType="'SGROUP'" />
    </div>

    <!-- recenice -->
    <div class="senetences">
      <div
        v-for="(sentence, index) in sentenceStore.sentences"
        :key="sentence.id"
      >
        <Sentence :sentence="sentence" :idx="index" />
      </div>
    </div>

    <AddEditSentenceModal
      v-if="showModal"
      :show="showModal"
      :sentence="newSentence"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Sentence from "./Sentence.vue";
import SGroup from "../groups/SGroup.vue";
import AddEditSentenceModal from "./AddEditSentenceModal.vue";
import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  dicId: String,
});

const { readFun } = useCrud();
const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();

const getSentences = async (url) => {
  let res = await readFun(url);
  sentenceStore.sentences = res.data.content;
};

// grupe recenica za rjecnik
async function getGroups() {
  let res = await readFun("groups/dic/" + props.dicId + "/group/SGROUP");
  groupStore.sgroups = res.data;
}

onMounted(() => {
  getSentences("sentences/dic/" + props.dicId);
  getGroups();
});

function changeSg(event) {
  let id = event.target.value;

  if (id == "all") {
    getSentences("sentences/dic/" + props.dicId);
  } else {
    getSentences("sentences/sg/" + id);
  }

  groupStore.activeSgId = newSentence.sgId = id;
}

const showModal = ref(false);

const newSentence = reactive({
  sentence: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  sgId: "all",
});

const showGroups = ref(false);
</script>

<style scoped>
.senetences {
  overflow-y: auto;
}

.search-sg {
  display: flex;
}
</style>