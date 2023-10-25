<template>
  <b-card no-body>
    <b-tabs pills card vertical style="height: 100vh">
      <b-container>
        <b-tab title="Сотрудники">
          <b-card-text>
            <ReferenceInformation />
          </b-card-text>
        </b-tab>

        <b-tab title="Типовые формы документов" @click="$refs.child1.getData('Типовые формы документов')">
          <b-card-text>
            <AllFormDocument :typeDocument="'Типовые формы документов'" ref="child1"/>
          </b-card-text>
        </b-tab>
        <b-tab title="Учредительные документы"  @click="$refs.child2.getData('Учредительные документы')">
          <b-card-text>
            <AllFormDocument :typeDocument="'Учредительные документы'" ref="child2"/>
          </b-card-text>
        </b-tab>
        <b-tab title="Локально нормативные акты" @click="$refs.child3.getData('Локально нормативные акты')">
          <b-card-text>
            <AllFormDocument :typeDocument="'Локально нормативные акты'" ref="child3"/>
          </b-card-text>
        </b-tab>
        <b-tab title="Приказы и распоряжения"  @click="$refs.child4.getData('Приказы и распоряжения')">
          <b-card-text>
            <AllFormDocument :typeDocument="'Приказы и распоряжения'" ref="child4"/>
          </b-card-text>
        </b-tab>

      </b-container>



    
    </b-tabs>
  </b-card>
</template>

<style scoped>
select {
  width: 100%;
  box-sizing: border-box;
}

#navbarMain {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100vh !important;
}

.nav .nav-pills {
  height: 100vh !important;
}

.nav-item {
  text-align: center !important;
}

li.nav-item {
  text-align: center !important;
  justify-content: center !important;
  background: red !important;
}
/* .nav-pills{
  background: red !important;
} */
</style>

<script>
import AllFormDocument from '@/components/Table/Directory/AllFormsDocument/AllFormDocument.vue';
import ReferenceInformation from '@/components/Table/ReferenceInformation/ReferenceInformation.vue';
export default {
  name: "Directory",
  components: {
    AllFormDocument,
    ReferenceInformation,
  },
  mounted() {
    document.title = "Справочники";
  },
};
</script>



