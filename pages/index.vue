<template>
  <div class="Home">
    <AppButton
      label="Click me"
      to="http://google.fr"
      open-in-new-tab
    />

    <AppButton
      label="Akaru"
      icon="akaru"
      to="http://google.fr"
      open-in-new-tab
    />

    <AppButton
      icon="akaru"
      to="http://google.fr"
      open-in-new-tab
    />

    <AppButton
      label="Akaru hover"
      icon="akaru"
      to="http://google.fr"
      open-in-new-tab
      is-hover
    />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.Home {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}
</style>
