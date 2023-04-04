<template>
  <div class="Bullets">
    <Component
      :is="interactive ? 'button' : 'div'"
      v-for="(item, itemIndex) in number"
      :key="itemIndex"
      class="Bullets-bullet"
      :class="{
        active: activeIndex === itemIndex
      }"
      @click="interactive ? $emit('bullet-click', { index: itemIndex }) : null"
    />
  </div>
</template>

<script>
import { notRequiredBooleanWithDefault, notRequiredNumber } from '~/modules/props-helper/scripts/nuxt-prop-types'

export default {
  props: {
    number: notRequiredNumber,
    activeIndex: notRequiredNumber,
    interactive: notRequiredBooleanWithDefault(false)
  }
}
</script>

<style lang="scss" scoped>
.Bullets {
  display: flex;
  gap: 2rem;
}

.Bullets-bullet {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: white;
  transition: background-color 0.3s;

  &.active {
    background-color: red;
  }
}
</style>
