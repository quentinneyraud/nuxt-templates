import Vue from 'vue'
import { warn } from '../utils'

Vue.directive('ss-main', {
  bind (el, _, vnode) {
    const smoothScrollPlugin = vnode.context.$smoothScroll

    if (!smoothScrollPlugin) warn('$smoothScroll plugin not installed')

    const onScroll = _ => {
      el.style.transform = `translate3d(0px, ${(smoothScrollPlugin.current * -1).toFixed(2)}px, 0px)`
    }
    el.__smooth_scroll_on_scroll_callback__ = onScroll

    smoothScrollPlugin.$on('scroll', onScroll)
  },
  unbind (el, __, vnode) {
    const smoothScrollPlugin = vnode.context.$smoothScroll

    if (!smoothScrollPlugin) warn('$smoothScroll plugin not installed')

    smoothScrollPlugin.$off('scroll', el.__smooth_scroll_on_scroll_callback__)
  }
})
