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
import HasTransition from 'hasTransition'

export default {
  mixins: [HasTransition],
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
