<template>
  <div class="min-h-full">
    <div class="bg-gray-800 pb-32">
      <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="border-b border-gray-700">
            <div class="flex h-16 items-center justify-between px-4 sm:px-0">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-8 w-32" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_de_Crisp.svg/1280px-Logo_de_Crisp.svg.png" alt="Crisp" />
                </div>
              </div>
              <div class="-mr-2 flex md:hidden">
              </div>
            </div>
          </div>
        </div>

      </Disclosure>
      <header class="py-10">
        <div class="flex justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">{{ roomName }}</h1>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="overflow-y-scroll bg-white rounded-2xl h-[32rem] max-w-5xl mx-6 pb-12 lg:mx-auto md:mx-2 sm:mx-4">
        <div class="flex flex-col justify-end">
          <div v-for="message in messages" :key="message.id" :class="getClassRecipient(message)">{{ message.content }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessageView" class="flex items-center justify-between px-6 pt-2 mt-auto h-auto mx-auto lg:px-0 md:px-2 sm:px-4 max-w-5xl">
        <input v-model="newMessage" type="text" class="w-full border rounded-md py-2 px-3" placeholder="Type your message...">
        <button class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Send</button>
      </form>
    </main>
  </div>
</template>

<script>
import { Disclosure } from "@headlessui/vue"
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import {useSocketStore} from "../store/useSocketStore.js";
import {storeToRefs} from "pinia";
import {useChatRoomStore} from "../store/useChatRoomStore.js";
import {useAuthStore} from "../store/useAuthStore.js";

export default {
  components: {
    Disclosure
  },

  setup() {
    const route = useRoute()
    const {socketClient} = storeToRefs(useSocketStore())
    const chatRoomStore = useChatRoomStore()
    const {sendMessage} = chatRoomStore
    const {username} = useAuthStore()
    const {users, messages} = storeToRefs(chatRoomStore)
    const roomName = ref(route.params.roomName)
    const newMessage = ref('')

    socketClient.value.on('connect', () => {
      socketClient.value.emit('join-room', roomName.value)
    })

    const sendMessageView = () => {
      sendMessage(roomName.value, newMessage.value)
      newMessage.value = ''
    }

    const getClassRecipient = (message) => {
      if (message.username !== username) {
        return "p-2 my-2 mx-4 rounded-lg bg-blue-500 text-white self-start"
      }
      return "p-2 my-2 mx-4 rounded-lg bg-gray-200 text-gray-800 self-end"
    }

    return {
      roomName,
      users,
      messages,
      sendMessageView,
      newMessage,
      getClassRecipient
    }
  },


}
</script>
