<template>
  <div>
    <form ref="form" @submit.prevent="onSubmit">
      <label for="firstname">
        firstname
        <input id="firstname" type="text" name="firstname" value="Quentin">
      </label>

      <label for="email">
        email
        <input id="email" type="text" name="email" value="quentin@akaru.fr">
      </label>

      <label for="select">
        select

        <select id="select" name="select">
          <option selected="selected" value="all">All</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </label>

      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    async onSubmit () {
      const formData = new FormData(this.$refs.form)

      const url = `${this.$config.NETLIFY_ENDPOINT}/my-endpoint`
      const options = {
        method: 'POST',
        body: formData
      }

      try {
        const response = await fetch(url, options)
        const responseData = await response.json()

        if (responseData.message === 'A catched error') {
          return console.log('A catched error')
        }

        if (responseData.message === 'Fields validation error') {
          return console.log('Fields validation error', responseData)
        }

        if (!response.ok || response.status !== 200) {
          throw new Error(responseData.message)
        }

        console.log('Sucess', responseData)
      } catch (err) {
        return console.log('Error', err)
      }
    }
  }
}
</script>

<style>
</style>
