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
// Default Slice
import DefaultSlice from '~/components/DefaultSlice.vue'

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
  data () {
    return {
      slicesComponents: {
        FirstSlice,
        SecondSlice
      }
    }
  },
  methods: {
    sliceComponentExists (componentName) {
      return Object.keys(this.slicesComponents).includes(componentName)
    },
    getSliceComponent ({ componentName }) {
      if (this.sliceComponentExists(componentName)) {
        return this.slicesComponents[componentName]
      } else if (this.$config.IS_DEV) {
        return DefaultSlice
      }

      return null
    },
    getSliceProps (slice) {
      // Use next line if https://github.com/quentinneyraud/nuxt-templates/tree/features/props-helper is installed
      // return this.$pickProps(slice, slice.componentName)

      const { sliceId: _, componentName, ...props } = slice

      return this.sliceComponentExists(componentName)
        ? props
        : { props, componentName }
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
