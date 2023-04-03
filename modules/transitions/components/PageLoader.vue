<template>
  <div
    class="Loader"
    :style="{
      '--progress': progress
    }"
  >
    <p>Welcome</p>

    <p>Progress</p>

    <p><span>{{ fulfilledPromises }} / {{ preloadPromises.length }}</span></p>

    <p><span>{{ progress }}</span></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fulfilledPromises: 0,
      progress: 0,
      preloadPromises: []
    }
  },
  mounted () {
    this.$transitionsBus.$on('loader:hide', this.hide)
  },
  beforeDestroy () {
    this.$transitionsBus.$off('loader:hide', this.hide)
  },
  methods: {
    async hide ({ el, to, from, promises = [], done } = {}) {
      document.body.classList.add('cursor-loading')
      this.preloadPromises = promises

      await Promise.allSettled([
        ...this.preloadPromises.map(p => p()?.finally(this.preloadPromisesCallback))
      ])

      this.$transitionsBus.$emit('loader:hide:page-loaded', { el, to, from })

      this.$el.style.transform = 'translateY(-100%)'

      window.setTimeout(_ => {
        done()
        this.$transitionsBus.$emit('loader:hide:done', { el, to, from })
        document.body.classList.remove('cursor-loading')
      }, 500)
    },
    preloadPromisesCallback () {
      this.fulfilledPromises++
      this.progress = this.fulfilledPromises / this.preloadPromises.length
    }
  }
}
</script>

<style scoped>
.Loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(0%);
  pointer-events: auto;

  transition: transform 0.5s ease-out;
}

.Loader:after {
  content: '';
  position: absolute;
  top: 50vh;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff;
  transform-origin: left center;
  transform: scaleX(var(--progress));
  transition: transform 0.5s;
}

span, p {
  color: #FFFFFF;
}

</style>
