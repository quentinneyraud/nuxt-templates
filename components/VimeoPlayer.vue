<template>
  <div
    allow="fullscreen"
    allowfullscreen
    class="VimeoPlayer-component"
    :class="[
      `--layout-${layout}`,
      {
        '--is-hover': state.isHover,
        '--is-loading': state.isLoading,
        '--is-loaded': state.isLoaded,
        '--is-playing': state.isPlaying,
        '--is-paused': state.isPaused,
        '--is-fullscreen': state.isFullscreen,
        '--is-muted': state.isMuted,
        '--show-thumbnail': thumbnail && state.showThumbnail
      }
    ]"
    :style="{
      '--ratio': ratio * 100 + '%'
    }"
    @fullscreenchange="onFullscreenChange"
    @mozfullscreenchange="onFullscreenChange"
    @webkitfullscreenchange="onFullscreenChange"
    @msfullscreenchange="onFullscreenChange"
    @keydown.stop="_ => {}"
    @mouseenter.passive="onMouseEnter"
    @mouseleave.passive="onMouseLeave"
  >
    <!-- Thumbnail -->
    <Transition name="thumbnail">
      <div
        v-if="thumbnail && state.showThumbnail"
        ref="thumbnail"
        class="VimeoPlayer-thumbnail"
      >
        <AppImage
          :src="thumbnail.url"
          v-bind="thumbnail.alt"
        />
      </div>
    </Transition>

    <!-- Controls -->
    <div
      v-if="customControls"
      class="VimeoPlayer-controls"
    >
      <!-- Play / Pause -->
      <button
        class="VimeoPlayer-playPauseButton"
        :aria-label="state.isPlaying ? 'Pause' : 'Play'"
        @click="state.isPlaying ? pause() : play()"
      >
        <svg
          class="VimeoPlayer-playPauseIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 21"
        >
          <path d="M17.5 9.63398c.6667.38492.6667 1.34712 0 1.73202L1.75 20.4593c-.66667.3849-1.500001-.0962-1.500001-.866L.25 1.40673c0-.769798.83333-1.250923 1.5-.866023L17.5 9.63398z" />
        </svg>
      </button>

      <!-- Actions -->
      <Transition
        name="actions"
      >
        <div
          v-if="state.isPlaying"
          class="VimeoPlayer-actions"
        >
          <!-- Progress -->
          <div
            class="VimeoPlayer-progressWrapper"
            :style="{
              '--progress': progress.current
            }"
            @click="onProgressClick"
          >
            <div class="VimeoPlayer-progress">
              <div class="VimeoPlayer-progressTrack" />
            </div>
          </div>

          <!-- Duration -->
          <p class="VimeoPlayer-duration">
            {{ formatTime(duration) }}
          </p>

          <!-- Volume -->
          <button
            class="VimeoPlayer-volume"
            :aria-label="state.isMuted ? 'Unmute' : 'Mute'"
            @mouseenter="onVolumeButtonMouseEnter"
            @mouseleave="onVolumeButtonMouseLeave"
            @click="state.isMuted ? unmute() : mute()"
          >
            <svg
              class="VimeoPlayer-volumeIcon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 14"
            >
              <path d="M7.33333 13.7336L2.46834 9.71016c-.1039-.08569-.23486-.13248-.37-.13219H.576669c-.07587 0-.150993-.01484-.221066-.04368-.070074-.02883-.133719-.07109-.187289-.12436-.05357-.05326-.0960128-.11648-.1248948-.18603-.028882-.06956-.04363607-.14408-.0434168-.2193V5.57434c0-.15162.0607558-.29704.1689016-.40426.108146-.10722.254823-.16745.407765-.16745H2.09834c.13514.00029.2661-.0465.37-.13218L7.33333.845339c.16842-.139668.37354-.228772.59128-.256844.21773-.028071.43902.006058.63786.098377.19885.09232.36698.238993.48463.422778.11766.18379.17995.39706.17957.61474V12.8546c.00038.2176-.06191.4309-.17957.6147-.11765.1838-.28578.3305-.48463.4228-.19884.0923-.42013.1264-.63786.0984-.21774-.0281-.42286-.1172-.59128-.2569zm.73834-12.00756l-4.865 4.0218c-.31131.25679-.70336.39765-1.10833.39821h-.945v2.28684h.945c.40502.00029.79716.14118 1.10833.39822l4.87 4.02349-.005-11.12856zM12.6917 11.8648h-1.1534V2.71414h1.1534v9.15066zM15 10.7214h-1.1533V3.85756H15v6.86384z" />
            </svg>
          </button>

          <!-- Full screen -->
          <button
            class="VimeoPlayer-fullscreen"
            aria-label="Toggle fullscreen"
            @mouseenter="onFullscreenButtonMouseEnter"
            @mouseleave="onFullscreenButtonMouseLeave"
            @click="toggleFullscreen"
          >
            <svg
              class="VimeoPlayer-fullscreenIcon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
            >
              <path d="M1.33333 1.33333h3.33334V0H0v4.66667h1.33333V1.33333zm3.33334 9.33337H1.33333V7.33333H0V12h4.66667v-1.3333zM12 7.33333h-1.3333v3.33337H7.33333V12H12V7.33333zm-1.3333-2.66666H12V0H7.33333v1.33333h3.33337v3.33334z" />
            </svg>
          </button>
        </div>
      </Transition>
    </div>

    <!-- Player -->
    <div ref="player" class="VimeoPlayer-video" />
  </div>
