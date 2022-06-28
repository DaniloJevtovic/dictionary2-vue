import { defineStore } from "pinia";
import useCRUD from "../composables/useCRUD.js";
import useAUTH from "../composables/useAUTH.js";
import { useDictionaryStore } from "./dictionaries.js";

const { readFun, createFun, deleteFun } = useCRUD();
const { parseToken, auth } = useAUTH();

export const useUserStore = defineStore("users", {
  state: () => {
    return { user: "" };
  },

  actions: {
    logout() {
      const dicStore = useDictionaryStore();

      this.user = "";
      localStorage.removeItem("token");
      localStorage.clear();
      dicStore.dictionaries = [];
    },

    // iz tokena iscitaj email - i na osnovu email-a dohvati korisnika

    async getUserByEmail() {
      let userEmail = parseToken();

      console.log("email:", userEmail.sub);

      let res = await readFun("users/email/" + userEmail.sub);

      console.log("user", res);
      this.user = res.data;

      //localStorage.setItem("userId", JSON.stringify(res.data.id));
    },

    async updateUser(user) {},
  },
  persist: true,
});
