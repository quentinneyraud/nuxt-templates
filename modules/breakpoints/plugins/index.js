import Vue from 'vue'

const options = JSON.parse('<%= JSON.stringify(options) %>')

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export default (_, inject) => {
  const breakpoints = new Vue({
    data () {
      return {
        ...Object.keys(options.breakpoints).reduce((acc, curr) => {
          const capitalizedBreakpointName = capitalize(curr)
          acc[`gt${capitalizedBreakpointName}`] = null
          acc[`gte${capitalizedBreakpointName}`] = null
          acc[`lt${capitalizedBreakpointName}`] = null
          acc[`lte${capitalizedBreakpointName}`] = null
          return acc
        }, {})
      }
    },
    created () {
      this.setAllBreakpointValues(options.defaultwindowWidth)
      if (process.browser) {
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.addEventListener('resize', _ => this.setAllBreakpointValues())
      }
    },
    methods: {
      setBreakpointValues (breakpointName, breakpointValue, width) {
        const capitalizedBreakpointName = capitalize(breakpointName)
        this[`gt${capitalizedBreakpointName}`] = width > breakpointValue
        this[`gte${capitalizedBreakpointName}`] = width >= breakpointValue
        this[`lt${capitalizedBreakpointName}`] = width < breakpointValue
        this[`lte${capitalizedBreakpointName}`] = width <= breakpointValue
      },
      setAllBreakpointValues (width) {
        Object.entries(options.breakpoints).forEach(
          ([breakpointName, breakpointValue]) => {
            this.setBreakpointValues(
              breakpointName,
              breakpointValue,
              width || window.innerWidth
            )
          }
        )
        this.$emit('update')
      }
    }
  })

  if (process.client) {
    window.onNuxtReady(() => {
      breakpoints.setAllBreakpointValues()
    })
  }

  inject('breakpoints', breakpoints)
}
