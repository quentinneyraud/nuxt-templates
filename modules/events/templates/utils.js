export const debounce = (callback, wait) => {
  let timeout

  return () => {
    window.clearTimeout(timeout)
    timeout = setTimeout(() => callback(), wait)
  }
}
