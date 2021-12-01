<template>
  <div>
    <div class="block">
      <h2>Simple key</h2>
      <pre v-html="`$pt('menu')`" />
      <p v-html="$pt('menu')" />
    </div>

    <div class="block">
      <h2>Key in group</h2>
      <pre v-html="`$pt('slider.previous')`" />
      <p v-html="$pt('slider.previous')" />
    </div>

    <div class="block">
      <h2>Unknown key</h2>
      <pre v-html="`$pt('slider.unknown')`" />
      <p v-html="$pt('slider.unknown')" />
    </div>

    <div class="block">
      <h2>Unknown key with default</h2>
      <pre v-html="`$pt('slider.unknown', { defaultText: 'replace' })`" />
      <p v-html="$pt('slider.unknown', { defaultText: 'replace' })" />
    </div>

    <div class="block">
      <h2>Key with variables</h2>
      <pre v-html="`$pt('slider.items', { variables: { number: 4, color: 'red' } })`" />
      <p v-html="$pt('slider.items', { variables: { number: 4, color: 'red' } })" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css">

p {
  margin: 0;
}

.block {
  margin-top: 45px;
}

pre {
  padding: 10px;
  background-color: #000;
  color: white;
}
</style>
