module.exports = _ => ({
  modules: [
    '~/modules/pixel-perfect'
  ],
  pixelPerfect: {
    images: [
      // {
      //   src: 'page_about.png',
      //   route: 'about'
      // },
      // 'page_press.png'
    ],
    force: false,
    directory: 'pixel-perfect',
    changeOnNavigation: false
  }
})
