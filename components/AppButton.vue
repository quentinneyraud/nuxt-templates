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
    <span class="AppButton-label AppText-button">{{ label }}</span>

    <!-- Icon -->
    <AppSvg
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

<style lang="css" scoped>
.AppButton {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20rem;
  padding: 2rem 3.5rem 1.8rem 3.5rem;
  border-radius: 80px;
  box-shadow: 0 0 0 1px black;
}

.AppButton.--is-hover, .AppButton:hover, .AppButton:focus {
    outline: none;
    background-color: black;
  }

.AppButton.--is-hover .AppButton-label, .AppButton:hover .AppButton-label, .AppButton:focus .AppButton-label {
  color: white;
}

.AppButton.--is-hover .AppButton-svg, .AppButton:hover .AppButton-svg, .AppButton:focus .AppButton-svg {
  fill: white;
}

.AppButton-svg {
  position: absolute;
  top: 50%;
  right: 2rem;
  max-width: 1.2rem;
  max-height: 1.2rem;
  fill: black;
}
</style>
