<template>
  <div>
    <!-- External -->
    <AppLink
      type="external"
      to="http://akaru.fr"
    >
      <span>external akaru.fr</span>
    </AppLink>

    <!-- External -->
    <AppLink
      type="internal"
      :to="{
        name: 'about'
      }"
    >
      <span>internal to about page</span>
    </AppLink>

    <!-- Prevented -->
    <AppLink
      type="prevented"
      @click="onClick"
    >
      <span>prevented link</span>
    </AppLink>

    <!-- Email -->
    <AppLink
      type="email"
      email="quentin.neyraud@gmail.com"
    >
      <span>email to quentin.neyraud@gmail.com</span>
    </AppLink>

    <!-- Tel -->
    <AppLink
      type="tel"
      tel="04 82 33 85 10"
    >
      <span>tel to 04 82 33 85 10</span>
    </AppLink>

    <!-- Adress -->
    <AppLink
      type="place"
      place="9, quai André Lassagne"
    >
      <span>9, quai André Lassagne</span>
    </AppLink>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      console.log('click')
    }
  }
}
</script>

<style>
</style>
