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
 * Inject
 *
 */
export default (_, inject) => {
  inject('rgpd', true)
}
