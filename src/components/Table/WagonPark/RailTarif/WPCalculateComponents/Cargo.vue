<template>
  <div class="shipment-kind">
    <div class="shipment-kind__header">
      <h4 class="header-text">Груз</h4>
      <hr />
    </div>
    <div class="shipment-kind__content">
      <b-tabs content-class="mt-3" fill style="width: 100% !important">
        <b-tab title="ЕСТНГ" active>
          <div class="content">
            <p class="description">
              Единая тарифно-статистическая номенклатура грузов (ЕСТНГ)
            </p>
            <input type="text" class="textarea" placeholder="введите наименование груза" v-model="search" />
            <div class="shipment-kind__content__table">
              <table class="table-sm table-bordered"  style="width: 100% !important">
                <thead>
                  <tr>
                    <th scope="col">Код ЕСТНГ</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Тарифный класс</th>
                  </tr>
                </thead>
                <tbody>
             
                  <tr v-for="information in SearchData" :key="information.id" >
                    <td>{{ information.code6 }}</td>
                    <td>{{ information.name }}</td>
                    <td>{{ information.cargo_class }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="shipment-kind__content__weight">
                <p class="description" style="margin-top: 10px;">Масса груза, т</p>
                <input type="text" class="textareaTon" style="width: 15%; margin-left: 3%;">
              </div>
          </div>
        </b-tab>
        <b-tab title="ГНГ">
          <div class="content">
            <p class="description">
              Гармонизированная номенклатура грузов (ГНГ)
            </p>
            <input type="text" class="textarea" placeholder="введите наименование груза" v-model="searchGNG"/>
            <div class="shipment-kind__content__table">
              <table class="table-sm table-bordered" style="width: 100% !important">
                <thead>
                  <tr>
                    <th scope="col">Код ГНГ</th>
                    <th scope="col">Наименование</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="information in SearchGNG" :key="information.id">
                    <td>{{ information.code }}</td>
                    <td>{{ information.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
             <div class="shipment-kind__content__weight">
                <p class="description" style="margin-top: 10px;">Масса груза, т</p>
                <input type="text" class="textareaTon" style="width: 15%; margin-left: 3%;">
              </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from '@/api/wagonPark'
export default {

  name: 'cargo',
  data() {
    return {
      informations: [],
      search: '',
      searchGNG: '',
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
    SearchData() {
      return this.informations.filter(item => item.name.indexOf(this.search) !== -1)
    },
    SearchGNG(){
      return this.informations.filter(item => item.name.indexOf(this.searchGNG) !== -1)
    }

  },

  mounted() {
    api.getCargoCode1()
      .then(response => {
        this.informations = response.data.data
      })
  }
}
</script>
<style scoped>
thead th {
  position: -webkit-sticky;
  position: sticky;
  top: -3px;
  z-index: 2;
  background: white;
}

.shipment-kind__content__weight {
  width: 100%;
  border: 1px solid #e3e5e7;
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.shipment-kind__content__table {
  margin-top: 2%;
  max-width: 95% !important;
  display: block;
  position: relative;
  min-height: 35vh;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, 0);
  max-height: 35vh;
  overflow: auto;
}

.textareaTon {
  background: white;
  border: 1px solid grey !important;
  border-radius: 5px;
}

.textarea {
  background: white;
  border: 1px solid grey !important;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.content {
  width: 100%;
  min-height: 30vh;
}

.description {
  padding: 3% 0 2% 4%;
  font-weight: 700;
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
}

.shipment-kind {
  margin-top: 8% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  min-height: 55vh;
  width: 90%;
  border: 2px solid #1e86f5;
  border-radius: 10px;

}

.header-text {
  color: #444b54;
  padding-top: 2%;
  padding-left: 3%;
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
}

.shipment-kind__content {
  display: flex;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #e3e5e7;
  border-radius: 5px;
  margin-bottom: 5%;
}
</style>