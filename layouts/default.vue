<template>
  <div>
    <Nuxt />

    <!-- Rgpd -->
    <Rgpd
      :services="[{
        id: 'analytics',
        name: 'Cookies de performance et de mesure d’audience',
        description: 'Nous recourons aux cookies de performance et de mesure d’audience pour analyser la manière dont vous utilisez le Site Internet',
        required: false,
        default: false
      }, {
        id: 'general',
        name: 'Cookies de fonctionnement',
        description: 'Nous recourons aux cookies de performance et de mesure d’audience pour analyser la manière dont vous utilisez le Site Internet',
        required: true
      }, {
        id: 'other',
        name: 'Autre',
        description: 'Nous recourons aux cookies de performance et de mesure d’audience pour analyser la manière dont vous utilisez le Site Internet',
        required: false,
        default: true
      }]"
    />
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
