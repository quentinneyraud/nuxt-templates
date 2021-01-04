<template>
  <div>
    <AppImage
      class="test"
      :src="main_image.url"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      main_image: {
        dimensions: {
          width: 4118,
          height: 3089
        },
        alt: null,
        copyright: null,
        url: 'https://images.prismic.io/jacquesrival/a9137758-207a-475a-9092-db5f94168de0_P1013385.jpg?auto=compress,format'
      }
    }
  }
}
</script>

<style scoped>
.test {
  width: 250px;
  height: 500px;
}
</style>
