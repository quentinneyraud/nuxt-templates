<template>
  <div
    class="Loader-component"
    :class="{
      '--is-hidden': isHidden
    }"
  >
    <span>Welcome</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isHidden: false
    }
  },
  mounted () {
    this.$transitionsBus.$on('loader:hide', this.hide)
  },
  methods: {
    hide ({ done = null } = {}) {
      this.isHidden = true
      window.setTimeout(_ => {
        done()
      }, 500)
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
  justify-content: center;
  align-items: center;
  transform: translateY(0%);
  pointer-events: auto;
}

.Loader-component.--is-hidden {
  transform: translateY(-100%);
  pointer-events: none;
  transition: all 0.5s linear;
}

span {
  color: #FFFFFF;
}

</style>
