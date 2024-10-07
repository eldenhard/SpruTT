<script>
import HeaderUIElement from "../ui/HeaderUIElement.vue";
import api from "@/api/staff";
export default {
  name: "StaffList",
  components: { HeaderUIElement },
  data() {
    return {
      state: "",
    };
  },
  methods: {
    updateStaff(value) {
        
    }
  }
};
</script>


<template>
  <div class="workspace" v-if="state === ''">
    <HeaderUIElement
      :placeholder_value="'Поиск сотрудника...'"
      @updateApplication="updateStaff"
      >Список сотрудников</HeaderUIElement
    >
    <br />
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Организационная структура" active>
            <b-card-text>Организационная структура компании "Транспортные Технологии"</b-card-text>
          </b-tab>
          <b-tab title="Временно отсутствующие сотрудники">
            <b-card-text>Сотрудники временно отсутствующие по уважительной причине</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../style/style.scss";
</style>