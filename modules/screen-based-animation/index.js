import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'screen-based-animation'

const DEFAULT_OPTIONS = {
  directiveOptions: {
    active: true,
    clamp: true,
    callback: null,
    timeline: null,
    cssVars: false,
    lerped: true,
    lerpRatio: 0.1,
    normalized: true,
    observerMargins: 100
  }
}

export default function (moduleOptions) {
  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], this.options.screenBasedAnimation, DEFAULT_OPTIONS),
    MODULE_NAME
  }

  // Directive
  this.addPlugin({
    src: path.resolve(__dirname, 'directives/sb-animation.js'),
    fileName: path.join(MODULE_NAME, 'directives/sb-animation.js'),
    options,
    ssr: true
  })
}
