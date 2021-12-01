import nuxtMiddleware from '../../middleware'

const prismicTranslations = context => {
  if (context.app.i18n) context.app.$prismicTranslations.setLocale(context.app.i18n.localeProperties.prismicCode)
}

nuxtMiddleware.prismicTranslations = prismicTranslations
