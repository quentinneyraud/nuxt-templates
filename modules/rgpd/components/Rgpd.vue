<template>
  <div
    class="Rgpd-component"
    :class="{
      '--is-expanded': isExpanded,
      '--is-shown': isShown
    }"
  >
    <!-- Details -->
    <div class="Rgpd-details">
      <button class="Rgpd-detailsClose" @click="closeDetails" />

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
                '--is-checked': service.enabled,
                '--is-required': service.required
              }"
            >
              <div
                class="Rgpd-serviceLeft"
              >
                <div class="Rgpd-serviceCheckboxWrapper">
                  <input
                    :id="service.id"
                    type="checkbox"
                    @click="service.enabled ? $rgpd.disable(service) : $rgpd.enable(service)"
                  >
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

      <div class="Rgpd-noticeActions">
        <Transition name="a" mode="out-in">
          <!-- Save button -->
          <button
            v-if="isExpanded"
            class="Rgpd-noticeAction a"
            @click="onSaveButtonClick"
          >
            {{ tt('save') }}
          </button>

          <!-- Notice actions -->
          <div v-else class="Rgpd-noticeIdleActions a">
            <button
              class="Rgpd-noticeAction"
              @click="onAcceptAllButtonClick"
            >
              {{ tt('acceptAll') }}
            </button>

            <button
              class="Rgpd-noticeAction"
              @click="onRefuseAllButtonClick"
            >
              {{ tt('refuseAll') }}
            </button>

            <button
              class="Rgpd-noticeAction"
              @click="openDetails"
            >
              {{ tt('openDetails') }}
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
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
      isShown: false,
      isExpanded: false
    }
  },
  computed: {
    defaultTranslations () {
      return moduleOptions.translations.find(
        translation => translation.lang === moduleOptions.defaultLang
      )
    },
    currentTranslations () {
      return moduleOptions.translations.find(
        translation => translation.lang === this.lang
      )
    }
  },
  mounted () {
    this.$rgpd.$on('show', this.show)
    this.$rgpd.$on('hide', this.hide)

    this.$rgpd.init([...this.services, ...moduleOptions.services])
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
      return (
        this.currentTranslations[key] || this.defaultTranslations[key] || key
      )
    },
    /**
     * Events
     */
    show () {
      this.isShown = true
    },
    hide () {
      this.isShown = false
    },
    onAcceptAllButtonClick () {
      this.$rgpd.enableAll()
      this.$rgpd.save()
    },
    onRefuseAllButtonClick () {
      this.$rgpd.disableAll()
      this.$rgpd.save()
    },
    onSaveButtonClick () {
      this.$rgpd.save()
    }
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
  border: none;
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

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  --primary-color: #EEEEEE;
  --secondary-color: #292929;
}

.Rgpd-component.--is-shown {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.Rgpd-component.--is-expanded .Rgpd-details {
  opacity: 1;
  pointer-events: auto;
}

.Rgpd-details {
  position: relative;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  background-color: var(--primary-color);
  flex: 0 1 auto;
  min-height: 0;
}

.Rgpd-detailsClose {
  position: absolute;
  top: 20px;
  right: 20px;
  height: 20px;
  width: 20px;
}

.Rgpd-detailsClose:before, .Rgpd-detailsClose:after {
  content: "";
  position: absolute;
  top: 0;
  left: 9px;
  width: 2px;
  height: 100%;
  background-color: var(--secondary-color);
}

.Rgpd-detailsClose:before {
  transform: rotate(45deg);
}

.Rgpd-detailsClose:after {
  transform: rotate(-45deg);
}

.Rgpd-detailsInner {
  padding: 45px 25px 20px 25px;
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
  min-height: 50px;
  margin-top: 10px;
  margin-left: -15px;
}

.a-enter-active, .a-leave-active {
  transition: all .3s
}

.a-enter, .a-leave-active {
  opacity: 0
}

.a-leave-to {
  transform: translateY(10px);
}

.Rgpd-noticeIdleActions {
  display: flex;
}

button.Rgpd-noticeAction {
  padding: 5px 8px;
  margin-top: 15px;
  margin-left: 15px;
  border: 1px solid #000;
}
</style>
