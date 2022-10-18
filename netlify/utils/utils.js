const Busboy = require('busboy')

const BASE_URL = process.env.BASE_URL

const parseMultipartForm = event => {
  return new Promise(resolve => {
    const fields = {}

    const busboy = Busboy({
      headers: event.headers
    })

    busboy.on(
      'file',
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        filestream.on('data', data => {
          if (!fields[fieldname]) {
            fields[fieldname] = {
              filename,
              type: mimeType,
              content: data
            }
          } else {
            if (!Array.isArray(fields[fieldname])) {
              fields[fieldname] = [fields[fieldname]]
            }
            fields[fieldname].push({
              filename,
              type: mimeType,
              content: data
            })
          }
        })
      }
    )

    busboy.on('field', (fieldName, value) => {
      fields[fieldName] = value
    })

    busboy.on('close', () => {
      resolve(fields)
    })

    const bodyBuf = Buffer.from(event.body, 'base64')
    busboy.end(bodyBuf)
  })
}

const sendResponse = (statusCode, message = 'Ok', { body = {}, headers: responseHeaders = {} } = {}) => {
  const headers = {
    ...responseHeaders,
    'Access-Control-Allow-Origin': BASE_URL || '*',
    'Content-Type': 'application/json'
  }

  if (headers['Access-Control-Allow-Origin'] !== '*') {
    headers.Vary = 'Origin'
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      ...body
    }),
    headers
  }
}

module.exports = {
  parseMultipartForm,
  sendResponse
}
