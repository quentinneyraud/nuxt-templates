<template>
  <div>
    <h2>Images</h2>

    <div class="block">
      <span>no alt</span>
      <img src="https://source.unsplash.com/random/300x200">
    </div>

    <div class="block">
      <span>empty alt</span>
      <img src="https://source.unsplash.com/random/300x200" alt="">
    </div>

    <div class="block">
      <span>alt</span>
      <img src="https://source.unsplash.com/random/300x200" alt="Image">
    </div>

    <h2>Links</h2>

    <div class="block">
      <span>no title</span>
      <a href="http://google.fr">link</a>
    </div>

    <div class="block">
      <span>empty title</span>
      <a href="http://google.fr" title="">link</a>
    </div>

    <div class="block">
      <span>title</span>
      <a href="http://google.fr" title="ok">link</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.block {
  display: flex;
}
</style>
