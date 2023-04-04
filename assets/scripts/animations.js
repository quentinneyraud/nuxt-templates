import gsap from 'gsap'

const removeEmpty = maybeArray => Array.isArray(maybeArray) ? maybeArray.filter(v => !!v) : maybeArray

export const get$el = maybeArray => Array.isArray(maybeArray) ? maybeArray.map(e => e.$el) : maybeArray.$el

export const fadeUp = {
  init (el, params) {
    if (!el) return

    gsap
      .set(removeEmpty(el), {
        y: 50,
        autoAlpha: 0,
        ...params
      })
  },
  animate (el, time = 0, params) {
    if (!el) return

    return gsap
      .timeline()
      .to(removeEmpty(el), {
        y: 0,
        duration: 1,
        ease: 'power4.out',
        ...params
      }, time)
      .to(removeEmpty(el), {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'linear',
        ...params
      }, time)
  }
}
