<template>
  <div >
    <!-- <h1>В разработке</h1> -->
    <component :is="state.activeComponent"></component>
  </div>
</template>

  

<script>
import NewApplicationModule from "../module/NewApplicationModule.vue";
import NewsModule from "../module/NewsModule.vue";
import BirthdayModule from "../module/BirthdayModule.vue";
import StaffListModule from "../module/StaffListModule.vue";
export default {
  components: { NewApplicationModule, NewsModule, BirthdayModule, StaffListModule },
  inject: ['state'], // Получаем реактивное состояние от родителя
  };
</script>