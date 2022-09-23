<template>
  <div class="FirstSlice">
    {{ title }}
    {{ items }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    items: {
      type: Array,
      required: false,
      default: _ => []
    }
  }
}
</script>

<style>

</style>
