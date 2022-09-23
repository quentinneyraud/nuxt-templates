import Formatter from '../utils/Formatter'
import { hasKey } from '../utils/helpers'

const sliceId = 'first_slice'
const componentName = 'FirstSlice'

const query = `
  ...on ${sliceId} {
    non-repeat {
      ...non-repeatFields
    }
    repeat {
      ...repeatFields
    }
  }
`

const format = slice => {
  return {
    sliceId,
    componentName,
    title: Formatter.formatKeyText(slice.primary.title),
    items: slice.items
      .map(item => ({
        text: Formatter.formatRichText(item.text)
      }))
      .filter(hasKey('text'))
  }
}

export default {
  sliceId,
  query,
  format
}
