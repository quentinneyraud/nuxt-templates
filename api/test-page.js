import Formatter from '../utils/Formatter.js'

export default app => async _ => {
  try {
    const document = await app.$prismic.api.getSingle('test_api_module')

    const formatted = {}

    formatted.title = Formatter.formatRichText(document.data.title) + 'CCC'
    formatted.richtext = Formatter.formatRichText(document.data.richtext)
    formatted.image = Formatter.formatImage(document.data.image)
    formatted.content_relationship = document.data.content_relationship

    formatted.links = document.data.links
      .map(({ link }) => Formatter.formatLink(link))

    formatted.links_to_media = document.data.links_to_media
    formatted.date = document.data.date
    formatted.timestamp = document.data.timestamp
    formatted.color = document.data.color
    formatted.number = document.data.number
    formatted.key_text = document.data.key_text
    formatted.selects = document.data.selects
    formatted.boolean = document.data.boolean

    formatted.embeds = document.data.embeds
      .map(({ embed }) => Formatter.formatEmbed(embed, ['type']))

    formatted.geopoint = document.data.geopoint

    return {
      raw: document.data,
      formatted
    }
  } catch (err) {
    console.log('err:', err)
  }
}
