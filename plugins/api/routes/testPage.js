/* eslint-disable camelcase */
import Formatter from '../utils/Formatter.js'

export default app => async _ => {
  try {
    const document = await app.$prismic.api.getSingle('test_api_module')

    const elements = []

    // elements.push({
    //   name: 'Title',
    //   raw: document.data.title,
    //   formatted: Formatter.formatRichText(document.data.title)
    // })

    // elements.push({
    //   name: 'RichText',
    //   raw: document.data.richtext,
    //   formatted: Formatter.formatRichText(document.data.richtext)
    // })

    // elements.push({
    //   name: 'Image',
    //   raw: document.data.images,
    //   formatted: document.data.images
    //     .map(({ image, image_responsive }) => ({
    //       image: Formatter.formatImage(image, {
    //         includeDimensions: true
    //       }),
    //       image_responsive: Formatter.formatImage(image_responsive, {
    //         includeDimensions: true
    //       })
    //     }))
    // })

    // elements.push({
    //   name: 'Content relationship',
    //   raw: document.data.content_relationship,
    //   formatted: Formatter.formatRelationship(document.data.content_relationship)
    // })

    // elements.push({
    //   name: 'Links',
    //   raw: document.data.links,
    //   formatted: document.data.links
    //     .map(({ link }) => Formatter.formatLink(link))
    // })

    // elements.push({
    //   name: 'Links to media',
    //   raw: document.data.links_to_media,
    //   formatted: document.data.links_to_media
    //     .map(({ link_to_media }) => Formatter.formatLinkToMedia(link_to_media))
    // })

    // elements.push({
    //   name: 'Date',
    //   raw: document.data.date,
    //   formatted: Formatter.formatDate(document.data.date)
    // })

    // elements.push({
    //   name: 'Timestamp',
    //   raw: document.data.timestamp,
    //   formatted: Formatter.formatTimestamp(document.data.timestamp)
    // })

    // elements.push({
    //   name: 'Color',
    //   raw: document.data.color,
    //   formatted: Formatter.formatColor(document.data.color, {
    //     convertToRgb: true
    //   })
    // })

    // elements.push({
    //   name: 'Number',
    //   raw: document.data.number,
    //   formatted: Formatter.formatNumber(document.data.number)
    // })

    // elements.push({
    //   name: 'Key text',
    //   raw: document.data.key_texts,
    //   formatted: document.data.key_texts
    //     .map(({ key_text }) => Formatter.formatKeyText(key_text))
    // })

    // elements.push({
    //   name: 'Selects',
    //   raw: document.data.select,
    //   formatted: {
    //     select: Formatter.formatSelect(document.data.select),
    //     select_with_mapping: Formatter.formatSelect(document.data.select, {
    //       valueMapping: {
    //         'option 1': 'red',
    //         'option 2': 'green',
    //         'option 3': 'blue'
    //       }
    //     })
    //   }
    // })

    // elements.push({
    //   name: 'Boolean',
    //   raw: document.data.boolean,
    //   formatted: document.data.boolean
    // })

    // elements.push({
    //   name: 'Embeds',
    //   raw: document.data.embeds,
    //   formatted: document.data.embeds
    //     .map(({ embed }) => Formatter.formatEmbed(embed, ['type']))
    // })

    // elements.push({
    //   name: 'Geopoint',
    //   raw: document.data.geopoint,
    //   formatted: document.data.geopoint
    // })

    return {
      elements
    }
  } catch (err) {
    console.log('err:', err)
  }
}
