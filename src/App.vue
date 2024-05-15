<script setup lang="ts"></script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="40" height="40" />
    <h1 class="green">Livestreaming</h1>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main></main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
