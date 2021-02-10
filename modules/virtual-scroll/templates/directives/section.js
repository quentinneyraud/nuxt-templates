import Vue from 'vue'
import { warn } from '../utils'

Vue.directive('vs-section', {
  bind (el, _, vnode) {
    const virtualScrollPlugin = vnode.context.$virtualScroll

    if (!virtualScrollPlugin) warn('$virtualScroll plugin not installed')

    // Optimize transform
    el.style.willChange = 'transform'

    const { top, bottom } = el.getBoundingClientRect()

    const isVisible = y => {
      const viewportHeight = window.innerHeight

      const start = top - y
      const end = bottom - y

      return start < viewportHeight && end > 0
    }

    // Listen to scroll event and update element transform on each call
    el.__scroll_callback__ = _ => {
      if (isVisible(virtualScrollPlugin.current)) {
        el.style.transform = `translate3d(0px, ${(virtualScrollPlugin.current * -1).toFixed(2)}px, 0px)`
        el.style.pointerEvents = 'auto'
      } else {
        el.style.transform = 'translate3d(0px, 0px, 0px)'
        el.style.pointerEvents = 'none'
      }
    }
    virtualScrollPlugin.$on('scroll', el.__scroll_callback__)
  },
  unbind (el, __, vnode) {
    // Get virtualScroll plugin
    const virtualScrollPlugin = vnode.context.$virtualScroll
    if (!virtualScrollPlugin) warn('$virtualScroll plugin not installed')

    // Remove scroll event listener
    virtualScrollPlugin.$off('scroll', el.__scroll_callback__)
    delete el.__scroll_callback__
  }
})
