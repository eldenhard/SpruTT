<template>
  <div>
    <Loader :loader="loader" />
    <b-modal id="standard_delete" hide-footer>
      <template #modal-title>
        Подтверждение действия
      </template>
      <div class="d-block text-center">
        <h4>Вы уверены, что хотите удалить данные?</h4>
        <p>В случае удаления, данные будут потеряны безвозвратно </p>
      </div>
      <b-button variant="danger" @click="deleteStandard(selected_record)">Да, я уверен</b-button>
      <b-button class="mt-3" block @click="$bvModal.hide('standard_delete')">Нет, отменить</b-button>
    </b-modal>
    <b-container>
      <a class="WatchAllArenda" v-on:click="visible = !visible">
        {{
          visible
          ? "Скрыть данные по нормативам"
          : "Отобразить данные по нормативам"
        }}
      </a>
      <div class="table-content" v-show="visible">
        <label for="amount">Количество договоров <br />
          <select name="amount_row" id="amount" style="width: 100%" v-model="filter_arendaData.page_size" class="mini">
            <option value="" disabled>кол-во строк на странице</option>
            <option value="1">1</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
          </select>
        </label>

        <label for="tenant">Клиент
          <br />
          <input type="text" id="tenant" class="textarea mini" v-model="filter_arendaData.client" />
        </label>

        <label for="tenant" style="margin-left: 5px">Тип вагона
          <br />
          <select name="" id="" class="mini" style="width: 100%" v-model="filter_arendaData.wagon_type">
            <option value="">Все</option>
            <option value="Полувагон">ПВ</option>
            <option value="Цистерна">ЦС</option>
          </select>
        </label>
        <div class="textarea" style="height: auto; width: 100%; margin-top: 2%" v-show="ten_visible">
          <ul id="root_tenant">
            <li v-for="item in filter_client" :key="item.id" @click="chechClient(item.client)">
              <span>{{ item.client }}</span>
              <hr />
            </li>
          </ul>
        </div>
        <button class="button Accept mini" @click="getStandardData()">
          Запросить
        </button>
      </div>
      <p class="amount" style="padding-top: 2%" v-show="visible">
        Всего записей: {{ total_objects }}
      </p>
      <div style="max-width: 100%; overflow: auto; margin-bottom: 5%">
        <table border="1" v-show="visible">
          <thead>
            <th>№</th>
            <th>Договор</th>
            <th>Номер прил.</th>
            <th>Дата начала</th>
            <th>Дата конца</th>
            <!-- <th>ДС</th>
            <th>хз</th> -->
            <th>Прим.</th>
            <th>Норматив по выгр., дн</th>
            <th>Норматив по погр., дн</th>
            <th>Штраф выгр., руб</th>
            <th>Штраф погр., руб</th>
            <th>Прим. по расчету</th>
            <th>Тип вагона</th>
            <th>Клиент</th>
          </thead>
          <tbody>
            <template v-for="(item, index) in data">
              <tr :key="item.id" :id="item.id">
                <td @click="open_modal(item.id)" class="delete">{{ index + 1 }}</td>
                <!-- № договора -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`agreement` + item.id" v-model="item.agreement" v-on:keyup.enter="
                      submitData(
                        item.agreement,
                        item.id,
                        'agreement',
                        'agreementload'
                      )
                      " />
                    <div class="icon-container" :id="`agreementload` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>
                <!-- № приложения (лежат ниже таблицы) -->
                <td></td>
                <!-- ДАТА -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`agreement_date` + item.id" type="date" v-model="item.agreement_date" v-on:keyup.enter="
                      submitData(item.agreement_date, item.id, 'agreement_date', 'agreement_date_load')
                      " />
                    <div class="icon-container" :id="`agreement_date_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>

                <!-- ДАТА КОНЦА -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`end_date` + item.id" type="date" v-model="item.end_date" v-on:keyup.enter="
                      submitData(item.end_date, item.id, 'end_date', 'end_date_load')
                      " />
                    <div class="icon-container" :id="`end_date_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>


                <!-- ДС -->
                <!-- <td>
                <div class="inputcontainer">
                  <input
                    :id="`agreement_addictions` + item.id"
                    v-model="item.agreement_addictions"
                    v-on:keyup.enter="
                      submitData(item.agreement_addictions, item.id, 'agreement_addictions', 'agreement_addictions_load')
                    "
                  />
                  <div
                    class="icon-container"
                    :id="`agreement_addictions_load` + item.id"
                    style="display: none"
                  >
                    <i class="loader"></i>
                  </div>
                </div>
              </td> -->
                <!-- Дата окончания акта -->
                <!-- <td>
                <div class="inputcontainer">
                  <input
                    :id="`agreement_addictions` + item.id"
                    v-model="item.agreement_addictions"
                    v-on:keyup.enter="
                      submitData(item.agreement_addictions, item.id, 'agreement_addictions', 'agreement_addictions_load')
                    "
                  />
                  <div
                    class="icon-container"
                    :id="`agreement_addictions_load` + item.id"
                    style="display: none"
                  >
                    <i class="loader"></i>
                  </div>
                </div>
              </td> -->
                <!-- ПРИМЕЧАНИЕ -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`note` + item.id" v-model="item.note"
                      v-on:keyup.enter="submitData(item.note, item.id, 'note', 'note_load')" />
                    <div class="icon-container" :id="`note_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>
                <!-- ВЫГРУЗКА -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`standard_unloading` + item.id" type="number" v-model="item.standard_unloading"
                      v-on:keyup.enter="submitData(item.standard_unloading, item.id, 'standard_unloading', 'standard_unloading_load')" />
                    <div class="icon-container" :id="`standard_unloading_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>

                <!-- ЗАГРУЗКА -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`standard_loading` + item.id" v-model="item.standard_loading" type="number"
                      v-on:keyup.enter="submitData(item.standard_loading, item.id, 'standard_loading', 'standard_loading_load')" />
                    <div class="icon-container" :id="`standard_loading_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>

                <!-- ШТРАФ ВЫГРУЗКА -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`penalty_unloading` + item.id" v-model="item.penalty_unloading" type="number"
                      v-on:keyup.enter="submitData(item.penalty_unloading, item.id, 'penalty_unloading', 'penalty_unloading_load')" />
                    <div class="icon-container" :id="`penalty_unloading_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>

                </td>
                <!-- ШТРАФ ПОГРУЗКА -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`penalty_loading` + item.id" v-model="item.penalty_loading" type="number"
                      v-on:keyup.enter="submitData(item.penalty_loading, item.id, 'penalty_loading', 'penalty_loading_load')" />
                    <div class="icon-container" :id="`penalty_loading_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>

                </td>

                <!-- ПРИМЕЧАНИЕ РАСЧЕТ -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`note_calc` + item.id" v-model="item.note_calc"
                      v-on:keyup.enter="submitData(item.note_calc, item.id, 'note_calc', 'note_calc_load')" />
                    <div class="icon-container" :id="`note_calc_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>
                <!-- ТИП ВАГОНА -->
                <td>
                  <div class="inputcontainer">
                    <select :id="`wagon_type` + item.id" class="mini" style="height: 50% !important; border: none;"
                      v-model="item.wagon_type_id"
                      @change="submitData(item.wagon_type_id, item.id, 'wagon_type', 'wagon_type_load')">
                      <option value="Полувагон">ПВ</option>
                      <option value="Цистерна">ЦС</option>

                    </select>
                    <div class="icon-container" :id="`wagon_type_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>
                <!-- Клиент -->
                <td>
                  <div class="inputcontainer">
                    <input :id="`client` + item.id" v-model="item.client"
                      v-on:keyup.enter="submitData(item.client, item.id, 'client', 'client_load')" />
                    <div class="icon-container" :id="`client_load` + item.id" style="display: none">
                      <i class="loader"></i>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- приложение -->
              <template>
                <tr v-for="att in item.attachments" :key="att.id">

                  <td colspan="2" @click="open_modal(att.id)" class="delete">Приложение</td>
                  <!-- <td></td> -->
                  <td>
                    <div class="inputcontainer">
                      <input :id="`agreement` + att.id" type="text" v-model="att.agreement" v-on:keyup.enter="
                        submitData(att.agreement, att.id, 'agreement', 'agreement_load')
                        " />
                      <div class="icon-container" :id="`agreement_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`agreement_date` + att.id" type="date" v-model="att.agreement_date" v-on:keyup.enter="
                        submitData(att.agreement_date, att.id, 'agreement_date', 'agreement_date_load')
                        " />
                      <div class="icon-container" :id="`agreement_date_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`end_date` + att.id" type="date" v-model="att.end_date" v-on:keyup.enter="
                        submitData(att.end_date, att.id, 'end_date', 'end_date_load')
                        " />
                      <div class="icon-container" :id="`end_date_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`note` + att.id" type="text" v-model="att.note" v-on:keyup.enter="
                        submitData(att.note, att.id, 'note', 'note_load')
                        " />
                      <div class="icon-container" :id="`note_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`standard_unloading` + att.id" type="text" v-model="att.standard_unloading"
                        v-on:keyup.enter="
                          submitData(att.standard_unloading, att.id, 'standard_unloading', 'standard_unloading_load')
                          " />
                      <div class="icon-container" :id="`standard_unloading_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`standard_loading` + att.id" type="text" v-model="att.standard_loading"
                        v-on:keyup.enter="
                          submitData(att.standard_loading, att.id, 'standard_loading', 'standard_loading_load')
                          " />
                      <div class="icon-container" :id="`standard_loading_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`penalty_unloading` + att.id" type="text" v-model="att.penalty_unloading"
                        v-on:keyup.enter="
                          submitData(att.penalty_unloading, att.id, 'penalty_unloading', 'penalty_unloading_load')
                          " />
                      <div class="icon-container" :id="`penalty_unloading_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`penalty_loading` + att.id" type="text" v-model="att.penalty_loading" v-on:keyup.enter="
                        submitData(att.penalty_loading, att.id, 'penalty_loading', 'penalty_loading_load')
                        " />
                      <div class="icon-container" :id="`penalty_loading_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`note_calc` + att.id" type="text" v-model="att.note_calc" v-on:keyup.enter="
                        submitData(att.note_calc, att.id, 'note_calc', 'note_calc_load')" />
                      <div class="icon-container" :id="`note_calc_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <select :id="`wagon_type` + att.id" class="mini" style="height: 50% !important; border: none;"
                        v-model="att.wagon_type_id"
                        @change="submitData(att.wagon_type_id, att.id, 'wagon_type', 'wagon_type_load')">
                        <option value="Полувагон">ПВ</option>
                        <option value="Цистерна">ЦС</option>

                      </select>
                      <div class="icon-container" :id="`wagon_type_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="inputcontainer">
                      <input :id="`client` + att.id" type="text" v-model="att.client" v-on:keyup.enter="
                        submitData(att.client, att.id, 'client', 'client_load')
                        " />
                      <div class="icon-container" :id="`client_load` + att.id" style="display: none">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </td>


                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>

      <div id="wrapper" v-show="visible">
        <ul id="pagination">
          <li v-for="btn in total_pages" :key="btn.id">
            <a @click="getPagination(filter_arendaData.page_size, btn)" :class="{
              active123: Truefalse(btn),
              active_new: pageNumber == btn,
            }">{{ btn }}</a>
          </li>
        </ul>
      </div>

    </b-container>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
  </div>
