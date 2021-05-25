import Vue from 'vue'

const SECTION_OFFSET_MARGIN = 100

Vue.directive('vs-section', {
  bind (el, _, vnode) {
    const virtualScrollPlugin = vnode.context.$virtualScroll

    if (!virtualScrollPlugin.active) return

    // Optimize transform
    el.style.willChange = 'transform'

    const getTranslate = el => {
      const translate = {}
      if (!window.getComputedStyle) return

      const style = getComputedStyle(el)
      const transform = style.transform || style.webkitTransform || style.mozTransform
      if (!transform) return { x: 0, y: 0 }

      let mat = transform.match(/^matrix3d\((.+)\)$/)

      if (mat) {
        translate.x = mat ? parseFloat(mat[1].split(', ')[12]) : 0
        translate.y = mat ? parseFloat(mat[1].split(', ')[13]) : 0
      } else {
        mat = transform.match(/^matrix\((.+)\)$/)
        translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0
        translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0
      }
      return translate
    }

    let offset = null
    let isVisible = false

    el.__set_boundings_callback__ = _ => {
      const { top, bottom } = el.getBoundingClientRect()

      offset = {
        yStart: top - getTranslate(el).y - window.innerHeight - SECTION_OFFSET_MARGIN,
        yStop: bottom - getTranslate(el).y + SECTION_OFFSET_MARGIN
      }
    }

    // Listen to scroll event and update element transform on each call
    el.__scroll_callback__ = ({ current }) => {
      if (current > offset.yStart && current < offset.yStop) {
        el.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,${(current * -1).toFixed(0)},0,1)`
        el.style.webkitTransform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,${(current * -1).toFixed(0)},0,1)`
        el.style.msTransform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,${(current * -1).toFixed(0)},0,1)`

        if (!isVisible) {
          isVisible = true
          el.style.pointerEvents = 'auto'
          el.style.opacity = 1
        }
      } else if (isVisible) {
        isVisible = false

        el.style.transform = 'translate3d(0px, 0px, 0px)'
        el.style.webkitTransform = 'translate3d(0px, 0px, 0px)'
        el.style.msTransform = 'translate3d(0px, 0px, 0px)'

        el.style.pointerEvents = 'none'
        el.style.opacity = 0
      }
    }
    virtualScrollPlugin.$on('scroll', el.__scroll_callback__)
    virtualScrollPlugin.$on('setBoundings', el.__set_boundings_callback__)
  },
  unbind (el, __, vnode) {
    // Get virtualScroll plugin
    const virtualScrollPlugin = vnode.context.$virtualScroll

    // Remove scroll event listener
    virtualScrollPlugin.$off('scroll', el.__scroll_callback__)
    delete el.__scroll_callback__

    // Remove setBoundings event listener
    virtualScrollPlugin.$off('setBoundings', el.__set_boundings_callback__)
    delete el.__set_boundings_callback__
  }
})
