import defu from 'defu'
import featureConfig from './config'

/**
 * Environment informations
 */
const ENVIRONMENT = process.env.ENV || 'dev'
const IS_DEV = ENVIRONMENT === 'dev'
const IS_PREPROD = ENVIRONMENT === 'preprod'
const IS_PROD = ENVIRONMENT === 'prod'

/**
 * Build mode informations
 */
const MODE = process.env.MODE || 'static'
const BASE_URL = process.env.BASE_URL || {
  dev: 'http://localhost:3000',
  preprod: 'http://preprod.my-site.fr',
  prod: 'http://my-site.fr'
}[ENVIRONMENT] || 'http://my-site.fr'

/**
 * Website informations
 */
const lang = 'en'
const title = 'My company'
const description = 'My company is doing something'
const themeColor = '#FFFFFF'
const shareImage = '/share.jpg'

export default async _ => {
  const baseConfig = {
    target: 'static',
    head: {
      title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    css: [],
    plugins: [],
    components: true,
    buildModules: [
      '@nuxtjs/eslint-module'
    ],
    build: {}
  }

  const config = defu(baseConfig, await featureConfig({
    ENVIRONMENT,
    IS_DEV,
    IS_PREPROD,
    IS_PROD,
    MODE,
    BASE_URL,
    lang,
    title,
    description,
    shareImage,
    themeColor
  }))

  /**
    Override config here
   */

  // ...

  return config
}
