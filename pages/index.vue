<template>
  <div class="page">
    <div
      v-for="(a, ai) in as"
      :key="ai"
      v-observe="square1"
      :data-index="ai"
      class="square square1"
    >
      <pre>{{ square1 }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      as: [],
      square1: {
        active: true,
        once: false,
        onEnter: a => {
          console.log('enter', a.el.dataset.index)
        },
        onLeave: a => {
          console.log('leave', a.el.dataset.index)
        }
      }
    }
  },
  mounted () {
    window.setInterval(_ => {
      this.as.push('sss')
    }, 3000)
  }
}
</script>

<style lang="css" scoped>
.page {
  min-height: 500vh;
}

.square {
  width: 200px;
  height: 100px;
  background-color: red;
  border: 10px solid transparent;
}

.square.in-view {
  border: 10px solid red;
}

.square1 {
  margin-top: 50px;
  background-color: blue;
}

.square2 {
  top: 150vh;
  background-color: red;
}

</style>
