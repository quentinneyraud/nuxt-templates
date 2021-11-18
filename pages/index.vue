<template>
  <div>
    <p>is muted: {{ $audio && $audio.isMuted }}</p>

    <p>
      <button @click="mute">
        mute
      </button>

      <button @click="unmute">
        unmute
      </button>
    </p>

    <p>
      <ClientOnly v-if="$audio.get('ambient')">
        <pre>{{ $audio.get('ambient').state }}</pre>
      </ClientOnly>

      <button @click="ambientStart">
        ambient start
      </button>

      <button @click="ambientStop">
        ambient stop
      </button>
    </p>

    <p>
      <ClientOnly v-if="$audio.get('click')">
        <pre>{{ $audio.get('click').state }}</pre>
      </ClientOnly>

      <button v-audio:click>
        Interaction
      </button>
    </p>
  </div>
</template>

<script>
import ambient from 'assets/sounds/ambient.mp3'
import click from 'assets/sounds/click.mp3'

export default {
  mounted () {
    this.$audio.init()

    this.$audio.add([{
      name: 'ambient',
      url: ambient,
      loop: true
    }, {
      name: 'click',
      url: click
    }])

    this.$audio.load('ambient')
  },
  methods: {
    mute () {
      this.$audio.mute()
    },
    unmute () {
      this.$audio.unmute()
    },
    ambientStart () {
      this.$audio.play('ambient', { duration: 2 })
    },
    ambientStop () {
      this.$audio.pause('ambient', { duration: 1 })
    }
  }
}
</script>

<style>
</style>
