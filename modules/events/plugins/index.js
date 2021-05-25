import Vue from 'vue'

/**
 *
 * Utils
 *
 */

const debounce = (callback, wait) => {
  let timeout

  return () => {
    window.clearTimeout(timeout)
    timeout = setTimeout(() => callback(), wait)
  }
}

/**
 *
 *
 * Events
 *
 *
 */

const Events = new Vue({
  data () {
    return {
      resize: {
        active: false
      },
      raf: {
        active: false
      },
      visibility: {
        active: false
      },
      orientation: {
        active: false
      }
    }
  }
})

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
 * RAF
 *
 */
const getRaf = _ => ({
  startTime: null,
  lastTime: null,
  options: {},
  init (options = {}) {
    this.options = options
    this.onTick = this.onTick.bind(this)

    return this
  },
  start () {
    this.startTime = new Date().getTime()
    this.onTick()
  },
  onTick () {
    const currentTime = new Date().getTime()

    Events.$emit('raf', {
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
const getGsapRaf = _ => ({
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
    this.gsap.ticker.add(this.onTick)
  },
  onTick (time, deltaTime, frame, elapsed) {
    Events.$emit('raf', {
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
 * Visibility
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
    document.addEventListener('visibilitychange', this.onVisibilityChanged)
  },
  onVisibilityChanged () {
    const hasFocus = !document.hidden

    Events.$emit('visibility', {
      options: this.options,
      hasFocus
    })

    if (hasFocus) {
      Events.$emit('visibility:focus', {
        options: this.options,
        hasFocus
      })
    } else {
      Events.$emit('visibility:blur', {
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
    window.addEventListener('orientationchange', this.onOrientationChanged)
  },
  onOrientationChanged () {
    const orientation = (window.orientation === 90 || window.orientation === -90) ? 'landscape' : 'portrait'

    Events.$emit('orientation', {
      options: this.options,
      orientation
    })

    Events.$emit(`orientation:${orientation}`, {
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

    Events.resize.active = true

    break

  case 'raf':

    (options.isGsapInstalled ? getGsapRaf() : getRaf())
      .init(formattedEvent.options)
      .start()

    Events.raf.active = true
    console.log('ok')

    break

  case 'visibility':
    getVisibility()
      .init(formattedEvent.options)
      .start()

    Events.visibility.active = true

    break

  case 'orientation':
    getOrientation()
      .init(formattedEvent.options)
      .start()

    Events.orientation.active = true

    break

  default:
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
