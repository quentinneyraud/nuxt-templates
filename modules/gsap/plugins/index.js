import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

export default ({ $config }) => {
  gsap.config({
    force3D: true,
    nullTargetWarn: !$config.IS_PROD
  })

  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
}
