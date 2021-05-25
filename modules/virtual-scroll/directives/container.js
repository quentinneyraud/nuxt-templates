/* eslint-disable no-console */
import Vue from 'vue'

Vue.directive('vs-container', {
  bind (el, _, vnode) {
    const virtualScrollPlugin = vnode.context.$virtualScroll

    virtualScrollPlugin.setContainer(el)
    virtualScrollPlugin.start()

    vnode.context.$nextTick(_ => {
      virtualScrollPlugin.setBoundings()
    })
  }
})
