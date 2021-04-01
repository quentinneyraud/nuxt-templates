<template>
  <div>
    <NuxtLink
      :to="{
        name: 'index'
      }"
    >
      home page
    </NuxtLink>
  </div>
</template>

<script>
// Mixins
import Transitions from '@/mixins/transitions'

export default {
  mixins: [Transitions],
  methods: {
    preload () {
      return new Promise(resolve => {
        console.log('loading something in second page')
        window.setTimeout(resolve, 1000)
      })
    }
  }
}
</script>

<style>
</style>
