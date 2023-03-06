<template>
  <div>
    <h1>{{ roomName }}</h1>
    <ul>
      <li v-for="message in state.messages" :key="message.id">
        {{ message.username }}: {{ message.content }}
      </li>
    </ul>
    <form @submit.prevent="sendMessage">
      <input v-model="state.newMessage"/>
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import {ref, reactive} from 'vue'
import {useRoute} from 'vue-router'
import {useSocketStore} from "../store/socket/useSocket.js";
import {storeToRefs} from "pinia";

export default {
  setup() {
    const route = useRoute()
    const {socketClient} = storeToRefs(useSocketStore())
    const roomName = ref(route.params.roomName)
    const state = reactive({
      messages: [],
      newMessage: '',
    })

    socketClient.value.on('connect', () => {
      console.log('Connected to server')
      socketClient.value.emit('join-room', roomName.value)
    })

    socketClient.value.on('new-message', (message) => {
      console.log("oh")
      state.messages.push(message)
    })

    const sendMessage = () => {
      console.log("ha")
      socketClient.value.emit('send-message', {
        roomName: roomName.value,
        message: {
          id: Date.now(),
          username: 'User',
          content: state.newMessage,
        },
      })
      state.newMessage = ''
    }

    return {
      roomName,
      state,
      sendMessage,
    }
  },
}
</script>