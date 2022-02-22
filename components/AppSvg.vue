<template>
  <!-- Inline -->
  <Component
    :is="inlineComponent"
    v-if="type === 'inline'"
    :class="classes"
  />

  <!-- Sprite -->
  <svg
    v-else-if="type === 'sprite'"
    :class="classes"
    :viewBox="spriteIcon.viewBox"
  >
    <use :xlink:href="'#' + spriteIcon.id" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: _ => 'inline'
    }
  },
  data () {
    return {
      classes: ['SvgIcon', `${this.name}-icon`]
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

<style>

</style>
