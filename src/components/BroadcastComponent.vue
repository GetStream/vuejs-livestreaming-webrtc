<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStreamStore } from '@/stores/streamStore'
import VideoComponent from './VideoComponent.vue'
const store = useStreamStore()
const { call, localParticipant } = storeToRefs(store)

const callId = ref('')
const isBackstage = ref(true)

const isCallLive = computed(() => {
  return call.value && localParticipant.value
})

function startBroadcast() {
  if (callId.value) {
    store.createCall(callId.value)
  }
}

async function goLiveClicked() {
  if (isBackstage.value) {
    const response = await call.value?.goLive()
    isBackstage.value = response?.call.backstage ?? true
  } else {
    const response = await call.value?.stopLive()
    isBackstage.value = response?.call.backstage ?? true
  }
}

const buttonText = computed(() => {
  return isBackstage.value ? 'Go live' : 'End broadcast'
})
</script>

<template>
  <section class="content-section" v-if="isCallLive">
    <VideoComponent :call="call" :participant="localParticipant" />
    <div class="button-row">
      <button @click="goLiveClicked">{{ buttonText }}</button>
      <button @click="store.endCall()">End stream</button>
    </div>
  </section>
  <section v-if="!isCallLive" class="input-form content-section">
    <input type="text" v-model="callId" placeholder="Enter call ID" />
    <button @click="startBroadcast">Start Broadcast</button>
  </section>
</template>
<style scoped>
.button-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
}
</style>
