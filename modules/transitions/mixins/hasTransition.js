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

const getAllFunctionsRecursively = (page, functionName, params) => {
  return recursiveFlattenComponentChildren(page)
    .filter(component => component[functionName] && isFunction(component[functionName]))
    .map(component => {
      const promiseFunction = component[functionName](params)
      if (isFunction(promiseFunction)) return promiseFunction
      return null
    })
    .filter(v => !!v)
}

export default {
  transition (to, from) {
    let transition = {
      appear: true,
      mode: 'out-in',
      css: false
    }

    if (!from) {
      transition = {
        ...transition,
        enter (el, done) {
          const promises = getAllFunctionsRecursively(this.$root, 'preload', { to, from })

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
          const promises = getAllFunctionsRecursively(this.$root, 'preload', { to, from })

          TransitionBus.$emit('transition:hide', {
            el,
            to,
            from,
            promises,
            done
          })
        },
        leave (el, done) {
          const promises = getAllFunctionsRecursively(this.$root, 'transitionHide', { to, from })

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
