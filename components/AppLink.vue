<template>
  <Component
    :is="getComponentTag()"
    class="AppLink"
    v-bind="getComponentAttributes()"
  >
    <slot />
  </Component>
</template>

<script>
const TYPES = ['email', 'tel', 'place']

export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    // email, tel, place
    type: {
      type: String,
      required: false,
      default: null
    },
    to: {
      type: [String, Object],
      required: false,
      default: null
    },
    forceReload: {
      type: Boolean,
      required: false,
      default: false
    },
    openInNewTab: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    getComponentTag () {
      if (this.tag) return this.tag

      if (!this.to) return 'div'

      if (typeof this.to === 'string') return 'a'

      if ('link_type' in this.to) {
        if (this.forceReload || this.openInNewTab) {
          return 'a'
        }

        return 'prismic-link'
      }

      if ('path' in this.to || 'name' in this.to) {
        if (this.forceReload) return 'a'

        return 'nuxt-link'
      }

      return 'button'
    },
    getComponentAttributes () {
      const attributes = {}

      if (this.type === 'submit') {
        attributes.type = 'submit'
      }

      if (this.tag || !this.to) return attributes

      if (typeof this.to === 'string') {
        if (TYPES.includes(this.type)) {
          if (this.type === 'email') attributes.href = `mailto:${this.to}`
          if (this.type === 'tel') attributes.href = `tel:${this.to}`
          if (this.type === 'place') attributes.href = `https://www.google.com/maps/search/?api=1&query=${encodeURI(this.to)}`

          attributes.target = '_blank'
          attributes.rel = 'noreferrer'
        } else {
          attributes.href = this.to
        }
      } else if ('link_type' in this.to) {
        if (this.forceReload || this.openInNewTab) {
          attributes.href = this.$prismic.asLink(this.to)
        } else {
          attributes.field = this.to
        }
      } else if ('path' in this.to || 'name' in this.to) {
        if (this.forceReload) {
          attributes.href = this.$router.resolve(this.to).href
        } else {
          attributes.to = this.to
        }
      } else {
        return null
      }

      attributes.title = this.title

      if (this.openInNewTab) {
        attributes.target = '_blank'
        attributes.rel = 'noreferrer'
      }

      return attributes
    }
  }
}
</script>
