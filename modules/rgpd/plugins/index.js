/* eslint-disable no-console */
import Vue from 'vue'

const DEBUG = '<%= options.debug %>'

export default (ctx, inject) => {
  const rgpd = new Vue({
    data () {
      return {
        services: []
      }
    },
    methods: {
      registerServices (services) {
        const validServices = services
          .filter(service => {
            if (!service.id || !service.name) {
              DEBUG && console.warn('Service need a name and an id')
            }

            service.checked = service.required || service.default || false
            service.enabled = service.checked

            return true
          })

        this.services = validServices
      },
      checkAll () {
        this.services.forEach(this.check)

        this.$emit('service:check-all')
      },
      uncheckAll () {
        this.services.forEach(this.uncheck)

        this.$emit('service:uncheck-all', { services: this.services })
      },
      check (service) {
        service.checked = true

        this.$emit('service:check', { service })
      },
      uncheck (service) {
        if (service.required) return

        service.checked = false

        this.$emit('service:uncheck', { service })
      },
      enable (service) {
        service.enabled = true

        this.$emit('service:enable', { service })
      },
      disable (service) {
        service.enabled = false

        this.$emit('service:disable', { service })
      },
      save () {
        this.services.forEach(service => {
          if (this.service.enabled) {
            this.accept(service)
          } else {
            this.refuse(service)
          }
        })
      }
    }
  })

  inject('rgpd', rgpd)
}
