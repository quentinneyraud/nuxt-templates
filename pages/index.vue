<template>
  <div />
</template>

<script>
export default {
  mounted () {
    this.$events.$on('resize', options => {
      console.log('resize', options)
    })

    this.$events.$on('resize:debounced', options => {
      console.log('resize:debounced', options)
    })

    this.$events.$on('visibility', options => {
      console.log('visibility', options)
    })

    this.$events.$on('visibility:focus', options => {
      console.log('visibility:focus', options)
    })

    this.$events.$on('visibility:blur', options => {
      console.log('visibility:blur', options)
    })

    // this.$events.$on('ticker', options => {
    //   console.log('ticker', options)
    // })
  }
}
</script>

<style>
</style>
