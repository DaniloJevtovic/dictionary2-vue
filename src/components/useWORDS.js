import useCRUD from "../composables/useCRUD.js";
import { useWordStore } from "../stores/words.js";
import { useDictionaryStore } from "../stores/dictionaries.js";
import { useGroupStore } from "../stores/groups.js";

const { readFun, createFun, deleteFun } = useCRUD();
const wordStore = useWordStore();
const dictionaryStore = useDictionaryStore();
const groupStore = useGroupStore();

async function getWordsForDic() {
  let res = await readFun(
    "words/dic" +
      dictionaryStore.dictionary.id +
      "/?" +
      wordStore.filter +
      "&size=" +
      wordStore.size
  );
}

const useWORDS = () => {
  return { getWordsForDic };
};

export default useWORDS;
