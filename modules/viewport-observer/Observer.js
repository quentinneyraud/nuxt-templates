export default class Observer {
  constructor (el, options) {
    this.el = el
    this.context = window.$nuxt
    this.mergeOptions(options)

    this.isIntersecting = false

    this.bindMethods()

    this.create()
    this.watchObserverState()
    if (this.context.$viewportObserverHelper.active) this.watchHelper()
  }

  mergeOptions (options) {
    this.options = Object.assign({}, {
      autoOffset: false,
      activeClass: 'in-view',
      threshold: 0,
      offset: 0,
      once: true
    }, options)
  }

  bindMethods () {
    this.observe = this.observe.bind(this)
    this.handleIntersect = this.handleIntersect.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  create () {
    if (this.observer) {
      this.destroy()
    }

    if (this.options.autoOffset) {
      this.setAutoOffset()
      window.addEventListener('resize', this.onResize)
    }

    this.observer = new IntersectionObserver(
      this.handleIntersect,
      {
        root: null,
        rootMargin: `0px 0px ${-this.options.offset}px 0px`,
        threshold: this.options.threshold
      }
    )
  }

  watchObserverState () {
    if (this.context.$viewportObserverState.active) {
      this.observe()
    } else {
      this.context.$watch(_ => this.context.$viewportObserverState.active, this.observe)
    }
  }

  watchHelper () {
    this.context.$watch(_ => this.context.$viewportObserverHelper.show, _ => {
      if (!this.isIntersecting) return

      if (this.context.$viewportObserverHelper.show) {
        this.addClass()
      } else {
        this.removeClass()
      }
    })
  }

  observe () {
    this.observer?.observe(this.el)
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
      this.onEnter({ entry })

      if (this.options.once) {
        this.unobserve()
      }
    } else {
      this.onLeave({ entry })
    }
  }

  onEnter ({ entry }) {
    this.isIntersecting = true

    if (this.context.$viewportObserverHelper.active && this.context.$viewportObserverHelper.show) this.addClass()

    this.options?.onChange?.({
      el: this.el,
      options: this.options,
      observer: this.observer,
      entry,
      isVisible: this.isVisible
    })

    this.options?.onEnter?.({
      el: this.el,
      options: this.options,
      observer: this.observer,
      entry
    })
  }

  onLeave ({ entry }) {
    this.isIntersecting = false

    this.options?.onChange?.({
      el: this.el,
      options: this.options,
      observer: this.observer,
      entry,
      isVisible: this.isVisible
    })

    this.options?.onLeave?.({
      el: this.el,
      options: this.options,
      entry,
      observer: this.observer
    })
  }

  addClass () {
    this.el.classList.add(this.options.activeClass)
  }

  removeClass () {
    this.el.classList.remove(this.options.activeClass)
  }

  setAutoOffset () {
    this.options.offset = window.innerHeight / 3
  }

  onResize () {
    this.setAutoOffset()
  }

  destroy () {
    this.observer?.disconnect()
    this.observer = null
    window.removeEventListener('resize', this.onResize)
  }
}
