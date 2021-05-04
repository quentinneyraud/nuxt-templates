<template>
  <div>
    <div
      v-sb-animation="{
        cssVars: true,
        lerpRatio: 0.02
      }"
      class="ok"
    />
  </div>
</template>

<script>
export default {}
</script>

<style>
.ok {
  width: 200px;
  height: 200px;
  border: 3px solid #000;
  margin-top: 150vh;
  margin-bottom: 150vh;
  margin-left: 0;

  transform: translate3d(calc(var(--lerped-progress) * 100vw), 0px, 0px) rotate(calc(var(--lerped-progress) * 360deg));
  will-change: transform;
}
</style>
