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
import hasTransition from '../modules/transitions/mixins/hasTransition'

const delay = ms => new Promise(resolve => {
  window.setTimeout(_ => {
    resolve()
  }, ms)
})

export default {
  mixins: [hasTransition],

  methods: {
    async preload ({ to, from }) {
      console.log('Loading home')

      await delay(1500)

      console.log('Home loaded')
    }
  }
}
</script>

<style>
</style>
