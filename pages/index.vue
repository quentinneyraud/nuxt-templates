<template>
  <div>
    <h1 class="AppTitle-1">
      Hello
    </h1>

    <div class="AppWrapper--1280">

      <div class="AppText-1 --rich side">
        <p>Lorem ipsum, dolor sit amet consectetur <em>adipisicing <a href="">link</a> elit</em>. Quisquam autem voluptates impedit eveniet fuga facilis, soluta vero laudantium numquam ratione!</p>
        <p>Lorem ipsum, dolor sit amet consectetur <strong>adipisicing <a href="">link</a> elit</strong>. Quisquam autem voluptates impedit eveniet fuga facilis, soluta vero laudantium numquam ratione!</p>
      </div>

      <div class="ok side">
        <p class="AppText-1">
          Lorem ipsum dolor sit amet OKKK consectetur adipisicing elit. Saepe molestias magni repellendus voluptatum non illo?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.AppWrapper--1280 {
  display: flex;
  flex-wrap: wrap;
}

.side {
  @include tablet {
    @include columns(6);
  }
}

.ok {
  color: blue;
}
</style>
