<template>
  <div>
    <button @click="$events.$on('tick', onTick)">
      listen tick
    </button>
    <button @click="$events.$off('tick', onTick)">
      stop listen tick
    </button>
    <button @click="$events.$on('mousemove', onMouseMove)">
      listen mousemove
    </button>
    <button @click="$events.$off('mousemove', onMouseMove)">
      stop listen mousemove
    </button>
  </div>
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

    this.$events.$on('orientation', options => {
      alert(JSON.stringify(options))
    })

    this.$events.$on('orientation:portrait', options => {
      alert(JSON.stringify(options))
    })

    this.$events.$on('orientation:landscape', options => {
      alert(JSON.stringify(options))
    })
  },
  methods: {
    onTick (options) {
      console.log('tick', options)
    },
    onMouseMove (options) {
      console.log('mousemove', options)
    }
  }
}
</script>

<style>
</style>
