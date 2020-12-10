<template>
  <div>
    <span>no alt</span>
    <img src="https://source.unsplash.com/random/300x200">

    <span>empty alt</span>
    <img src="https://source.unsplash.com/random/300x200" alt="">

    <span>alt</span>
    <img src="https://source.unsplash.com/random/300x200" alt="Image">
  </div>
</template>

<script>
export default {}
</script>

<style>
img:not([alt]):after, img[alt=""]:after {
  border: 20px inset red !important;
}
</style>
