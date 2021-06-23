<template>
  <div class="home">
    <div class="side">
      <h1 class="side-title">
        Raw
      </h1>
      <pre>{{ doc.raw }}</pre>
    </div>
    <div class="side">
      <h1 class="side-title">
        Formatted
      </h1>
      <pre>{{ doc.formatted }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    try {
      const doc = await app.$api.testPage()

      return { doc }
    } catch (err) {
      console.log('err:', err)
    }
  },
  data () {
    return {
      doc: null
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

.home {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

.side {
  flex: 0 0 50%;
  overflow: auto;
}
</style>
