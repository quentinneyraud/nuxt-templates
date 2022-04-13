import Vue from 'vue'

const MODULE_OPTIONS = JSON.parse('<%= JSON.stringify(options) %>')

const lerp = (value, target, coeff) => {
  if (Math.abs(target - value) < 0.001) return target
  return value * (1 - coeff) + target * coeff
}

class ScreenBased {
  constructor (el, options, eventsPlugin) {
    this.el = el
    this.options = Object.assign({}, MODULE_OPTIONS.directiveOptions, options)
    this.eventsPlugin = eventsPlugin

    this.ref = this.el.querySelector('[data-watch]') || this.options.el || this.el
    this.rafId = null

    this.progress = {
      current: 0,
      lerped: 0
    }
    this.nProgress = {
      current: 0,
      lerped: 0
    }

    this.onTick = this.onTick.bind(this)
    this.handleIntersect = this.handleIntersect.bind(this)

    this.createObserver()
  }

  start () {
    this.observer.observe(this.ref)
  }

  stop () {
    this.eventsPlugin?.$off('tick', this.onTick) || window.cancelAnimationFrame(this.rafId)
    this.observer.unobserve(this.ref)
  }

  createObserver () {
    this.observer = new IntersectionObserver(
      this.handleIntersect,
      {
        threshold: 0,
        rootMargin: `${this.options.observerMargins}px 0px ${this.options.observerMargins}px 0px`
      }
    )
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

    const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= 0

    if (isIntersecting) {
      const progress = this.getProgress()

      this.progress.current = progress
      this.progress.lerped = progress

      if (this.eventsPlugin) {
        this.eventsPlugin.$on('tick', this.onTick)
      } else {
        const onTick = _ => {
          this.onTick()
          this.rafId = requestAnimationFrame(onTick)
        }

        onTick()
      }
    } else {
      this.eventsPlugin?.$off('tick', this.onTick) || window.cancelAnimationFrame(this.rafId)
    }
  }

  onTick () {
    this.progress.current = this.getProgress()
    if (this.options.lerped) this.progress.lerped = lerp(this.progress.lerped, this.progress.current, this.options.lerpRatio)

    if (this.options.normalized) this.nProgress.current = this.progress.current * 2 - 1
    if (this.options.normalized && this.options.lerped) this.nProgress.lerped = this.progress.lerped * 2 - 1

    if (this.options.cssVars) this.setCssVars()

    this.options?.callback?.({
      current: this.progress.current,
      lerped: this.options.lerped ? this.progress.lerped : undefined,
      nCurrent: this.options.normalized ? this.nProgress.current : undefined,
      nLerped: this.options.lerped && this.options.normalized ? this.nProgress.lerped : undefined
    })

    this.options?.timeline?.progress(this.progress.current)
  }

  getProgress () {
    const { top, height } = this.ref.getBoundingClientRect()
    const progress = (top + height) / (window.innerHeight + height)

    return this.options.clamp
      ? Math.min(Math.max(progress, 0), 1)
      : progress
  }

  setCssVars () {
    this.el.style.setProperty('--sbp', this.progress.current)
    if (this.options.lerped) this.el.style.setProperty('--lsbp', this.progress.lerped)

    if (this.options.normalized) this.el.style.setProperty('--sbpn', this.nProgress.current)
    if (this.options.normalized && this.options.lerped) this.el.style.setProperty('--lsbpn', this.nProgress.lerped)
  }
}

function bind (el, { value }, { context }) {
  const eventsPlugin = context?.$events?.eventsState?.tick ? context?.$events : null

  const state = new ScreenBased(el, value, eventsPlugin)

  if (state.options.active) state.start()

  el._vue_sb_animation = state
}

function update (el, { value }) {
  const state = el._vue_sb_animation

  if (state) {
    const equal = Object.keys(value || {})
      .every(k => {
        return (value[k] === state.options[k])
      })

    if (!equal) {
      state.options = Object.assign({}, MODULE_OPTIONS.directiveDefaultOptions, value)

      if (state.options.active) {
        state.start()
      } else {
        state.stop()
      }
    }
  } else {
    bind(el, { value })
  }
}

function unbind (el) {
  const state = el._vue_sb_animation

  if (state) delete el._vue_sb_animation
}

Vue.directive('sb-animation', {
  bind,
  update,
  unbind
})
