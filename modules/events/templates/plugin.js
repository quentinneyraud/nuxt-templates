import Vue from 'vue'
import { debounce, warn, infos } from './utils'

const Events = new Vue()

/**
 *
 *
 * Events
 *
 *
 */

/**
 *
 * Resize
 *
 */
const getResize = _ => ({
  options: {},
  init (options = {}) {
    this.onResize = this.onResize.bind(this)

    this.options = options
    this.callback = (this.options.debounce) ? debounce(this.onResize, this.options.debounce || 300) : this.onResize

    return this
  },
  start () {
    infos('Start listening for resize event')

    window.addEventListener('resize', this.callback)
  },
  onResize () {
    this.emitEvent()
  },
  emitEvent () {
    const eventName = this.options?.name || 'resize'

    Events.$emit(eventName, {
      options: this.options
    })
  }
})

/**
 *
 * Ticker
 *
 */
const getTicker = _ => ({
  startTime: null,
  lastTime: null,
  options: {},
  init (options = {}) {
    this.options = options
    this.onTick = this.onTick.bind(this)

    return this
  },
  start () {
    infos('Start listening for requestAnimationFrame event')

    this.startTime = new Date().getTime()
    this.onTick()
  },
  onTick () {
    const currentTime = new Date().getTime()

    const eventName = this.options?.name || 'ticker'

    Events.$emit(eventName, {
      options: this.options,
      time: currentTime - this.startTime,
      deltaTime: currentTime - this.lastTime
    })

    this.lastTime = currentTime

    window.requestAnimationFrame(this.onTick)
  }
})

/**
 *
 * GSAP ticker
 *
 */
const getGsapTicker = _ => ({
  gsap: null,
  options: {},
  init (options = {}) {
    this.options = options
    this.onTick = this.onTick.bind(this)
    // eslint-disable-next-line no-undef
    this.gsap = require('gsap').default

    return this
  },
  start () {
    infos('Start listening for GSAP ticker event')

    this.gsap.ticker.add(this.onTick)
  },
  onTick (time, deltaTime, frame, elapsed) {
    const eventName = this.options?.name || 'ticker'

    Events.$emit(eventName, {
      options: this.options,
      time,
      deltaTime,
      frame,
      elapsed
    })
  }
})

/**
 *
 * Window focus
 *
 */
const getVisibility = _ => ({
  options: {},
  init (options = {}) {
    this.options = options

    this.onVisibilityChanged = this.onVisibilityChanged.bind(this)

    return this
  },
  start () {
    infos('Start listening for visibilitychange event')

    document.addEventListener('visibilitychange', this.onVisibilityChanged)
  },
  onVisibilityChanged () {
    const eventName = this.options?.name || 'visibility'
    const hasFocus = !document.hidden

    Events.$emit(eventName, {
      options: this.options,
      hasFocus
    })

    if (hasFocus) {
      Events.$emit(`${eventName}:focus`, {
        options: this.options,
        hasFocus
      })
    } else {
      Events.$emit(`${eventName}:blur`, {
        options: this.options,
        hasFocus
      })
    }
  }
})

/**
 *
 * Orientation
 *
 */
const getOrientation = _ => ({
  options: {},
  init (options = {}) {
    this.options = options

    this.onOrientation = this.onOrientationChanged.bind(this)

    return this
  },
  start () {
    infos('Start listening for orientationchange event')

    window.addEventListener('orientationchange', this.onOrientationChanged)
  },
  onOrientationChanged () {
    const eventName = this.options?.name || 'orientation'
    const orientation = (window.orientation === 90 || window.orientation === -90) ? 'landscape' : 'portrait'

    Events.$emit(eventName, {
      options: this.options,
      orientation
    })

    Events.$emit(`${eventName}:${orientation}`, {
      options: this.options,
      orientation
    })
  }
})

/**
 *
 * Init events
 *
 */
const options = JSON.parse('<%= JSON.stringify(options) %>')

options.events.forEach(event => {
  const formattedEvent = {
    type: event?.type || event,
    options: event?.options || {}
  }

  switch (formattedEvent.type) {
  case 'resize':
    getResize()
      .init(formattedEvent.options)
      .start()

    break

  case 'ticker':
    (options.isGsapInstalled ? getGsapTicker() : getTicker())
      .init(formattedEvent.options)
      .start()
    break

  case 'visibility':
    getVisibility()
      .init(formattedEvent.options)
      .start()
    break

  case 'orientation':
    getOrientation()
      .init(formattedEvent.options)
      .start()
    break

  default:
    warn(`Cannot find event ${formattedEvent.type}`)
    break
  }
})

/**
 *
 * Inject
 *
 */
export default (_, inject) => {
  inject('events', Events)
}
