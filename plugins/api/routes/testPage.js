/* eslint-disable camelcase */
import Formatter from '../utils/Formatter.js'
import { formatSlices, getSlicesQueries } from '../utils/slices.js'

export default app => async _ => {
  const document = await app.$prismic.api.getSingle('test_api_module', {
    graphQuery: `{
        test_api_module {
          ...test_api_moduleFields
          body {
            ${getSlicesQueries(['first_slice', 'second_slice'])}
          }
        }
      }`
  })

  const elements = []

  elements.push({
    name: 'Title',
    hash: 'title',
    raw: document.data.title,
    formatted: Formatter.formatTitle(document.data.title)
  })

  elements.push({
    name: 'RichText',
    hash: 'richtext',
    raw: document.data.richtext,
    formatted: [
      Formatter.formatRichText(document.data.richtext),
      Formatter.formatRichText(document.data.richtext, { ellispsis: { maxChars: 80 } })
    ]
  })

  elements.push({
    name: 'Image',
    hash: 'image',
    raw: document.data.images,
    formatted: document.data.images
      .map(({ image, image_responsive }) => ({
        image: Formatter.formatImage(image, {
          includeDimensions: true
        }),
        image_responsive: Formatter.formatImage(image_responsive, { views: ['Footer', 'Main'] })
      }))
  })

  elements.push({
    name: 'Content relationship',
    hash: 'content-relationship',
    raw: document.data.content_relationship,
    formatted: Formatter.formatRelationship(document.data.content_relationship)
  })

  elements.push({
    name: 'Links',
    hash: 'links',
    raw: document.data.links,
    formatted: document.data.links
      .map(({ link }) => Formatter.formatLink(link))
  })

  elements.push({
    name: 'Links to media',
    hash: 'links-to-media',
    raw: document.data.links_to_media,
    formatted: document.data.links_to_media
      .map(({ link_to_media }) => Formatter.formatLinkToMedia(link_to_media))
  })

  elements.push({
    name: 'Date',
    hash: 'date',
    raw: document.data.date,
    formatted: [
      Formatter.formatDate(document.data.date, { locale: 'fr' }),
      Formatter.formatDate(document.data.date, {
        locale: 'en',
        format: ({ weekday, day, month }) => `${weekday}, ${month} ${day}${day > 3 ? 'th' : ['st', 'nd', 'rd'][day - 1]}`
      })
    ]
  })

  elements.push({
    name: 'Timestamp',
    hash: 'timestamp',
    raw: document.data.timestamp,
    formatted: Formatter.formatTimestamp(document.data.timestamp)
  })

  elements.push({
    name: 'Color',
    hash: 'color',
    raw: document.data.color,
    formatted: {
      default: Formatter.formatColor(document.data.color),
      to_rgb: Formatter.formatColor(document.data.color, {
        convertToRgb: true
      })
    }
  })

  elements.push({
    name: 'Number',
    hash: 'number',
    raw: document.data.number,
    formatted: Formatter.formatNumber(document.data.number)
  })

  elements.push({
    name: 'Key text',
    hash: 'key-text',
    raw: document.data.key_texts,
    formatted: document.data.key_texts
      .map(({ key_text }) => Formatter.formatKeyText(key_text))
      .concat(Formatter.formatKeyText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at porta ligula.', {
        ellispsis: {
          maxChars: 15,
          pretty: true
        }
      }))
  })

  elements.push({
    name: 'Selects',
    hash: 'selects',
    raw: document.data.select,
    formatted: {
      select: Formatter.formatSelect(document.data.select),
      select_with_mapping: Formatter.formatSelect(document.data.select, {
        valueMapping: {
          'option 1': 'red',
          'option 2': 'green',
          'option 3': 'blue'
        }
      })
    }
  })

  elements.push({
    name: 'Boolean',
    hash: 'boolean',
    raw: document.data.boolean,
    formatted: document.data.boolean
  })

  elements.push({
    name: 'Embeds',
    hash: 'embeds',
    raw: document.data.embeds,
    formatted: document.data.embeds
      .map(({ embed }) => Formatter.formatEmbed(embed, ['type']))
  })

  elements.push({
    name: 'Geopoint',
    hash: 'geopoint',
    raw: document.data.geopoint,
    formatted: Formatter.formatGeopoint(document.data.geopoint)
  })

  elements.push({
    name: 'Button',
    hash: 'button',
    raw: document.data.cta[0],
    formatted: Formatter.formatButton(document.data.cta[0])
  })

  elements.push({
    name: 'Metas',
    hash: 'metas',
    raw: document.data.metas[0],
    formatted: Formatter.formatMetas(document.data.metas[0], {
      defaults: {
        title: 'Default title',
        description: '<p>Default description',
        image: document.data.images[0].image
      }
    })
  })

  const slices = await formatSlices(document.data.body, app)

  slices.push({
    sliceId: 'unknown_sice',
    componentName: 'UnknownSlice',
    title: 'An unknoxn slice'
  })

  return {
    elements,
    slices
  }
}
