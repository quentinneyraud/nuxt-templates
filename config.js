module.exports = _ => ({
  modules: [
    '~/modules/device'
  ],
  device: {
    /**
     * Simulated window width in SSR mode (Default: 1440)
     */
    // defaultWindowWidth: 1440,

    /**
     * List of breakpoints where key is the name of the breakpoint and value is the window width
     * Key is used to create plugins keys ('tablet' will create 'gtTablet', 'gteTablet', 'ltTablet', 'lteTablet')
     */
    // breakpoints: {
    //   small: 576,
    //   medium: 768,
    //   large: 992,
    //   xlarge: 1200,
    //   xxlarge: 1440,
    //   xxxlarge: 1920
    // }
  }
})
