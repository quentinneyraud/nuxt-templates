export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'simple_document') {
    return '/simple'
  }

  return '/not-found'
};
