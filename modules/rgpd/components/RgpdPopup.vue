<template>
  <div class="RgpdPopup-component">
    <!-- Background -->
    <div class="RgpdPopup-background" />

    <!-- Popup -->
    <div class="RgpdPopup-popup">
      <!-- Close -->
      <button class="RgpdPopup-close" @click="close" />

      <!-- Title -->
      <p class="RgpdPopup-title">
        {{ t('title') }}
      </p>

      <!-- Main content -->
      <div class="RgpdPopup-servicesWrapper">
        <p v-if="textContents.intro" class="RgpdPopup-servicesIntro" v-html="t('intro')" />

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
            <p v-if="service.description" class="RgpdPopup-serviceDescription">
              {{ service.description }}
            </p>

            <!-- Service actions -->
            <div v-if="!service.required" class="RgpdPopup-serviceActions">
              <button class="RgpdPopup-serviceAction RgpdPopup-serviceAccept" @click="$rgpd.enable(service)">
                {{ t('accept') }}
              </button>
              <button class="RgpdPopup-serviceAction RgpdPopup-rejectAccept" @click="$rgpd.disable(service)">
                {{ t('decline') }}
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Global actions -->
      <div class="RgpdPopup-actions">
        <!-- Reset all -->
        <button
          class="RgpdPopup-action RgpdPopup-resetAll"
          @click="onResetButtonClick"
        >
          {{ t('resetAll') }}
        </button>

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
      required: true
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  mounted () {
    this.$rgpd.$on('open-popup', this.open)
    this.$rgpd.$on('hide', this.hide)
  },
  methods: {
    t (key) {
      return this.textContents?.[key] || key
    },
    /**
     * Events
     */
    hide () {
      if (this.isOpen) this.close()
    },
    open () {
      this.isOpen = true

      window.addEventListener('keydown', this.onKeyDown, {
        passive: true
      })
    },
    close () {
      this.isOpen = false

      window.removeEventListener('keydown', this.onKeyDown)
    },
    onKeyDown (event) {
      if (event.keyCode === 27) {
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

<style lang="css" scoped>
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
}

.RgpdPopup-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
}

.RgpdPopup-popupWrapper {
  position: relative;
  padding: $mobile-padding;
  width: 100%;
  max-width: 800px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #362f2f;
}

.RgpdPopup-popup {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: #362f2f;
  padding: 24px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.RgpdPopup-close {
  position: absolute;
  top: 0;
  right: 0;
}

.RgpdPopup-title {
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding-right: 50px;
  padding-left: 8px;
}

.RgpdPopup-servicesWrapper {
  background-color: rgba(0, 0, 0, 0.1);
  border: solid 1px rgba(255, 255, 255, 0.1);
  padding: 25px;
  margin-top: 15px;
  overflow-y: auto;
  flex-shrink: 1;
}

.RgpdPopup-servicesIntro {
  line-height: 16px;
  font-weight: 300;
}

.RgpdPopup-services {
  margin-top: 24px;
  padding-left: 17px;
}

.RgpdPopup-service {
  list-style-type: square;
}

.RgpdPopup-service:nth-child(n + 2) {
  margin-top: 24px;
}

.RgpdPopup-service.--is-enabled .RgpdPopup-serviceAccept {
  border-color: white;
  color: white;
}

.RgpdPopup-service.--is-enabled .RgpdPopup-serviceAccept .RgpdPopup-acceptIcon {
  fill: white;
}

.RgpdPopup-service:not(.--is-enabled) .RgpdPopup-rejectAccept {
  border-color: white;
  color: white;
}

.RgpdPopup-service:not(.--is-enabled)
  .RgpdPopup-rejectAccept
  .RgpdPopup-rejectIcon {
  fill: white;
}

.RgpdPopup-serviceName {
  color: white;
}

.RgpdPopup-serviceDescription {
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
}

.RgpdPopup-serviceActions {
  margin-top: 16px;
  display: flex;
}

.RgpdPopup-serviceAction {
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  padding: 6px 16px;
  display: flex;
  align-items: center;
}

.RgpdPopup-serviceAction:nth-child(n + 2) {
  margin-left: 14px;
}

.RgpdPopup-acceptIcon,
.RgpdPopup-rejectIcon {
  fill: rgba(255, 255, 255, 0.5);
  margin-right: 10px;
}

.RgpdPopup-acceptIcon {
  width: 9px;
  height: 6px;
}

.RgpdPopup-rejectIcon {
  width: 6px;
  height: 6px;
}

.RgpdPopup-actions {
  display: flex;
  flex-direction: column;
  margin-top: 23px;
}

.RgpdPopup-action:nth-child(n + 2) {
  margin-top: 16px;
}
</style>
