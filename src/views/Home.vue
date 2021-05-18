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
