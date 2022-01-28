const filterObj = (attr, obj) =>
  attr.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})

class Formatter {
  setPrismic (prismic) {
    this.$prismic = prismic
  }

  formatEmbed (embed, fields) {
    if (!embed || Object.keys(embed).length === 0) return undefined

    if (embed.provider_name === 'Vimeo') {
      embed = {
        type: embed.provider_name,
        customControlsAvailable: true,
        id: embed.video_id?.toString(),
        title: embed.title,
        width: embed.width,
        height: embed.height,
        duration: embed.duration,
        description: embed.description,
        thumbnail: {
          url: embed.thumbnail_url,
          width: embed.thumbnail_width,
          height: embed.thumbnail_height
        }
      }
    }

    // if (fields) {
    //   embed = filterObj(fields, embed)
    // }

    return embed
  }

  formatRichText (text, removeWrappingPTag = false) {
    if (!text || text.length === 0) return undefined

    let html = this.$prismic.asHtml(text)

    if (html.replace(/^<p[^>]*>|<\/p>$/g, '').length === 0) return undefined

    if (removeWrappingPTag) {
      html = html.replace(/^<p[^>]*>|<\/p>$/g, '')
    }

    return html
  }

  formatImage (image) {
    if (!image || Object.keys(image).length === 0) return undefined

    const { dimensions, alt, copyright: _, url, ...rest } = image

    const otherFormats = Object.entries(rest)
      .reduce((acc, [key, { dimensions, alt, url }]) => {
        acc[key] = {
          width: dimensions.width,
          height: dimensions.height,
          alt,
          url
        }

        return acc
      }, {})

    return {
      width: dimensions.width,
      height: dimensions.height,
      alt,
      url,
      ...otherFormats
    }
  }

  formatLink (link) {
    if (link.link_type === 'Document' && link.isBroken) return undefined

    if (link.link_type === 'Web') {
      link.isBlank = link.target === '_blank'
      delete link.target
    }

    if (link.link_type === 'Media') {
      delete link.size

      link.extension = link.name.split('.').pop()
    }

    return link
  }

  stripTags (string) {
    return string.replace(/(<([^>]+)>)/gi, '')
  }
}

export default new Formatter()
