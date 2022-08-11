<template>
  <div />
</template>

<script>
export default {
  data () {
    return {
      title: 'title',
      subtitle: 'subtitle'
    }
  },
  mounted () {
    console.log(this.$pickProps(this, 'Test'))
    console.log(this.$pickProps(this, 'Test2'))
  }
}
</script>

<style>
</style>
