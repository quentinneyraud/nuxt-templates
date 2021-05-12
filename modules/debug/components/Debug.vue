<template>
  <div
    class="Debug-component"
    :class="{
      '--is-open': isOpen
    }"
    :style="{
      '--columns': columns,
      '--gutter': gutter + 'px'
    }"
  >
    <!-- Grid -->
    <div
      v-if="featuresState.grid"
      class="Debug-grid"
      :class="containerClass"
    >
      <div
        v-for="index in columns"
        :key="index"
        class="Debug-gridColumn"
      />
    </div>

    <!-- Controls -->
    <div class="Debug-controls">
      <!-- Options -->
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

      <!-- Open / Close button -->
      <button
        :aria-label="buttonText"
        class="Debug-button"
        @click="isOpen = !isOpen"
      >
        <span>{{ buttonText }}</span>
      </button>
    </div>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = 'debug-module'

export default {
  props: {
    containerClass: {
      type: String,
      required: false,
      default: null
    },
    columns: {
      type: Number,
      required: false,
      default: 12
    },
    gutter: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      isOpen: false,
      options: [{
        key: 'image-alt',
        text: 'Outline images without alt attribute',
        active: false
      }, {
        key: 'link-title',
        text: 'Outline links without title attribute',
        active: false
      }, {
        key: 'button-title',
        text: 'Outline buttons without title attribute',
        active: false
      }, {
        key: 'grid',
        text: 'Show grid',
        active: false
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
  mounted () {
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
          const className = `debug-${featureName}`

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
body.debug-image-alt img:not([alt]), body.debug-image-alt img[alt=""] {
  outline: 10px solid red !important;
}

/*
  no title and no aria-label
  empty title and no aria-label
  no title and empty aria-label
  empty title and empty aria-label
*/
body.debug-link-title a:not([title]):not([aria-label]),
body.debug-link-title a[title=""]:not([aria-label]),
body.debug-link-title a:not([title])[aria-label=""],
body.debug-link-title a[title=""][aria-label=""] {
  outline: 3px solid red !important;
}

/*
  no title and no aria-label
  empty title and no aria-label
  no title and empty aria-label
  empty title and empty aria-label
*/
body.debug-link-title button:not([title]):not([aria-label]),
body.debug-link-title button[title=""]:not([aria-label]),
body.debug-link-title button:not([title])[aria-label=""],
body.debug-link-title button[title=""][aria-label=""] {
  outline: 3px solid red !important;
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
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 100000;
  pointer-events: none;
}

.Debug-grid {
  height: 100%;
  box-shadow: -1px 0px 0px 0px red, 1px 0px 0px 0px red;
  display: flex;
  justify-content: space-between;
}

.Debug-gridColumn {
  position: relative;
  height: 100%;
  flex: 0 0 calc(1/var(--columns) * 100% - var(--gutter));
  box-shadow: -1px 0px 0px 0px rgba(0, 0, 0, 0.3), 1px 0px 0px 0px rgba(0, 0, 0, 0.3);
}
.Debug-controls {
  position: absolute;
  top: 0;
  right: 20px;
  background-color: #000;
  width: 300px;
  pointer-events: auto;
}

.Debug-component.--is-open .Debug-options {
  height: auto;
}

.Debug-options {
  height: 0;
  overflow: hidden;
}

.Debug-option {
  padding: 7px 20px;
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
