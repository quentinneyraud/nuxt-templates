// Recursive get all documents (bypass 100 results limit)
export const getAll = async (prismic, documentType, queryOptions) => {
  const fetch = async (acc, page = 1) => {
    const document = await prismic.api.query(
      prismic.predicates.at('document.type', documentType),
      {
        ...queryOptions,
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
