<template>
  <div>
    <section
      v-for="index in 10"
      :key="index"
      v-vs-section
      :style="{
        backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
      }"
    >
      <h1>{{ index }}</h1>
    </section>
  </div>
</template>

<script>
</script>

<style>
section {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
