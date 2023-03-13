import Vue from 'vue'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>')

const helper = Vue.observable({
  active: moduleOptions.helper,
  show: true
})

if (moduleOptions.helper) {
  window.addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 73) {
      helper.show = !helper.show
    }
  })
}

export default (_, inject) => {
  inject('viewportObserverHelper', helper)
}
