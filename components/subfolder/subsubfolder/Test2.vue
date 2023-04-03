<template>
  <h1>ok</h1>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { notRequiredString } from 'PropsTypes'
import mixin from '@/mixins/mixin'
import mixin2 from '@/mixins/mixin2'

export default {
  mixins: [mixin, mixin2],

  props: {
    subtitle: notRequiredString
  }
}
</script>

<style>

</style>
