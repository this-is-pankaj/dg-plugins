<template>
  <router-link
    class="tab"
    :to="url"
  >
    {{ text }}
  </router-link>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .tab {
    padding: 10px 15px;
    display: block;
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      background-color: #fff;
      border-left: 3px solid #e42e2e;
    }
  }
</style>
