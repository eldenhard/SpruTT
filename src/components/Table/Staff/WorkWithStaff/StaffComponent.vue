<template>
    <div class="main_block">
      <Sidebar />
      <Workspace />
    </div>
</template>


<script>
import Sidebar from './components/Sidebar.vue';
import Workspace from './components/Workspace.vue';

export default {
  components: { Sidebar, Workspace },
  data() {
      return{

      }
  }
}
</script>

<style scoped>

.main_block{
    display: flex;
    width: 90vw;
    margin: 0 auto;
    margin-top: 1.5%;
}
</style>