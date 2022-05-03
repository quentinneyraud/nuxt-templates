import Formatter from '../utils/Formatter'
import { hasKey } from '../utils/helpers'

const id = 'first_slice'

const query = `
  ...on ${id} {
    non-repeat {
      ...non-repeatFields
    }
    repeat {
      ...repeatFields
    }
  }
`

const format = slice => {
  try {
    return {
      id,
      title: Formatter.formatKeyText(slice.primary.title),
      items: slice.items
        .map(item => ({
          text: Formatter.formatRichText(item.text)
        }))
        .filter(hasKey('text'))
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error while formatting ${id} with: \n`, JSON.stringify(slice, null, 2))
      console.error(error)
    }

    return null
  }
}

export default {
  id,
  query,
  format
}
