<template>
  <div>
    <Nuxt />

    <Rgpd :services="services" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      services: [{
        name: 'Google Analytics'
      }]
    }
  }
}
</script>

<style>
</style>
