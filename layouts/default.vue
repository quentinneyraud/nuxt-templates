<template>
  <div>
    <Debug
      v-if="$debug"
      container-class="l-container"
      :columns="12"
      :gutter="30"
    />
    <Nuxt />
  </div>
</template>

<style>
@media screen and (min-width: 1440px) {
  .l-container {
      max-width: 100%;
  }
}
@media screen and (min-width: 1200px) {
  .l-container {
      max-width: 100%;
  }
}
@media screen and (min-width: 992px) {
  .l-container {
      max-width: 100%;
  }
}
@media screen and (min-width: 768px) {
  .l-container {
      max-width: 100%;
  }
}
@media screen and (min-width: 576px) {
  .l-container {
      max-width: 100%;
  }
}
.l-container {
    position: relative;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    max-width: calc(100% - 80px);
    padding-left: 0;
    padding-right: 0;
}
</style>
