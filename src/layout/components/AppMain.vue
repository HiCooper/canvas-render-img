<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
<style scoped lang="scss">
 .app-main {
   position: relative;
   height: 100%;
 }
</style>
