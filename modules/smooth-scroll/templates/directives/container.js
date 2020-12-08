/* eslint-disable no-console */
import Vue from 'vue'
import { warn, isMobileOrTablet, isMacOS } from '../utils'

Vue.directive('ss-container', {
  bind (el, _, vnode) {
    const smoothScrollPlugin = vnode.context.$smoothScroll
    const eventsPlugin = vnode.context.$events

    if (!smoothScrollPlugin) warn('$smoothScroll plugin not installed')

    const isActive = !isMobileOrTablet(vnode.context)

    smoothScrollPlugin
      .setActive(isActive)
      .setContainer(el)

    if (isActive) {
      smoothScrollPlugin
        .setRatio(isMacOS ? 0.1 : 0.075)
    }

    smoothScrollPlugin.start()

    if (eventsPlugin) {
      eventsPlugin.$on('ticker', _ => {
        smoothScrollPlugin.onTick()
      })
    } else {
      const onTick = _ => {
        smoothScrollPlugin.onTick()
        requestAnimationFrame(onTick)
      }

      requestAnimationFrame(onTick)
    }
  }
})
