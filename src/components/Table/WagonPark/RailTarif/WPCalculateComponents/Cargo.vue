<template>
  <div>
    <Loader :loader="loader" />
    <div class="shipment-kind">
      <div>
        <h4 class="header-text">Груз</h4>
        <hr />
      </div>
      <div class="shipment-kind__content">
        <b-tabs content-class="mt-3" fill style="width: 100% !important">
          <b-tab title="ЕТСНГ" active>
            <div class="content">
              <p class="description">
                Единая тарифно-статистическая номенклатура грузов (ЕТСНГ)
              </p>
              <p class="explanation"> * Для поиска груза введите наименование груза
          <br>                  * Для выбора типа груза кликните по строке
          <br>                  * При выборе кода ЕСТНГ код ГНГ выберется автоматически(и наоборот) <br></p>
              <div style="text-align: right; margin-right: 3%;">
                <input type="checkbox" id="dangerous" v-model="dangerousCargo"/>
                <label for="dangerous">&nbsp;Опасный груз</label>
              </div>

              <input
                type="text"
                class="textarea"
                placeholder="введите наименование груза"
                v-model="search"
              />
              <div class="shipment-kind__content__table">
                <table
                  class="table-sm table-bordered"
                  style="width: 100% !important"
                >
                  <thead>
                    <tr>
                      <th scope="col">Код ЕТСНГ</th>
                      <th scope="col">Наименование</th>
                      <th scope="col">Тарифный класс</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div class="lds-dual-ring" v-if="loaderTable"></div>
                    <tr
                      v-for="information in this.SearchData"
                      :key="information.id"
                      @click="ESTNG(information.code6, information.code)"
                    >
                      <td v-show="code">{{ information.code }}</td>
                      <td>{{ information.code6 }}</td>
                      <td>{{ information.name }}</td>
                      <td>{{ information.cargo_class }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-tab>
          <b-tab title="ГНГ">
            <div class="content">
              <p class="description">
                Гармонизированная номенклатура грузов (ГНГ)
              </p>
              <div style="text-align: right; margin-right: 3%;">
                <input type="checkbox" id="dangerousGNG" v-model="dangerousCargoGNG"/>
                <label for="dangerousGNG">&nbsp;Опасный груз</label>
              </div>
              <input
                type="text"
                class="textarea"
                placeholder="введите наименование груза"
                v-model="searchGNG"
              />
              <div class="shipment-kind__content__table">
                <table
                  class="table-sm table-bordered"
                  style="width: 100% !important"
                >
                  <thead>
                    <tr>
                      <th scope="col">Код ГНГ</th>
                      <th scope="col">Наименование</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="information in this.SearchGNG"
                      :key="information.id"
                      @click="GNG(information.code, information.code6)"
                    >
                    <td v-show="code6">{{ information.code6 }}</td>
                      <td>{{ information.code }}</td>
                      <td>{{ information.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <div class="shipment-kind__content__weight">
        <p class="description" style="margin-top: 10px">Масса груза, т</p>
        <input
          type="number"
          class="textareaTon"
          style="width: 15%; margin-left: 3%; margin-top: 2% !important;"
          v-model="weight"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
export default {
  name: "cargo",
  data() {
    return {
      search: "",
      searchGNG: "",
      weight: "",
      estng: "",
      gng: "",
      loader: false,
      loaderTable: false,
      dangerousCargo: false,
      dangerousCargoGNG: false,
      code: false,
      code6: false
    };
  },
  components: { Loader },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      cargo_code: (state) => state.cargo_code,
    }),

    SearchData() {
      if (this.dangerousCargo == false) {
        return this.$store.state.cargo_code.cargo_code.filter((item) => item.name.indexOf(this.search) !== -1);
      } else {
        return this.$store.state.cargo_code.cargo_code.filter((item) => item.is_dangerous && item.name.indexOf(this.search) !== -1);
      }
    },
    SearchGNG() {
      if (this.dangerousCargoGNG == false) {
        return this.$store.state.cargo_code.cargo_code.filter((item) => item.name.indexOf(this.searchGNG) !== -1);
      } else {
        return this.$store.state.cargo_code.cargo_code.filter((item) => item.is_dangerous && item.name.indexOf(this.searchGNG) !== -1);
      }
    },
  },
  watch: {
    weight() {
      this.$emit("weight", this.weight);
    },
  },

  methods: {
    ESTNG(code6, code) {
      this.estng = code6;
      this.gng = code
      this.$emit("estng", {
        estng: this.estng,
        gng: this.gng,
      });
    },
    GNG(code, code6) {
      this.gng = code;
      this.estng = code6;
      this.$emit("gng", {
        estng: this.estng,
        gng: this.gng,
      });
    },
   
  },
};
</script>
<style scoped>
.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  padding: 0 0 2% 4%;
}

thead th {
  position: -webkit-sticky;
  position: sticky;
  top: -3px;
  z-index: 2;
  background: white;
}

tr:hover {
  background: #cccccc;
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
  min-height: 20vh;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, 0);
  max-height: 25vh;
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
  padding: 3% 0 0 4%;
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