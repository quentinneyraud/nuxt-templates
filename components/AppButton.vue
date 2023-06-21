<template>
  <AppLink
    v-bind="$pickProps(this, 'AppLink')"
    class="AppButton"
    :class="{
      '--is-hover': isHover,
      '--is-only-icon': !!icon && !label
    }"
  >
    <!-- Icon -->
    <AppSvg
      v-if="icon"
      :name="icon"
      class="AppButton-svg"
    />

    <!-- Label -->
    <span
      v-if="label"
      class="AppButton-label"
    >{{ label }}</span>

  </AppLink>
</template>

<script>
import AppLink from './AppLink.vue'
import { notRequiredBooleanWithDefault, notRequiredString } from '~/modules/props-helper/scripts/nuxt-prop-types'

export default {
  props: {
    ...AppLink.props,
    label: notRequiredString,
    icon: notRequiredString,
    isHover: notRequiredBooleanWithDefault(false)
  }
}
</script>

<style lang="scss" scoped>
@mixin hover-state {
  outline: none;
  background-color: rgb(200, 169, 169);

  .AppButton-label {
    color: black;
  }

  .AppButton-svg {
    fill: black;
  }
}

.AppButton {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 20rem;
  padding: 2rem 3.5rem;
  border-radius: 80px;
  gap: 1rem;
  background-color: black;

  &.--is-only-icon {
    min-width: unset;
    width: 6rem;
    height: 6rem;
    padding: 0;
  }

  &.--is-hover {
    @include hover-state;
  }

  @include hover-focus {
    @include hover-state;
  }
}

.AppSvg.AppButton-svg {
  max-width: 1.4rem;
  max-height: 1.4rem;
  width: 100%;
  fill: white;
}

.AppButton-label {
  color: white;
}
</style>
