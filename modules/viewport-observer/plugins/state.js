import Vue from 'vue'

const state = Vue.observable({
  active: false
})

export default (_, inject) => {
  inject('viewportObserverState', state)
}
