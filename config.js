module.exports = _ => ({
  modules: [
    '~/modules/debug'
  ],
  debug: {
    /**
      Enable module in other environments than dev (Default: false)
     */
    force: false
  }
})
