const options = JSON.parse('<%= JSON.stringify(options) %>')

export const debounce = (callback, wait) => {
  let timeout

  return () => {
    window.clearTimeout(timeout)
    timeout = setTimeout(() => callback(), wait)
  }
}

export const warn = (message, ...datas) => {
  if (!options.debug) return

  // eslint-disable-next-line no-console
  console.warn(`⚠️ [${options.MODULE_NAME}]: ${message}`, ...datas.map(str => `\n\n${str}`))
}

export const error = (message, ...datas) => {
  // eslint-disable-next-line no-console
  console.error(`❌ [${options.MODULE_NAME}]: ${message}`, ...datas.map(str => `\n\n${str}`))
}

export const infos = (message, ...datas) => {
  if (!options.debug) return

  // eslint-disable-next-line no-console
  console.info(`ℹ️ [${options.MODULE_NAME}]: ${message}`, ...datas.map(str => `\n\n${str}`))
}
