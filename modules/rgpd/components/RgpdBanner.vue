<template>
  <div class="RgpdBanner-component">
    <div class="RgpdBanner-text" v-html="t('text')" />

    <div class="RgpdBanner-actions">
      <button class="RgpdBanner-acceptAll" @click="onAcceptAllButtonClick">
        {{ t('acceptAll') }}
      </button>

      <button class="RgpdBanner-manage" @click="onManageButtonClick">
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
      required: true
    }
  },
  data () {
    return {
      isShown: false
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
      this.$el.style.display = 'block'
    },
    hide () {
      this.$el.style.display = 'none'
    }
  }
}
</script>

<style lang="css" scoped>
.RgpdBanner-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transform: tY(-30px);
  pointer-events: none;
}

.RgpdBanner-main {
  padding: 16px 24px;
  padding-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  margin-top: 0;
  pointer-events: auto;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.RgpdBanner-text {
  color: #ffffff;
  line-height: auto;
  text-align: center;
}

.RgpdBanner-actions {
  margin: 4px;
}

.RgpdBanner-actions button {
  padding: 8px 10px;
  font-weight: 700;
}

.RgpdBanner-acceptAllIcon {
  fill: white;
  width: 9px;
  height: 6px;
  margin-right: 8px;
}
</style>
