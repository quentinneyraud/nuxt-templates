import Vue from 'vue'

// Assets
import silence from './silence.js'

// Class
import Sound from './Sound'

const randomId = _ => `_${Math.random().toString(36).substr(2, 9)}`

const AudioManager = new Vue({
  data () {
    return {
      audioContext: null,
      sounds: [],
      isMuted: false,
      iosDebugged: false // https://adactio.com/journal/17709
    }
  },

  watch: {
    isMuted (isMuted) {
      if (isMuted) {
        this.sounds.forEach(sound => sound.mute({ duration: 0 }))
      } else {
        this.sounds.forEach(sound => sound.unmute({ duration: 0 }))
      }
    }
  },

  methods: {
    disableMediaControls (keys = ['play', 'pause', 'seekbackward', 'seekforward', 'previoustrack', 'nexttrack']) {
      keys.forEach(key => {
        navigator?.mediaSession?.setActionHandler(key, function () { })
      })
    },

    init () {
      this.disableMediaControls()

      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.audioContext = new AudioContext()

      document.addEventListener('visibilitychange', _ => {
        if (document.hidden) {
          this.onWindowBlur()
        } else {
          this.onWindowFocus()
        }
      })
    },
    add (sounds = []) {
      if (!Array.isArray(sounds)) sounds = [sounds]

      sounds.forEach(sound => {
        if (!sound.url) return

        const name = sound.name || sound.url?.split('/')?.pop()?.split('.')?.shift() || randomId()

        this.sounds.push(new Sound({
          audioContext: this.audioContext,
          name,
          url: sound.url,
          loop: sound.loop,
          maxVolume: sound.maxVolume
        }))
      })
    },
    async loadAll () {
      const promises = this.sounds.map(sound => sound.load())

      return await Promise.all(promises)
    },
    debugIos () {
      const sound = new Audio(silence)
      sound.play()
      this.iosDebugged = true
    },
    mute () {
      this.isMuted = true
    },
    unmute () {
      this.isMuted = false
    },
    onWindowBlur () {
      this.sounds.forEach(sound => sound.mute({ duration: 0 }))
    },
    onWindowFocus () {
      if (this.isMuted) return

      this.sounds.forEach(sound => sound.unmute({ duration: 1 }))
    },
    get (name) {
      return this.sounds?.find(sound => sound.name === name)
    },
    load (name) {
      const sound = this.get(name)

      if (!sound) return

      return sound.load()
    },
    async play (name, { duration } = {}) {
      !this.iosDebugged && this.debugIos()

      const sound = this.get(name)
      if (!sound) return

      if (!sound.loaded) await sound.load()
      sound.play({ duration })
    },
    pause (name, { duration } = {}) {
      const sound = this.get(name)

      if (!sound) return

      sound.pause({ duration })
    }
  }
})

export default (_, inject) => {
  inject('audio', AudioManager)
}
