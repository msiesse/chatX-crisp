<template>
  <div>
    <label for="room-name">Room Name:</label>
    <input id="room-name" v-model="roomName"/>
    <button @click="createRoom">Create Room</button>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from "vue-router"
import {storeToRefs} from "pinia";
import {useSocketStore} from "../store/useSocketStore.js";
import {useChatRoomStore} from "../store/useChatRoomStore.js";

export default {
  setup() {
    const router = useRouter();
    const {socketClient} = storeToRefs(useSocketStore())
    useChatRoomStore()
    const roomName = ref('')

    const createRoom = () => {
      socketClient.value.emit('join-room', roomName.value)
      router.push(`/chat/${roomName.value}`);
    }

    return {roomName, createRoom}
  }
}
</script>
