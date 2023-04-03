<template>
  <SplitText
    ref="main"
    v-bind="$pickProps(this, 'SplitText')"
    class="AnimatedSplitText"
    :class="[`--${animation}-animation`]"
    :auto-split="false"
    :wrap="animation === 'text'"
  />
</template>

<script>
import gsap from 'gsap'
import Observer from '../modules/viewport-observer/Observer'
import SplitText from '@/components/SplitText.vue'

export default {
  props: {
    ...SplitText.props,
    notAnimated: {
      type: Boolean,
      required: false,
      default: false
    },
    noRevert: {
      type: Boolean,
      required: false,
      default: false
    },
    // text, title
    animation: {
      type: String,
      required: false,
      default: _ => 'title'
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

  mounted () {
    gsap.set(this.$el, {
      autoAlpha: 0
    })

    this.createAnimationObserver()
  },

  methods: {
    createAnimationObserver () {
      const animationObserverParams = {
        ...this.animationObserverParams,
        onEnter: this.onEnter
      }

      this.animationObserver = new Observer(this.$el, animationObserverParams)
      this.animationObserver.observe()
    },

    onEnter () {
      if (!this.notAnimated) {
        this.$nextTick(this.animate)
      }
    },
    animate () {
      if (this.animation === 'title') this.animateTitle()
      if (this.animation === 'text') this.animateText()
    },
    animateTitle () {
      this.$refs.main.split()

      gsap.set(this.$refs.main.elements(), {
        y: '100%',
        rotateX: 90,
        rotateY: 90,
        rotateZ: 90
      })

      return gsap
        .timeline({
          onComplete: _ => {
            if (!this.noRevert) this.$refs.main?.revert()
          }
        })
        .set(this.$el, {
          autoAlpha: 1
        }, 0)
        .to(this.$refs.main.elements(), {
          y: '0%',
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: {
            each: 0.05
          }
        })
    },
    animateText () {
      this.$refs.main.split()

      gsap.set(this.$refs.main.elements(), {
        y: '100%'
      })

      return gsap
        .timeline({
          onComplete: _ => {
            if (!this.noRevert) this.$refs.main?.revert()
          }
        })
        .set(this.$el, {
          autoAlpha: 1
        }, 0)
        .to(this.$refs.main.elements(), {
          y: '0%',
          duration: 0.8,
          ease: 'power2.out',
          stagger: {
            each: 0.05
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.AnimatedSplitText {
  &.--title-animation {
    ::v-deep .chars {
      will-change: transform;
    }
  }

  &.--text-animation {
    ::v-deep .lines-wrapper {
      overflow: hidden;
    }

    ::v-deep .lines {
      will-change: transform;
    }
  }
}
</style>
