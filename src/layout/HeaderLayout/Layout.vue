<template>
  <div class="app-wrapper" >
    <div class="main-container">
      <nav-bar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { NavBar, AppMain } from '../components'

export default {
  name: 'HeaderLayout',
  components: {
    NavBar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.main-container {
  min-height: 100vh;
  background-color: #f0f2f5;
}
</style>
