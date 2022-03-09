<template>
  <div>
    <img ref="image" src="https://source.unsplash.com/1600x900/?dog" alt="">
  </div>
</template>

<script>
export default {
  methods: {
    preload () {
      return _ => new Promise((resolve, reject) => {
        if (this.$refs.image.complete) resolve()

        this.$refs.image.addEventListener('load', resolve)
        this.$refs.image.addEventListener('error', reject)
      })
        .catch(_ => {})
    },
    transitionHide () {
      return _ => {
        this.$refs.image.classList.add('--is-hidden')

        return new Promise(resolve => {
          window.setTimeout(resolve, 500)
        })
      }
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
