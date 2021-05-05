import path from 'path'

const MODULE_NAME = 'screen-based-animation'

const DEFAULT_OPTIONS = {
  directiveDefaultOptions: {
    clamp: true,
    callback: null,
    timeline: null,
    cssVars: false,
    datasetAttributes: false,
    lerpRatio: 0.1
  }
}

export default function (moduleOptions) {
  let options = this.options.screenBasedAnimation || moduleOptions || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    directiveDefaultOptions: {
      ...DEFAULT_OPTIONS.directiveDefaultOptions,
      ...options.directiveDefaultOptions
    },
    MODULE_NAME
  }

  // Directive
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/directives/sb-animation.js'),
    fileName: path.join(MODULE_NAME, 'sb-animation.js'),
    options,
    ssr: true
  })
}
