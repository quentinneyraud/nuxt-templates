import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'screen-based-animation'

const DEFAULT_OPTIONS = {
  directiveOptions: {
    clamp: true,
    callback: null,
    timeline: null,
    cssVars: false,
    datasetAttributes: false,
    lerpRatio: 0.1
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
