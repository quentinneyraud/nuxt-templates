<template>
  <div class="Rgpd-component">
    <!-- Popup -->
    <div class="Rgpd-popupOverlay">
      <div class="Rgpd-popup">
        <p class="Rgpd-popupTitle">
          Gestion des cookies
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
      validator: services => {
        return services.every(service => {
          if (!service.name) {
            // eslint-disable-next-line no-console
            console.warn('Service has no name property', service)
            return false
          }

          return true
        })
      }
    }
  }
}
</script>

<style>
.Rgpd-component {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
}

/**

  Popup

 */

.Rgpd-popupOverlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.Rgpd-popup {
  width: 600px;
  max-width: calc(100vw - 60px);
  height: auto;
  max-height: 100vh;
  background-color: #1e1d1d;
}
</style>
