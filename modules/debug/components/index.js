import Vue from 'vue'
import Debug from './Debug.vue'

/**
 *
 * Component
 *
 */

Vue.component('Debug', Debug)

/**
 *
 * Inject
 *
 */
export default (_, inject) => {
  inject('debug', true)
}
