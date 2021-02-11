import Vue from 'vue'
import VirtualScroll from 'virtual-scroll'
import { lerp, isMacOS, isMobileOrTablet, clamp } from './utils'

const createVirtualScroll = ctx => new Vue({
  data () {
    return {
      container: null,
      active: !isMobileOrTablet(ctx),
      ratio: 1,
      target: 0,
      current: 0,
      bounding: 0
    }
  },
  computed: {
    scrollDelta () {
      return this.target - this.current
    }
  },
  watch: {
    active: {
      immediate: true,
      handler (isActive) {
        this.$emit('state-change', {
          isActive
        })
      }
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
      this.main.style.willChange = 'transform'

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
        this.setRatio(isMacOS ? 0.1 : 0.075)

        this.virtualScroll = new VirtualScroll({
          // mouseMultiplier: isMacOS ? 0.4 : 0.85,
          mouseMultiplier: isMacOS ? 0.4 : 0.85,
          touchMultiplier: 2.5,
          firefoxMultiplier: 40
        })

        this.virtualScroll.on(this.vscb)

        Object.assign(document.body.style, {
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        })

        if (ctx.eventsPlugin) {
          ctx.eventsPlugin.$on('ticker', _ => {
            this.onTick()
          })
        } else {
          const onTick = _ => {
            this.onTick()
            requestAnimationFrame(onTick)
          }

          requestAnimationFrame(onTick)
        }
      }
    },

    updateTarget (value) {
      this.target = clamp(this.target + value, 0, this.bounding)
    },

    vscb (e) {
      this.updateTarget(e.deltaY * -1)
    },

    initEvents () {
      window.addEventListener('resize', this.onResize)
    },

    scrollTo (yValue) {
      if (!this.active) {
        window.scrollTo(0, yValue, {
          behavior: 'smooth'
        })
      } else {
        this.updateTarget(yValue - this.target)
      }
    },

    scrollOfOneViewport () {
      this.scrollTo(this.target + window.innerHeight)
    },

    scrollToTop () {
      this.scrollTo(0)
    },

    scrollToBottom () {
      this.scrollTo(this.bounding)
    },

    onTick () {
      this.current = lerp(this.current, this.target, this.ratio)

      this.$emit('scroll', {
        current: this.current,
        target: this.target
      })
    },

    onResize () {
      this.setBoundings()
    },

    setBoundings () {
      if (!this.active) return

      this.bounding = this.container.getBoundingClientRect().height - window.innerHeight

      this.$emit('setBoundings')

      this.updateTarget(0)
    },

    destroy () {
      this.virtualScroll?.destroy()
      window.removeEventListener('resize', this.onResize)
    }
  }
})

export default (context, inject) => {
  inject('virtualScroll', createVirtualScroll(context))
}
