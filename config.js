module.exports = _ => ({
  modules: [
    '~/modules/screen-based-animation'
  ],
  screenBasedAnimation: {
    /**
      Directive options

      Override in template:

      v-sb-animation="{
        ...options
      }"
     */
    directiveOptions: {
      /**
        Control if directive is active (Default: true)
       */
      active: true,

      /**
        Values clamping (Default: true)
       */
      clamp: true,

      /**
        Add css variables on element (Default: false)
       */
      cssVars: false,

      /**
        Create lerped values (Default: true)
       */
      lerped: true,

      /**
        Lerp ratio used to create lerped values (Default: 0.1)
       */
      lerpRatio: 0.1,

      /**
        Create normalized values (Default: true)
       */
      normalized: true,

      /**
        Top and bottom margins (in px) where we start to compute values
       */
      observerMargins: 100
    }
  }
})
