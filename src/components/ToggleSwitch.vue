<template>
  <div :class="['toggle-switch', labelDir].join(' ')">
    <label class="switch">
      <input type="checkbox"
        v-model="state"
        @change="$emit('toggled', state)"
        :disabled="disabled"
      />
      <span :class="['slider','round', icon].join(' ')"></span>
    </label>
    <p
     :class="{ 'label-text': true, checked: state }"
    >
      {{ state? checkedLabel : uncheckedLabel }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'toggle-switch',
  props: {
    defaultState: {
      type: Boolean,
      default: false,
    },
    checkedLabel: {
      type: String,
      default: 'On',
    },
    uncheckedLabel: {
      type: String,
      default: 'Off',
    },
    icon: {
      type: String,
      default: '',
    },
    labelDir: {
      type: String,
      default: 'below',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      state: this.defaultState,
    };
  },
};
</script>

<style lang="scss" scoped>
.toggle-switch {
  display: flex;

  &.below {
    flex-direction: column;
  }

  &.left {
    flex-direction: row-reverse;
    justify-content: space-evenly;
  }

  .label-text {
    color: #e42e2e;
    margin: 5px 0;
    font-weight: bold;

    &.checked {
      color: #58c34c;
    }
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;

  &:disabled {
    & + .slider {
      cursor: not-allowed;
    }
  }
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e42e2e;
  -webkit-transition: .4s;
  transition: .4s;
  &.power::before {
    content: "\23FB"; // Power icon
    font-size: 20px;
  }
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #58c34c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #58c34c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
