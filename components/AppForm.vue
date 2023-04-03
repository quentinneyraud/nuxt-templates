<template>
  <form
    class="AppForm"
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>

<script>
export default {
  props: {
    fillWithMockData: {
      type: [String, Boolean],
      required: false,
      default: _ => 'auto'
    }
  },

  mounted () {
    if ((this.fillWithMockData === 'auto' && this.$config.IS_DEV) || this.fillInputsWithMockData === true) this.fillInputsWithMockData()
  },

  methods: {
    fillInputsWithMockData () {
      this.$children
        .filter(component => component.isInput)
        .forEach(component => component.fillWithMockData())
    },

    onSubmit () {
      const formData = new FormData(this.$el)

      this.$emit('submit', formData)
    },

    clear () {
      return this.$el.reset()
    }
  }
}
</script>
