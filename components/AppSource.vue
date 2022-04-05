<template>
  <source v-if="attributes['data-srcset']" v-bind="attributes">
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: null
    },
    srcset: {
      type: String,
      required: false,
      default: null
    },
    widths: {
      type: Array,
      required: false,
      default: null
    },
    media: {
      type: String,
      required: false,
      default: null
    },
    sizes: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      type: 'AppSource'
    }
  },
  computed: {
    attributes () {
      const attributes = {}

      if (!this.src && !this.srcset) return attributes

      // srcset
      if (this.srcset) {
        attributes['data-srcset'] = this.srcset
      } else if (this.src) {
        if (!this.widths || this.widths.length === 0) {
          attributes['data-srcset'] = this.src
        } else {
          attributes['data-srcset'] = this.widths
            ?.map(size => {
              const url = new URL(this.src)
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
      if (this.sizes && typeof this.sizes === 'object') {
        attributes.sizes = Object.entries(this.sizes)
          ?.map(([windowWidth, imageSize]) => windowWidth === 'default' ? `${imageSize}vw` : `(min-width: ${windowWidth}px) ${imageSize}vw`)
          ?.join(', ') || null
      }

      return attributes
    }
  }
}
</script>
