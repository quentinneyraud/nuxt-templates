module.exports = _ => ({
  modules: [
    '~/modules/viewport-observer'
  ],
  viewportObserver: {
    /**
      Add an helper to toggle activeClass (Default: true in dev)
     */
    helper: true,

    /**
      Default directive options

      Override in template:

      v-observe="{
        ...options
      }"
     */
    directiveOptions: {
      /**
        Class name added to elements when they enter the viewport (Default: 'in-view')
       */
      activeClass: 'in-view',

      /**
        Intersection observer threshold (Default: 0)
       */
      threshold: 0,

      /**
        Intersection observer rootMargin bottom (in px) (Default: 0)

        Negative value means 'n pixels before entering the viewport'
        Positive value means 'After entering the viewport of n pixels'
       */
      offset: 0,

      /**
        Watch only when element enter in the viewport (Default: true)
       */
      once: true
    }
  }
})