</template>


<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  components: { Loader, Notifications },
  data() {
    return {

      visible: true,
      loader: false,
      selected_record: '',
      loader: false,
      data: "",
      interval: 2,
      pagination: "",
      total_pages: "",
      total_objects: 0,

      pageNumber: 1,

      ten_visible: false,
      filter_arendaData: {
        page_size: '1',
        wagon_type: "",
        client: "",
      },
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  mounted() {
    document.body.addEventListener("click", this.CloseWindow);
  },

  computed: {
    filter_client() {
      if (this.filter_arendaData.client.length > 1) {
        this.ten_visible = true;
      }
      return this.filter_arendaData.client.length > 1
        ? this.$store.state.client.name_client.filter((item) =>
          item.client
            .toLowerCase()
            .includes(this.filter_arendaData.client.toLowerCase())
        )
        : "";
    },
  },
  methods: {

    Truefalse(btn) {
      if (btn == this.pageNumber) {
        return true;
      }
      if (btn == 1) {
        return true;
      }
      if (btn == this.total_pages) {
        return true;
      }
      if (btn > this.pageNumber && btn < this.pageNumber + this.interval) {
        return true;
      }
      if (btn < this.pageNumber && btn > this.pageNumber - this.interval) {
        return true;
      }

      return false;
    },
    getPagination(pg_size, pg_number) {
      this.loader = true;

      api
        .getAllArendaDataStandard(this.filter_arendaData, pg_size, pg_number)
        .then((response) => {
          this.loader = false;
          this.data = response.data.data;
          console.log(this.data);
          this.pageNumber = response.data.page_number;
        })

        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = error.response.data;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2000);
          console.log(error);
        });
    },
    getStandardData() {
      this.loader = true;
      api
        .getStandard(this.filter_arendaData)
        .then((response) => {
          this.loader = false
          this.pageNumber = response.data.page_number;
          this.pagination = response.data.links;
          this.total_pages = response.data.total_pages;
          this.total_objects = response.data.total_objects;
          this.data = response.data.data;
          console.log(this.data)
          this.notifyHead = "Успешно";
          this.notifyMessage = 'Данные загружены';
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2000);
        })
        .catch((error) => {
          this.loader = false

          this.notifyHead = "Ошибка";
          this.notifyMessage = error.response.data;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2000);
        });
    },
    chechClient(item) {
      this.filter_arendaData.client = item;
      this.ten_visible = false;
    },
    CloseWindow() {
      this.ten_visible = false;
    },
    submitData(element, id, frst, lst) {
      let name = frst;
      let data = [];
      data.push({ [name]: element });
      // console.log(data);
      document.getElementById(`${lst}${id}`).style.display = "block";
      api
        .patchStandard(id, data[0])
        .then((response) => {
          document.getElementById(`${lst}${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`${frst}${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`${lst}${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`${frst}${id}`);
          wagon_DOM.classList.add("error");
          setTimeout(() => {
            wagon_DOM.classList.remove("error");
          }, 1000);
          this.notifyHead = "Ошибка";
          this.notifyMessage = error.response.data;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 3500);
        });
    },
    open_modal(id) {
      this.selected_record = id
      this.$bvModal.show('standard_delete')
    },
    deleteStandard(id) {
      this.loader = true
      api.deleteStandard(id)
        .then((response) => {
          this.loader = false;
          this.getStandardData()
          this.$bvModal.hide('standard_delete')
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные удалены";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2500);
        })
        .catch((error) => {
          this.loader = false;
          this.$bvModal.hide('standard_delete')
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Данные не удалены";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2500);
          console.log(error);
        });
      let row = document.getElementById(id);
      row.parentNode.removeChild(row);
    },
  },
};
</script>



<style lang="scss" scoped>
tr,
td,
th {
  border: 1px solid black
}

#wrapper {
  margin: 0 auto;
  display: block;
  margin-top: 2%;
  max-width: 80%;
  width: 80%;
}

.page-header {
  text-align: center;
  font-size: 1.5em;
  font-weight: normal;
  border-bottom: 1px solid #ddd;
  margin: 30px 0;
}

#pagination {
  margin: 0;
  padding: 0;
  text-align: center;
}

#pagination li {
  display: inline;
}

#pagination li a {
  display: inline-block;
  text-decoration: none;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
}

/* Active and Hoverable Pagination */
#pagination li a {
  border-radius: 5px;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}

#pagination li a.active_new {
  background-color: #18842a;
  color: #fff;
}

#pagination li a:hover:not(.active_new) {
  background-color: #ddd;
}

#pagination li a:not(.active123) {
  display: none;
}

/* border-pagination */
.b-pagination-outer {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  display: flex;
}

#border-pagination {
  margin: 0 auto;
  padding: 0;
  text-align: center;
}

#border-pagination li {
  display: inline;
}

#border-pagination li a {
  display: block;
  text-decoration: none;
  color: #000;
  padding: 5px 10px;
  border: 1px solid #ddd;
  float: left;
}

#border-pagination li a {
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
}

#border-pagination li a.active_new {
  background-color: #18842a;
  color: #fff;
}

#border-pagination li a:hover:not(.active_new) {
  background: #ddd;
}

.delete:hover {
  background: lightcoral;
  color: white
}

.success {
  transition: 0.5s ease-in-out;
  background: rgba(42, 190, 67, 0.4);
  color: black;
}

.error {
  transition: 0.5 ease-in-out;
  background: lightcoral;
  color: black;
}

.WatchAllArenda {
  color: rgb(146, 146, 146);
  margin-top: 20%;
  font-size: 25px;
  cursor: pointer;
}

.inputcontainer {
  position: relative;
}

input,
select {

  width: 100%;
  max-height: 35px !important;
  margin: 0 !important;
  // font-size: 20px;
  box-sizing: border-box;
}

.mini {
  height: 40px;
}

.icon-container {
  position: absolute;
  right: 10px;
  top: calc(50% - 10px);
}

.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #333 #333 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}

.mini {
  height: 40px;
}

.table-content {
  margin-top: 4%;
  display: flex;
  justify-content: space-between;
  gap: 5%;
  flex-wrap: wrap;
  border: 1px solid lightgrey;
  padding: 1%;

  label {
    color: rgb(146, 146, 146);
  }

  button {
    height: 40px;
    width: 20%;
    margin-top: 2%;
    float: right !important;
    margin-left: auto;
  }
}

table {
  margin-top: 1%;
}

thead {
  th {
    background: rgb(236, 236, 236);
    font-family: "Montserrat", sans-serif;
  }
}

li {
  cursor: pointer;
}
</style>