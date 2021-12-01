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

    <Nuxt />
  </div>
</template>

<style>
</style>
