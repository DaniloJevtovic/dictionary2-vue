<template>
  <div>
    <div class="sentences-sgs">
      <div class="sentences">
        <div class="search-sg" style="margin: 4px">
          <!-- pretraga -->
          <input type="text" placeholder="search" />

          <!-- selekcija grupe -->
          <select
            class="sgs"
            @change="changeSg($event)"
            v-model="groupStore.activeSgId"
            :style="{
              background:
                groupStore.activeSgId != 'all'
                  ? groupStore.getSGroupById(groupStore.activeSgId).color
                  : 'white',
              textAlign: 'center',
            }"
          >
            <option value="all">sve recenice</option>
            <option
              v-for="group in groupStore.sgroups"
              :key="group.id"
              :value="group.id"
              :style="{ background: group.color }"
            >
              Grupa: {{ group.name }} -- [{{ group.numOfItems }}s]
            </option>
          </select>
        </div>

        <button
          @click="(showModal = true), (newSentence.sgId = groupStore.activeSgId)"
          class="new-btn"
          style="width: 100%"
        >
          new sentence
        </button>

        <!-- recenice -->
        <div
          v-for="(sentence, index) in sentenceStore.sentences"
          :key="sentence.id"
        >
          <Sentence :sentence="sentence" :idx="index" />
        </div>
      </div>

      <div class="sgroups">
        <SGroup :dicId="dicId" :gType="'SGROUP'" />
      </div>
    </div>

    <!-- modal -->
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
.sentences {
  overflow-y: auto;
  border: 1px solid darkblue;
}

.search-sg {
  display: flex;
}

.sentences-sgs {
  display: grid;
  grid-template-columns: 60% 40%;
  column-gap: 5px;
}

@media only screen and (max-width: 600px) {
  .search-sg {
    display: block;
  }

  .sentences-sgs {
    display: block;
  }
}
</style>