<template>
  <div
    :id="componentName.toLowerCase()"
    :class="componentName"
  >
    <h1>Unregistered component</h1>

    <p>
      <b>Component name:</b><NuxtLink :to="{ hash: componentName.toLowerCase() }">
        {{ componentName }}
      </NuxtLink>
    </p>

    <p><b>Component props</b></p>
    <pre>
      {{ props }}
    </pre>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      required: false,
      default: null
    },
    componentName: {
      type: String,
      required: false,
      default: null
    }
  },
  mounted () {
    if (this.$route.hash.replace('#', '') === this.componentName.toLowerCase()) {
      this.$el.scrollIntoView()
    }
  }
}
</script>

<style lang="css" scoped>
div {
  margin-top: 30px;
}

h1 {
  font-size: 40px;
  margin-bottom: 20px;
}

p {
  font-size: 20px;
}

p + p {
  margin-top: 10px;
}

b {
  font-weight: 700;
}

pre {
  background-color: rgb(56, 56, 56);
  color: white;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  white-space: pre-wrap;
}
</style>
