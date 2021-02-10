/* eslint-disable no-console */
import Vue from 'vue'
import { warn } from '../utils'

Vue.directive('vs-container', {
  bind (el, _, vnode) {
    const virtualScrollPlugin = vnode.context.$virtualScroll

    if (!virtualScrollPlugin) warn('$virtualScroll plugin not installed')

    virtualScrollPlugin.setContainer(el)
    virtualScrollPlugin.start()
  }
})
