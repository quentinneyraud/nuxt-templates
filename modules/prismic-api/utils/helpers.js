export const removeDuplicates = arr => {
  if (!Array.isArray(arr)) return arr

  return [...new Set(arr)]
}

export const removeDuplicatesWithKey = (arr, key) => {
  if (!Array.isArray(arr)) return arr

  return [...new Map(arr?.map(item => [item[key], item])).values()]
}

export const hasKeys = keys => obj => !!obj && keys.every(key => key in obj && !!obj[key])

export const hasKeysOr = keys => obj => !!obj && keys.some(key => key in obj && !!obj[key])

export const hasKey = key => obj => !!obj && key in obj && !!obj[key]

export const notNull = value => !!value

export const convertKeysToCamelCase = obj => {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => {
      acc[snakeToCamel(key)] = value

      return acc
    }, {})
}

export const snakeToCamel = str => str.replace(
  /([-_][a-z])/g,
  group => group.toUpperCase()
    .replace('-', '')
    .replace('_', '')
)
