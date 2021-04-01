<template>
  <div
    class="PageTransition-component"
    :class="{
      '--is-hidden': isHidden
    }"
  >
    <span>Transition</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isHidden: true
    }
  },
  mounted () {
    this.$transitionsBus.$on('transition:show', this.show)
    this.$transitionsBus.$on('transition:hide', this.hide)
  },
  methods: {
    hide ({ done = null } = {}) {
      this.isHidden = true
      window.setTimeout(_ => {
        done()
      }, 500)
    },
    show ({ done = null } = {}) {
      this.isHidden = false
      window.setTimeout(_ => {
        done()
      }, 500)
    }
  }
}
</script>

<style scoped>
.PageTransition-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(0%);
  pointer-events: auto;
  transition: all 0.5s linear;
}

.PageTransition-component.--is-hidden {
  transform: translateY(-100%);
  pointer-events: none;
}

span {
  color: #FFFFFF;
}

</style>
