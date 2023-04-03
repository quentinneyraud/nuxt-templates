module.exports = _ => ({
  modules: ['~/modules/events'],

  events: {
    /**
      Array of event names that will be used (Default: [])
      Availbale events:
        - resize
        - resize-debounced: resize debounced of 300ms
        - tick: use gsap if installed and fallback to requestAnimationFrame otherwise
        - visibility
        - orientation
        - mousemove
     */
    events: []
  }
})
