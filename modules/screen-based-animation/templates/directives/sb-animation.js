import Vue from 'vue'

const MODULE_OPTIONS = JSON.parse('<%= JSON.stringify(options) %>')

const lerp = (value, target, coeff) => {
  return value * (1 - coeff) + target * coeff
}

class ScreenBased {
  constructor (el, options) {
    this.el = el
    this.options = Object.assign({}, MODULE_OPTIONS.directiveOptions, options)
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

  createObserver () {
    this.observer = new IntersectionObserver(
      this.handleIntersect,
      {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px'
      }
    )
    this.observer.observe(this.el)
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

      this.onTick()
    } else {
      window.cancelAnimationFrame(this.rafId)
    }
  }

  observe () {
    this.observer.observe(this.el)
  }

  unobserve () {
    this.observer.unobserve(this.el)
  }

  onTick () {
    this.rafId = window.requestAnimationFrame(this.onTick)

    this.progress.current = this.getProgress()
    this.progress.lerped = lerp(this.progress.lerped, this.progress.current, this.options.lerpRatio)

    this.nProgress.current = this.progress.current * 2 - 1
    this.nProgress.lerped = this.progress.lerped * 2 - 1

    if (this.options.cssVars) this.setCssVars()
    if (this.options.datasetAttributes) this.setDatasetAttributes()

    this.options?.callback?.({
      current: this.progress.current,
      lerped: this.progress.lerped,
      nCurrent: this.nProgress.current,
      nLerped: this.nProgress.lerped
    })

    this.options?.timeline?.progress(this.progress.current)
  }

  getProgress () {
    const { top, height } = this.el.getBoundingClientRect()
    return (top + height) / (window.innerHeight + height)
  }

  setCssVars () {
    this.el.style.setProperty('--current-progress', this.progress.current)
    this.el.style.setProperty('--lerped-progress', this.progress.lerped)

    this.el.style.setProperty('--current-nprogress', this.nProgress.current)
    this.el.style.setProperty('--lerped-nprogress', this.nProgress.lerped)
  }

  setDatasetAttributes () {
    this.el.dataset.currentProgress = this.progress.current
    this.el.dataset.lerpedProgress = this.progress.lerped

    this.el.dataset.currentNProgress = this.nProgress.current
    this.el.dataset.lerpedNProgress = this.nProgress.lerped
  }
}

function bind (el, { value }, vnode) {
  const state = new ScreenBased(el, value, vnode.context.$events)

  el._vue_sb_animation = state
}

// function update (el, { value }, vnode) {
//   const state = el._vue_visibilityState

//   if (state) {
//     const equal = Object.keys(value || {})
//       .every(k => {
//         return (value[k] === state.options[k])
//       })

//     if (!equal) {
//       state.createObserver(value)
//       if (state.options.active && vnode.context.$viewportObserverState.active) {
//         state.observe()
//       }
//     }

//     if (state.isIntersecting) {
//       state.addClass()
//     }
//   } else {
//     bind(el, { value })
//   }
// }

function unbind (el) {
  const state = el._vue_sb_animation

  if (state) {
    delete el._vue_sb_animation
  }
}

Vue.directive('sb-animation', {
  bind,
  // update,
  unbind
})
