import Vue from 'vue'
import { lerp } from './utils'

const smoothScroll = new Vue({
  data () {
    return {
      container: null,
      active: false,
      ratio: 1,
      target: 0,
      current: 0
    }
  },
  computed: {
    scrollTop () {
      return this.current
    },
    scrollDelta () {
      return this.target - this.current
    }
  },
  watch: {
    active (isActive) {
      this.$emit('state-change', {
        isActive
      })
    }
  },
  methods: {
    setRatio (ratio) {
      this.ratio = ratio

      return this
    },

    getRatio () {
      return this.ratio
    },

    setContainer (container) {
      this.container = container

      return this
    },

    setMain (main) {
      this.main = main

      return this
    },

    setActive (active) {
      this.active = active

      return this
    },

    start () {
      this.initEvents()

      if (this.active) {
        this.setBoundings()

        Object.assign(this.container.style, {
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%'
        })
      }
    },

    initEvents () {
      window.addEventListener('scroll', this.onScroll)
      window.addEventListener('resize', this.onResize)

      return this
    },

    goTo (yValue) {
      window.scrollTo(0, yValue)
    },

    scrollTo (yValue) {
      if (!this.active) {
        window.scrollTo(0, yValue, {
          behavior: 'smooth'
        })
      } else {
        window.scrollTo(0, yValue)
      }
    },

    scrollOfOneViewport () {
      if (!this.active) {
        this.scrollTo(window.innerHeight)
      } else {
        this.scrollTo(Math.min(this.height - window.innerHeight, window.innerHeight + 1))
      }
    },

    scrollToTop () {
      this.goTo(0)
    },

    onTick () {
      this.current = lerp(this.current, this.target, this.ratio)

      this.$emit('scroll')
    },

    onResize () {
      this.setBoundings()
    },

    onScroll () {
      this.target = window.scrollY
    },

    setBoundings () {
      if (!this.active) return

      document.body.style.height = `${this.main.clientHeight}px`
    },

    destroy () {
      window.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.onResize)
    }
  }
})

export default (_, inject) => {
  inject('smoothScroll', smoothScroll)
}
