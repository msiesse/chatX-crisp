<template>
  <div>
    <h1>{{ roomName }}</h1>
    <h2>Users:</h2>
    <ul>
      <li v-for="user in Object.values(users)" :key="user.username">{{ user.username }}</li>
    </ul>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.username }}: {{ message.content }}
      </li>
    </ul>
    <form @submit.prevent="sendMessageView">
      <input v-model="newMessage"/>
      <button>Send</button>
    </form>
  </div>
</template>


<script>
import {ref, reactive, onBeforeUnmount} from 'vue'
import {useRoute} from 'vue-router'
import {useSocketStore} from "../store/useSocketStore.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "../store/useAuthStore.js";
import {useChatRoomStore} from "../store/useChatRoomStore.js";

export default {
  setup() {
    const route = useRoute()
    const {socketClient} = storeToRefs(useSocketStore())
    const chatRoomStore = useChatRoomStore()
    const {sendMessage} = chatRoomStore
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

    return {
      roomName,
      users,
      messages,
      sendMessageView,
      newMessage
    }
  },


}
</script>
