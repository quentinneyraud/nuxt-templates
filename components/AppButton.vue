<template>
  <AppLink
    :tag="tag"
    :title="title"
    :type="type"
    :to="to"
    :force-reload="forceReload"
    :open-in-new-tab="openInNewTab"
    class="AppButton"
    :class="{
      '--is-hover': isHover
    }"
  >

    <!-- Label -->
    <span class="AppButton-label">{{ label }}</span>

    <!-- Icon -->
    <AppSvg
      v-if="icon"
      :name="icon"
      class="AppButton-svg"
    />
  </AppLink>
</template>

<script>
import AppLink from './AppLink.vue'

export default {
  props: {
    ...AppLink.props,
    label: {
      type: String,
      required: false,
      default: null
    },
    isHover: {
      type: String,
      required: false,
      default: null
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.AppButton {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20rem;
  padding: 2rem 3.5rem;
  border-radius: 80px;
  box-shadow: 0 0 0 1px black;

  &.--is-hover,
  &:hover,
  &:focus {
    outline: none;
    background-color: black;

    .AppButton-label {
      color: white;
    }

    .AppButton-svg {
      fill: white;
    }
  }
}

.AppButton-svg {
  margin-left: 1rem;
  max-width: 1.2rem;
  max-height: 1.2rem;
  fill: black;
}
</style>
