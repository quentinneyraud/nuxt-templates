import nuxtMiddleware from '../../middleware'

const prismicTranslations = context => {
  const { app } = context

  app.$prismicTranslations.setLocale(app.i18n.localeProperties.prismicCode)
}

nuxtMiddleware.prismicTranslations = prismicTranslations
