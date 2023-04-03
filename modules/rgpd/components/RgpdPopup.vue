<template>
  <div
    class="RgpdPopup-component"
    :class="{
      '--is-displayed': isDisplayed
    }"
  >
    <!-- Background -->
    <div class="RgpdPopup-background" />

    <!-- Popup -->
    <div
      ref="popup"
      class="RgpdPopup-popup"
    >
      <!-- Close -->
      <button
        class="RgpdPopup-close"
        @click="close"
      />

      <!-- Title -->
      <p class="RgpdPopup-title">
        {{ t('title') }}
      </p>

      <!-- Text -->
      <p
        v-if="textContents.text"
        class="RgpdPopup-text"
        v-html="t('text')"
      />

      <!-- Main content -->
      <div class="RgpdPopup-servicesWrapper">
        <!-- Services -->
        <ul class="RgpdPopup-services">
          <li
            v-for="(service, serviceIndex) in $rgpd.services"
            :key="serviceIndex"
            class="RgpdPopup-service"
            :class="{
              '--is-enabled': service.enabled,
              '--is-required': service.required
            }"
          >
            <!-- Service name -->
            <p class="RgpdPopup-serviceName">
              {{ service.name }}
            </p>

            <!-- Service description -->
            <p
              v-if="service.description"
              class="RgpdPopup-serviceDescription"
            >
              {{ service.description }}
            </p>

            <!-- Service actions -->
            <div
              v-if="!service.required"
              class="RgpdPopup-serviceActions"
            >
              <button
                class="RgpdPopup-serviceAction RgpdPopup-serviceAccept"
                @click="$rgpd.enable(service)"
              >
                {{ t('accept') }}
              </button>
              <button
                class="RgpdPopup-serviceAction RgpdPopup-serviceRefuse"
                @click="$rgpd.disable(service)"
              >
                {{ t('refuse') }}
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Global actions -->
      <div class="RgpdPopup-actions">
        <!-- Reset all -->
        <!-- <button
          class="RgpdPopup-action RgpdPopup-resetAll"
          @click="onResetButtonClick"
        >
          {{ t('resetAll') }}
        </button> -->

        <!-- Save all -->
        <button
          class="RgpdPopup-action RgpdPopup-save"
          @click="onSaveButtonClick"
        >
          {{ t('save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    textContents: {
      type: Object,
      required: false,
      // Object with keys title, text, accept, refuse, save
      default: _ => ({}),
      validator (textContents) {
        if (JSON.parse('<%= JSON.stringify(options.debug) %>')) {
          ;['title', 'text', 'accept', 'refuse', 'save'].forEach(
            textContentKey => {
              if (!(textContentKey in textContents)) {
                // eslint-disable-next-line no-console
                console.warn(
                  `[RgpdPopup component] Missing key '${textContentKey}' in textContents`
                )
                return false
              }
            }
          )
        }

        return true
      }
    }
  },

  data () {
    return {
      isDisplayed: false
    }
  },

  mounted () {
    this.$rgpd.$on('open-popup', this.open)
    this.$rgpd.$on('hide', this.close)
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('click', this.onClick)
  },

  methods: {
    t (key) {
      return this.textContents?.[key] || key
    },

    /**
     * Events
     */
    open () {
      this.isDisplayed = true

      window.addEventListener('keydown', this.onKeyDown, {
        passive: true
      })

      window.setTimeout(_ => {
        document.addEventListener('click', this.onClick, {
          passive: true
        })
      }, 0)
    },
    close () {
      this.isDisplayed = false

      window.removeEventListener('keydown', this.onKeyDown)
      document.removeEventListener('click', this.onClick)
    },
    onKeyDown (event) {
      if (event.keyCode === 27) {
        this.close()
      }
    },
    onClick ({ target }) {
      if (!this.$refs.popup.contains(target)) {
        this.close()
      }
    },
    onResetButtonClick () {
      this.$rgpd.resetAll()
    },
    onSaveButtonClick () {
      this.$rgpd.save()
    }
  }
}
</script>

<style scoped>
.RgpdPopup-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;

  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
  opacity: 0;

  transition: all 0.5s;
}

.RgpdPopup-component.--is-displayed {
  pointer-events: auto;
  opacity: 1;
}

.RgpdPopup-component.--is-displayed .RgpdPopup-popup {
  transform: translateY(0px);
  opacity: 1;
}

.RgpdPopup-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.RgpdPopup-popup {
  position: relative;
  background-color: black;
  padding: 30px 40px;
  width: 760px;
  height: auto;
  max-width: 100%;
  max-height: max(700px, 100%);

  display: flex;
  flex-direction: column;

  transform: translateY(50px);
  opacity: 0;

  transition: all 0.5s;
}

.RgpdPopup-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
}

.RgpdPopup-title {
  color: grey;
  font-weight: 400;
  font-size: 30px;
}

.RgpdPopup-text {
  margin-top: 15px;
  color: grey;
  font-weight: 400;
  font-size: 16px;
}

.RgpdPopup-servicesWrapper {
}

.RgpdPopup-services {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.RgpdPopup-service.--is-enabled .RgpdPopup-serviceAccept {
  background-color: green;
}

.RgpdPopup-service:not(.--is-enabled) .RgpdPopup-serviceRefuse {
  background-color: green;
}

.RgpdPopup-serviceName {
  color: grey;
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase;
}

.RgpdPopup-serviceDescription {
  color: grey;
  font-weight: 400;
  font-size: 16px;
  margin-top: 15px;
}

.RgpdPopup-serviceActions {
  margin-top: 15px;
  display: flex;
  gap: 15px;
}

.RgpdPopup-serviceAction {
  border: 1px solid white;
  color: black;
  font-weight: 700;
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
}

.RgpdPopup-actions {
  display: flex;
  margin-top: 3.5rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(grey, 0.1);
}
</style>
