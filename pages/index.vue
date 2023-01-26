<template>
  <div>
    <div class="actions">
      <button @click="$virtualScroll.lock()">
        lock
      </button>
      <button @click="$virtualScroll.unlock()">
        unlock
      </button>
      <button @click="$virtualScroll.scrollTo(400)">
        scroll to 400px
      </button>
      <button @click="$virtualScroll.goTo(400)">
        go to 400px
      </button>
      <button @click="$virtualScroll.scrollOfOneViewport()">
        scroll one viewport
      </button>
      <button @click="$virtualScroll.scrollToTop()">
        scroll to top
      </button>
      <button @click="$virtualScroll.goToTop()">
        go to top
      </button>
      <button @click="$virtualScroll.scrollToBottom()">
        scroll to bottom
      </button>
      <button @click="$virtualScroll.goToBottom()">
        go to bottom
      </button>
    </div>

    <section
      v-vs-section
      :style="{
        backgroundColor: `#FFF`
      }"
    >
      <div class="stickyContainer">
        <div
          v-vs-sticky="{
            onProgress
          }"
          class="stickyChild"
        />
      </div>
    </section>

    <section
      v-for="index in 10"
      :key="index"
      v-vs-section
      :style="{
        backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
      }"
    >
      <p>{{ index }}</p>
    </section>

  </div>
</template>

<script>
export default {
  mounted () {
    this.$virtualScroll.$on('scroll', opts => {
      // console.log('opts:', opts)
    })
  },
  methods: {
    onProgress (progress) {
      console.log('progress:', progress)
    }
  }
}
</script>

<style>
section {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

p {
  font-size: 50px;
}

.actions {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.actions button:nth-child(n + 2) {
  margin-left: 10px;
}

.stickyContainer {
  position: absolute;
  top: 25vh;
  left: 50%;
  width: 500px;
  height: 50vh;
  transform: translateX(-50%);
  border: 1px solid blue;
  box-sizing: border-box;
}

.stickyChild {
  position: absolute;
  left: 50%;
  width: 150px;
  height: 50px;
  background-color: red;
  box-sizing: border-box;
}
</style>
