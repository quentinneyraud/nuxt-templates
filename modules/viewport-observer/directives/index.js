import Vue from 'vue'
import Observer from '../Observer'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>')

function bind (el, { value }) {
  const state = new Observer(el, Object.assign({}, moduleOptions.directiveOptions, value))

  el._vue_visibilityState = state
}

function update (el, { value }, vnode) {
  const state = el._vue_visibilityState

  if (state) {
    const equal = Object.keys(value || {})
      .every(k => {
        return (value[k] === state.options[k])
      })

    if (!equal) {
      state.mergeOptions(Object.assign({}, moduleOptions.directiveOptions, value))
      state.create()

      if (vnode.context.$viewportObserverState.active) {
        state.observe()
      }
    }

    if (state.isIntersecting) {
      state.addClass()
    }
  } else {
    bind(el, { value })
  }
}

function unbind (el) {
  const state = el._vue_visibilityState

  if (state) {
    state.destroy()
    delete el._vue_visibilityState
  }
}

Vue.directive('observe', {
  bind,
  update,
  unbind
})
