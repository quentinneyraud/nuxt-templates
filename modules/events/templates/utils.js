export const debounce = (callback, wait) => {
  let timeout

  return () => {
    window.clearTimeout(timeout)
    timeout = setTimeout(() => callback(), wait)
  }
}

export const isModuleInstalled = moduleName => {
  let path

  try {
    path = require.resolve(moduleName)
  } catch (_) {}

  return path
}

export const requireModule = moduleName => {
  let path

  try {
    path = require.resolve(moduleName)
  } catch (_) {}

  if (path) {
    return require(path)
  }

  return undefined
}
