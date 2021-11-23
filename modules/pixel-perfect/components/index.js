import Vue from 'vue'
import PixelPerfect from './PixelPerfect.vue'

/**
 *
 * Component
 *
 */

Vue.component('PixelPerfect', PixelPerfect)

/**
 *
 * Inject
 *
 */
export default (_, inject) => {
  inject('pixelPerfect', true)
}
