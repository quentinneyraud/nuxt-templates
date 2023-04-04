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
      eventsState: {
        resize: false,
        resizeDebounced: false,
        tick: false,
        visibility: false,
        orientation: false,
        mousemove: false
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
  init () {
    this.onResize = this.onResize.bind(this)

    return this
  },
  start () {
    window.addEventListener('resize', this.onResize)
  },
  onResize () {
    this.emitEvent()
  },
  emitEvent () {
    Events.$emit('resize')
  }
})

/**
 *
 * Resize debounced
 *
 */
const getResizeDebounced = _ => ({
  init () {
    this.onResize = this.onResize.bind(this)

    this.callback = debounce(this.onResize, 300)

    return this
  },
  start () {
    window.addEventListener('resize', this.callback)
  },
  onResize () {
    this.emitEvent()
  },
  emitEvent () {
    Events.$emit('resize-debounced')
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
  init () {
    this.onTick = this.onTick.bind(this)

    return this
  },
  start () {
    this.startTime = new Date().getTime()
    this.onTick()
  },
  onTick () {
    const currentTime = new Date().getTime()

    Events.$emit('tick', {
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
  init () {
    this.onTick = this.onTick.bind(this)

    // eslint-disable-next-line no-undef
    this.gsap = require('gsap').default

    return this
  },
  start () {
    this.gsap.ticker.add(this.onTick)
  },
  onTick (time, deltaTime, frame, elapsed) {
    Events.$emit('tick', {
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
  init () {
    this.onVisibilityChanged = this.onVisibilityChanged.bind(this)

    return this
  },
  start () {
    document.addEventListener('visibilitychange', this.onVisibilityChanged)
  },
  onVisibilityChanged () {
    const hasFocus = !document.hidden

    Events.$emit('visibility', {
      hasFocus
    })

    if (hasFocus) {
      Events.$emit('visibility:focus')
    } else {
      Events.$emit('visibility:blur')
    }
  }
})

/**
 *
 * Orientation
 *
 */
const getOrientation = _ => ({
  init () {
    this.onOrientation = this.onOrientationChanged.bind(this)

    return this
  },
  start () {
    window.addEventListener('orientationchange', this.onOrientationChanged)
  },
  onOrientationChanged () {
    const orientation = (window.orientation === 90 || window.orientation === -90) ? 'landscape' : 'portrait'

    Events.$emit('orientation', {
      orientation
    })

    Events.$emit(`orientation:${orientation}`)
  }
})

/**
 *
 * Mousemove
 *
 */
const getMouseMove = _ => ({
  init () {
    this.onMouseMove = this.onMouseMove.bind(this)

    return this
  },
  start () {
    window.addEventListener('mousemove', this.onMouseMove)
  },
  onMouseMove (event) {
    Events.$emit('mousemove', event)
  }
})

/**
 *
 * Init events
 *
 */
const options = JSON.parse('<%= JSON.stringify(options) %>')

options.events.forEach(event => {
  switch (event) {
    case 'resize':
      getResize()
        .init()
        .start()

      Events.eventsState.resize = true

      break

    case 'resize-debounced':
      getResizeDebounced()
        .init()
        .start()

      Events.eventsState.resizeDebounced = true

      break

    case 'tick':
      (options.isGsapInstalled ? getGsapTicker() : getRaf())
        .init()
        .start()

      Events.eventsState.tick = true

      break

    case 'visibility':
      getVisibility()
        .init()
        .start()

      Events.eventsState.visibility = true

      break

    case 'orientation':
      getOrientation()
        .init()
        .start()

      Events.eventsState.orientation = true

      break

    case 'mousemove':
      getMouseMove()
        .init()
        .start()

      Events.eventsState.mousemove = true

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
