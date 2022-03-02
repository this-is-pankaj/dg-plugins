<template>
  <div class="nav-bar">
    <brand/>
    <tab
      v-for="(t) in tabs"
      :key="t.id"
      :text="t.title"
      :url="t.id"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Brand from './Brand.vue';
import Tab from './Tab.vue';

export default {
  components: { Brand, Tab },
  computed: {
    ...mapGetters({
      tabs: 'getTabs',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .nav-bar {
    text-align: left;
    padding: 0;
  }
</style>
