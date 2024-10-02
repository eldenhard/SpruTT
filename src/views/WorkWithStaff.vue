<template>
    <StaffComponent />
</template>


<script>
import StaffComponent from '../components/Table/Staff/WorkWithStaff/StaffComponent.vue'

export default {
  components: { StaffComponent },
  mounted() {
    document.title = "Работа с персоналом";
  }
}
</script>


<style scoped>

</style>