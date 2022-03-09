<template>
  <div>
    <input type="text" placeholder="search" />

    <!-- grupe -->
    <select class="sgs" @change="changeSg($event)" v-model="selectedGroup">
      <option value="all">sve</option>
      <option
        v-for="group in groupStore.sgroups"
        :key="group.id"
        :value="group.id"
      >
        {{ group.name }}
      </option>
    </select>

    <button @click="showModal = true" class="new-btn">new sentence</button>

    <!-- recenice -->
    <div class="senetences">
      <div v-for="(sentence, index) in sentences" :key="sentence.id">
        <Sentence
          :sentence="sentence"
          :idx="index"
          @changeGroup="promjeniGrupu"
        />
      </div>
    </div>

    <AddEditSentenceModal
      v-if="showModal"
      :show="showModal"
      :sentence="newSentence"
      :mode="'new'"
      @changeGroup="promjeniGrupu"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Sentence from "./Sentence.vue";
import AddEditSentenceModal from "./AddEditSentenceModal.vue";
import { useSentencesStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";

const sentenceStore = useSentencesStore();
const groupStore = useGroupStore();

const props = defineProps({
  dicId: String,
});

const dicUrl = "sentences/dic/" + props.dicId; //adresa do rjecnika

const { readFun } = useCrud();
const sentences = ref([]);
const getSentences = async (url) => {
  let res = await readFun(url);
  sentenceStore.sentences = res.data.content;
  sentences.value = sentenceStore.sentences;
};

// grupe recenica za rjecnik
async function getGroups() {
  let res = await readFun("groups/dic/" + props.dicId + "/group/SGROUP");
  groupStore.sgroups = res.data;
}

onMounted(() => {
  getSentences(dicUrl);
  getGroups();
});

const selectedGroup = ref("all");
function changeSg(event) {
  let id = event.target.value;
  promjeniGrupu(id);
}

function promjeniGrupu(id) {
  if (id == "all") {
    getSentences(dicUrl);
    searchUrl.value = "sentences/dic/" + props.dicId + "/search/";
  } else {
    getSentences("sentences/sg/" + id);
    searchUrl.value = "sentences/sg/" + selectedGroup.value + "/search/";
  }
  selectedGroup.value = newSentence.sgId = id;
}

import Search from "../../components/Search.vue";
const searchUrl = ref("sentences/dic/" + props.dicId + "/search/");
function updateWords(recenice) {
  //words.value = rjeci;
  sentenceStore.sentences = recenice;
}

const showModal = ref(false);

const newSentence = reactive({
  sentence: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  sgId: selectedGroup.value,
});
</script>

<style scoped>
.senetences {
  overflow-y: auto;
  max-height: 320px;
}
</style>