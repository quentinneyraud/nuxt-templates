<template>
  <div
    class="PageTransition"
    :style="{
      '--progress': progress
    }"
  >
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
    this.$transitionsBus.$on('transition:show', this.show)
    this.$transitionsBus.$on('transition:hide', this.hide)
  },

  beforeDestroy () {
    this.$transitionsBus.$off('transition:show', this.show)
    this.$transitionsBus.$off('transition:hide', this.hide)
  },

  methods: {
    async hide ({ el, to, from, promises = [], done } = {}) {
      this.resetProgress()

      this.preloadPromises = promises
      await Promise.allSettled([
        ...this.preloadPromises.map(p =>
          p().finally(this.preloadPromisesCallback)
        )
      ])

      this.$transitionsBus.$emit('transition:hide:next-page-loaded', { el, to, from })

      this.$el.style.transform = 'translateY(-100%)'

      window.setTimeout(_ => {
        done()
        this.$transitionsBus.$emit('transition:hide:done', { el, to, from })
        document.body.classList.remove('cursor-loading')
        this.resetProgress()
      }, 500)
    },

    async show ({ el, to, from, promises = [], done } = {}) {
      document.body.classList.add('cursor-loading')

      await Promise.allSettled(promises)

      this.$transitionsBus.$emit('transition:show:previous-page-hidden', { el, to, from })

      this.$el.style.transform = 'translateY(0%)'

      window.setTimeout(_ => {
        done()
        this.$transitionsBus.$emit('transition:show:done', { el, to, from })
      }, 500)
    },
    resetProgress () {
      this.fulfilledPromises = 0
      this.progress = 0
      this.preloadPromises = []
    },
    preloadPromisesCallback () {
      this.fulfilledPromises++
      this.progress = this.fulfilledPromises / this.preloadPromises.length
    }
  }
}
</script>

<style scoped>
.PageTransition {
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
  transition: all 0.5s ease-in-out;

  transform: translateY(-100%);
}

.PageTransition:after {
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
