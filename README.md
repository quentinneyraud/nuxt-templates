# Nuxt templates

> Collection of Nuxt modules, plugins, components


## Screen based animation

> Directive to help to animate things based on element position in screen 


### Installation

- Copy `modules/screen-based-animation` in your `modules` directory
- Add `~/modules/screen-based-animatio/index.js` to the `modules` section of `nuxt.config.js`

```js
// nuxt.config.js

{
  modules: [
    ['~/modules/screen-based-animatio/index.js', {
      // module options
    }]
  ]
}

// or

{
  modules: [
    '~/modules/screen-based-animatio/index.js'
  ],

  screenBasedAnimation: {
    // module options
  }
}
```


### Usage


```vue
<div
  v-sb-animation="{
    // options
  }"
>
``` 

4 values are computed: 

- Current progress: Value between 0 (element top is below the viewport) and 1 (element bottom is above the viewport).  
- Lerped progress: Current progress lerped.  
- N progress: Current progress mapped between -1 and 1.  
- Lerped N progress: N progress mapped between -1 and 1. 

### Options

- `clamp` (default: `true`)

Clamp value between 0 and 1 (progress) and -1 and 1 (lerped progress). Passing `false` gives you values less than 0 and greater than 1 (progress) and less than -1 and greater than 1 (n progress).

- `callback` (default: `null`)

Pass a function called on RAF `function ({ current, lerped, nCurrent, nLerped }) {}`

- `timeline` (default: `null`)
  
Pass a GSAP timeline. `progress` method is called on RAF with current progress value.

- `cssVars` (default: `false`)

Whether to add these css variables to the element: `--current-progress`, `--lerped-progress`, `--current-nprogress`, `--lerped-nprogress`

- `datasetAttributes` (default: `false`)
  
Whether to add these dataset variables to the element: `data-current-progress`, `data-lerped-progress`, `data-current-nprogress`, `data-lerped-nprogress`
  
- `lerpRatio` (default: `0.1`)

A float between 0 and 1 corresponding to the linear interpolation (lerp) intensity.

> You can change defaults by passing an object in `directiveDefaultOptions` in module options.

```js
// nuxt.config.js

{
  screenBasedAnimation: {
    directiveDefaultOptions: {
      cssVars: true,
      lerpRatio: 0.2 
    }
  }
}
```


### Examples

#### CSS variables

```vue
<template>
  <div>
    <div
      class="spinning-div"
      v-sb-animation="{
        cssVars: true
      }"
    >
      my spinning div
    </div>
  </div>
</template>

<style>
.spinning-div {
  width: 200px;
  height: 200px;
  border: 3px solid #000;

  transform: rotate(calc(var(--lerped-progress) * 360deg));
  will-change: transform;
}
</style>

```

#### GSAP timeline

```vue
<template>
  <div>
    <div
      ref="spinningDiv"
      v-sb-animation="{
        timeline
      }"
    >
      my spinning div
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { timeline: null }
  },
  mounted () {
    this.timeline = gsap
      .timeline()
      .fromTo(this.$refs.spinningDiv, {
        rotate: 0
      }, {
        rotate: 360,
        duration: 1
      })
  }
}
</script>


<style>
.spinning-div {
  width: 200px;
  height: 200px;
  border: 3px solid #000;
  will-change: transform;
}
</style>

```
