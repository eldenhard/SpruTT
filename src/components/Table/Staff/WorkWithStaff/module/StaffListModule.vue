<script>
import HeaderUIElement from "../ui/HeaderUIElement.vue";
import api from "@/api/staff";
import  OrganizationalStructureModule from "./OrganizationalStructureModule.vue";
export default {
  name: "StaffList",
  components: { HeaderUIElement, OrganizationalStructureModule },
  data() {
    return {
      state: "",
      employees: [],
    };
  },
  async mounted() {
    let employees = await api.getAllStaff({ page_size: 500 });
    this.employees = employees.data.data;
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
            <b-card-text style="margin-left: -8% !important; ">
              <OrganizationalStructureModule :employees="employees"/>
            </b-card-text>
          </b-tab>
          <b-tab title="Временно отсутствующие сотрудники">
            <b-card-text style="margin-left: -8% !important; ">Сотрудники временно отсутствующие по уважительной причине</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../style/style.scss";
</style>