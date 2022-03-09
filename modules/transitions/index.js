import path from 'path'

const MODULE_NAME = 'transitions'

const DEFAULT_OPTIONS = {}

export default function (moduleOptions) {
  let options = this.options[MODULE_NAME] || moduleOptions || {}

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    MODULE_NAME
  }

  // Add transition mixin alias
  this.options.alias.hasTransition = path.resolve(__dirname, 'mixins/hasTransition.js')

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/transition-bus.js'),
    fileName: path.join(MODULE_NAME, 'plugins/transition-bus.js'),
    options,
    ssr: true
  })

  // Components
  this.addPlugin({
    src: path.resolve(__dirname, 'components/index.js'),
    fileName: path.join(MODULE_NAME, 'components/index.js'),
    options,
    ssr: true
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'components/PageTransition.vue'),
    fileName: path.join(MODULE_NAME, 'components/PageTransition.vue'),
    options
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'components/PageLoader.vue'),
    fileName: path.join(MODULE_NAME, 'components/PageLoader.vue'),
    options
  })
}
