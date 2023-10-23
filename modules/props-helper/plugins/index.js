import path from 'path'

export const pick = (obj, keys) => {
  if (!obj) return null

  return keys
    .reduce((acc, curr) => {
      if (curr in obj) acc[curr] = obj[curr]

      return acc
    }, {})
}

const options = JSON.parse('<%= JSON.stringify(options) %>')

export default (_, inject) => {
  inject('pickProps', (obj, componentName) => {
    for (const directory of options.componentsDirectories) {
      try {
        const filePath = path.join(directory, `${componentName}.vue`)
        const component = require(`@/components/${filePath}`)?.default

        // Merge component props and all mixins props
        const props = {
          ...(component.props || {}),
          ...(component?.mixins
            ?.reduce((acc, curr) => {
              Object.assign(acc, (curr.props || {}))

              return acc
            }, {}) || {})
        }

        return pick(obj, Object.keys(props))
      } catch (_) { }
    }
  })
}
