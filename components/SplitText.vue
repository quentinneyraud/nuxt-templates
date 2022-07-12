<template>
  <Component
    :is="tag"
    class="SplitText-component"
    v-html="html"
  />
</template>

<script>
// Libraries
import { SplitText } from 'gsap/SplitText'
import gsap from 'gsap'

export default {
  props: {
    /**
     *
     * DOM
     *
     */
    tag: {
      type: String,
      required: false,
      default: _ => 'div'
    },
    nested: {
      type: Boolean,
      required: false,
      default: false
    },
    html: {
      type: String,
      required: true
    },
    /**
     *
     * SplitText options
     *
     */
    type: {
      type: String,
      required: false,
      default: 'lines'
    },
    wrap: {
      type: Boolean,
      required: false,
      default: false
    },
    charsClass: {
      type: String,
      required: false,
      default: 'chars'
    },
    wordsClass: {
      type: String,
      required: false,
      default: 'words'
    },
    linesClass: {
      type: String,
      required: false,
      default: 'lines'
    }
  },
  data () {
    return {
      splittedElementsClassSelector: null,
      splitted: false
    }
  },
  mounted () {
    gsap.registerPlugin(SplitText)
    this.splittedElementsClassSelector = {
      chars: this.charsClass,
      words: this.wordsClass,
      lines: this.linesClass
    }[this.type]
  },
  methods: {
    elements () {
      return this.$el.getElementsByClassName(this.splittedElementsClassSelector)
    },
    wrappers () {
      return this.$el.getElementsByClassName(`${this.splittedElementsClassSelector}-wrapper`)
    },
    split () {
      const el = this.nested ? this.$el.children : this.$el

      this.instance = new SplitText(el, {
        type: this.type,
        charsClass: `${this.charsClass} ${this.charsClass}++`,
        wordsClass: `${this.wordsClass} ${this.wordsClass}++`,
        linesClass: `${this.linesClass} ${this.linesClass}++`
      })
      this.splitted = true

      if (this.wrap) this.wrapElements()

      this.$emit('split')
    },
    wrapElements () {
      if (!this.splittedElementsClassSelector) return

      Array.from(this.$el.getElementsByClassName(this.splittedElementsClassSelector))
        .forEach(splittedElement => {
          // Create wrapper element
          const wrapper = document.createElement('div')

          // Add wrapper class
          wrapper.classList.add(`${this.splittedElementsClassSelector}-wrapper`)

          // Copy style from splitted element
          wrapper.setAttribute('style', splittedElement.getAttribute('style'))

          // Copy all dataset
          Object.entries(splittedElement.dataset)
            .forEach(([key, value]) => {
              wrapper.dataset[key] = value
            })

          // Append splitted element in wrapper
          wrapper.appendChild(splittedElement.cloneNode(true))

          // Replace splitted element with wrapper
          splittedElement.parentNode.replaceChild(wrapper, splittedElement)
        })
    },
    revert () {
      this.instance.revert()
      this.splitted = false
    }
  }
}
</script>

<style lang="css" scoped>
.SplitText-component ::v-deep div {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-style: inherit;
  line-height: inherit;
  letter-spacing: inherit;
}
</style>
