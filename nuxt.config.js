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
const BASE_URL = process.env.BASE_URL
const IS_INDEXED = process.env.IS_INDEXED ? process.env.IS_INDEXED === 'true' : IS_PROD

/**
 * Website informations
 */
const lang = 'en'
const title = 'My company'
const description = 'My company is doing something'
const themeColor = '#FFFFFF'
const shareImage = null

export default async _ => {
  const baseConfig = {
    target: 'static',
    css: [],
    plugins: [],
    components: true,
    buildModules: [
      '@nuxtjs/eslint-module'
    ],
    modules: [],
    build: {}
  }

  const config = defu(baseConfig, await featureConfig({
    ENVIRONMENT,
    IS_DEV,
    IS_PREPROD,
    IS_PROD,
    MODE,
    BASE_URL,
    IS_INDEXED,
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