</template>

<script>
// Libraries
let VimeoPlayer = null
if (process.browser) {
  VimeoPlayer = require('@vimeo/player').default
}

// Utils
const lerp = (value, target, coeff) => {
  return value * (1 - coeff) + target * coeff
}

const nofs = _ => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

const fs = el => {
  if (el.requestFullscreen) {
    el.requestFullscreen()
    return true
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
    return true
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen()
    return true
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen()
    return true
  } else {
    return false
  }
}

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    thumbnail: {
      type: Object,
      required: false,
      default: null
    },
    customControls: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     *
     * Position
     *
     */
    layout: {
      type: String,
      required: false,
      default: 'default',
      validator: value => ['default', 'cover', 'contain'].includes(value)
    },
    width: {
      type: Number,
      required: false,
      default: 0
    },
    height: {
      type: Number,
      required: false,
      default: 0
    },
    /**
     *
     * Instance options
     *
     */
    loop: {
      type: Boolean,
      required: false,
      default: false
    },
    muted: {
      type: Boolean,
      required: false,
      default: false
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: false
    },
    controls: {
      type: Boolean,
      required: false,
      default: false
    },
    byline: {
      type: Boolean,
      required: false,
      default: false
    },
    portrait: {
      type: Boolean,
      required: false,
      default: false
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false
    },
    background: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: Boolean,
      required: false,
      default: true
    },
    vimeoPlayerParams: {
      type: Object,
      required: false,
      default: _ => {}
    },
    /**
     *
     * Behavior
     *
     */
    hasCursorEvents: {
      type: Boolean,
      required: false,
      default: false
    },
    gifLike: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      ratio: 0,
      duration: 0,
      progress: {
        current: 0,
        target: 0
      },
      state: {
        isHover: false,
        isLoading: false,
        isLoaded: false,
        isPlaying: false,
        isPaused: false,
        isFullscreen: false,
        isMuted: this.muted,
        showThumbnail: true
      }
    }
  },
  mounted () {
    this.initialize()

    this.onEnter()
  },
  beforeDestroy () {
    this.$events.$off('resize', this.setLayout)
    this.$events.$off('ticker', this.onTick)
  },
  methods: {
    initialize () {
      if (this.state.isLoaded || this.state.isLoading) return

      this.state.isLoaded = false
      this.state.isLoading = true

      this.player = new VimeoPlayer(this.$refs.player, {
        id: this.id,
        loop: this.loop,
        muted: this.muted,
        autoplay: this.autoplay,
        controls: this.controls,
        byline: this.byline,
        portrait: this.portrait,
        title: this.title,
        transparent: this.transparent,
        background: this.background,
        dnt: true,
        ...this.vimeoPlayerParams
      })

      this.player.ready()
        .then(_ => {
          this.player.on('play', this.onPlay)
          this.player.on('pause', this.onPause)
          this.player.on('loaded', this.onLoaded)
          this.player.on('timeupdate', this.onTimeUpdate)
          this.player.on('volumechange', this.onVolumeChange)
          this.setDuration()
          this.setRatio()

          this.setLayout()
        })
        .catch(_ => {})
    },
    async setDuration () {
      this.duration = await this.player.getDuration().catch(_ => {})
    },
    /**
     * Utils
     */
    formatTime (time) {
      const hours = Math.floor(time / 60 * 60).toFixed().padStart(2, '0')
      const minutes = Math.floor(time / 60).toFixed().padStart(2, '0')
      const seconds = (time % 60).toFixed().padStart(2, '0')
      return time > 3600 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
    },
    /**
     * Layout
     */
    setLayout () {
      if (this.__isDestroyed) return

      if (this.layout === 'normal') {
        this.setRatio()
      } else if (this.layout === 'cover') {
        this.setCover()
      }
    },
    async setRatio () {
      if (this.__isDestroyed) return

      const [width, height] = await Promise.all([this.player.getVideoWidth(), this.player.getVideoHeight()])
      this.ratio = height / width
    },
    async setCover () {
      if (this.__isDestroyed || !this.$refs.player?.style) return

      if (!this.ratio) {
        await this.setRatio()
      }

      const { width, height } = this.$el.getBoundingClientRect()
      this.containerRatio = height / width

      if (this.ratio > this.containerRatio) {
        if (this.$refs.player) this.$refs.player.style.width = width + 'px'
        if (this.$refs.player) this.$refs.player.style.height = Math.round(width * this.ratio) + 'px'
      } else {
        if (this.$refs.player) this.$refs.player.style.height = height + 'px'
        if (this.$refs.player) this.$refs.player.style.width = Math.round(height / this.ratio) + 'px'
      }
    },
    /**
     * Actions
     */
    showThumbnail () {
      this.state.showThumbnail = true
    },
    play () {
      if (navigator.userAgent.includes('Chrome-Lighthouse')) return
      this.state.showThumbnail = false

      this.player
        .play()
        .catch(_ => {})
    },
    pause () {
      this.player
        .pause()
        .catch(_ => {
        })
    },
    stop () {
      this.player.pause()
      this.player.setCurrentTime(0).catch(_ => {})
    },
    toggleFullscreen () {
      if (this.state.isFullscreen) {
        nofs()
      } else if (!fs(this.$el)) {
        this.player.requestFullscreen()
          .catch(_ => {})
      }
    },
    mute () {
      this.player.setVolume(0).catch(_ => {})
    },
    unmute () {
      this.player.setVolume(1).catch(_ => {})
    },
    /**
     * Events
     */
    onPlay () {
      this.state.isPlaying = true
      this.state.isPaused = false

      if (this.state.isHover && this.hasCursorEvents) {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Pause',
          icon: 'pause'
        })
      }

      this.$emit('play')

      // if (this.customControls) this.$events.$on('ticker', this.onTick)
    },
    onPause () {
      this.state.isPlaying = false
      this.state.isPaused = true

      if (this.state.isHover && this.hasCursorEvents) {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Play',
          icon: 'play'
        })
      }

      this.$emit('pause')

      this.$events.$off('ticker', this.onTick)
    },
    onLoaded () {
      this.state.isLoading = false
      this.state.isLoaded = true
      this.$emit('loaded')

      this.setLayout()
    },
    onVolumeChange ({ volume }) {
      this.state.isMuted = volume === 0
    },
    onTimeUpdate ({ percent }) {
      this.progress.target = percent
    },
    onFullscreenChange () {
      this.state.isFullscreen = Boolean(document.webkitIsFullScreen || document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement)
    },
    onKeyDown (e) {
      // Space
      if (e.keyCode === 32) {
        this.pause()
      }
    },
    onProgressClick ({ currentTarget, clientX }) {
      const { left, width } = currentTarget?.getBoundingClientRect()

      const normalizedX = (clientX - left) / width

      if (normalizedX && this.duration) {
        this.player?.setCurrentTime(this.duration * normalizedX)
          .catch(_ => {})
      }
    },
    onTick () {
      if (this.__isDestroyed) return

      this.progress.current = lerp(this.progress.current, this.progress.target, 0.15)
    },
    onMouseEnter () {
      this.state.isHover = true
      if (!this.hasCursorEvents) return

      if (this.state.isPlaying) {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Pause',
          icon: 'pause'
        })
      } else {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Play',
          icon: 'play'
        })
      }
    },
    onMouseLeave () {
      this.state.isHover = false
      if (!this.hasCursorEvents) return

      this.$bus.$emit('cursor:state', {
        active: false
      })
    },
    onVolumeButtonMouseEnter () {
      this.$bus.$emit('cursor:state', {
        active: true,
        disappear: true
      })
    },
    onVolumeButtonMouseLeave () {
      if (this.state.isPlaying) {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Pause',
          icon: 'pause'
        })
      } else {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Play',
          icon: 'play'
        })
      }
    },
    onFullscreenButtonMouseEnter () {
      this.$bus.$emit('cursor:state', {
        active: true,
        disappear: true
      })
    },
    onFullscreenButtonMouseLeave () {
      if (this.state.isPlaying) {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Pause',
          icon: 'pause'
        })
      } else {
        this.$bus.$emit('cursor:state', {
          active: true,
          text: 'Play',
          icon: 'play'
        })
      }
    },
    /**
     * Intersection observer events
     */
    onEnter () {
      // this.$events.$on('resize', this.setLayout)

      if (this.gifLike) {
        this.play()
      }
    },
    onLeave () {
      this.pause()
    }
  }
}
</script>

