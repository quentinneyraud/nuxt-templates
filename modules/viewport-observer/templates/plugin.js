import Vue from 'vue'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const DEFAULT_CONFIG = options.defaultConfig

class Observer {
  constructor (el, options) {
    this.el = el
    this.isIntersecting = false

    this.bindMethods()
    this.createObserver(options)
  }

  bindMethods () {
    this.handleIntersect = this.handleIntersect.bind(this)
  }

  createObserver (options) {
    if (this.observer) {
      this.destroyObserver()
    }

    this.options = Object.assign({}, DEFAULT_CONFIG, options)

    this.observer = new IntersectionObserver(
      this.handleIntersect,
      {
        root: null,
        rootMargin: `0px 0px ${-this.options.offset}px 0px`,
        threshold: this.options.threshold
      }
    )

    if (this.options.active) {
      this.observe()
    }
  }

  observe () {
    this.observer.observe(this.el)
  }

  unobserve () {
    this.observer.unobserve(this.el)
  }

  handleIntersect (entries) {
    let entry = entries[0]

    // Fix bug multiple entries
    if (entries.length > 1) {
      const intersectingEntry = entries.find(e => e.isIntersecting)
      if (intersectingEntry) {
        entry = intersectingEntry
      }
    }

    const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= this.options.threshold

    if (isIntersecting === this.isIntersecting) return

    if (isIntersecting) {
      this.onEnter()

      if (this.options.once) {
        this.unobserve()
      }
    } else {
      this.onLeave()
    }
  }

  onEnter () {
    this.isIntersecting = true

    this.el.classList.add(this.options.activeClass)

    window.setTimeout(_ => {
      this.options?.onChange?.({
        el: this.el,
        options: this.options,
        observer: this.observer,
        isVisible: this.isVisible
      })

      this.options?.onEnter?.({
        el: this.el,
        options: this.options,
        observer: this.observer
      })
    }, this.options.delay)
  }

  onLeave () {
    this.isIntersecting = false

    this.el.classList.remove(this.options.activeClass)

    this.options?.onChange?.({
      el: this.el,
      options: this.options,
      observer: this.observer,
      isVisible: this.isVisible
    })

    this.options?.onLeave?.({
      el: this.el,
      options: this.options,
      observer: this.observer
    })
  }

  destroyObserver () {
    this.observer?.disconnect()
    this.observer = null
  }
}

function bind (el, { value }) {
  console.log('bind')
  if (!value) return

  const state = new Observer(el, value)

  el._vue_visibilityState = state
}

function update (el, { value }) {
  const state = el._vue_visibilityState

  if (!value) {
    unbind(el)
    return
  }

  if (state) {
    const equal = Object.keys(value)
      .every(k => {
        return (value[k] === state.options[k])
      })

    if (!equal) state.createObserver(value)
  } else {
    bind(el, { value })
  }
}

function unbind (el) {
  const state = el._vue_visibilityState

  if (state) {
    state.destroyObserver()
    delete el._vue_visibilityState
  }
}

Vue.directive('observe', {
  bind,
  update,
  unbind
})
