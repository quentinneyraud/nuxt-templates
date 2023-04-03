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
import hasTransition from '../modules/transitions/mixins/hasTransition'

export default {
  mixins: [hasTransition],

  methods: {
    preload () {
      return _ => new Promise(resolve => {
        console.log('loading something in second page')
        window.setTimeout(resolve, 1000)
      })
    }
  }
}
</script>

<style>
</style>
