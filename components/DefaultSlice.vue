<template>
  <div>
    <h1>Unregistered component</h1>

    <p><b>Component name:</b> {{ componentName }}</p>

    <p><b>Component props</b></p>
    <pre>
      {{ props }}
    </pre>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      required: false,
      default: null
    },
    componentName: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  font-size: 40px;
}
</style>
