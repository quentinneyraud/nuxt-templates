import Vue from 'vue'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

let ctx = null

const POSITIONS_ABOVE = 'POSITIONS_ABOVE'
const POSITIONS_BELOW = 'POSITIONS_BELOW'
const POSITIONS_INSIDE = 'POSITIONS_INSIDE'

class Sticky {
  constructor (el, options, virtualScrollPlugin) {
    this.el = el
    this.parent = el.parentNode
    this.options = Object.assign({}, { active: true, marge: 100 }, options)
    this.virtualScrollPlugin = virtualScrollPlugin
    this.bindMethods()

    this.state = Vue.observable({ position: 'above' })
    ctx.$watch(_ => this.state.position, newVal => {
      if (newVal === POSITIONS_ABOVE) {
        this.setTransform(0)
        this.sendProgress(0)
      }

      if (newVal === POSITIONS_BELOW) {
        this.setTransform(this.parentRect.height - this.elRect.height)
        this.sendProgress(1)
      }
    })

    if (this.options.active) this.start()
  }

  bindMethods () {
    this.onScroll = this.onScroll.bind(this)
    this.onScrollMobile = this.onScrollMobile.bind(this)
  }

  start () {
    this.onScrollCallback = this.virtualScrollPlugin.active ? this.onScroll : this.onScrollMobile

    this.virtualScrollPlugin.$on('scroll', this.onScrollCallback)
  }

  destroy () {
    this.virtualScrollPlugin.$off('scroll', this.onScrollCallback)
  }

  setRect () {
    this.elRect = this.el.getBoundingClientRect()
    this.parentRect = this.parent.getBoundingClientRect()
  }

  onScroll () {
    this.setRect()

    if (this.parentRect.top >= this.options.marge) {
      this.state.position = POSITIONS_ABOVE
    } else if (this.parentRect.top + this.parentRect.height - this.elRect.height <= -this.options.marge) {
      this.state.position = POSITIONS_BELOW
    } else {
      this.state.position = POSITIONS_INSIDE

      this.setTransform()
      this.sendProgress()
    }
  }

  onScrollMobile () {
    this.setRect()

    if (this.parentRect.top <= 0 && this.parentRect.top + this.parentRect.height - this.elRect.height >= 0) {
      this.el.style.position = 'fixed'
      this.el.style.top = '0px'
      this.el.style.width = '100%'
      this.el.style.transform = 'unset'

      this.sendProgress()
    } else {
      this.el.style.removeProperty('position')
      this.el.style.removeProperty('top')
      this.el.style.removeProperty('width')

      if (this.parentRect.top <= 0) {
        this.el.style.transform = `translateY(${this.parentRect.height - this.elRect.height}px)`
      }
    }
  }

  setTransform (value) {
    value = value ?? this.parentRect.top * -1
    this.el.style.transform = `translateY(${clamp(value, 0, this.parentRect.height - this.elRect.height).toFixed(this.virtualScrollPlugin.getPrecision())}px)`
  }

  sendProgress (value) {
    value = value ?? (this.elRect.top - this.parentRect.top) / (this.parentRect.height - this.elRect.height)
    this.options?.onProgress(value)
  }
}

Vue.directive('vs-sticky', {
  bind (el, { value }, { context }) {
    ctx = context
    const virtualScrollPlugin = context.$virtualScroll

    context.$nextTick(_ => {
      const state = new Sticky(el, value, virtualScrollPlugin)

      el._vue_sticky = state
    })
  },
  unbind (el) {
    const state = el._vue_sticky

    if (state) {
      state.destroy()
      delete el._vue_sticky
    }
  }
})
