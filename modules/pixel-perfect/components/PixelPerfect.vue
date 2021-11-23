<template>
  <div class="PixelPerfect-component">
    <!-- Image -->
    <img class="PixelPerfect-currentImage" :style="{ opacity }" :src="require(`@/pixel-perfect/${currentImage}`)">

    <!-- Interface -->
    <div class="PixelPerfect-interface">
      <div class="PixelPerfect-images">
        <div
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
          class="PixelPerfect-imageWrapper"
        >
          <img
            class="PixelPerfect-image"
            :src="require(`@/pixel-perfect/${image}`)"
          >
          <span class="PixelPerfect-imageName">{{ image }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Module options
const options = JSON.parse('<%= JSON.stringify(options) %>')

export default {
  data () {
    return {
      images: options.images,
      currentImageIndex: 0,
      opacity: 0.5,
      editMode: false
    }
  },
  computed: {
    currentImage () {
      return this.images[this.currentImageIndex]
    }
  },
  mounted () {
    this.addEvents()
  },
  methods: {
    addEvents () {
      window.addEventListener('keydown', this.onKeyDown)
      window.addEventListener('keyup', this.onKeyUp)
    },
    onKeyDown ({ key }) {
      switch (key) {
        case 'p':
          this.editMode = true
          break
        case 'ArrowUp':
          if (!this.editMode) return
          this.opacity += 0.1
          break
        case 'ArrowDown':
          if (!this.editMode) return
          this.opacity -= 0.1
          break
      }
    },
    onKeyUp ({ key }) {
      switch (key) {
        case 'p':
          this.editMode = false
          break
      }
    }
  }
}
</script>

<style lang="css" scoped>
.PixelPerfect-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* pointer-events: none; */
  z-index: 10000;
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
  padding: 25px;
  top: 100vh;
  left: 0;
  width: 100%;
  transform: translateY(-100%);
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0));
}

.PixelPerfect-images {
  height: 300px;
  width: 100%;
  display: flex;
}

.PixelPerfect-imageWrapper {
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.PixelPerfect-image {
  width: 400px;
  height: 30px;
  flex-grow: 1;
  object-fit: contain;
}

.PixelPerfect-imageName {
  font-size: 12px;
  font-weight: bold;
}

</style>
