/* eslint-disable no-console */
import Vue from 'vue'
import Cookies from 'js-cookie'

const options = JSON.parse('<%= JSON.stringify(options) %>')

export default (ctx, inject) => {
  const rgpd = new Vue({
    data () {
      return {
        cookie: null,
        services: []
      }
    },
    methods: {
      init (services) {
        this.getCookie()
        this.registerServices(services)

        const showComponent = !(this.cookie && this.services.every(service => service.id in this.cookie))

        if (showComponent) {
          this.$emit('show')
        } else {
          this.save()
        }
      },
      getCookie () {
        const cookieValue = Cookies.get(options.cookieName)
        if (cookieValue) this.cookie = JSON.parse(cookieValue)
      },
      persistInCookie () {
        const servicesState = this.services.reduce((acc, service) => {
          acc[service.id] = service.enabled

          return acc
        }, {})

        Cookies.set(options.cookieName, JSON.stringify(servicesState))
      },
      registerServices (services) {
        this.services = services
          .filter(service => {
            if (!service.id || !service.name) {
              options.debug && console.warn('Service need a name and an id')
              return false
            }

            return true
          })
          .map(service => {
            service.enabled = (this.cookie && service.id in this.cookie) ? this.cookie[service.id] : service.required || service.default || false

            return service
          })
      },
      enableAll () {
        this.services.forEach(this.enable)
      },
      disableAll () {
        this.services.forEach(this.disable)
      },
      enable (service) {
        service.enabled = true
      },
      disable (service) {
        if (service.required) return

        service.enabled = false
      },
      save () {
        this.$emit('hide')
        this.persistInCookie()
        this.$emit('save', { services: this.services })

        this.services.forEach(service => {
          if (service.enabled) {
            this.$emit('service:enable', { service })
            this.$emit(`service:${service.id}:enable`, { service })
          } else {
            this.$emit('service:disable', { service })
            this.$emit(`service:${service.id}:disable`, { service })
          }
        })
      }
    }
  })

  inject('rgpd', rgpd)
}
