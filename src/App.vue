<script setup lang="ts">
import { ref } from 'vue'
import BroadcastComponent from './components/BroadcastComponent.vue'
import ViewerComponent from './components/ViewerComponent.vue'

const tabShowing = ref<'broadcast' | 'viewer'>('broadcast')

function switchTab(tab: 'broadcast' | 'viewer') {
  tabShowing.value = tab
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="40" height="40" />
    <h1 class="green">Livestreaming</h1>
  </header>

  <main>
    <div class="tabList">
      <button
        class="tabButton"
        :class="{ activeTab: tabShowing === 'broadcast' }"
        @click="switchTab('broadcast')"
      >
        Broadcast
      </button>
      <button
        class="tabButton"
        :class="{ activeTab: tabShowing === 'viewer' }"
        @click="switchTab('viewer')"
      >
        Viewer
      </button>
    </div>
    <section v-show="tabShowing === 'broadcast'"><BroadcastComponent /></section>
    <section v-show="tabShowing === 'viewer'"><ViewerComponent /></section>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.tabList {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabButton {
  --background-color: white;
  color: var(--vue-green);
  padding: 0.5rem 2rem;
  background: var(--background-color);
  border-radius: 0;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
}

.tabButton:hover {
  border: 1px solid var(--vue-green);
}

.activeTab {
  --background-color: var(--vue-green);
  color: white;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
