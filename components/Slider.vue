<template>
  <div
    v-observe="{
      once: false,
      onEnter,
      onLeave
    }"
    class="Slider"
  >
    <!-- List -->
    <div
      ref="list"
      class="Slider-list"
    >
      <!-- Item -->
      <div
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        ref="items"
        class="Slider-item"
      >
        <slot
          :item="item"
          :index="itemIndex"
        />
      </div>
    </div>

    <!-- Fake List -->
    <div class="Slider-list --fake">
      <!-- Item -->
      <div
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        class="Slider-item"
      >
        <slot
          :item="item"
          :index="itemIndex"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { notRequiredBoolean } from '~/modules/props-helper/scripts/nuxt-prop-types'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    autoPlay: {
      ...notRequiredBoolean,
      default: false
    }
  },

  data () {
    return {
      currentItemIndex: 0,
      animation: null
    }
  },

  mounted () {
    this.slideDelay = 3
    this.slideDuration = 0.7

    this.$refs.items
      .forEach((item, itemIndex) => {
        gsap.set(item, {
          xPercent: itemIndex * 100
        })
      })

    this.timer = gsap.delayedCall(this.slideDelay, this.autoplay)

    this.animation = gsap.to(this.$refs.items, {
      duration: 1,
      xPercent: `+=${this.$refs.items.length * 100}`,
      ease: 'none',
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-100, (this.$refs.items.length - 1) * 100)
      }
    })

    this.proxy = document.createElement('div')
    gsap.set(this.proxy, { x: 0 })
    this.slideAnimation = gsap.to({}, { duration: 0.1 })

    this.createDraggable()
    this.onResize()
  },

  beforeDestroy () {
    this.$events.$off('resize', this.onResize)
  },

  methods: {
    createDraggable () {
      this.draggable = new Draggable(this.proxy, {
        type: 'x',
        trigger: this.$refs.list,
        inertia: true,
        cursor: 'grab',
        activeCursor: 'grabbing',
        dragResistance: this.$device.isMobileOrTablet ? 0 : 0.4,
        edgeResistance: 0.9,
        throwResistance: this.$device.isMobileOrTablet ? 0 : 2000,
        maxDuration: 1,
        allowContextMenu: true,
        onPress: this.onPress,
        onDrag: this.updateProgress,
        onDragEnd: this.onDragEnd,
        onThrowUpdate: this.updateProgress,
        onThrowComplete: this.onThrowComplete,
        snap: {
          x: gsap.utils.snap(this.slideWidth)
        }
      })
    },

    onThrowComplete () {
      const index = gsap.utils.wrap(0, this.$refs.items.length)(Math.round(-this.draggable.endX / this.slideWidth))

      if (index === this.currentItemIndex) return

      this.currentItemIndex = index

      this.$emit('slide', { index })
    },

    onPress () {
      this.updateDraggable()
    },

    onDragEnd () {
      this.$emit('drag-end', {
        index: gsap.utils.wrap(0, this.$refs.items.length)(Math.round(-gsap.getProperty(this.proxy, 'x') / this.slideWidth))
      })
    },

    updateDraggable () {
      this.timer.restart(true)
      this.slideAnimation.kill()
      this.draggable.update()
    },

    animateSlides (direction) {
      this.timer.restart(true)
      this.slideAnimation.kill()

      const snapX = x => {
        return Math.round(x / this.slideWidth) * this.slideWidth
      }

      const x = snapX(gsap.getProperty(this.proxy, 'x') + direction * this.slideWidth)

      this.slideAnimation = gsap.to(this.proxy, {
        duration: this.slideDuration,
        ease: 'power2.inOut',
        x,
        onUpdate: this.updateProgress,
        onComplete: this.onThrowComplete
      })
    },

    autoplay () {
      if (!this.autoPlay) return
      if (this.draggable.isPressed || this.draggable.isDragging || this.draggable.isThrowing) {
        this.timer.restart(true)
      } else {
        this.animateSlides(-1)
      }
    },

    updateProgress () {
      this.$emit('live-slide', {
        index: gsap.utils.wrap(0, this.$refs.items.length)(Math.round(-gsap.getProperty(this.proxy, 'x') / this.slideWidth))
      })

      this.animation.progress(gsap.utils.wrap(0, 1, gsap.getProperty(this.proxy, 'x') / this.wrapWidth))
    },

    onResize () {
      const norm = (gsap.getProperty(this.proxy, 'x') / this.wrapWidth) || 0

      this.slideWidth = this.$refs.items[0].offsetWidth
      this.wrapWidth = this.slideWidth * this.$refs.items.length

      gsap.set(this.proxy, {
        x: norm * this.wrapWidth
      })

      this.animateSlides(0)
      this.slideAnimation.progress(1)

      this.draggable.vars.snap = {
        x: gsap.utils.snap(this.slideWidth)
      }
    },

    onEnter () {
      this.$events.$on('resize', this.onResize)
    },

    onLeave () {
      this.$events.$off('resize', this.onResize)
    },

    goToNext () {
      this.animateSlides(-1)
    },

    goToPrevious () {
      this.animateSlides(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.Slider {
  position: relative;
}

.Slider-list {
  &.--fake {
    width: 100%;
    display: flex;
    opacity: 0;
    @include no-pointer;

    .Slider-item {
      position: relative;
      flex: 0 0 100%;
    }
  }

  &:not(.--fake) {
    overflow: hidden;
    @include full-parent;

    .Slider-item {
      @include full-parent;
    }
  }
}

.Slider-item {
  padding: 0 $wrapper-padding;
}
</style>