<style lang="css" scoped>
.VimeoPlayer-component {
  position: relative;
  user-select: none;
  overflow: hidden;
}

/*

Layouts

 */
.VimeoPlayer-component.--layout-cover .VimeoPlayer-video, .VimeoPlayer-component.--layout-contain .VimeoPlayer-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0px);
}

.VimeoPlayer-component.--layout-contain {
  height: 100%;
}

.VimeoPlayer-component.--layout-default {
  width: 100%;
}

.VimeoPlayer-component.--layout-default:before {
  content: '';
  width: 1px;
  margin-left: -1px;
  float: left;
  height: 0;
  padding-top: var(--ratio);
}

.VimeoPlayer-component.--layout-default:after {
  content: '';
  display: table;
  clear: both;
}

.VimeoPlayer-component.--layout-default .VimeoPlayer-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/*

States

 */

.VimeoPlayer-component.--is-playing .VimeoPlayer-thumbnail {
  opacity: 0;
  transform: translate3d(0px, -100%, 0px);
}

.VimeoPlayer-component.--is-muted .VimeoPlayer-volumeIcon {
  opacity: 0.3;
}

.VimeoPlayer-component.--is-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999999999;
}

/*

Video

 */

.VimeoPlayer-video {
  height: 100%;
  width: 100%;
}

