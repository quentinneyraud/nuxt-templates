<template>
  <div>
    <SplitText
      ref="title"
      tag="h2"
      html="Hello world"
      type="chars"
    />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$refs.title.split()

    console.log(this.$refs.title.elements())
  }
}
</script>

<style>
</style>
