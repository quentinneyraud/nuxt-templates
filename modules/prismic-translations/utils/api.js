import Prismic from '@prismicio/client'

export const getTranslations = async ({ endpoint, customTypeId }) => {
  const api = await Prismic.getApi(endpoint)

  const document = await api.query(
    Prismic.Predicates.at('document.type', customTypeId),
    {
      lang: '*'
    }
  )

  return document.results
    .map(result => {
      let { custom_type_title: _, ...translations } = result.data

      translations = Object.entries(translations)
        .reduce((acc, [key, value] = []) => {
          if (Array.isArray(value) && value.length > 0) {
            Object.entries(value[0])
              .forEach(([inGroupKey, inGroupValue]) => {
                acc[`${key}.${inGroupKey}`] = inGroupValue
              })
          } else {
            acc[key] = value
          }

          return acc
        }, {})

      return {
        locale: result.lang,
        translations
      }
    })
}
