<template>
  <div class="home">
    <RenderImg/>
  </div>
</template>

<script>
// @ is an alias to /src
import RenderImg from '@/views/sample/RenderImg'

export default {
  name: 'Home',
  components: {
    RenderImg
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
