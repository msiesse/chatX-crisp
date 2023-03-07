<!--<template>-->
<!--  <div>-->
<!--    <label for="room-name">Room Name:</label>-->
<!--    <input id="room-name" v-model="roomName"/>-->
<!--    <button @click="createRoom">Create Room</button>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_de_Crisp.svg/1280px-Logo_de_Crisp.svg.png" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Join or Create a Room</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="createRoom">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="room-name" class="sr-only">Name of the Room</label>
            <input id="room-name" name="roomName" type="text" v-model="roomName" class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Name of the Room" required/>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Let's Talk !
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import {ref} from 'vue'
import {useRouter} from "vue-router"
import {storeToRefs} from "pinia";
import {useSocketStore} from "../store/useSocketStore.js";
import {useChatRoomStore} from "../store/useChatRoomStore.js";

const router = useRouter();
const {socketClient} = storeToRefs(useSocketStore())
useChatRoomStore()
const roomName = ref('')

const createRoom = () => {
  socketClient.value.emit('join-room', roomName.value)
  router.push(`/chat/${roomName.value}`);
}
</script>
