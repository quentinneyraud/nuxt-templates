<template>
  <form
    class="AppForm"
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>

<script>
const recursiveFlattenComponentChildren = component => {
  return component
    .$children
    .reduce((acc, curr) => {
      acc.push(curr)

      if (curr.$children && Array.isArray(curr.$children) && curr.$children.length > 0) {
        acc.push(...recursiveFlattenComponentChildren(curr))
      }

      return acc
    }, [])
}

export default {
  data () {
    return {
      inputChildren: []
    }
  },
  computed: {
    values () {
      return this.inputChildren
        .reduce((acc, curr) => {
          acc[curr.name] = curr.getValue()

          return acc
        }, {})
    }
  },
  mounted () {
    this.setInputChildren()
  },
  methods: {
    onSubmit () {
      this.$emit('submit', this.values)
    },
    setInputChildren () {
      this.inputChildren = recursiveFlattenComponentChildren(this)
        .filter(component => component.isInput)
    },
    clear () {
      return this.inputChildren
        .forEach(inputChild => inputChild.clear())
    }
  }
}
</script>

<style>

</style>
