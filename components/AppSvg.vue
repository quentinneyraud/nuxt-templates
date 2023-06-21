<template>
  <!-- Inline -->
  <Component
    :is="inlineComponent"
    v-if="name && type === 'inline'"
    :class="classes"
  />

  <!-- Sprite -->
  <svg
    v-else-if="name && type === 'sprite'"
    :class="classes"
    :viewBox="spriteIcon.viewBox"
  >
    <use :xlink:href="`#${spriteIcon.id}`" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: null
    },
    type: {
      type: String,
      required: false,
      default: _ => 'inline'
    }
  },

  data () {
    return {
      classes: ['AppSvg', `${this.name}-svg`]
    }
  },

  computed: {
    inlineComponent () {
      return require(`@/assets/svg/${this.name}.svg?inline`)
    },

    spriteIcon () {
      return require(`@/assets/svg/${this.name}.svg?sprite`).default
    }
  }

}
</script>

<style lang="scss">
.AppSvg {
  overflow: visible;
}
</style>
