export default doc => {
  if (doc.isBroken) return '/not-found'

  return null
}
