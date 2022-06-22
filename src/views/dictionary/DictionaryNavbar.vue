<template>
  <div class="navbar">
    <router-link :to="{ name: 'User' }" active-class="active"
      >Hi, {{ userStore.user.firstName }}</router-link
    >
    |
    <!-- <button @click="showList = !showList">Dictionaries</button> -->

    <router-link :to="{ name: 'AllDictionaries' }" active-class="active">
      Dictionaries
    </router-link>
    |
    <router-link
      :to="{ name: 'Login' }"
      @click.prevent="logout, userStore.logout()"
      >Logout</router-link
    >
  </div>

  <div v-if="showList" class="menu">
    <DictionariesMenu @closeSidebar="showList = false" />
  </div>
</template>

<script setup >
import { ref } from "vue";
import DictionariesMenu from "./DictionariesMenu.vue";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useUserStore } from "../../stores/users.js";
import useAUTH from "../../composables/useAUTH.js";

const { logout } = useAUTH();
const dictionaryStore = useDictionaryStore();
const userStore = useUserStore();

const showList = ref(false);
</script>

<style>
.navbar {
  text-align: center;
  background: darkblue;
  color: cyan;
  /* display: none; */
}

.menu {
  margin: auto;
  text-align: center;
}

a {
  color: cyan;
  text-decoration: none;
}

a.active {
  color: hotpink;
}

@media only screen and (max-width: 700px) {
  .navbar {
    display: block;
  }
}
</style>