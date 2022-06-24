<template>
  <form @submit.prevent="login">
    <h4>Login</h4>

    <input type="email" v-model="loginReq.email" placeholder="email" required />
    <input
      type="password"
      v-model="loginReq.password"
      placeholder="password"
      required
    />

    <div v-if="error" class="error">{{ error }}</div>

    <button>Login</button>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import useAUTH from "../../composables/useAUTH.js";
import { useUserStore } from "../../stores/users.js";
import { useRouter } from "vue-router";
import { useToastStore } from "../../stores/toast.js";

const loginReq = reactive({ email: "", password: "" });
const { auth } = useAUTH();

const userStore = useUserStore();
const router = useRouter();
const toastStore = useToastStore();

const error = ref("");

async function login() {
  console.log(loginReq);
  let res = await auth("login", loginReq);

  if (res.status !== 200) {
    console.log(res.response);
    error.value = res.response.data;
  } else {
    error.value = "";
    console.log(res);
    localStorage.setItem("token", res.data.accessToken);

    userStore.getUserByEmail();
    toastStore.showToast("Successfully logged in", "info");

    router.push({ name: "DictionaryHome" });
  }
}

watch(loginReq, () => {
  error.value = "";
});
</script>

<style scoped>
h4 {
  margin: 0px;
  background: cyan;
  color: darkblue;
}

.error {
  background: red;
}
</style>