<template>
  <div
    class="Rgpd-component"
    :class="{
      '--is-expanded': isExpanded
    }"
  >
    <!-- Details -->
    <div class="Rgpd-details">
      <div class="Rgpd-detailsInner">
        <!-- Details heading -->
        <div class="Rgpd-detailsHeading">
          <p class="Rgpd-detailsTitle">
            {{ tt('detailsTitle') }}
          </p>

          <p class="Rgpd-detailsDescription">
            {{ tt('detailsDescription') }}
          </p>
        </div>

        <!-- Services -->
        <div class="Rgpd-servicesWrapper">
          <ul class="Rgpd-services">
            <li
              v-for="(service, serviceIndex) in $rgpd.services"
              :key="serviceIndex"
              class="Rgpd-service"
              :class="{
                '--is-checked': service.checked,
                '--is-required': service.required
              }"
            >
              <div
                class="Rgpd-serviceLeft"
              >
                <div class="Rgpd-serviceCheckboxWrapper">
                  <input :id="service.id" type="checkbox" @click="service.checked ? $rgpd.uncheck(service) : $rgpd.check(service)">
                  <label :for="service.id" />
                  <span class="Rgpd-serviceCheckboxBullet" />
                </div>
              </div>

              <div class="Rgpd-serviceRight">
                <p class="Rgpd-serviceName">
                  {{ service.name }}
                </p>

                <p class="Rgpd-serviceDescription">
                  {{ service.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Save button -->
        <button class="Rgpd-detailsSave">
          {{ tt('save') }}
        </button>
      </div>
    </div>

    <!-- Notice -->
    <div
      class="Rgpd-notice"
    >
      <!-- Notice text -->
      <p class="Rgpd-noticeText">
        {{ tt('noticeText') }}
      </p>

      <!-- Notice actions -->
      <div class="Rgpd-noticeActions">
        <button
          class="Rgpd-noticeAction"
          @click="$rgpd.acceptAll()"
        >
          {{ tt('acceptAll') }}
        </button>

        <button
          class="Rgpd-noticeAction"
          @click="$rgpd.refuseAll()"
        >
          {{ tt('refuseAll') }}
        </button>

        <button
          class="Rgpd-noticeAction"
          @click="isExpanded ? closeDetails() : openDetails()"
        >
          {{ isExpanded ? tt('openDetails') : tt('closeDetails') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// Libraries
import Cookies from 'js-cookie'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>')

export default {
  props: {
    lang: {
      type: String,
      required: false,
      default: _ => moduleOptions.lang
    },
    services: {
      type: Array,
      required: false,
      default: _ => []
    }
  },
  data () {
    return {
      isExpanded: true
    }
  },
  computed: {
    defaultTranslations () {
      return moduleOptions.translations.find(translation => translation.lang === moduleOptions.defaultLang)
    },
    currentTranslations () {
      return moduleOptions.translations.find(translation => translation.lang === this.lang)
    }
  },
  mounted () {
    this.$rgpd.registerServices([...this.services, ...moduleOptions.services])
    this.$rgpd.$on('service:accept-all', this.closeDetails)
    this.$rgpd.$on('service:refuse-all', this.closeDetails)
    // const a = Cookies.get(moduleOptions.cookieName)
  },
  methods: {
    /**
     * details
     */
    openDetails () {
      this.isExpanded = true
    },
    closeDetails () {
      this.isExpanded = false
    },
    /**
     * Translations
     */
    tt (key) {
      return this.currentTranslations[key] || this.defaultTranslations[key] || key
    }
    /**
     * Events
     */
  }
}
</script>

<style lang="css">
/**

  Resets

 */

.Rgpd-component span, .Rgpd-component p, .Rgpd-component button, .Rgpd-component li, .Rgpd-component ul {
  color: var(--secondary-color);
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

.Rgpd-component * {
  box-sizing: border-box;
}

.Rgpd-component button {
  cursor: pointer;
}

/**

  Component

 */

.Rgpd-component {
  position: fixed;
  z-index: 100000;
  bottom: 0;
  right: 0;
  pointer-events: none;
  width: min(550px, 100vw);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  --primary-color: #EEEEEE;
  --secondary-color: #292929;
}

.Rgpd-component.--is-expanded .Rgpd-details {
  opacity: 1;
  pointer-events: auto;
}

.Rgpd-details {
  opacity: 0;
  transition: opacity 0.3s;
  background-color: var(--primary-color);
  flex: 0 1 auto;
  min-height: 0;
}

.Rgpd-detailsInner {
  padding: 35px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
}

.Rgpd-detailsHeading {
  flex-shrink: 0;
}

.Rgpd-detailsTitle {
  font-size: 24px;
  font-weight: 700;
}

p.Rgpd-detailsDescription {
  font-size: 14px;
  font-weight: 400;
  margin-top: 20px;
}

.Rgpd-servicesWrapper {
  position: relative;
  flex-shrink: 1;
  margin-top: 40px;
  min-height: 0;
}

.Rgpd-servicesWrapper:after {
  content: "";
  position: absolute;
  z-index: 10;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 20px;
  background: linear-gradient(to bottom, transparent, var(--primary-color));
}

ul.Rgpd-services {
  position: relative;
  overflow: auto;
  height: 100%;
}

/**

  Service

 */

li.Rgpd-service {
  display: flex;
  align-items: flex-start;
}

li.Rgpd-service:nth-child(n + 2) {
  margin-top: 25px;
}
li.Rgpd-service:last-child{
  margin-bottom: 20px;
}

.Rgpd-service.--is-checked .Rgpd-serviceCheckboxBullet {
  transform: translate3d(20px, 0px, 0px);
}

.Rgpd-service.--is-required .Rgpd-serviceCheckboxWrapper {
  opacity: 0.5;
  pointer-events: none;
}

.Rgpd-serviceLeft {
  flex: 0 0 15%;
  min-width: 60px;
}

.Rgpd-serviceRight {
  flex: 0 1 85%;
}

.Rgpd-serviceCheckboxWrapper {
  position: relative;
  width: 40px;
  height: 20px;
}

.Rgpd-serviceCheckboxWrapper label {
  display: block;
  width: 100%;
  height: 100%;
  border: 2px solid var(--secondary-color);
  border-radius: 15px;
  cursor: pointer;
  background-color: #fff;
}

.Rgpd-serviceCheckboxWrapper input {
  position: absolute !important;
  top: 0 !important;
  left: -99999px !important;
}

.Rgpd-serviceCheckboxBullet {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  pointer-events: none;
  transform: translate3d(0px, 0px, 0px);
  transition: transform 0.3s ease-in-out;
}

.Rgpd-serviceName {
  font-size: 16px;
  font-weight: 700;
}

p.Rgpd-serviceDescription {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
}

button.Rgpd-detailsSave {
  padding: 5px 8px;
  margin-top: 35px;
  border: 1px solid #000;
  flex-shrink: 0;
}

/**

  Notice

 */

.Rgpd-notice {
  flex: 0 0 auto;
  padding: 20px 25px;
  pointer-events: auto;
  background-color: var(--primary-color);
  border-top: 1px solid #000;
}

.Rgpd-noticeText {
  margin: 0;
}

.Rgpd-noticeActions {
  display: flex;
  margin-top: 10px;
  margin-left: -15px;
}

button.Rgpd-noticeAction {
  padding: 5px 8px;
  margin-top: 15px;
  margin-left: 15px;
  border: 1px solid #000;
}
</style>
