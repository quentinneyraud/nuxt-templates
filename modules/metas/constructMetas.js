export default ({ title, description, url, image }) => {
  const metas = {}

  // Title
  if (title) {
    if (!metas.meta) metas.meta = []

    metas.title = title

    metas.meta.push({
      hid: 'og:title',
      property: 'og:title',
      content: title
    })

    metas.meta.push({
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title
    })
  }

  // Description
  if (description) {
    if (!metas.meta) metas.meta = []

    metas.meta.push({
      hid: 'description',
      name: 'description',
      content: description
    })

    metas.meta.push({
      hid: 'og:description',
      property: 'og:description',
      content: description
    })

    metas.meta.push({
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    })
  }

  // Image
  if (image) {
    if (!metas.meta) metas.meta = []

    metas.meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: image
    })

    metas.meta.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: image
    })
  }

  if (url) {
    if (!metas.meta) metas.meta = []

    metas.meta.push({
      hid: 'og:url',
      property: 'og:url',
      content: url
    })
  }

  return metas
}
