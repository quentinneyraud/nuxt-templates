<template>
  <div>
    <h1 ref="title">
      First page
    </h1>

    <DogImage />

    <NuxtLink
      :to="{
        name: 'second-page'
      }"
    >
      second page
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
      return _ => new Promise(resolve => {
        console.log('Loading home...')
        window.setTimeout(_ => {
          console.log('Home loaded !')
          resolve()
        }, 1000)
      })
    }
  }
}
</script>

<style>
</style>
