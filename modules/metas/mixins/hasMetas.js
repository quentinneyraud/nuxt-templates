export default {
  head () {
    if (!this.metas) return

    const title = this.metas.title
    const description = this.metas.description
    const url = this.$config.BASE_URL ? this.$config.BASE_URL + this.$route.fullPath : null
    const image = this.metas.image

    const metas = {}

    // title
    if (title) {
      if (!metas.meta) metas.meta = []

      // document title
      metas.title = title

      // og title
      metas.meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: title
      })
    }

    // description
    if (description) {
      if (!metas.meta) metas.meta = []

      // document description
      metas.meta.push({
        hid: 'description',
        name: 'description',
        content: description
      })

      // og description
      metas.meta.push({
        hid: 'og:description',
        name: 'og:description',
        content: description
      })
    }

    if (image) {
      if (!metas.meta) metas.meta = []

      // og image
      metas.meta.push({
        hid: 'og:image',
        name: 'og:image',
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
}
