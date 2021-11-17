import Vue from 'vue'

// Assets
import silence from './silence.js'

// Class
import Sound from './Sound'

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
        this.sounds.push(new Sound({
          audioContext: this.audioContext,
          name: sound.name,
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
    play (name, params) {
      !this.iosDebugged && this.debugIos()

      this.get(name)
        ?.play(params)
    },
    pause (name, params) {
      this.get(name)
        ?.pause(params)
    }
  }
})

export default (_, inject) => {
  inject('audio', AudioManager)
}
