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
const shareImage = null

export default async _ => {
  const baseConfig = {
    target: 'static',
    css: [],
    plugins: [],
    components: true,
    buildModules: ['@nuxtjs/eslint-module'],
    modules: [],
    build: {},
    signature: {
      force: true,
      name: 'Akaru Studio',
      website: 'https://twitter.com/Akaru_studio',
      facebook: 'https://twitter.com/Akaru_studio',
      twitter: 'https://twitter.com/Akaru_studio',
      team: [
        {
          name: 'Quentin Neyraud',
          status: 'Developer',
          github: 'https://www.github.com/quentinneyraud',
          twitter: 'https://www.twitter.com/quentin_neyraud'
        }
      ],
      libraries: [
        {
          name: 'GSAP',
          author: 'Greensock',
          website: 'https://greensock.com/gsap'
        }, {
          name: 'Nuxt.js',
          author: 'Nuxt',
          website: 'https://nuxtjs.org'
        }
      ],
      fonts: [
        {
          name: 'Comic Sans',
          author: 'Vincent Connare',
          website: 'http://www.connare.com/'
        }
      ],
      icons: [
        {
          name: 'Menu',
          author: 'Tara Nadhifa Salsabila',
          website: 'https://thenounproject.com/taraicon/'
        }
      ]
    }
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
