/**
 *
 * Validations methods
 *
 */

const isString = str => typeof str === 'string' || str instanceof String

const isRequired = str => !!str

// eslint-disable-next-line no-useless-escape
const isEmail = str => !!str.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const isOneOf = (str, { values = [] } = {}) => values.includes(str)

const AVAILABLE_METHODS = { isString, isEmail, isRequired, isOneOf }

/**
 *
 * class Validation
 *
 * Example:
 *

  new Validation({
    email: {
      // Form data
      data: fields.email,

      // Array of validations methods
      validations: [
        // Validation method name
        'isEmail',

        // Or an object with validation method name, custom error message for this validation and optionaly validation method options
        {
          validation: 'isEmail',
          errorMessage: 'Champ invalide',
          validationOptions: {}
        }
      ],

      // Field default error message (Default to 'Error')
      errorMessage: 'Champ invalide'
    }
  })

 *
 */
module.exports = class Validation {
  constructor (fields) {
    this.fields = fields

    this.hasError = false
    this.errors = {}
  }

  validate () {
    Object.entries(this.fields)
      .forEach(([fieldName, fieldParam]) => {
        fieldParam.validations
          .some(validation => {
            if (!validation) return true

            let errorMessage = fieldParam.errorMessage || 'Error'
            let validationMethod = null

            if (isString(validation)) {
              validationMethod = validation
            } else if ('validation' in validation) {
              validationMethod = validation.validation

              if ('errorMessage' in validation) errorMessage = validation.errorMessage || 'Error'
            }

            if (!(validationMethod in AVAILABLE_METHODS)) throw new Error(`${validationMethod} does nos exists`)

            const isValid = AVAILABLE_METHODS[validationMethod]?.(fieldParam.data, validation.validationOptions)

            if (!isValid) {
              this.errors[fieldName] = errorMessage
              this.hasError = true
            }

            return !isValid
          })
      })
  }
}
