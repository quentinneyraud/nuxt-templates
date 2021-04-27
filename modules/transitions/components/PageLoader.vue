<template>
  <div
    class="Loader-component"
    :class="{
      '--is-hidden': isHidden
    }"
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
      isHidden: false,
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
    async hide ({ done = null, promises = [] } = {}) {
      this.preloadPromises = promises
      this.prepareProgress()

      await Promise.all(this.preloadPromises)

      this.isHidden = true

      window.setTimeout(_ => {
        done()
      }, 500)
    },
    prepareProgress () {
      this.preloadPromises = this.preloadPromises
        .map(promise => {
          return promise
            .finally(_ => {
              this.fulfilledPromises++
              this.progress = this.fulfilledPromises / this.preloadPromises.length
            })
        })
    }
  }
}
</script>

<style scoped>
.Loader-component {
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
}

.Loader-component.--is-hidden {
  transform: translateY(-100%);
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

.Loader-component:after {
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
