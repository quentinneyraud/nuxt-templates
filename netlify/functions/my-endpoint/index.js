const { sendResponse, parseMultipartForm } = require('../../utils/utils')
const Validation = require('../../utils/Validation')

const BASE_URL = process.env.BASE_URL

module.exports.handler = async event => {
  try {
    // Check constants
    // if (!MY_API_KEY || !MY_API_SECRET) {
    // return sendResponse(500, 'Server error')
    // }

    // Check origin
    if (BASE_URL && event.headers.origin !== BASE_URL) {
      return sendResponse(403, 'Origin not allowed')
    }

    // handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return sendResponse(200, 'ok', {
        headers: {
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      })
    }

    // Check method
    if (event.httpMethod !== 'POST') {
      return sendResponse(405, 'Method Not Allowed', {
        headers: {
          Allow: 'POST, OPTIONS'
        }
      })
    }

    // Parse fields
    const fields = await parseMultipartForm(event)

    // Validate fields
    const validation = new Validation({
      firstname: {
        data: fields.firstname,
        validations: ['isRequired'],
        errorMessage: 'Champ invalide'
      },
      email: {
        data: fields.email,
        validations: [
          {
            validation: 'isString',
            errorMessage: 'Champ requis'
          }, {
            validation: 'isEmail',
            errorMessage: 'Email invalide'
          }
        ],
        errorMessage: 'Champ invalide'
      },
      select: {
        data: fields.select,
        validations: [
          {
            validation: 'isOneOf',
            errorMessage: 'Valeur non permise',
            validationOptions: {
              values: ['all', 'a']
            }
          }
        ],
        errorMessage: 'Champ invalide'
      }
    })
    validation.validate()

    if (validation.hasError) {
      return sendResponse(422, 'Fields validation error', {
        body: {
          errors: validation.errors
        }
      })
    }

    // Do something with data
    try {
      // await doSomethingAsync()
      // return sendResponse(200, 'Success')

      // Example purpose
      return sendResponse(200, 'Success', {
        body: {
          fields
        }
      })
    } catch (err) {
      // Handle known errors
      if (err.response.body.title === 'A catched error') {
        return sendResponse(400, 'A catched error')
      }

      // Rethrow uncatched errors
      throw err
    }
  } catch (err) {
    return sendResponse(500, 'Server error')
  }
}
