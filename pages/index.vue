<template>
  <div class="home">
    <!-- Content -->
    <div class="box content">
      <span>content</span>
    </div>

    <!-- Fixed -->
    <div v-ss-fixed class="box fixed">
      <span>fixed</span>
    </div>

    <!-- Parallax -->
    <div
      v-ss-parallax="{
        ratio: 0.5
      }"
      class="box parallax"
    >
      <span>parallax</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.home {
  min-height: 800vh;
  padding-top: 150px;
}

.box {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border: 1px solid #000;
}
</style>
