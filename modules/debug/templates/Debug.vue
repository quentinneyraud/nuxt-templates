<template>
  <div
    class="Debug-component"
    :class="{
      '--is-open': isOpen,
      ...featuresState
    }"
  >
    <ul class="Debug-options">
      <li
        v-for="(option, optionIndex) in options"
        :key="optionIndex"
        class="Debug-option"
      >
        <span class="Debug-optionText">{{ option.text }}</span>
        <input v-model="option.active" class="Debug-optionInput" type="checkbox">
      </li>
    </ul>
    <button
      class="Debug-button"
      @click="isOpen = !isOpen"
    >
      <span>{{ buttonText }}</span>
    </button>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = 'debug-module'

export default {
  data () {
    return {
      isOpen: false,
      options: [{
        key: 'image',
        text: 'Outline images without alt attribute',
        active: false,
        callback: this.onImageChange
      }, {
        key: 'links',
        text: 'Outline links without title attribute',
        active: false,
        callback: this.onLinksChange
      }, {
        key: 'grid',
        text: 'Show grid',
        active: false,
        callback: this.onGridChange
      }]
    }
  },
  computed: {
    buttonText () {
      return this.isOpen ? 'Close' : 'Open'
    },
    featuresState () {
      return this.options
        .reduce((acc, option) => {
          acc[option.key] = option.active

          return acc
        }, {})
    }
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.persistToLocalStorage()

        this.setBodyClasses()
      }
    }
  },
  created () {
    this.setOptionsFromLocalStorage()
  },
  methods: {
    setOptionsFromLocalStorage () {
      if (!process.browser) return

      const localStorageOptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

      if (!localStorageOptions) return

      this.options
        .forEach(option => {
          option.active = localStorageOptions?.[option.key] ?? false
        })
    },
    persistToLocalStorage () {
      if (!process.browser) return

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.featuresState))
    },
    setBodyClasses () {
      if (!process.browser) return

      Object.entries(this.featuresState)
        .forEach(([featureName, isActive]) => {
          const className = `feature-${featureName}`

          if (isActive) {
            document.body.classList.add(className)
          } else {
            document.body.classList.remove(className)
          }
        })
    }
  }
}
</script>

<style>
body.feature-image img:not([alt]) {
  outline: 10px solid red !important;
}

body.feature-image img[alt=""] {
  outline: 10px solid red !important;
}
</style>

<style lang="css" scoped>
/**

  Resets

 */
button {
  overflow: visible;
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  background: none;
  line-height: inherit;
  outline: none;
  border-radius: 0;
  cursor: pointer;
}
button:focus,
button:hover {
  outline: none;
}
ul {
  margin: 0;
  padding: 0;
}
span {
  display: inline-block;
  color: #dadada;
  font-family: sans-serif;
  font-size: 12px;
}

.Debug-component {
  position: fixed;
  top: 0;
  right: 20px;
  z-index: 100000;
  background-color: #000;
  width: 300px;
}

.Debug-component.--is-open .Debug-options {
  height: auto;
}

.Debug-options {
  height: 0;
  overflow: hidden;
}

.Debug-option {
  padding: 10px 20px;
  border-bottom: 1px solid rgba(218, 218, 218, 0.5);
  display: flex;
  justify-content: space-between;
}

.Debug-button {
  width: 100%;
  height: 30px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
