<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStreamStore } from '@/stores/streamStore'
import VideoComponent from './VideoComponent.vue'
const store = useStreamStore()
const { call, remoteParticipant } = storeToRefs(store)

const callId = ref('')

const showRemoteVideo = computed(() => {
  return call.value && remoteParticipant.value
})

function watchStream() {
  if (callId.value) {
    store.watchStream(callId.value)
  }
}
</script>

<template>
  <section class="content-section" v-if="showRemoteVideo">
    <VideoComponent :call="call" :participant="remoteParticipant" />
    <div class="button-row">
      <button @click="store.leaveStream">Leave</button>
    </div>
  </section>
  <section class="input-form content-section" v-else>
    <input type="text" v-model="callId" placeholder="Enter stream id to join" />
    <button @click="watchStream">Watch Stream</button>
  </section>
</template>
