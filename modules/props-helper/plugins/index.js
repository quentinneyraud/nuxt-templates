export const pick = (obj, keys) => {
  if (!obj) return null

  return keys
    .reduce((acc, curr) => {
      acc[curr] = obj[curr]

      return acc
    }, {})
}

export default (_, inject) => {
  inject('pickProps', (obj, component) => {
    const props = require(`@/components/${component}.vue`)?.default?.props

    if (!props) return null

    return pick(obj, Object.keys(props))
  })
}
