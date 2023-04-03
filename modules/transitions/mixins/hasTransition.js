import TransitionBus from '../bus/index'

// Return all children of a component, recursively
const recursiveFlattenComponentChildren = component => {
  return component
    .$children
    .reduce((acc, curr) => {
      acc.push(curr)

      if (curr.$children && Array.isArray(curr.$children) && curr.$children.length > 0) {
        acc.push(...recursiveFlattenComponentChildren(curr))
      }

      return acc
    }, [])
}

const isFunction = v => typeof v === 'function'

const getAllFunctionsRecursively = (page, functionName) => {
  return recursiveFlattenComponentChildren(page)
    .filter(component => component[functionName] && isFunction(component[functionName]))
    .map(component => component[functionName])
}

export default {
  transition (to, from) {
    let transition = {
      appear: true,
      mode: 'out-in',
      css: false
    }

    if (!from || (window.$nuxt.$config.MODE === 'spa' && (!from || (to.name === from.name && to.path === from.path)))) {
      transition = {
        ...transition,
        enter (el, done) {
          const promises = getAllFunctionsRecursively(this.$root, 'preload')

          TransitionBus.$emit('loader:hide', {
            el,
            to,
            from,
            promises,
            done
          })
        }
      }
    } else {
      transition = {
        ...transition,
        enter (el, done) {
          const promises = getAllFunctionsRecursively(this.$root, 'preload')

          TransitionBus.$emit('transition:hide', {
            el,
            to,
            from,
            promises,
            done
          })
        },
        leave (el, done) {
          const promises = getAllFunctionsRecursively(this.$root, 'transitionHide')

          TransitionBus.$emit('transition:show', {
            el,
            to,
            from,
            promises,
            done
          })
        }
      }
    }

    return transition
  }
}
