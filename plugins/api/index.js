// Utils
import Formatter from './utils/Formatter'

// Routes
import getTestPage from './routes/testPage'

export default ({ app }, inject) => {
  Formatter.setPrismic(app.$prismic)

  inject('api', {
    getTestPage: getTestPage(app)
  })
}
