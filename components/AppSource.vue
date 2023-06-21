<template>
  <source
    v-if="attributes['data-srcset']"
    v-bind="attributes"
  >
</template>

<script>
import { notRequiredArray, notRequiredObject, notRequiredString } from '~/modules/props-helper/scripts/nuxt-prop-types'

export default {
  props: {
    url: notRequiredString,
    srcset: notRequiredString,
    widths: notRequiredArray,
    media: notRequiredString,
    sizes: notRequiredObject
  },

  data () {
    return {
      type: 'AppSource'
    }
  },

  computed: {
    attributes () {
      const attributes = {}

      if (!this.url && !this.srcset) return attributes

      // srcset
      if (this.srcset) {
        attributes['data-srcset'] = this.srcset
      } else if (this.url) {
        if (!this.widths || this.widths.length === 0 || this.url.includes('_nuxt')) {
          attributes['data-srcset'] = this.url
        } else {
          attributes['data-srcset'] = this.widths
            ?.map(size => {
              const url = new URL(this.url)
              url.searchParams.set('w', size)
              url.searchParams.delete('h')

              // Default quality with auto=compress is 45, set it to 80
              url.searchParams.set('q', 80)

              return `${url} ${size}w`
            })
            ?.join(', ')
        }
      }

      // media
      attributes.media = this.media

      // sizes
      const sizes = this.sizes
      if (sizes && typeof sizes === 'object') {
        if (!('default' in sizes)) {
          sizes.default = 100
        }

        attributes.sizes = Object.entries(sizes)
          .sort((a, b) => b[0] - a[0])
          ?.map(([windowWidth, imageSize]) => windowWidth === 'default' ? `${imageSize}vw` : `(min-width: ${windowWidth}px) ${imageSize}vw`)
          ?.join(', ') || null
      }

      return attributes
    }
  }
}
</script>
