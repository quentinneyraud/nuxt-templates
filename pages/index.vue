<template>
  <div class="page">
    <div
      v-sb-animation="{
        cssVars: true
      }"
      class="square normal"
    >
      normal
    </div>

    <div
      v-sb-animation="{
        cssVars: true,
        lerpRatio: 0.05
      }"
      class="square lerped"
    >
      normal
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.page {
  min-height: 300vh;
}

.square {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 3px solid #000;
  top: 150vh;

  transform: translate3d(calc(var(--lerped-progress) * 100vw), 0px, 0px) rotate(calc(var(--lerped-progress) * 360deg));
  will-change: transform;
}

.normal {
  left: 20vw;
  transform: translate3d(calc(var(--current-progress) * 10vw), 0px, 0px) rotate(calc(var(--current-progress) * 360deg));
}

.lerped {
  left: 70vw;
  transform: translate3d(calc(var(--lerped-progress) * 10vw), 0px, 0px) rotate(calc(var(--lerped-progress) * 360deg));
}
</style>
