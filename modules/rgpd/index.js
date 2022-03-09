import path from 'path'
import defu from 'defu'

const MODULE_NAME = 'rgpd'

export default function (moduleOptions) {
  const DEFAULT_OPTIONS = {
    version: '1',
    cookieName: 'RGPD_COOKIES',
    cookieExpiresAfterDays: 90,
    deleteCookieOnInit: this.options.dev
  }

  const options = {
    ...defu(moduleOptions, this.options[MODULE_NAME], DEFAULT_OPTIONS),
    MODULE_NAME
  }

  // Components
  this.addPlugin({
    src: path.resolve(__dirname, 'components/index.js'),
    fileName: path.join(MODULE_NAME, 'components/index.js'),
    options,
    ssr: true
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'components/RgpdBanner.vue'),
    fileName: path.join(MODULE_NAME, 'components/RgpdBanner.vue'),
    options,
    ssr: true
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'components/RgpdPopup.vue'),
    fileName: path.join(MODULE_NAME, 'components/RgpdPopup.vue'),
    options,
    ssr: true
  })

  // Plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })
}
