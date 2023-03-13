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
      type: Boolean,
      required: false,
      default: _ => false
    }
  },
  mounted () {
    if (this.fillWithMockData) this.fillInputsWithMockData()
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
