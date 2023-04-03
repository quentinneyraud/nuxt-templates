<template>
  <div class="Icons">
    <div class="Icons-wrapper">
      <!-- Card -->
      <div
        v-for="(svgName, svgIndex) in svgNames"
        :key="svgIndex"
        class="Icons-card"
      >

        <!-- Card title -->
        <h2 class="Icons-cardTitle">
          {{ svgName }}
        </h2>

        <!-- Card svg -->
        <div class="Icons-cardSvgWrapper">
          <AppSvg
            type="inline"
            class="Icons-cardSvg"
            :name="svgName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic-layout',

  data () {
    return {
      svgNames: []
    }
  },

  head () {
    return {
      title: 'Icons list'
    }
  },

  mounted () {
    this.getAllSvgNames()
  },

  methods: {
    getAllSvgNames () {
      const r = require.context('../../../assets/svg/', true, /\.svg$/)

      this.svgNames = r.keys()
        .map(path => {
          return path
            .replace('./', '')
            .replace('.svg', '')
        })
    }
  }
}
</script>

<style scoped>
.Icons-wrapper {
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--items-gap, 60px);
  row-gap: 60px;
  padding: var(--items-gap);

  --items-by-line: 2;
  --items-gap: 30px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

@media screen and (min-width: 568px) {
  .Icons-wrapper {
    --items-by-line: 3;
    --items-gap: 30px;
  }
}

@media screen and (min-width: 800px) {
  .Icons-wrapper  {
    --items-by-line: 4;
  }
}

@media screen and (min-width: 1060px) {
  .Icons-wrapper  {
    --items-by-line: 5;
  }
}

@media screen and (min-width: 1400px) {
  .Icons-wrapper  {
    --items-by-line: 6;
  }
}

.Icons-card {
  flex: 0 0 calc(
      (
        (100% - (var(--items-by-line, 1) - 1) * var(--items-gap, 0rem)) /
          var(--items-by-line, 1)
      )
    );

    display: flex;
    flex-direction: column;
}

.Icons-cardTitle {
  padding: 15px 0;
  margin: 0;
  width: 100%;
  border-radius: 7px 7px 0 0;
  background-color: rgb(173, 168, 168);
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  text-align: center;
  color: #333;
}

.Icons-cardSvgWrapper {
  background-color: rgb(228, 218, 218);
  border-radius: 0 0 7px 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Icons-cardSvgWrapper:before {
  content: '';
  width: 1px;
  margin-left: -1px;
  float: left;
  height: 0;
  padding-top: calc(1 / 1 * 100%);
}

.Icons-cardSvgWrapper:after {
  content: '';
  display: table;
  clear: both;
}

.Icons-cardSvg {
  max-width: min(150px, 50%);
  max-height: min(150px, 50%);
  fill: black;
}
</style>