.VimeoPlayer-video /deep/ iframe {
  width: 100%;
  height: 100%;
}

/*

Thumbnail

 */

.VimeoPlayer-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 1;
}

.VimeoPlayer-thumbnail .AppImage-component {
  width: 100%;
  height: 100%;
}

.thumbnail-enter-active, .thumbnail-leave-active {
  transition: opacity 0.5s easeInOutCubic;
}

.thumbnail-enter, .thumbnail-leave-to {
  opacity: 0;
}

/*

Controls

 */

.VimeoPlayer-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
}

.VimeoPlayer-playPauseButton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 25;
  pointer-events: auto;
  border: none;
  background: none;
  outline: none;
}

.VimeoPlayer-playPauseIcon {
  width: 40px;
  height: 40px;
  fill: white;
}

/*

Actions

 */

.VimeoPlayer-actions {
  position: absolute;
  left: 60px;
  bottom: 0;
  padding-bottom: 45px;
  right: 60px;
  display: flex;
  align-items: center;
  z-index: 26;
  opacity: 1;
  transform: translate3d(0px, 0%, 0px);
  pointer-events: none;
}

.actions-enter-active, .actions-leave-active {
  transition: transform 0.5s easeInOutCubic, opacity 0.5s easeInOutCubic;
}

.actions-enter, .actions-leave-to {
  opacity: 0;
  transform: translate3d(0px, 100%, 0px);
}

/*

Progress

 */

.VimeoPlayer-progressWrapper {
  flex-grow: 1;
  height: 9px;
  cursor: pointer;
  pointer-events: auto;
}

.VimeoPlayer-progress {
  position: relative;
  width: 100%;
  height: 1px;
  background-color: rgba(255,255,255,0.2);
  pointer-events: none;
}

.VimeoPlayer-progressTrack {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: #ff214f;
  transform-origin: left center;
  transform: scaleX(var(--progress));
}

/*

Duration

 */

.VimeoPlayer-duration {
  margin-left: 2rem;
}

/*

Volume

 */

.VimeoPlayer-volume {
  margin-left: 2rem;
  pointer-events: auto;
}

.VimeoPlayer-volume:hover .VimeoPlayer-volumeIcon {
  fill: #ff214f;
}

.VimeoPlayer-volumeIcon {
  width: 1.5rem;
  height: 1.3rem;
  fill: #fff;
  pointer-events: none;
  transition: opacity 0.3s, fill 0.3s;
}

/*

Fullscreen

 */

.VimeoPlayer-fullscreen {
  margin-left: 2rem;
  pointer-events: auto;
}

.VimeoPlayer-fullscreen:hover .VimeoPlayer-fullscreenIcon {
  fill: #ff214f;
}

.VimeoPlayer-fullscreenIcon {
  width: 1.2rem;
  height: 1.2rem;
  fill: #fff;
  pointer-events: none;
  transition: fill 0.3s;
}
</style>
