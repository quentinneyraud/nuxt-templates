<template>
  <div
    class="RgpdBanner-component"
    :class="{
      '--is-displayed': isDisplayed
    }"
  >
    <div
      class="RgpdBanner-text"
      v-html="t('text')"
    />

    <div class="RgpdBanner-actions">
      <button
        class="RgpdBanner-acceptAll"
        @click="onAcceptAllButtonClick"
      >
        {{ t('acceptAll') }}
      </button>

      <button
        class="RgpdBanner-manage"
        @click="onManageButtonClick"
      >
        {{ t('manage') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    textContents: {
      type: Object,
      required: false,
      // Object with keys text, acceptAll, manage
      default: _ => ({}),
      validator (textContents) {
        if (JSON.parse('<%= JSON.stringify(options.debug) %>')) {
          ;['text', 'acceptAll', 'manage'].forEach(textContentKey => {
            if (!(textContentKey in textContents)) {
              // eslint-disable-next-line no-console
              console.warn(
                `[RgpdBanner component] Missing key '${textContentKey}' in textContents`
              )
              return false
            }
          })
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
    this.$rgpd.$on('show', this.show)
    this.$rgpd.$on('hide', this.hide)
  },

  methods: {
    t (key) {
      return this.textContents?.[key] || key
    },

    onAcceptAllButtonClick () {
      this.$rgpd.enableAll()
      this.$rgpd.save()
    },
    onManageButtonClick () {
      this.$rgpd.openPopup()
    },
    show () {
      this.isDisplayed = true
    },
    hide () {
      this.isDisplayed = false
    }
  }
}
</script>

<style scoped>
.RgpdBanner-component {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 960px;
  background-color: black;
  padding: 40px 25px;
  display: flex;
  align-items: center;
  gap: 30px;

  transform: translateY(100%);
  opacity: 0;
  transition: all 0.5s;
}

.RgpdBanner-component.--is-displayed {
  transform: translateY(0%);
  opacity: 1;
}

.RgpdBanner-text {
  flex-shrink: 1;
  color: grey;
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

.RgpdBanner-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.RgpdBanner-actions button {
  flex-shrink: 0;
}
</style>
