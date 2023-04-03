module.exports = _ => ({
  modules: ['~/modules/pixel-perfect'],

  pixelPerfect: {
    /**
      Enable module in other environments than dev (Default: false)
     */
    force: false,

    /**
      Array of mockups paths relative to directory option (Default: [])
      Each item can be a string or an object which associate a route name

      Example :

      [{
        routeName: 'about'
        src: 'page_about.png',
       },
        'page_press.png'
      ]
     */
    mockups: [],

    /**
      Mockups directory name (Default: 'pixel-perfect')
     */
    directory: 'pixel-perfect',

    /**
      Use routeName key in mockups option to determine which mockup is displayed (Default: true)
     */
    changeOnNavigation: true
  }
})
