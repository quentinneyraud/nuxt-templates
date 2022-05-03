import prismicDOM from 'prismic-dom'
import linkResolver from './link-resolver'

const Elements = prismicDOM.RichText.Elements

export default function (type, element, content, children) {
  // Set custom dataset on links so we can prevent clicks and use nuxt router lately instead of full page reload
  if (type === Elements.hyperlink && element.data.link_type === 'Document') {
    const url = prismicDOM.Link.url(element.data, linkResolver)

    return `<a href="${url}" data-nuxt-link>${content}</a>`
  }

  // Handle labels
  // if (element.data?.label === 'my-custom-label') {
  //   return `<div class="my-custom-label">${children}<div/>`
  // }

  return null
}
