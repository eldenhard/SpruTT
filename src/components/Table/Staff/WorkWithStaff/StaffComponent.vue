<template>
  <div class="main_block">
    <!-- <Sidebar /> -->
    <Workspace />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Workspace from './components/Workspace.vue';
import Vue from 'vue'; // Для использования Vue.observable

export default {
components: { Sidebar, Workspace },
data() {
  return {
    state: Vue.observable({
      activeComponent: 'NewsModule' // Делаем поле реактивным
    }),
  };
},
provide() {
  return {
    setActiveComponent: this.setActiveComponent, // Метод для смены компонента
    state: this.state, // Передаем реактивный объект через provide
  };
},
methods: {
  setActiveComponent(component) {
    this.state.activeComponent = component; // Меняем активный компонент
  },
},
};
</script>

<style scoped>
.main_block {
display: flex;
width: 90vw;
margin: 0 auto;
margin-top: 1.5%;
gap: 4%;
}
.main_block:nth-child(2){
  flex-grow: 1;
}
</style>
