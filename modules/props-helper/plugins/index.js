import path from 'path'

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
    for (const directory of options.componentsDirectories) {
      try {
        const filePath = path.join(directory, `${component}.vue`)
        const props = require(`@/components/${filePath}`)?.default?.props

        return pick(obj, Object.keys(props))
      } catch (_) {}
    }
  })
}
