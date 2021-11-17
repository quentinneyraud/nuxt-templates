import Vue from 'vue'

function inserted (el, { arg, value }, vnode) {
  const clickCallback = _ => {
    vnode.context.$audio.play(arg, value)
  }

  el.addEventListener('click', clickCallback, {
    passive: true
  })

  el.__audio_remove_click_listener__ = _ => el.removeEventListener('click', clickCallback)
}

function unbind (el) {
  el.__audio_remove_click_listener__ && el.__audio_remove_click_listener__()
}

Vue.directive('audio', {
  inserted,
  unbind
})
