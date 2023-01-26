import Vue from 'vue'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

class Sticky {
  constructor (el, options, virtualScrollPlugin) {
    this.el = el
    this.parent = el.parentNode
    this.options = Object.assign({}, { marge: 100 }, options)
    this.virtualScrollPlugin = virtualScrollPlugin
    this.bindMethods()
    this.start()
  }

  bindMethods () {
    this.onScroll = this.onScroll.bind(this)
    this.onScrollMobile = this.onScrollMobile.bind(this)
  }

  start () {
    this.onScrollCallback = this.virtualScrollPlugin.active ? this.onScroll : this.onScrollMobile

    this.virtualScrollPlugin.$on('scrolll', this.onScrollCallback)
  }

  destroy () {
    this.virtualScrollPlugin.$off('scrolll', this.onScrollCallback)
  }

  setRect () {
    this.elRect = this.el.getBoundingClientRect()
    this.parentRect = this.parent.getBoundingClientRect()
  }

  onScroll () {
    this.elRect = this.el.getBoundingClientRect()
    this.parentRect = this.parent.getBoundingClientRect()

    if (this.parentRect.top <= this.options.marge && this.parentRect.top + this.parentRect.height - this.elRect.height >= -this.options.marge) {
      this.el.style.transform = `translateY(${clamp(this.parentRect.top * -1, 0, this.parentRect.height - this.elRect.height).toFixed(0)}px)`

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
      this.el.style.position = 'relative'
      this.el.style.top = 'unset'
      this.el.style.width = 'unset'

      if (this.parentRect.top <= 0) {
        this.el.style.transform = `translateY(${this.parentRect.height - this.elRect.height}px)`
      }
    }
  }

  sendProgress () {
    if (this.options.onProgress) this.options.onProgress((this.elRect.top - this.parentRect.top) / (this.parentRect.height - this.elRect.height))
  }
}

Vue.directive('vs-sticky', {
  bind (el, { value }, { context }) {
    const virtualScrollPlugin = context.$virtualScroll

    const state = new Sticky(el, value, virtualScrollPlugin)

    el._vue_sticky = state
  },
  unbind (el) {
    const state = el._vue_sticky

    if (state) {
      state.destroy()
      delete el._vue_sticky
    }
  }
})
