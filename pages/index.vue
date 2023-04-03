<template>
  <div class="page">
    <!-- Simple in-view -->
    <div
      v-observe
      class="square square1"
    >
      <span>Default threshold (0) and offset (0)</span>
    </div>

    <!-- threshold 1 -->
    <div
      v-observe="{
        threshold: 1
      }"
      class="square"
    >
      <span>Threshold 1 and default offset (0)</span>
    </div>

    <!-- offset 100 -->
    <div
      v-observe="{
        offset: 100
      }"
      class="square"
    >
      <span>Offset 100 and default threshold (0)</span>
    </div>

    <!-- onEnter callback -->
    <div
      v-observe="{
        onEnter
      }"
      class="square"
    >
      <span>Default threshold (0) and offset (0), call onEnter() </span>
    </div>

    <!-- onEnter and onLeave callbacks -->
    <div
      v-observe="{
        once: false,
        onEnter,
        onLeave
      }"
      class="square"
    >
      <span>Default threshold (0) and offset (0), once = false, call onEnter() and onLeave() </span>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  mounted () {
    this.$viewportObserverState.active = true
  },

  methods: {
    onEnter () {
      console.log('on enter')
    },

    onLeave () {
      console.log('on leave')
    }
  }
}
</script>

<style lang="css" scoped>
.page {
  min-height: 500vh;
}

span {
  display: block;
  color: white;
  margin: 20px;
}

.square {
  width: 200px;
  height: 200px;
  background-color: black;
  border: 10px solid transparent;
  margin-top: 50vh;
}

.square.in-view {
  border: 10px solid red;
}

.square1 {
  margin-top: 100vh;
}

</style>
