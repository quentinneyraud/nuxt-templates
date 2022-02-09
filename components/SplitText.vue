<template>
  <div class="SplitText">
    <div ref="helper" class="SplitText-helper" v-html="text" />
    <div ref="fake" class="SplitText-fake" />
  </div>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      lastLine: null,
      currentTag: null
    }
  },
  mounted () {
    if (module.hot) {
      module.hot.decline()
    }
    // this.createLastLine()
    // this.splitAll()

    console.log(this.method2(this.$refs.helper).slice(0, 50))
  },
  methods: {
    // createLastLine () {
    //   this.lastLine = document.createElement('div')
    //   this.lastLine.classList.add('line')
    //   this.$refs.fake.appendChild(this.lastLine)
    // },
    // splitAll () {
    //   this.tree = this.getChildren(this.$refs.helper)
    // },
    // getChildren (el, parentTag) {
    //   let currentTag = null

    //   if (el !== this.$refs.helper) {
    //     if (el.nodeType === 3) {
    //       const words = el.textContent.split(' ').filter(v => !!v)

    //       words.forEach(w => {
    //         const wordElement = document.createElement('div')
    //         wordElement.classList.add('word')
    //         wordElement.innerHTML = w

    //         parentTag.append(' ')
    //         parentTag.append(wordElement)
    //         console.log('AJOUT ' + w, parentTag.tagName, parentTag.parentNode.tagName)

    //         if (
    //           this.lastLine.getBoundingClientRect().width >
    //           this.$el.getBoundingClientRect().width
    //         ) {
    //           console.log('Trop grand, nouvelle ligne')
    //           this.createLastLine()

    //           parentTag = parentTag.cloneNode(true)
    //           parentTag.innerHTML = ''
    //           console.log('New parentTag', parentTag)
    //           this.lastLine.appendChild(parentTag)
    //           parentTag.append(' ')
    //           parentTag.append(wordElement)
    //         }
    //       })
    //     } else {
    //       currentTag = document.createElement(el.tagName)

    //       if (parentTag) {
    //         parentTag.appendChild(currentTag)
    //       } else {
    //         this.lastLine.appendChild(currentTag)
    //       }
    //     }

    //     // if (el.tagName === 'BR') {
    //     //   this.createLastLine()
    //     // }
    //   }

    //   Array.from(el.childNodes)
    //     .forEach(a => this.getChildren(a, currentTag))
    // },
    method2 (el, baseAcc = []) {
      return Array.from(el.childNodes)
        .reduce((acc, child) => {
          if (child.nodeType === 3) {
            const words = child.textContent
              .split(' ')
              .filter(v => !!v)
              .map(w => {
                return {
                  w,
                  parent: child
                }
              })

            acc.push(...words)
          } else {
            this.method2(child, acc)
          }

          return acc
        }, baseAcc)
    }
  }
}
</script>

<style scoped>
.SplitText /deep/ strong {
  font-weight: bold;
}

.SplitText /deep/ .line {
  white-space: nowrap;
}

.SplitText /deep/ .word {
  position: relative;
  display: inline-block;
}

.SplitText-helper {
  display: none;
}

.SplitText-fake {
  width: fit-content;
  /* display: none; */
}

</style>
