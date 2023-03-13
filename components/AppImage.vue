<template>
  <div
    class="AppImage"
    :class="[{
               '--is-loading': loading,
               '--is-loaded': loaded,
               '--has-error': error,
               '--has-lazyload': lazyload,
               '--has-empty-src': !url,
               '--is-animated': animation === true,
               ...(animationObserver ? {
                 [animationObserver.options.activeClass]: animationObserver.isIntersecting
               }:{})
             },
             `fit-${fit}`
    ]"
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
        :alt="alt"
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
import Observer from '../modules/viewport-observer/Observer'

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
      default: ''
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
    lazyload: {
      type: Boolean,
      required: false,
      default: true
    },
    lazyloadObserverParams: {
      type: Object,
      required: false,
      default: _ => ({
        threshold: 0,
        offset: -500
      })
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    },
    // blur, color, an url
    placeholder: {
      type: String,
      required: false,
      default: null
    },
    // true (animateEnter method), false (no observer, no animation), 'custom' (observer and emit 'custom-animation' event)
    animation: {
      type: [Boolean, String],
      required: false,
      default: _ => true
    },
    animationObserverParams: {
      type: Object,
      required: false,
      default: _ => ({
        threshold: 0,
        autoOffset: true
      })
    }
  },
  data () {
    return {
      loaded: false,
      loading: false,
      error: false,
      placeholderStyle: null,
      inView: false
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

    if (this.lazyload) {
      this.createLazyloadObserver()
    } else {
      this.$nextTick(this.load)
    }

    if (this.animation) this.createAnimationObserver()
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
      this.lazyloadObserver = new Observer(this.$el, {
        ...this.lazyloadObserverParams,
        activeClass: null,
        onEnter: this.onEnterLazyload
      })

      this.lazyloadObserver.observe()
    },
    onEnterLazyload () {
      this.load()
      this.lazyloadObserver.destroy()
    },
    createAnimationObserver () {
      const animationObserverParams = {
        ...this.animationObserverParams,
        onEnter: this.onEnterAnimation
      }

      if (this.animation === 'custom') animationObserverParams.activeClass = null

      this.animationObserver = new Observer(this.$el, animationObserverParams)
      this.animationObserver.observe()
    },
    onEnterAnimation () {
      this.inView = true

      if (this.loaded) this.animateEffect()
    },
    load () {
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
      if (!this.loaded && this.inView) this.animateEffect()

      this.loaded = true
      this.loading = false
      this.error = false
      this.$emit('loaded')

      // Update virtual scroll bounding here
      // this.$virtualScroll.setBoundings()
    },
    onError () {
      this.loaded = false
      this.loading = false
      this.error = true
    },
    animateEffect () {
      if (this.animation === 'custom') {
        this.$emit('custom-animation')
        return
      }

      // gsap animation or css
      console.log('animation')
    }
  }
}
</script>

<style lang="scss" scoped>
.AppImage {
  position: relative;
  overflow: hidden;
  font-size: 0px;
  user-select: none;

  &.fit-cover,
  &.fit-contain {
    .AppImage-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  &.--is-animated {
    .AppImage-image {
      transform: scale(1.5);
    }

    &.--is-loaded.in-view {
      .AppImage-image {
        transform: scale(1);
        transition: transform 0.5s ease-in-out;
      }
    }
  }
}

.AppImage-placeholder {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
}

.AppImage-image {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
