<template>
  <div />
</template>

<script>
export default {
  data () {
    return {
      invalid: 'Hello',
      title: 'World'
    }
  },
  mounted () {
    console.log(this.$pickProps(this, 'Test'))
  }
}
</script>

<style>
</style>
