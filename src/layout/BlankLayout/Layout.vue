<template>
  <div class="app-wrapper" >
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain } from '../components'

export default {
  name: 'BlankLayout',
  components: {
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
