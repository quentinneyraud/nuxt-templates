export const pick = (obj, keys) => {
  if (!obj) return null

  return keys
    .reduce((acc, curr) => {
      if (obj[curr]) acc[curr] = obj[curr]

      return acc
    }, {})
}

const options = JSON.parse('<%= JSON.stringify(options) %>')

export default (_, inject) => {
  inject('pickProps', (obj, component) => {
    for (const directory of options.componentsDirectorySubfolders) {
      try {
        const props = require(`@/components/${directory}/${component}.vue`)?.default?.props

        return pick(obj, Object.keys(props))
      } catch (_) {}
    }
  })
}
