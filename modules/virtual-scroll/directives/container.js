/* eslint-disable no-console */
import Vue from 'vue'

Vue.directive('vs-container', {
  bind (el, { value }, vnode) {
    const virtualScrollPlugin = vnode.context.$virtualScroll

    virtualScrollPlugin.setContainer(el)

    if (typeof value?.ratio === 'number') virtualScrollPlugin.setRatio(value.ratio)
    if (typeof value?.precision === 'number') virtualScrollPlugin.setPrecision(value.precision)

    virtualScrollPlugin.start()

    vnode.context.$nextTick(_ => {
      virtualScrollPlugin.setBoundings()
    })
  }
})
