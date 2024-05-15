import { ref } from 'vue'
import { defineStore } from 'pinia'
import { StreamVideoClient } from '@stream-io/video-client'
import type { Call, StreamVideoParticipant } from '@stream-io/video-client'

export const useStreamStore = defineStore('stream', () => {
  const call = ref<Call | undefined>()
  const localParticipant = ref<StreamVideoParticipant | undefined>()
  const remoteParticipant = ref<StreamVideoParticipant | undefined>()

  const apiKey = import.meta.env.VITE_APP_API_KEY
  if (apiKey === undefined) {
    throw new Error('API key is not defined')
  }
  const token = import.meta.env.VITE_APP_TOKEN
  if (token === undefined) {
    throw new Error('Token is not defined')
  }
  const streamVideoClient: StreamVideoClient = new StreamVideoClient({
    apiKey: apiKey,
    token: token,
    user: {
      id: '3435f7e7-3bb8-4bc0-833c-447d2d79fbb0',
      name: 'Supreme Leader Snoke',
      image: 'https://getstream.io/random_svg/?id=Snoke&name=Snoke'
    }
  })

  async function createCall(id: string) {
    const newCall = streamVideoClient.call('livestream', id)
    await newCall.join({ create: true })
    await newCall.camera.enable()
    await newCall.microphone.enable()

    // Subscribe to the local participant
    newCall.state.localParticipant$.subscribe((updatedLocalParticipant) => {
      localParticipant.value = updatedLocalParticipant
    })

    // Update the local call value
    call.value = newCall
  }

  async function endCall() {
    await call.value?.endCall()
    call.value = undefined
  }

  async function watchStream(id: string) {
    const newCall = streamVideoClient.call('livestream', id)
    await newCall.join()

    newCall.state.remoteParticipants$.subscribe((newRemoteParticipants) => {
      if (newRemoteParticipants && newRemoteParticipants.length > 0) {
        remoteParticipant.value = newRemoteParticipants[0]
      } else {
        remoteParticipant.value = undefined
      }
    })

    call.value = newCall
  }

  return {
    call,
    localParticipant,
    remoteParticipant,
    streamVideoClient,
    createCall,
    endCall,
    watchStream
  }
})
