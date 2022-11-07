<template>
  <div
    class="AppImage"
    :class="[{
               loading,
               loaded,
               error,
               lazyload,
               'has-not-src': !url,
               'has-ratio': !!ratio
             },
             `fit-${fit}`
    ]"
    :style="{
      '--ratio': `${ratio * 100}%`
    }"
  >
    <!-- Placeholder -->
    <div
      v-if="placeholder"
      class="AppImage-placeholder"
      :style="placeholderStyle"
    />

    <!-- Picture -->
    <picture>

      <!-- Sources -->
      <slot />

      <!-- Image -->
      <img
        v-if="!!url"
        ref="image"
        :draggable="draggable"
        :data-src="url"
        :alt="(alt && alt.length > 0) ? alt : 'No alternate text'"
        :style="{
          objectFit: fit,
          objectPosition: position
        }"
        class="AppImage-image"
      >
    </picture>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: false,
      default: null
    },
    alt: {
      type: String,
      required: false,
      default: 'No alternate text'
    },
    fit: {
      type: String,
      required: false,
      default: 'cover',
      validator: value => ['cover', 'contain', 'none', 'unset'].includes(value)
    },
    position: {
      type: String,
      required: false,
      default: 'center center'
    },
    ratio: {
      type: Number,
      required: false,
      default: null
    },
    lazyload: {
      type: [Boolean, String],
      required: false,
      default: true
    },
    lazyloadOffset: {
      type: Number,
      required: false,
      default: -500
    },
    lazyloadThreshold: {
      type: Number,
      required: false,
      default: 0
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * 'blur', 'color' or an URL
     */
    placeholder: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      loaded: false,
      loading: false,
      error: false,
      placeholderStyle: null
    }
  },
  computed: {
    sources () {
      return this.$children
        .filter(child => child.type === 'AppSource')
    }
  },
  mounted () {
    if (this.placeholder) this.setPlaceholder()

    if (this.lazyload === true || this.lazyload === 'observer') {
      this.createLazyloadObserver()
    }

    if (this.lazyload === false) {
      this.$nextTick(this.load)
    }
  },
  methods: {
    async setPlaceholder () {
      if (this.placeholder === 'blur') {
        const url = new URL(this.url)
        url.searchParams.set('w', url.searchParams.get('w') / 2)
        url.searchParams.set('h', url.searchParams.get('h') / 2)
        url.searchParams.set('blur', 250)

        this.placeholderStyle = {
          backgroundImage: `url(${ url })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }
      } else if (this.placeholder === 'color') {
        const color = (await this.getImagePalette({ colors: 1 }))?.[0]?.hex

        if (color) {
          this.placeholderStyle = {
            backgroundColor: color
          }
        }
      } else if (typeof this.placeholder === 'string' && this.placeholder.length > 0) {
        this.placeholderStyle = {
          backgroundImage: `url(${this.placeholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }
      }
    },
    async getImagePalette ({ colors = 1 } = {}) {
      try {
        const paletteUrl = new URL(this.url)
        paletteUrl.searchParams.set('palette', 'json')
        paletteUrl.searchParams.set('colors', colors)

        const paletteResponse = await fetch(paletteUrl)
        const palette = await paletteResponse.json()

        return palette.colors
      } catch (_) {
        return null
      }
    },
    createLazyloadObserver () {
      this.observer = new IntersectionObserver(
        this.handleIntersect,
        {
          root: null,
          rootMargin: `0px 0px ${-this.lazyloadOffset}px 0px`,
          threshold: this.lazyloadThreshold
        }
      )

      this.observer.observe(this.$el)
    },
    handleIntersect (entries, observer) {
      let entry = entries[0]

      // Fix bug multiple entries
      if (entries.length > 1) {
        const intersectingEntry = entries.find(e => e.isIntersecting)
        if (intersectingEntry) {
          entry = intersectingEntry
        }
      }

      const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= observer.thresholds[0]

      if (isIntersecting) {
        this.load()
      }
    },
    load () {
      this.observer?.disconnect()

      if (this.loaded) return Promise.resolve()

      this.loading = true

      if (!this.$refs.image) {
        this.onError()
        return
      }

      return new Promise((resolve, reject) => {
        this.$refs.image.addEventListener('load', _ => {
          this.onLoaded()
          resolve()
        })

        this.$refs.image.addEventListener('error', err => {
          this.onError()
          reject(err)
        })

        if (this.$refs.image) {
          this.$refs.image.src = this.$refs.image.dataset.src
        }

        this.sources
          .forEach(source => {
            if (source.$el) source.$el.srcset = source.$el.dataset.srcset
          })
      })
    },
    onLoaded () {
      this.loaded = true
      this.loading = false
      this.error = false
      this.$emit('loaded')

      // Update virtual scroll bounding here
    },
    onError () {
      this.loaded = false
      this.loading = false
      this.error = true
    }
  }
}
</script>

<style scoped>
.AppImage {
  position: relative;
  overflow: hidden;
  font-size: 0px;
  user-select: none;
}

.AppImage.fit-cover .AppImage-image, .AppImage.fit-contain .AppImage-image {
  position: absolute;
  height: 100%;
  width: 100%;
}

.AppImage.has-ratio::before {
  content: "";
  width: 1px;
  margin-left: -1px;
  float: left;
  height: 0;
  padding-top: var(--ratio);
}

.AppImage.has-ratio::after {
  content: "";
  display: table;
  clear: both;
}

.AppImage.loaded .AppImage-image {
  opacity: 1;
  transition: opacity 0.3s;
}

.AppImage.loaded .AppImage-placeholder {
  opacity: 0;
  transition: opacity 0.15s;
}

.AppImage-placeholder {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
}

.AppImage-image {
  position: relative;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
