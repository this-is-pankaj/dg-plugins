<template>
  <div :class="{ card: true, disabled: disabled }">
    <div class="card-header">
      <h3> {{ info.content.title }} </h3>
      <div class="card-options">
        <toggle-switch
          :defaultState="info.isActive"
          checkedLabel="Allowed"
          uncheckedLabel="Blocked"
          :disabled="disabled || info.disabled"
          @toggled="changePluginStatus"
        />
      </div>
    </div>
    <div class="card-body">
      {{ info.content.description }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ToggleSwitch from './ToggleSwitch.vue';

export default {
  components: { ToggleSwitch },
  name: 'card',
  props: {
    info: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions({
      updatePluginStatus: 'UPDATE_PLUGIN_STATUS',
    }),
    async changePluginStatus(flag) {
      await this.updatePluginStatus({
        flag,
        tabId: this.$route.params.tabId,
        pluginId: this.info.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .card {
    width: 33%;
    border: 1px solid #ddd;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 20px;

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-body {
      text-align: left;
    }

    &.disabled {
      opacity: 0.7;
    }
  }
</style>
