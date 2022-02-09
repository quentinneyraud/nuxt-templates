<template>
  <div>
    <div class="split-panes">
      <div class="pane">
        <div v-html="text" />
      </div>
      <div class="pane">
        <SplitText class="split" :text="text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '<p>Pellentesque habitant morbi tristique <b>enectus</b> et netus et malesuada fame turpis <b>egestas.</b> Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>'
    }
  }
}
</script>

<style lang="css">
html, body {
  margin: 0;
}

p {
  margin: 0;
}

* {
  box-sizing: border-box;
}

.split-panes {
  display: flex;
}

.pane {
  flex: 0 0 50%;
  padding: 25px;
}

.pane:last-child {
  border-left: 1px solid #000;
}

.split, .pane > div {
  width: 500px;
}
</style>
