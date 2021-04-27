import TransitionBus from '@@/modules/transitions/bus/index.js'

export default (_, inject) => {
  inject('transitionsBus', TransitionBus)
}
