<template>
  <div
    class="PixelPerfect-component"
    :class="{
      '--is-edit-mode': isEditMode
    }"
    :style="{
      '--opacity': opacity
    }"
  >
    <!-- Image -->
    <img
      v-if="currentImageIndex !== null"
      class="PixelPerfect-currentImage"
      :style="{ opacity }"
      :src="require(`@/pixel-perfect/${currentImage.src}`)"
    >

    <!-- Interface -->
    <div class="PixelPerfect-interface">
      <div class="PixelPerfect-interfaceBackground" />

      <!-- Opacity -->
      <div class="PixelPerfect-opacity">
        <svg class="PixelPerfect-opacityLevel" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg class="PixelPerfect-opacitySun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.9 48.9" xml:space="preserve"><circle cx="24.4" cy="24.4" r="10.6" /><path d="M24.4 9.8c.7 0 1.3-.6 1.3-1.3V1.3c0-.7-.6-1.3-1.3-1.3s-1.3.6-1.3 1.3v7.2c0 .7.6 1.3 1.3 1.3zm0 29.3c-.7 0-1.3.6-1.3 1.3v7.2c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3v-7.2c.1-.7-.5-1.3-1.3-1.3zm-12.2-25c.5.5 1.3.5 1.9 0s.5-1.3 0-1.9L9 7.2c-.5-.5-1.3-.5-1.9 0-.5.5-.5 1.3.1 1.8l5 5.1zm24.4 20.7c-.5-.5-1.3-.5-1.9 0s-.5 1.3 0 1.9l5.1 5.1c.5.5 1.3.5 1.9 0s.5-1.3 0-1.9l-5.1-5.1zm0-20.7L41.7 9c.5-.5.5-1.3 0-1.9-.5-.5-1.3-.5-1.9 0l-5.1 5.1c-.5.5-.5 1.3 0 1.9s1.4.5 1.9 0zM12.2 34.8l-5.1 5.1c-.5.5-.5 1.3 0 1.9s1.3.5 1.9 0l5.1-5.1c.5-.5.5-1.3 0-1.9s-1.3-.5-1.9 0zm35.4-11.7h-7.2c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3h7.2c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3zM9.8 24.4c0-.7-.6-1.3-1.3-1.3H1.3c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3h7.2c.7.1 1.3-.5 1.3-1.3z" /></svg>
      </div>

      <!-- Items -->
      <div ref="items" class="PixelPerfect-items">
        <div
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
          class="PixelPerfect-item"
          :class="{
            selected: imageIndex === currentImageIndex
          }"
          :style="{
            '--index': imageIndex
          }"
        >
          <button
            class="PixelPerfect-itemButton"
            @click="currentImageIndex = imageIndex"
          >
            <img
              class="PixelPerfect-image"
              :src="require(`@/pixel-perfect/${image.src}`)"
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Module options
const options = JSON.parse('<%= JSON.stringify(options, (key, value) => value instanceof RegExp ? value.toString() : value) %>')

