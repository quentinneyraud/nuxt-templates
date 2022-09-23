<template>
  <div class="SecondSlice">
    {{ documentTitle }}
  </div>
</template>

<script>
export default {
  props: {
    documentTitle: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style>

</style>
