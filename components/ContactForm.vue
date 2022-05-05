<template>
  <div
    class="ContactForm"
    :class="[`--state-${state}`]"
  >
    <AppForm
      ref="form"
      class="ContactForm-form"
      @submit="onSubmit"
    >
      <div class="ContactForm-fields">

        <div class="ContactForm-simpleFields">
          <AppInput
            v-for="(field, fieldIndex) in simpleFields"
            :key="fieldIndex"
            :label="field.label"
            :type="field.type"
            :name="field.name"
            :placeholder="field.placeholder"
            :is-required="field.isRequired"
            :value="field.value"
          />
        </div>

        <AppInput
          v-if="messageField"
          :label="messageField.label"
          :type="messageField.type"
          :name="messageField.name"
          :placeholder="messageField.placeholder"
          :is-required="messageField.isRequired"
          :value="messageField.value"
        />
      </div>

      <div class="ContactForm-actions">
        <button
          class="ContactForm-submitButton"
          type="submit"
        >
          Send
        </button>

        <!-- Success text -->
        <span
          v-if="state === STATES.SUCCESS"
          class="ContactForm-successText"
        >Thanks :)</span>

        <!-- Error text -->
        <span
          v-if="state === STATES.ERROR"
          class="ContactForm-errorText"
        >Error :(</span>
      </div>

    </AppForm>
  </div>
</template>

<script>
const STATES = {
  IDLE: 'IDLE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING'
}

export default {
  data () {
    return {
      STATES,
      state: STATES.IDLE,
      inputs: [{
        label: 'Name',
        type: 'text',
        name: 'lastname',
        placeholder: 'Your name',
        isRequired: true
      }, {
        label: 'First name',
        type: 'text',
        name: 'firstname',
        placeholder: 'Yout first name',
        isRequired: true
      }, {
        label: 'Tel',
        type: 'tel',
        name: 'tel',
        placeholder: 'Your tel number',
        isRequired: false
      }, {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Your email',
        isRequired: true
      }, {
        label: 'Message',
        type: 'textarea',
        name: 'message',
        placeholder: 'Your message',
        isRequired: true
      }]
    }
  },
  computed: {
    simpleFields () {
      return this.inputs.filter(item => item.name !== 'message')
    },
    messageField () {
      return this.inputs.find(item => item.name === 'message')
    }
  },
  watch: {
    state (state) {
      if (state === this.STATES.SUCCESS) this.$refs.form.clear()
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.state = this.STATES.PENDING

        // Replace by API call
        await (_ => {
          console.log('Sending...')
          console.log(this.$refs.form.values)

          if (Math.random() > 0.5) throw new Error('API Error')
        })()

        this.state = this.STATES.SUCCESS
      } catch (err) {
        this.state = this.STATES.ERROR
      }
    }
  }
}
</script>

<style lang="css" scoped>
.ContactForm {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
}
.ContactForm.--is-pending .ContactForm-submitButton {
  pointer-events: none;
  opacity: 0.5;
}

.ContactForm-fields {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.ContactForm-simpleFields {
  --fields-gutter: 0px;
  --fields-by-line: 1;

  display: flex;
  flex-wrap: wrap;
  column-gap: var(--fields-gutter);
  row-gap: 20px;
}

@media (min-width: 768px) {
  .ContactForm-simpleFields {
    --fields-gutter: 30px;
    --fields-by-line: 2;
  }
}

@media (min-width: 1200px) {
  .ContactForm-simpleFields {
    --fields-gutter: 30px;
    --fields-by-line: 3;
  }
}

.ContactForm-simpleFields::v-deep .AppInput {
  flex: 0 0 calc(((100% - (var(--fields-by-line) - 1) * var(--fields-gutter)) / var(--fields-by-line)));
}

.ContactForm-actions {
  margin-top: 25px;
  display: flex;
  align-items: center;
  gap: 25px;
}

.ContactForm-successText,
.ContactForm-errorText {
  transition: opacity 0.3s;
}
</style>
