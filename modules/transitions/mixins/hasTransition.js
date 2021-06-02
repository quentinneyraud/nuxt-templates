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
          const promises = recursiveFlattenComponentChildren(this.$root)
            .filter(component => component.preload && typeof component.preload === 'function')
            .map(component => component.preload({ to, from }))

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
          const promises = recursiveFlattenComponentChildren(this)
            .filter(component => component.preload && typeof component.preload === 'function')
            .map(component => component.preload({ to, from }))

          TransitionBus.$emit('transition:hide', {
            el,
            to,
            from,
            promises,
            done
          })
        },
        leave (el, done) {
          const promises = recursiveFlattenComponentChildren(this)
            .filter(component => component.transitionHide && typeof component.transitionHide === 'function')
            .map(component => {
              return new Promise(resolve => {
                component.transitionHide({
                  done: resolve,
                  to,
                  from
                })
              })
            })

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
