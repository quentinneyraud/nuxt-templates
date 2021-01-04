<template>
  <!-- <ViewportObserver
    v-bind="viewportObserverOptions"
    :active="lazyload !== 'called'"
    @enter="!loaded && load()"
  > -->
  <div
    class="AppImage-component"
    :class="{
      loaded,
      lazyload,
      'has-ratio': !!ratio,
      'has-not-src': !src
    }"
    :style="{
      '--ratio': ratio * 100 + '%'
    }"
  >
    <!-- Placeholder -->
    <div
      class="AppImage-placeholder"
      :style="placeholderStyle"
    />

    <picture>
      <source
        v-for="(source, sourceIndex) in internalSources"
        :key="sourceIndex"
        ref="sources"
        v-bind="source"
      >

      <!-- Image -->
      <img
        v-if="!!src"
        ref="image"
        :data-src="src"
        :alt="alt"
        :style="{
          objectFit: fit,
          objectPosition: position
        }"
        class="AppImage-image"
      >
    </picture>
  </div>
  <!-- </ViewportObserver> -->
</template>

<script>
export default {
  name: 'AppImage',
  props: {
    src: {
      type: String,
      required: false,
      default: 'https://source.unsplash.com/600x300/?nature,water'
    },
    sources: {
      type: Array,
      required: false,
      default: _ => []
    },
    alt: {
      type: String,
      required: false,
      default: 'Image non disponible'
    },
    fit: {
      type: String,
      required: false,
      default: 'cover',
      validator: value => ['cover', 'contain', 'none'].includes(value)
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
      default: 500
    },
    viewportObserverOptions: {
      type: Object,
      required: false,
      default: null
    },
    placeholder: {
      type: String,
      required: false,
      default: 'blur'
    }
  },
  data () {
    return {
      loaded: false,
      loading: false,
      error: false,
      internalSources: [],
      placeholderStyle: null
    }
  },
  mounted () {
    this.setSources()
    this.setPlaceholderStyle()

    if (this.src && !this.lazyload) {
      this.$nextTick(this.load)
    }

    window.setTimeout(_ => {
      this.load()
    }, 1500)
  },
  methods: {
    async setPlaceholderStyle () {
      if (this.placeholder === 'blur') {
        this.placeholderStyle = {
          backgroundImage: `url(${ this.src + '&blur=300' })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }
      } else if (this.placeholder === 'color') {
        const palette = await (await fetch(this.src + '&palette=json&colors=1')).json()

        this.placeholderStyle = {
          backgroundColor: palette.dominant_colors.muted.hex
        }
      }
    },
    setSources () {
      this.internalSources = this.sources.map(({ src, media, sizes }) => {
        const cleanSource = {
          'data-srcset': src?.srcSet || src
        }

        if (media) {
          cleanSource.media = media
        }

        if (sizes) {
          cleanSource.sizes = sizes
        }

        return cleanSource
      })

      // Push default source
      this.internalSources.push({
        'data-srcset': this.src
      })
    },
    load () {
      if (this.loaded) return null

      this.loading = true

      if (!this.$refs.image) {
        this.onError()
        return
      }

      return new Promise((resolve, reject) => {
        this.$refs.image.addEventListener('load', _ => {
          this.onLoad()
          resolve()
        })

        this.$refs.image.addEventListener('error', err => {
          this.onError()
          reject(err)
        })

        if (this.$refs.image) {
          this.$refs.image.src = this.$refs.image.dataset.src
        }

        this.$refs.sources
          .forEach(source => {
            source.srcset = source.dataset.srcset
          })
      })
    },
    onLoad () {
      this.loaded = true
      this.loading = false
      this.$emit('loaded')
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
.AppImage-component {
  position: relative;
  overflow: hidden;
}

.AppImage-component::before {
  content: "";
  width: 1px;
  margin-left: -1px;
  float: left;
  height: 0;
  padding-top: var(--ratio);
}

.AppImage-component::after {
  content: "";
  display: table;
  clear: both;
}

.AppImage-component.loaded .AppImage-image {
  opacity: 1;
  transition: opacity 0.3s;
}

.AppImage-component.has-not-src {
  background-color: #000;
}

.AppImage-placeholder {
  position: absolute;
  width: 100%;
  height: 100%;
}

.AppImage-image {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
