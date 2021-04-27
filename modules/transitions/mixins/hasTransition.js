import TransitionBus from '../bus/index'

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
    let transition = {
      appear: true,
      mode: 'out-in',
      css: false
    }

    if (!from) {
      transition = {
        ...transition,
        enter (el, done) {
          const promises = recuriveFlattenComponentChildren(this.$root)
            .filter(component => component.preload)
            .map(component => component.preload({ to, from }))

          TransitionBus.$emit('loader:hide', {
            promises,
            el,
            done,
            to,
            from
          })
        }
      }
    } else {
      transition = {
        ...transition,
        enter (el, done) {
          const promises = recuriveFlattenComponentChildren(this)
            .filter(component => component.preload)
            .map(component => component.preload({ to, from }))

          TransitionBus.$emit('transition:hide', {
            promises,
            el,
            done,
            to,
            from
          })
        },
        leave (el, done) {
          const promises = recuriveFlattenComponentChildren(this)
            .filter(component => component.transitionHide)
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
            promises,
            el,
            done,
            to,
            from
          })
        }
      }
    }

    return transition
  }
}
