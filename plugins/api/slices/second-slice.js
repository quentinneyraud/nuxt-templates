import Formatter from '../utils/Formatter'

const sliceId = 'second_slice'
const componentName = 'SecondSlice'

const query = `
  ...on ${sliceId} {
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
  return {
    sliceId,
    componentName,
    documentTitle: Formatter.formatTitle(slice.primary.link_to_document?.data?.title)
  }
}

export default {
  sliceId,
  query,
  format
}