import gsap from 'gsap'

export default ({ $config }) => {
  gsap.config({
    force3D: true,
    nullTargetWarn: !$config.IS_PROD
  })
}
