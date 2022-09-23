<template>
  <div class="home">
    <div
      v-for="(element, elementIndex) in elements"
      :id="element.hash"
      :key="elementIndex"
      class="element"
    >
      <NuxtLink :to="{ path: '/', hash: element.hash}">
        <h2>{{ element.name }}</h2>
      </NuxtLink>

      <div class="sides">
        <div class="side">
          <pre>{{ element.raw }}</pre>
        </div>
        <div class="side">
          <pre>{{ element.formatted }}</pre>
        </div>
      </div>
    </div>

    <NuxtLink :to="{ path: '/', hash: 'slices'}">
      <h2>Slices</h2>
    </NuxtLink>

    <pre id="slices">{{ slices }}</pre>

    <NuxtLink :to="{ path: '/', hash: 'slices-component'}">
      <h2>Slices component</h2>
    </NuxtLink>

    <Slices :slices="slices" />
  </div>
</template>

<script>
import Slices from '@/components/Slices.vue'

export default {
  components: {
    Slices
  },
  async asyncData ({ $config, $api, error }) {
    try {
      const { elements, slices } = await $api.getTestPage()

      return { elements, slices }
    } catch (err) {
      !$config.IS_PROD && console.error(err)
      // error({
      //   statusCode: 404,
      //   message: 'Page not found'
      // })
    }
  },
  data () {
    return {
      elements: [],
      slices: []
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.sides {
  display: flex;
}

.side {
  flex: 0 0 50%;
  overflow: auto;
}

.side:nth-child(2) {
  border-left: 1px solid white;
}

pre {
  padding: 25px;
  white-space: pre-wrap;
  color: white;
  background-color: rgb(36, 36, 36);
}
</style>
