<template>
  <div>
    <h1>Signin</h1>
    <form @submit.prevent="signinUI">
      <label>
        Username:
        <input type="text" v-model="username" required>
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required>
      </label>
      <button type="submit">Signin</button>
    </form>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="success" style="color: green;">{{ success }}</div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useAuthStore} from "../store/useAuthStore.js";
import {useRouter} from "vue-router";

export default {
  name: 'Signin',
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const success = ref('');
    const { signin } = useAuthStore()
    const router = useRouter()

    const signinUI = async() => {
      try {
        await signin(username.value, password.value)
        await router.push("/chatRoom")
      } catch (e) {
        if (e.response?.data?.message) error.value = e.response.data.message
        else error.value = e
      }
    }

    return {
      username,
      password,
      error,
      success,
      signinUI
    };
  },
};
</script>
