<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_de_Crisp.svg/1280px-Logo_de_Crisp.svg.png"
             alt="Your Company"/>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="signupUI">
        <input type="hidden" name="remember" value="true"/>
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input id="username" name="username" type="text" v-model="username"
                   class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Username" required/>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" v-model="password"
                   class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Password" required/>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
            </span>
            Sign up
          </button>
        </div>
      </form>
      <div v-if="error" class="text-red-500"> {{ error }} </div>
    </div>
  </div>
</template>

<script setup>
import {LockClosedIcon} from '@heroicons/vue/20/solid'
import {ref} from 'vue';
import {useAuthStore} from "../store/useAuthStore.js";
import {useRouter} from "vue-router";


const username = ref('');
const password = ref('');
const error = ref('');
const {signup} = useAuthStore()
const router = useRouter()

const signupUI = async () => {
  try {
    await signup(username.value, password.value)
    await router.push("/chatRoom")
  } catch (e) {
    if (e.response?.data?.message) error.value = e.response.data.message
    else error.value = e
  }
}
</script>
