<template>
  <div
    class="VirtualScrollScrollBar"
    :class="{
      '--is-scrolling': isScrolling,
      '--is-dragging': mouseDown
    }"
  >
    <div
      ref="thumb"
      class="VirtualScrollScrollBar-thumb"
      @mousedown="onScrollbarDragStart"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      mouseDown: false
    }
  },

  computed: {
    isScrolling () {
      if (!this.$virtualScroll) return false

      return Math.abs(this.$virtualScroll.target - this.$virtualScroll.current) > 10
    }
  },

  mounted () {
    this.$virtualScroll.$on('scroll', this.onScroll)
    window.addEventListener('mouseup', this.onScrollBarRelease)
    window.addEventListener('mousemove', this.onScrollbarDrag)
  },

  beforeDestroy () {
    this.$virtualScroll.$off('scroll', this.onScroll)
    window.removeEventListener('mouseup', this.onScrollBarRelease)
    window.removeEventListener('mousemove', this.onScrollbarDrag)
  },

  methods: {
    onScroll () {
      const t = this.$virtualScroll.current / this.$virtualScroll.bounding * (this.$el.clientHeight - this.$refs.thumb.clientHeight - 4)
      this.$refs.thumb.style.transform = `translate3d(0px, ${t.toFixed(2)}px, 0px)`
    },

    updateThumbHeight () {
      this.$refs.thumb.style.height = `${
                (this.scrollbarHeight * this.scrollbarHeight) /
                (this.instance.limit.y + this.scrollbarHeight)
            }px`
    },
    /**
     *
     * Events
     *
     */
    onScrollbarDragStart () {
      this.mouseDown = true
    },
    onScrollBarRelease () {
      this.mouseDown = false
    },
    onScrollbarDrag (e) {
      if (!this.mouseDown) return

      const y = e.clientY / this.$el.clientHeight * this.$virtualScroll.bounding

      this.$virtualScroll.scrollTo(y)
    }
  }
}
</script>

<style>
.VirtualScrollScrollBar {
  position: fixed;
  top: 0;
  right: 0;
  width: 11px;
  height: 100vh;
  z-index: 1000;
  transform-origin: center right;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0;
}

.VirtualScrollScrollBar:hover {
  transform: scaleX(1.45);
}

.VirtualScrollScrollBar:hover, .VirtualScrollScrollBar.--is-scrolling {
  opacity: 1;
}

.VirtualScrollScrollBar.--is-dragging .VirtualScrollScrollBar-thumb {
  cursor: grabbing;
}

.VirtualScrollScrollBar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 7px;
  height: 100px;
  background-color: black;
  opacity: 0.5;
  border-radius: 14px;
  margin: 2px;
  cursor: grab;
  will-change: transform;
}

</style>
