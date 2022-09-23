<template>
  <main class="Slices">
    <Component
      :is="getSliceComponent(slice)"
      v-for="(slice, sliceIndex) in slices"
      :key="sliceIndex"
      class="Slices-slice"
      :class="getSliceClasses(sliceIndex)"
      v-bind="getSliceProps(slice)"
    />
  </main>
</template>

<script>
// Slices
import FirstSlice from '@/components/slices/FirstSlice.vue'
import SecondSlice from '@/components/slices/SecondSlice.vue'

export default {
  props: {
    slices: {
      type: Array,
      required: false,
      default: null
    }
  },
  methods: {
    getSliceComponent ({ componentName }) {
      return {
        FirstSlice,
        SecondSlice
      }[componentName]
    },
    getSliceProps (slice) {
      // Use next line if https://github.com/quentinneyraud/nuxt-templates/tree/features/props-helper is installed
      // return this.$pickProps(slice, slice.componentName)

      const { sliceId: _, componentName: __, ...props } = slice
      return props
    },
    getSliceClasses (sliceIndex) {
      const classes = []

      // First
      sliceIndex === 0 && classes.push('--is-first-slice')

      // Last
      sliceIndex === this.slices.length - 1 && classes.push('--is-last-slice')

      // After
      const previousSliceName = this.slices[sliceIndex - 1]?.componentName
      previousSliceName && classes.push(`--is-after-${previousSliceName}`)

      // Before
      const nextSliceName = this.slices[sliceIndex + 1]?.componentName
      nextSliceName && classes.push(`--is-before-${nextSliceName}`)

      return classes
    }
  }
}
</script>