export default {
  data () {
    return {
      options,
      images: options.images,
      currentImageIndex: null,
      opacity: 0.5,
      isEditMode: false,
      editModeTimeoutId: null
    }
  },
  computed: {
    currentImage () {
      return this.images[this.currentImageIndex]
    }
  },
  watch: {
    $route () {
      if (!this?.$route?.name || !options.changeOnNavigation) return

      const imageIndex = this.images.findIndex(image => {
        if (image.route === this.$route.name) return true
      })

      if (imageIndex >= 0) this.currentImageIndex = imageIndex
    },
    currentImageIndex () {
      this.persistToLocaleStorage()
    }
  },
  mounted () {
    this.addEvents()

    const { imageIndex = this.currentImageIndex, opacity = this.opacity } = this.getLocaleStorage()
    this.opacity = opacity
    this.currentImageIndex = imageIndex
  },
  beforeDestroy () {
    this.removeEvents()
  },
  methods: {
    /**
     *
     * Events
     *
     */
    addEvents () {
      window.addEventListener('keydown', this.onKeyDown)
      window.addEventListener('keyup', this.onKeyUp)
      window.addEventListener('wheel', this.onScroll, {
        passive: false
      })
    },
    removeEvents () {
      window.removeEventListener('keydown', this.onKeyDown)
      window.removeEventListener('keyup', this.onKeyUp)
      window.removeEventListener('wheel', this.onScroll)
    },
    onKeyDown (event) {
      const { key } = event

      switch (key) {
        case 'p':
          if (this.isEditMode) return

          this.editModeTimeoutId = window.setTimeout(_ => {
            this.showEditMode()
          }, 150)
          break
        case 'ArrowUp':
          if (!this.isEditMode) return

          event.preventDefault()
          this.updateOpacity(0.03)
          break
        case 'ArrowDown':
          if (!this.isEditMode) return

          event.preventDefault()
          this.updateOpacity(-0.03)
          break
      }
    },
    onKeyUp ({ key }) {
      switch (key) {
        case 'p':
          this.hideEditMode()
          break
      }
    },
    onScroll (event) {
      if (!this.isEditMode) return

      event.preventDefault()
      this.$refs.items.scrollLeft += event.deltaY
    },
    /**
     *
     * Flow
     *
     */
    showEditMode () {
      this.$refs.items.scrollLeft = 0
      this.isEditMode = true
    },
    hideEditMode () {
      this.editModeTimeoutId && window.clearTimeout(this.editModeTimeoutId)
      this.isEditMode = false
    },
    updateOpacity (value) {
      this.opacity = Math.max(0, Math.min(1, this.opacity + value))
    },
    /**
     *
     * Local storage
     *
     */
    persistToLocaleStorage () {
      window.localStorage.setItem('pixel-perfect', JSON.stringify({
        opacity: this.opacity,
        imageIndex: this.currentImageIndex
      }))
    },
    getLocaleStorage () {
      const localStorageValue = window.localStorage.getItem('pixel-perfect')

      if (!localStorageValue) return {}

      return JSON.parse(localStorageValue)
    }
  }
}
</script>

<style lang="scss">
.PixelPerfect-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 10000;

  * {
    box-sizing: border-box;
  }

  &.--is-edit-mode {
    pointer-events: auto;

    .PixelPerfect-interface {
      opacity: 1;
    }

    .PixelPerfect-interfaceBackground {
      opacity: 1;
      transition: opacity 0.5s;
    }

    .PixelPerfect-opacity {
      opacity: 1;
      transition: opacity 0.5s;
    }

    .PixelPerfect-item {
      transform: translateY(0%);
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
      transition-delay: calc(var(--index) * 0.08s);
    }
  }
}

.PixelPerfect-currentImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: block;
}

.PixelPerfect-interface {
  position: fixed;
  z-index: 10001;
  top: 25vh;
  left: 0;
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;

  opacity: 0;
}

.PixelPerfect-interfaceBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0));

  opacity: 0;
  transition: opacity 0.2s;
}

.PixelPerfect-opacity {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  transition: opacity 0.2s;
}

.PixelPerfect-opacityLevel {
  transform: rotate(-90deg);
  width: 75px;
  height: 75px;
  fill: none;
  stroke: white;
  stroke-width: calc((2 + var(--opacity) * 3) * 1px);
  stroke-linecap: round;
  overflow: visible;
  stroke-dasharray: calc(var(--opacity) * 3.14 * 50 * 2)
    calc((1 - var(--opacity)) * 3.14 * 50 * 2);

  transition: transform 0.2s, stroke-dasharray 0.2s;
}

.PixelPerfect-opacitySun {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0px);
  width: 40px;
  height: 40px;
  fill: white;
  opacity: calc(0.2 + var(--opacity) * 0.8);
}

.PixelPerfect-items {
  flex-grow: 1;
  position: relative;
  margin-top: 40px;
  padding: 0 50px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar-thumb:horizontal {
    background: #fff;
  }

  &::-webkit-scrollbar {
    height: 10px;
    background: rgba(255, 255, 255, 0.2);
  }
}

.PixelPerfect-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 50px;
  width: 300px;
  height: 100%;
  vertical-align: top;
  transform: translateY(100%);

  transition: transform 0.2s cubic-bezier(0.5, 0, 0.75, 0);

  &.selected .PixelPerfect-image {
    box-shadow: 0 0 30px 5px rgba(200, 200, 200, 1);
  }

  &:not(.selected) .PixelPerfect-itemButton:hover .PixelPerfect-image {
    box-shadow: 0 0 15px 2px rgba(200, 200, 200, 1);
  }
}

.PixelPerfect-itemButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
}

.PixelPerfect-image {
  display: inline-block;
  max-width: 300px;
  max-height: 50vh;
  object-fit: contain;
  user-select: none;

  transition: box-shadow 0.4s;
}

.PixelPerfect-imageName {
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  margin-top: 20px;
}
</style>
