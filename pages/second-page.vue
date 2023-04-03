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

const delay = ms => new Promise(resolve => {
  window.setTimeout(_ => {
    resolve()
  }, ms)
})

export default {
  mixins: [hasTransition],

  methods: {
    async preload ({ to, from }) {
      await delay(1500)
    }
  }
}
</script>

<style>
</style>
