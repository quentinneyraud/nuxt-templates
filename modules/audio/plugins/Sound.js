const loadSound = (audioContext, url) => {
  return new Promise(resolve => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    request.onload = function () {
      audioContext.decodeAudioData(request.response, buffer => {
        resolve({
          buffer
        })
      }, _ => {})
    }

    request.send()
  })
}

const animTo = (from, to, duration, callback) => {
  const interval = 10
  let intervalId = null

  let step = to - from
  if (duration > 0) step = step / (duration * 1000) * interval

  const then = new Promise(resolve => {
    intervalId = window.setInterval(_ => {
      from += step

      callback(from)

      if (Math.abs(from - to) < 0.0001) {
        callback(to)
        resolve()
        window.clearInterval(intervalId)
      }
    }, interval)
  })

  return {
    then,
    stop: _ => {
      window.clearInterval(intervalId)
    }
  }
}

export default class Sound {
  constructor ({ audioContext, name, url, loop = false, volume = 0, maxVolume = 1 }) {
    this.audioContext = audioContext
    this.name = name
    this.url = url
    this.loop = loop
    this.maxVolume = Math.min(maxVolume, 1)

    this.state = {
      loading: false,
      loaded: false,
      playing: false
    }
    this.isMuted = false

    this.source = null
    this.buffer = null

    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = volume
    this.gainNode.connect(this.audioContext.destination)

    this.stopVolumeAnimation = null
  }

  async load () {
    this.state.loading = true

    const { buffer } = await loadSound(this.audioContext, this.url)
    this.loaded = true
    this.buffer = buffer

    this.state.loading = false
    this.state.loaded = true
  }

  createSource () {
    this.source = this.audioContext.createBufferSource()
    this.source.loop = this.loop
    this.source.buffer = this.buffer
    this.source.connect(this.gainNode)
  }

  setVolume (volume) {
    this.gainNode.gain.value = volume
  }

  getVolume () {
    return this.gainNode.gain.value
  }

  fadeVolumeTo ({ duration = 0, volume = 0 }) {
    this.stopVolumeAnimation?.()

    const { stop, then } = animTo(this.gainNode.gain.value, volume, duration, value => {
      this.setVolume(value)
    })

    this.stopVolumeAnimation = stop

    return then
  }

  mute ({ duration } = {}) {
    if (!this.loaded) return

    this.isMuted = true
    this.fadeVolumeTo({ duration, volume: 0 })
  }

  unmute ({ duration } = {}) {
    if (!this.loaded) return

    this.isMuted = false
    this.fadeVolumeTo({ duration, volume: this.maxVolume })
  }

  play ({ duration } = {}) {
    if (!this.loaded) return

    try {
      this.source?.stop()
    } catch (_) {}

    this.state.playing = true

    this.createSource()
    this.audioContext.resume()
    this.source.start()
    !this.isMuted && this.fadeVolumeTo({ duration, volume: this.maxVolume })
  }

  async pause ({ duration } = {}) {
    if (!this.loaded) return

    await this.fadeVolumeTo({ duration, volume: 0 })

    this.source?.stop()
    this.state.playing = false
  }
}
