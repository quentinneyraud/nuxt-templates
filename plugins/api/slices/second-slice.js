import Formatter from '../utils/Formatter'

const id = 'second_slice'

const query = `
  ...on ${id} {
    non-repeat {
      ...non-repeatFields
      link_to_document {
        ...on simple_document {
          title
        }
      }
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
      documentTitle: Formatter.formatTitle(slice.primary.link_to_document?.data?.title)
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
