import Vue from 'vue'
import Cookies from 'js-cookie'

const options = JSON.parse('<%= JSON.stringify(options) %>')

export default (_, inject) => {
  const rgpd = new Vue({
    data () {
      return {
        cookie: null,
        services: []
      }
    },
    methods: {
      init (services) {
        if (options.deleteCookieOnInit) Cookies.remove(options.cookieName)

        this.getCookie()
        this.registerServices(services)

        const showComponent = !this.cookie?.services || !this.services.every(service => service.id in this.cookie?.services) || this.cookie?.version !== options.version

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
        const cookieValue = {
          version: options.version,
          services: this.services.reduce((acc, service) => {
            acc[service.id] = service.enabled

            return acc
          }, {})
        }

        Cookies.set(options.cookieName, JSON.stringify(cookieValue), {
          expires: options.cookieExpiresAfterDays
        })
      },
      registerServices (services) {
        this.services = services
          .filter(service => {
            if (!service.id || !service.name) return false

            return true
          })
          .map(service => {
            service.enabled = this.cookie?.services && service.id in this.cookie.services
              ? this.cookie.services[service.id]
              : service.required || service.defaultValue || false

            return service
          })
      },
      openPopup () {
        this.$emit('open-popup')
      },
      resetAll () {
        this.services.forEach(this.reset)
      },
      enableAll () {
        this.services.forEach(this.enable)
      },
      disableAll () {
        this.services.forEach(this.disable)
      },
      reset (service) {
        service.enabled = service.defaultValue || false
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
