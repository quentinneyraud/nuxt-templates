import Vue from 'vue'
import VirtualScroll from 'virtual-scroll'

/**
 *
 * Utils
 *
 */

const lerp = (value, target, coeff, precision) => {
  if (Math.abs(target - value) < precision) return target

  return value * (1 - coeff) + target * coeff
}

const isMobileOrTablet = ctx => {
  const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'
  const REGEX_MOBILE_OR_TABLET1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
  const REGEX_MOBILE_OR_TABLET2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i

  let userAgent = DEFAULT_USER_AGENT

  if (typeof ctx.req !== 'undefined') {
    userAgent = ctx.req.headers['user-agent']
  } else if (typeof navigator !== 'undefined') {
    userAgent = navigator.userAgent
  }

  return REGEX_MOBILE_OR_TABLET1.test(userAgent) || REGEX_MOBILE_OR_TABLET2.test(userAgent.substr(0, 4))
}

const clamp = (value, min, max) => {
  if (min !== undefined && max !== undefined) {
    return Math.min(Math.max(value, min), max)
  } else if (min !== undefined) {
    return Math.max(value, min)
  } else if (max !== undefined) {
    return Math.min(value, max)
  } else {
    return value
  }
}

/**
 *
 * Plugin
 *
 */

const keyCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  TAB: 9,
  PAGEUP: 33,
  PAGEDOWN: 34,
  HOME: 36,
  END: 35
}

const createVirtualScroll = ctx => new Vue({
  data () {
    return {
      container: null,
      active: !isMobileOrTablet(ctx),
      isLocked: false,
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

    setActive (active) {
      this.active = active

      return this
    },

    start () {
      this.setBoundings()
      this.setRatio(0.1)

      this.virtualScroll = new VirtualScroll({
        mouseMultiplier: navigator.platform.includes('Win') ? 1 : 0.4,
        touchMultiplier: 2,
        firefoxMultiplier: 50,
        useKeyboard: false,
        passive: true
      })

      this.virtualScroll.on(this.virtualScrollCallback)

      Object.assign(document.body.style, {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      })

      window.addEventListener('resize', this.onResize, {
        capture: false,
        passive: true
      })

      window.addEventListener('keydown', this.onKeyDown, {
        capture: false,
        passive: true
      })

      if (ctx?.$events?.eventsState?.tick) {
        ctx.$events.$on('tick', _ => {
          this.onTick()
        })
      } else {
        const onTick = _ => {
          this.onTick()
          requestAnimationFrame(onTick)
        }

        onTick()
      }
    },

    destroy () {
      this.virtualScroll?.destroy()
      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('keydown', this.onKeyDown)

      this.$emit('destroy')
    },

    lock () {
      this.isLocked = true

      if (!this.isActive) {
        document.body.style.overflow = 'hidden'
      }
    },

    unlock () {
      this.isLocked = false

      if (!this.isActive) {
        document.body.style.overflow = 'auto'
      }
    },

    virtualScrollCallback (e) {
      if (this.isLocked) return

      this.scrollOf(e.deltaY * -1)
    },

    scrollOf (value = 0, force = false) {
      if (this.isLocked && !force) return

      this.target = clamp(this.target + value, 0, this.bounding)
    },

    scrollTo (yValue, force = false) {
      if (this.isLocked && !force) return

      if (!this.active) {
        window.scrollTo(0, yValue, {
          behavior: 'smooth'
        })
      } else {
        this.scrollOf(yValue - this.target)
      }
    },

    goTo (yValue, force = false) {
      if (this.isLocked && !force) return

      if (!this.active) {
        window.scrollTo(0, yValue)
      } else {
        this.target = yValue
        this.current = yValue
      }
    },

    scrollOfOneViewport (force = false) {
      if (this.isLocked && !force) return

      this.scrollTo(this.target + window.innerHeight)
    },

    scrollToTop (force = false) {
      if (this.isLocked && !force) return

      this.scrollTo(0, force)
    },

    goToTop (force = false) {
      if (this.isLocked && !force) return

      this.goTo(0, force)
    },

    scrollToBottom (force = false) {
      if (this.isLocked && !force) return

      this.scrollTo(this.bounding, force)
    },

    goToBottom (force = false) {
      if (this.isLocked && !force) return

      this.goTo(this.bounding, force)
    },

    scrollToElement (element = null, offset = 0, force = false) {
      if (this.isLocked && !force) return
      if (!element || !element.getBoundingClientRect) return

      this.scrollTo(this.current + element.getBoundingClientRect().top + offset, force)
    },

    onTick () {
      if (!this.active) {
        this.$emit('scroll', {
          current: window.scrollY,
          target: window.scrollY
        })
      } else {
        this.current = lerp(this.current, this.target, this.ratio, 0.01)

        this.$emit('scroll', {
          current: this.current,
          target: this.target
        })
      }
    },

    onResize () {
      this.setBoundings()
    },

    onKeyDown (e) {
      if (this.isLocked) return

      const hasFocusOnInput = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement

      switch (e.keyCode) {
        case keyCodes.TAB:
          window.setTimeout(_ => {
            this.scrollToElement(document.activeElement, -window.innerHeight / 2, true)
          }, 0)
          break
        case keyCodes.UP:
          if (hasFocusOnInput) return

          this.scrollOf(-240, true)
          break
        case keyCodes.DOWN:
          if (hasFocusOnInput) return

          this.scrollOf(240, true)
          break
        case keyCodes.PAGEUP:
          this.scrollOf(-window.innerHeight, true)
          break
        case keyCodes.PAGEDOWN:
          this.scrollOf(window.innerHeight, true)
          break
        case keyCodes.HOME:
          this.scrollToTop(true)
          break
        case keyCodes.END:
          this.scrollToBottom(true)
          break
        case keyCodes.SPACE:
          if (hasFocusOnInput) return

          if (e.shiftKey) {
            this.scrollOf(-window.innerHeight, true)
          } else {
            this.scrollOf(window.innerHeight, true)
          }
          break
        default:
          break
      }
    },

    setBoundings () {
      if (!this.active) return

      this.bounding = this.container.getBoundingClientRect().height - window.innerHeight

      this.$emit('setBoundings', {
        bounding: this.bounding
      })

      this.scrollOf(0, true)
    }
  }
})

export default (context, inject) => {
  inject('virtualScroll', createVirtualScroll(context))
}
