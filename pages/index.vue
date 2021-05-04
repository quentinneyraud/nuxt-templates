<template>
  <div>
    <div
      v-sb-animation="{
        cssVars: true
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
  background-color: red;
  margin-top: 150vh;
  margin-bottom: 150vh;
  margin-left: 150px;

  transform: translate3d(calc(var(--lerped-progress) * 520px), 0px, 0px);
}
</style>
