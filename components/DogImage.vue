<template>
  <div>
    <img
      ref="image"
      src="https://source.unsplash.com/1600x900/?dog"
      alt=""
    >
  </div>
</template>

<script>
const loadAsync = img => {
  return new Promise((resolve, reject) => {
    if (img.complete) resolve()

    img.addEventListener('load', resolve)
    img.addEventListener('error', reject)
  })
}

const delay = ms => new Promise(resolve => {
  window.setTimeout(_ => {
    resolve()
  }, ms)
})

export default {
  methods: {
    async preload () {
      await loadAsync(this.$refs.image)
    },

    async transitionHide () {
      this.$refs.image.classList.add('--is-hidden')

      await delay(500)
    }
  }
}
</script>

<style>
img {
  width: 800px;

}

img.--is-hidden {
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
</style>
