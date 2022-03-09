module.exports = _ => ({
  modules: [
    '~/modules/audio'
  ],
  device: {
    defaultwindowWidth: 1440,
    breakpoints: {
      small: 576,
      medium: 768,
      large: 992,
      xlarge: 1200,
      xxlarge: 1440,
      xxxlarge: 1920
    }
  }
})
