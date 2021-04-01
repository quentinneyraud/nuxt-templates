import TransitionsBus from '@/assets/scripts/transitions-bus'

const MINIMUM_LOADER_DURATION = 1000
const MINIMUM_TRANSITION_DURATION = 1000

// Return a promise resolved after delay (in ms)
const delay = delay => {
  return new Promise(resolve => {
    window.setTimeout(resolve, delay)
  })
}

// Return all children of a component, recursively
const recuriveFlattenComponentChildren = component => {
  return component
    .$children
    .reduce((acc, curr) => {
      acc.push(curr)

      if (curr.$children && Array.isArray(curr.$children) && curr.$children.length > 0) {
        acc.push(...recuriveFlattenComponentChildren(curr))
      }

      return acc
    }, [])
}

export default {
  transition (to, from) {
    if (process.env.SPA && (!from || (to.name === from.name && to.path === from.path))) return {}

    let transition = {
      appear: true,
      mode: 'out-in',
      css: false
    }

    if (!from) {
      transition = {
        ...transition,
        async enter (el, done) {
          const promises = recuriveFlattenComponentChildren(this)
            .filter(component => component.preload)
            .map(component => component.preload())

          promises.push(delay(MINIMUM_LOADER_DURATION))

          await Promise.all(promises)

          TransitionsBus.$emit('loader:hide', {
            el,
            done
          })
        }
      }
    } else {
      transition = {
        ...transition,
        async enter (el, done) {
          const promises = recuriveFlattenComponentChildren(this)
            .filter(component => component.preload)
            .map(component => component.preload())

          promises.push(delay(MINIMUM_TRANSITION_DURATION))

          await Promise.all(promises)

          TransitionsBus.$emit('transition:hide', { el, done })
        },
        leave (el, done) {
          TransitionsBus.$emit('transition:show', {
            done
          })
        }
      }
    }

    return transition
  }
}
