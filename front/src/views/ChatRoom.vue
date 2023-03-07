<template>
  <div>
    <h1>{{ roomName }}</h1>
    <h2>Connected Users:</h2>
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
import {useSocketStore} from "../store/useSocket.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "../store/useAuthStore.js";
import {useChatRoomStore} from "../store/useChatRoomStore.js";

export default {
  setup() {
    const route = useRoute()
    const {connect} = useSocketStore()
    const {socketClient} = storeToRefs(useSocketStore())
    connect("http://localhost:3000")
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
