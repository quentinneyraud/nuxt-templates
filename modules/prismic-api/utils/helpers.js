// Remove duplicates in a flat array
export const removeDuplicates = arr => {
  if (!Array.isArray(arr)) return arr

  return [...new Set(arr)]
}

// Reove duplicates according key in an array of objects
export const removeDuplicatesWithKey = (arr, key) => {
  if (!Array.isArray(arr)) return arr

  return [...new Map(arr?.map(item => [item[key], item])).values()]
}

// Ensure obj has all keys and not falsy
export const hasKeys = keys => obj => !!obj && keys.every(key => key in obj && !!obj[key])

// Ensure obj has one of keys and not falsy
export const hasKeysOr = keys => obj => !!obj && keys.some(key => key in obj && !!obj[key])

// Ensure obj has key and not falsy
export const hasKey = key => obj => !!obj && key in obj && !!obj[key]

// Ensure value is not null
export const notNull = value => !!value

// Convert each key of an object to kamel case
export const convertKeysToCamelCase = obj => {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => {
      acc[snakeToCamel(key)] = value

      return acc
    }, {})
}

// Convert string to kamel case
export const snakeToCamel = str => str.replace(
  /([-_][a-z])/g,
  group => group.toUpperCase()
    .replace('-', '')
    .replace('_', '')
)

// Return an array which has a length between min and max
// ignoreMax = true migt give an array with length superior to max, but items are not next to themselves
export const minMaxArray = (arr = [], min = 0, max = min, ignoreMax = false) => {
  if (arr.length >= min && arr.length <= max) return arr
  if (arr.length > max) return arr.slice(0, max)
  return Array(Math.ceil(min / arr.length))
    .fill(arr)
    .flat()
    .slice(0, ignoreMax ? undefined : max)
}
