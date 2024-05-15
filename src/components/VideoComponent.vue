<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { Call, StreamVideoParticipant } from '@stream-io/video-client'

const props = defineProps<{
  call: Call | undefined
  participant: StreamVideoParticipant | undefined
}>()

const videoElement = ref<HTMLVideoElement | null>(null)
const audioElement = ref<HTMLAudioElement | null>(null)
const unbindVideoElement = ref<() => void>(() => {})
const unbindAudioElement = ref<() => void>(() => {})

var sessionId = computed(() => {
  return props.participant?.sessionId || 'sessionId'
})

var videoId = computed(() => {
  return 'video-' + props.participant?.sessionId
})

onMounted(() => {
  if (videoElement.value) {
    const unbindVideo = props.call?.bindVideoElement(
      videoElement.value,
      props.participant?.sessionId || 'sessionId',
      'videoTrack'
    )
    if (unbindVideo) {
      unbindVideoElement.value = unbindVideo
    }
  }
  if (audioElement.value) {
    const unbindAudio = props.call?.bindAudioElement(
      audioElement.value,
      props.participant?.sessionId || 'sessionId'
    )

    if (unbindAudio) {
      unbindAudioElement.value = unbindAudio
    }
  }
})

onUnmounted(() => {
  unbindVideoElement.value()
  unbindAudioElement.value()
})
</script>
<template>
  <video
    ref="videoElement"
    v-bind:id="videoId"
    v-bind:sessionId="sessionId"
    width="400"
    height="300"
    autoplay
  ></video>
  <audio ref="audioElement"></audio>
</template>

<style scoped>
video {
  object-fit: contain;
}
</style>
