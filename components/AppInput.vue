<template>
  <div
    class="AppInput"
    :class="[{
      '--is-required': isRequired
    }, `--type-${type}`]"
  >

    <!-- Label -->
    <label
      v-if="label"
      class="AppInput-label"
      :for="id"
    >{{ label }}</label>

    <!-- Input -->
    <div class="AppInput-inputWrapper">
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        v-model="internalValue"
        :name="name"
        class="AppInput-input"
        :type="type"
        :placeholder="placeholder"
        :required="isRequired"
      />

      <input
        v-else
        :id="id"
        v-model="internalValue"
        :name="name"
        class="AppInput-input"
        :type="type"
        :placeholder="placeholder"
        :required="isRequired"
      >
    </div>
  </div>
</template>

<script>
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
    },
    value: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      isInput: true,
      id: null,
      internalValue: this.value
    }
  },
  mounted () {
    this.setId()
  },
  methods: {
    getValue () {
      return this.internalValue
    },
    setId () {
      this.id = this.name + Math.random().toString(36).substr(2, 9)
    },
    clear () {
      this.internalValue = null
    }
  }

}
</script>

<style lang="css" scoped>
.AppInput.--is-required .AppInput-label:after {
  content: "*";
  margin-left: 5px;
  color: red;
  vertical-align: top;
}

.AppInput.--type-textarea .AppInput-input {
  resize: none;
  height: 230px;
  border: none;
}

.AppInput-inputWrapper {
  position: relative;
  margin-top: 5px;
}

.AppInput-input {
  position: relative;
  width: 100%;
  height: 44px;
  background-color: rgba(228, 228, 228, 0.3);
  border-radius: 12px;
  padding: 12px 20px;
  transition: box-shadow 0.3s;
}

.AppInput-input:focus,
.AppInput-input:focus-visible {
  box-shadow: 0 0 0 1px grey;
  outline: none;
}

.AppInput-input::placeholder {
  font: inherit;
}
</style>
