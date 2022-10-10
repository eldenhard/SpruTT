<template>
  <div>
    <UpNavbar/>
    <router-view/>
    <Authorization></Authorization>
  </div>
</template>

<script>
import UpNavbar from './views/UpNavbar.vue'
import Authorization from './views/Authorization.vue'

export default {
  name: 'App',
  components: {UpNavbar, Authorization}
}
</script>

<style>
@import './style/style.css';
</style>
