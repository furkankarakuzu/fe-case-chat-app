<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("initAuth");
  },
};
</script>

<style>
</style>