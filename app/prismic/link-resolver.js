export default doc => {
  if (doc.isBroken) return '/not-found'

  if (doc.type === 'about_page') {
    return '/about'
  }

  if (doc.type === 'project') {
    return `/projects/${doc.uid}`
  }

  return '/not-found'
}
