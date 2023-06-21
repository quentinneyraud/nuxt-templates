import { toArrayIfNeeded } from './helpers'

const pick = (obj, keys) => {
  if (!obj) return null

  return keys
    .reduce((acc, curr) => {
      if (obj[curr]) acc[curr] = obj[curr]

      return acc
    }, {})
}

// Recursive get all documents (bypass 100 results limit)
export const getAll = async (app, documentType, predicates = [], queryOptions) => {
  const fetch = async (acc, page = 1) => {
    const document = await app.$prismic.api.query([
      app.$prismic.predicates.at('document.type', documentType),
      ...(Array.isArray(predicates) ? predicates : [])
    ],
    {
      ...queryOptions,
      lang: app.$config.LOCALE,
      pageSize: 100,
      page
    }
    )

    acc.push(...document.results)

    if (document.next_page) {
      await fetch(acc, page + 1)
    }

    return acc
  }

  return await fetch([], 1)
}

export const getTranslations = async (app, keys) => {
  keys = toArrayIfNeeded(keys)

  const document = (await app.$prismic.api.getSingle('global', {
    lang: app.$config.LOCALE,
    graphQuery: `{
      global {
        translations
      }
    }`
  })).data

  return pick(document.translations[0], keys)
}
