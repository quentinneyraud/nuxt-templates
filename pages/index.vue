<template>
  <div>
    <SplitText
      tag="h1"
      html="Hello world"
      type="chars"
      auto-split
    />

    <AnimatedSplitText
      tag="h2"
      html="Hello world"
      type="chars"
      animation="title"
    />

    <AnimatedSplitText
      tag="p"
      html="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia, lectus sit amet sagittis sodales, felis velit blandit turpis, et condimentum purus turpis eu dolor. Vestibulum dapibus suscipit justo, eget pellentesque justo pulvinar tempus. Donec tristique purus a magna convallis, in blandit enim viverra. Morbi auctor tempus ullamcorper. Quisque scelerisque justo vel elit commodo varius. Aenean mattis finibus eros, eu ornare massa lobortis vitae. Cras eget diam tincidunt, volutpat tellus a, ornare est. In vel molestie turpis. Praesent tristique enim nulla, vel lacinia felis venenatis id. Aenean elementum mi in congue porttitor. Aliquam suscipit pellentesque ipsum quis sagittis."
      type="lines"
      animation="text"
    />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$viewportObserverState.active = true
  }
}
</script>

<style>
</style>
