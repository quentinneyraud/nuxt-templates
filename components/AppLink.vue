<template>
  <div class="linkComponent">
    <!-- Intern link -->
    <template v-if="type === 'internal'">
      <!-- Force reload -->
      <template v-if="forceReload">
        <a
          :href="to"
          :title="title"
          @click="$emit('click')"
        >
          <slot />
        </a>
      </template>

      <!-- Normal intern link -->
      <template v-else>
        <NuxtLink
          :to="to"
          :title="title"
          @click.native="$emit('click')"
        >
          <slot />
        </NuxtLink>
      </template>
    </template>

    <!-- prevented link -->
    <template v-else-if="type === 'prevented'">
      <a
        :title="title"
        href="#"
        @click.prevent.stop="$emit('click')"
      >
        <slot />
      </a>
    </template>

    <!-- External link -->
    <template v-else-if="type === 'external'">
      <a
        :href="to"
        :title="title"
        target="_blank"
        rel="noreferrer"
        @click="$emit('click')"
      >
        <slot />
      </a>
    </template>

    <!-- Tel, Email -->
    <template v-else-if="type === 'tel' || type === 'email'">
      <ClientOnly>
        <a
          :href="contactLink"
          :title="title"
          target="_blank"
          rel="noreferrer"
          @click="$emit('click')"
        >
          <slot />
        </a>
      </ClientOnly>
    </template>

    <!-- Place -->
    <template v-else-if="type === 'place'">
      <a
        :href="contactLink"
        :title="title"
        target="_blank"
        rel="noreferrer"
        @click="$emit('click')"
      >
        <slot />
      </a>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['external', 'internal', 'email', 'tel', 'place', 'prevented'].includes(value),
      default: 'internal'
    },
    blank: {
      type: Boolean,
      required: false,
      default () {
        if (this.type === 'external') return true

        return false
      }
    },
    forceReload: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    to: {
      type: [String, Object],
      required: false,
      default: '#'
    },
    tel: {
      type: String,
      required: false,
      default: null
    },
    email: {
      type: String,
      required: false,
      default: null
    },
    place: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    contactLink () {
      if (this.type === 'email') {
        return 'mailto:' + this.email
      }

      if (this.type === 'tel') {
        return 'tel:' + this.tel.replace(/\s/g, '')
      }

      if (this.type === 'place') {
        return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(this.place)
      }

      return ''
    }
  }
}
</script>

<style>
a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
