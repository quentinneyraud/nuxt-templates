<template>
  <div>
    <ul>
      <li>
        <NuxtLink
          :to="switchLocalePath('en')"
        >
          en
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="switchLocalePath('fr')"
        >
          fr
        </NuxtLink>
      </li>
    </ul>

    <h1>{{ $pt('drag') }}</h1>
    <p>{{ $pt('nav.nav_link_title', { variable: 'test' }) }}</p>

    <Nuxt />
  </div>
</template>

<style>
</style>
