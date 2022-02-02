<template>
  <div class="home">
    <div
      v-for="(element, elementIndex) in elements"
      :id="element.hash"
      :key="elementIndex"
      class="element"
    >
      <NuxtLink :to="{ path: '/',hash: element.hash}">
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
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    try {
      const { elements } = await app.$api.getTestPage()

      return { elements }
    } catch (err) {
      console.log('err:', err)
    }
  },
  data () {
    return {
      elements: []
    }
  },
  mounted () {
    // console.log(this.$prismic)
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
  background-color: rgb(36, 36, 36);
}

.side:nth-child(2) {
  border-left: 1px solid white;
}

.side pre {
  padding: 25px;
  white-space: pre-wrap;
  color: white;
}
</style>
