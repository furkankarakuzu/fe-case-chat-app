<template>
  <div class="container-fluid p-0 d-flex flex-wrap">
      <nav-bar/>
      <app-content/>
  </div>
</template>

<script>
import navBar from "./layout/navbar"
import appContent from "./appContent"
require('../assets/css/style.sass');
require('bootstrap-icons/font/bootstrap-icons.css')
export default {
  components: {
    navBar, appContent
  },
}
</script>

<style lang="sass">
.container-fluid
  height: 100vh
</style>