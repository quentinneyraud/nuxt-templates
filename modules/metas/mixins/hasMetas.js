import constructMetas from '../constructMetas'

export default {
  head () {
    return this.getMetas()
  },
  methods: {
    getMetas () {
      if (!this.metas) return

      const title = this.metas.title
      const description = this.metas.description
      const url = this.$config.BASE_URL ? this.$config.BASE_URL + this.$route.fullPath : null
      const image = this.metas.image

      return constructMetas({
        title,
        description,
        url,
        image
      })
    }
  }
}
