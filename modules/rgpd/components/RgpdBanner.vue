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
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 550px;
  background-color: #383b3f;
  padding: 35px;

  display: none;
}

.RgpdBanner-text {
  color: #ffffff;
}

.RgpdBanner-actions {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.RgpdBanner-actions button {
  padding: 8px 10px;
  flex-shrink: 0;
}
</style>
