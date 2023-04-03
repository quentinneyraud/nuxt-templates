<template>
  <div
    class="AppInput"
    :class="[
      {
        '--is-required': isRequired
      }, `--type-${type}`
    ]"
  >

    <!-- Label -->
    <label
      v-if="label"
      class="AppInput-label"
      :for="id"
    >{{ fullLabel }}</label>

    <!-- Input -->
    <div class="AppInput-inputWrapper">
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        ref="input"
        :name="inputName"
        class="AppInput-input"
        :type="type"
        :placeholder="placeholder"
        :required="isRequired"
      />

      <template v-else-if="type === 'checkbox'">
        <input
          ref="input"
          :name="inputName"
          class="AppInput-input"
          type="checkbox"
          :required="isRequired"
        >
      </template>

      <input
        v-else
        :id="id"
        ref="input"
        :name="inputName"
        class="AppInput-input"
        :type="type"
        :placeholder="placeholder"
        :required="isRequired"
      >
    </div>
  </div>
</template>

<script>
const slugify = text =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

export default {
  props: {
    type: {
      type: String,
      required: false,
      default: null
    },
    name: {
      type: String,
      required: false,
      default: null
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    placeholder: {
      type: String,
      required: false,
      default: null
    }
  },

  data () {
    return {
      isInput: true,
      id: null,
      inputName: null
    }
  },

  computed: {
    fullLabel () {
      return this.label + (this.isRequired && this.type !== 'checkbox' ? ' *' : '')
    }
  },

  mounted () {
    this.setName()
    this.setId()
  },

  methods: {
    fillWithMockData () {
      if (this.type === 'checkbox') {
        this.$refs.input.checked = true
      } else if (this.type === 'tel') {
        this.$refs.input.value = '0121326554'
      } else if (this.type === 'email') {
        this.$refs.input.value = 'hello@test.com'
      } else {
        this.$refs.input.value = 'bla bla bla'
      }
    },

    setName () {
      this.inputName = this.name || slugify(this.label)
    },

    setId () {
      this.id = this.inputName + Math.random().toString(36).substr(2, 9)
    }
  }

}
</script>

<style lang="scss" scoped>
.AppInput {
  &.--type-textarea .AppInput-input {
    resize: none;
    height: 230px;
    border: none;
  }

  &.--type-checkbox {
    display: flex;
    gap: 2rem;
    align-items: flex-start;

    .AppInput-label {
      order: 1;
    }
  }

  &:not(.--type-checkbox) {
    .AppInput-inputWrapper {
      margin-top: 1rem;
    }

    .AppInput-input {
      width: 100%;
      padding: 1.3rem 1.2rem;
      transition: box-shadow 0.3s;
      box-shadow: 0 0 0 1px #d1d1d1;
      border-radius: 5px;

      &:focus {
        box-shadow: 0 0 0 1px #d1d1d1;
      }
    }
  }

  &:not(.--type-checkbox):not(.--type-textarea) .AppInput-input {
    height: 44px;
  }
}

.AppInput-input:focus,
.AppInput-input:focus-visible {
  outline: none;
}

.AppInput-input::placeholder {
  font: inherit;
}
</style>
