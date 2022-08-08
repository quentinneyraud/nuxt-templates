<template>
  <div>
    <AppImage
      class="test"
      :src="image.url"
      placeholder="blur"
      fit="unset"
    >
      <AppSource
        :src="image.Mobile.url"
        media="(max-width:500px)"
      />
      <AppSource
        :src="image.url"
        :sizes="{ 768: 50 }"
      />
    </AppImage>
  </div>
</template>

<script>
export default {
  data () {
    return {
      image: {
        dimensions: {
          width: 1600,
          height: 900
        },
        alt: null,
        copyright: null,
        url: 'https://images.prismic.io/jacquesrival/94c087ad-f3e7-433a-aae5-e9f2ce3f2bc4_Second+face+5+VITET-+Hairdresser+renovation+design+interieur+architecture+%282%29.jpg?auto=compress,format&rect=0,348,6716,3778&w=1600&h=900',
        Mobile: {
          dimensions: {
            width: 375,
            height: 600
          },
          alt: null,
          copyright: null,
          url: 'https://images.prismic.io/jacquesrival/94c087ad-f3e7-433a-aae5-e9f2ce3f2bc4_Second+face+5+VITET-+Hairdresser+renovation+design+interieur+architecture+%282%29.jpg?auto=compress,format&rect=3537,0,2796,4474&w=375&h=600'
        }
      },
      image1: {
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
</style>
