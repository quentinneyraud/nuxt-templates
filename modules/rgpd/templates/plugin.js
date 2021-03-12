import Vue from 'vue'
import Rgpd from './Rgpd.vue'

/**
 *
 * Component
 *
 */

Vue.component('Rgpd', Rgpd)

/**
 *
 * Plugin
 *
 */
const rgpd = new Vue({
  data () {
    return {
      services: []
    }
  },
  methods: {
    registerServices (services) {
      this.services = services
        .map(({ name }) => ({
          id: name.replace(/\s+/g, '-').toLowerCase(),
          name
        }))
    }
  }
})

export default (_, inject) => {
  inject('rgpd', rgpd)
}
