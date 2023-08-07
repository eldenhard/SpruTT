<template>
  <div>
    <Loader :loader="loader" />

    <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      Подтверждение действия 
    </template>
    <div class="d-block text-center">
      <h4>Вы уверены, что хотите удалить данные?</h4>
      <p>В случае удаления, данные будут потеряны безвозвратно </p>
    </div>
    <b-button variant="danger" @click="deleteStavkiArenda(selected_record)">Да, я уверен</b-button>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Нет, отменить</b-button>
  </b-modal>
<br><br>

    <a class="WatchAllArenda" v-on:click="visible = !visible">
      {{ visible ? "Скрыть данные по аренде" : "Отобразить данные по аренде" }}
    </a>
    <div class="table-content" v-show="visible">
      <label for="amount"
        >Количество строк <br />
        <select
          name="amount_row"
          id="amount"
          v-model="filter_arendaData.page_size"
          style="width: 100%"
          class="mini"
        >
          <option value="" disabled>кол-во строк на странице</option>
          <option value="15">15</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </label>

      <label for="tenant"
        >Арендатор
        <br />
        <input type="text" id="tenant" class="textarea mini" v-model="tenant" />
      </label>

      <label for="tenant"
        >Арендодатель
        <br />
        <input type="text" id="tenant" class="textarea mini" v-model="landlord" />
      </label>
      <label for="tenant"
        >Начало аренды
        <br />
        <input type="date" class="textarea mini" v-model="filter_arendaData.arenda_begin"/>
      </label>
      <label for="tenant"
        >Конец аренды
        <br />
        <input type="date" class="textarea mini" v-model="filter_arendaData.arenda_end"
      /></label>

      <label for="tenant"
        >Начало ставки
        <br />
        <input type="date" class="textarea mini" v-model="filter_arendaData.stavka_begin"/>
      </label>
      <label for="tenant" style="margin-left: 5px;"
        >Конец ставки
        <br />
        <input type="date" class="textarea mini" v-model="filter_arendaData.stavka_end"
      /></label>

      <label for="tenant" style="margin-left: 5px;"
        >Тип вагона
        <br />
        <select name="" id="" class="mini" style="width: 100%"  v-model="filter_arendaData.wagon__wagon_type">
          <option  value="">Все</option>
          <option value="Полувагон">ПВ</option>
          <option value="Цистерна">ЦС</option>

        </select>
    </label>

    <label for="wagon" style="margin-left: 5px;"
        >Номера вагонов
        <br />
        <input type="text" v-model="wagons" class="textarea mini" placeholder="ввод через пробел">
    </label>

      <button class="button Accept mini" @click="getArenda()">Запросить</button>
      <button class="button Accept mini" @click="getExcel()">Экспорт в Excel</button>

    </div>
    <div class="block_answer">
      <div></div>
      <label for="">
        <div
          class="textarea"
          style="height: auto; width: 100%;"
          v-show="ten_visible"
        >
          <ul id="root_tenant">
            <li
              v-for="item in filter_tenant"
              :key="item.id"
              @click="checkTenant(item.work_name)"
            >
              <span>{{ item.work_name }}</span>
              <hr />
            </li>
          </ul>
        </div>
      </label>

      <label for="">
        <div
          class="textarea"
          style="height: auto; width: 100%;"
          v-show="ten_visible2"
        >
          <ul id="root_tenant">
            <li
              v-for="item in filter_landlord"
              :key="item.id"
              @click="checkLandlord(item.work_name)"
            >
              <span>{{ item.work_name }}</span>
              <hr />
            </li>
          </ul>
        </div>
      </label>
      <div></div>
      <div></div>
      <div></div>
    </div>
<div style="display: flex; justify-content: space-between;" v-show="visible">
    <p class="amount" style="padding-top: 2%" v-show="visible">
      Всего записей: {{ total_objects }}
    </p>
 
      <div>
        <button id="tooltip-target-1" style="background: transparent; border: none" v-b-tooltip.hover.lefttop="'Информация по арендатору/арендателю!'"  @click="info_block = !info_block">
              <img :src="info_btn" alt="" style="width: 25px; height:25px; margin-top: 1%;">
            </button>
      </div>

  </div>
  <transition name="fade">
  <div style="display: flex; justify-content: flex-end;" v-show="info_block">
    <table>
      <tr>
        <th>Старое наименование</th>
        <th>Новое наименование</th>
      </tr>
      <tr v-for="item, index in data_hard.cp_work_names" :key="item.id">
        <td>{{index }}</td>
        <td>{{ item }}</td>
      </tr>
    </table>
  </div>
</transition>


    <div class="" v-show="visible">
      <table border="1" v-show="visible">
        <thead>
          <tr>
            <th class="col1">#</th>
            <th class="col2">№ вагона</th>
            <th class="col2">Дата начала аренды</th>
            <th class="col2">Дата конца аренды</th>
            <th class="col2">Ставка</th>
            <th class="col2">Дата начала ставки</th>
            <th class="col2">Дата конца ставки</th>
            <th class="col2">Арендатор</th>
            <th class="col2">Арендодатель</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id" :id="item.id">
            <!-- Номер строки -->
            <td class="col1">
              <input
                class="hover"
                style="width: 100%"
                :value="index + 1"
                readonly
               @click="open_modal(item.id)"
              />
            </td>
            <!-- ВАГОН -->
            <td class="col1">
              <div class="inputcontainer">
                <input
                  :id="`wag` + item.id"
                  v-model="item.wagon"
                  v-on:keyup.enter="submitWagon(item.wagon, item.id)"
                />
                <div
                  class="icon-container"
                  :id="`wagload` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
            <!-- Дата начала аренды -->
            <td class="col2">
              <div class="inputcontainer">
                <input
                  :id="`start_date` + item.id"
                  v-model="item.start_date"
                  
                  v-on:keyup.enter="submitStartArenda(item.start_date, item.id)"
                />
                <div
                  class="icon-container"
                  :id="`wagstart` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
            <!-- Дата конца аренды -->
            <td class="col2">
              <div class="inputcontainer">
                <input
                  :id="`end_date` + item.id"
                  v-model="item.end_date"
                  v-on:keyup.enter="submitEndArenda(item.end_date, item.id)"
                />
                <div
                  class="icon-container"
                  :id="`wagend` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
            <!-- Ставка -->
            <td class="col2">
              <div class="inputcontainer">
                <input
                  :id="`stavka` + item.id"
                  v-model="item.stavka"
                  v-on:keyup.enter="submitStavka(item.stavka, item.id)"
                />
                <div
                  class="icon-container"
                  :id="`stavkaload` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
            <!-- Начало ставки -->
            <td class="col2">
              <div class="inputcontainer">
                <input
                  :id="`stavka_start_date` + item.id"
                  v-model="item.stavka_start_date"
                  v-on:keyup.enter="
                    submitStartStavka(item.stavka_start_date, item.id)
                  "
                />
                <div
                  class="icon-container"
                  :id="`stavkaStart` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
            <!-- Конец ставки -->
            <td class="col2">
              <div class="inputcontainer">
                <input
                  :id="`stavka_end_date` + item.id"
                  v-model="item.stavka_end_date"
                  v-on:keyup.enter="
                    submitEndStavka(item.stavka_end_date, item.id)
                  "
                />
                <div
                  class="icon-container"
                  :id="`stavkaEnd` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
            <!-- Арендатор -->
            <td class="col2">
              <div class="inputcontainer">
                <input
                  :id="`tenant` + item.id"
                  v-model="item.tenant"
                  v-on:keyup.enter="submitTenant(item.tenant, item.id)"
                />
                <div
                  class="icon-container"
                  :id="`tenantload` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
            <!-- Арендодатель -->
            <td class="col2">
              <div class="inputcontainer">
                <input
                  :id="`landlord` + item.id"
                  v-model="item.landlord"
                  v-on:keyup.enter="submitLandlord(item.landlord, item.id)"
                />
                <div
                  class="icon-container"
                  :id="`landlordload` + item.id"
                  style="display: none"
                >
                  <i class="loader"></i>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="wrapper">
      <ul id="pagination">
        <li v-for="btn in total_pages" :key="btn.id">
          <a
            @click="getPagination(filter_arendaData.page_size, btn)"
            :class="{
              active123: Truefalse(btn),
              active_new: pageNumber == btn,
            }"
            >{{ btn }}</a
          >
        </li>
      </ul>
    </div>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
      id="notif"
    />
  </div>
</template>

<script>
import cp_work_names from "@/helpers/cp_work_names"
import Notifications from "@/components/notifications/Notifications.vue";
import api from "@/api/directory.js";
import Loader from "../loader/loader.vue";
export default {
  name: "ArendaDataTable",
  components: { Loader, Notifications },
  data() {
    return {
      selected_record: 0,
      mini_loader: false,
      success: false,
      length_pagination: "",
      interval: 2,
      id_row: "",
      loader: false,
      visible: true,
      data: "",
      pagination: "",
      total_pages: "",
      total_objects: "",
      nextLink: null,
      prevLink: null,
      pageNumber: 1,
      info_block: false,
      wagons: "",
      data_hard: cp_work_names,

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      filter_arendaData: {
        page_size: "",
        tenant: "",
        landlord: "",
        arenda_begin: "",
        arenda_end: "",
        stavka_begin: "",
        stavka_end: "",
        wagon__wagon_type: "",
        wagons_in: ""
      },

      tenant: "",
      landlord: "",
      ten_visible: false,
      ten_visible2: false,
    };
  },
mounted(){
  document.body.addEventListener('click', this.onClick);
},
  filters: {
    filter(value) {
      return new Date(value);
    },
 
  },
  computed: {
    info_btn(){
      if(this.info_block == false){
        return require(`@/assets/info.png`)
      } return require(`@/assets/cross.png`)
    },
    filter_tenant() {
      if (this.tenant.length > 1) {
        this.ten_visible = true;
      }
      return this.tenant.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.toLowerCase().includes(this.tenant.toLowerCase())
          )
        : "";
    },
    filter_landlord() {
      if (this.landlord.length > 1) {
        this.ten_visible2 = true;
      }
      return this.landlord.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.toLowerCase().includes(this.landlord.toLowerCase())
          )
        : "";
    },
  },
  methods: {

    open_modal(id){
      this.selected_record = id
     this.$bvModal.show('bv-modal-example')
    },
    inf_block(){
      this.info_block = true
    },
    onClick() {
      this.ten_visible = false;
      this.ten_visible2 = false;    
    },
    checkTenant(value) {
      this.ten_visible = false;
      this.tenant = value;
    },
    checkLandlord(value) {
      this.ten_visible2 = false;
      this.landlord = value;
    },
    openModalDelete(data){
      console.log(data)
    },
    deleteStavkiArenda(id) {
      this.loader = true
      api
        .deleteStavkiArenda(id)
        .then((response) => {
               this.loader = false;
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
    submitWagon(element, id) {
      let data = { wagon: element };
      document.getElementById(`wagload${id}`).style.display = "block";
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`wagload${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`wag${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`wagload${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`wag${id}`);
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

    submitStartArenda(element, id) {
      let new_string
      if(element == ""){
        new_string = null
      } else {
        new_string = element
        .replace(/\./g, "-")
        .split("-")
        .reverse("")
        .join("-");
      }
     
      let data = { start_date: new_string };
      document.getElementById(`wagstart${id}`).style.display = "block";

      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`wagstart${id}`).style.display = "none";

          let wagon_DOM = document.getElementById(`start_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`wagstart${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`start_date${id}`);
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
    submitEndArenda(element, id) {
      let new_string
      if(element == ""){
        new_string = null
      } else {
        new_string = element
        .replace(/\./g, "-")
        .split("-")
        .reverse("")
        .join("-");
      }
      let data = { end_date: new_string };
      document.getElementById(`wagend${id}`).style.display = "block";
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`wagend${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`end_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`wagend${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`end_date${id}`);
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
    submitStavka(element, id) {
      console.log(element, id)
      let data = { stavka: element };
      document.getElementById(`stavkaload${id}`).style.display = "block";
      console.log(data)
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`stavkaload${id}`).style.display = "none";

          let wagon_DOM = document.getElementById(`stavka${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`stavkaload${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`stavka${id}`);
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
    submitStartStavka(element, id) {
      let new_string
      if(element == ""){
        new_string = null
      } else {
        new_string = element
        .replace(/\./g, "-")
        .split("-")
        .reverse("")
        .join("-");
      }
      let data = { stavka_start_date: new_string };
      document.getElementById(`stavkaStart${id}`).style.display = "block";

      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`stavkaStart${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`stavka_start_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`stavkaStart${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`stavka_start_date${id}`);
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
    submitEndStavka(element, id) {
      let new_string
      if(element == ""){
        new_string = null
      } else {
        new_string = element
        .replace(/\./g, "-")
        .split("-")
        .reverse("")
        .join("-");
      }

      let data = { stavka_end_date: new_string };
      document.getElementById(`stavkaEnd${id}`).style.display = "block";
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`stavkaEnd${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`stavka_end_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`stavkaEnd${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`stavka_end_date${id}`);
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
    submitTenant(element, id) {
      let data = { tenant: element };
      document.getElementById(`tenantload${id}`).style.display = "block";

      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`tenantload${id}`).style.display = "none";

          let wagon_DOM = document.getElementById(`tenant${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`tenantload${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`tenant${id}`);
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
    submitLandlord(element, id) {
      let data = { landlord: element };
      document.getElementById(`landlordload${id}`).style.display = "block";

      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          document.getElementById(`landlordload${id}`).style.display = "none";

          let wagon_DOM = document.getElementById(`landlord${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          document.getElementById(`landlordload${id}`).style.display = "none";
          let wagon_DOM = document.getElementById(`landlord${id}`);
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
      this.filter_arendaData.tenant = this.tenant;
      this.filter_arendaData.landlord = this.landlord;
      api
        .getAllArendaDataStavkaPage(this.filter_arendaData, pg_size, pg_number)
        .then((response) => {
          this.loader = false;
          this.data = response.data.data;
          console.log(this.data);
          this.pageNumber = response.data.page_number;
        })

        .catch((error) => {
          this.loader = false;
          console.log(error);
        });
    },
    getArenda() {
      this.loader = true;
      this.filter_arendaData.tenant = this.tenant;
      this.filter_arendaData.landlord = this.landlord;
      let data = (this.wagons).replaceAll(' ', ',')

      this.filter_arendaData.wagons_in = data
      
      api
        .getAllArendaDataStavka(this.filter_arendaData)
        .then((response) => {
          this.loader = false;
          let arr = response.data.data;
          this.data = response.data.data;
          console.log(this.data);
          this.data = JSON.parse(JSON.stringify(arr));

          this.data.forEach((item) => {
            if (item.end_date == null) {
              item.end_date = null;
            }
            if (item.end_date != null) {
              item.end_date = new Date(item.end_date)
                .toLocaleString()
                .split(",")[0];
            }
            if (item.start_date == null) {
              item.start_date = null;
            }
            if (item.start_date != null) {
              item.start_date = new Date(item.start_date)
                .toLocaleString()
                .split(",")[0];
            }
            if (item.stavka_start_date == null) {
              item.stavka_start_date = null;
            }
            if (item.stavka_start_date != null) {
              item.stavka_start_date = new Date(item.stavka_start_date)
                .toLocaleString()
                .split(",")[0];
            }
            if (item.stavka_end_date == null) {
              item.stavka_end_date = null;
            }
            if (item.stavka_end_date != null) {
              item.stavka_end_date = new Date(item.stavka_end_date)
                .toLocaleString()
                .split(",")[0];
            }
          });

          console.log(arr);

          this.pageNumber = response.data.page_number;
          this.pagination = response.data.links;
          this.total_pages = response.data.total_pages;
          this.total_objects = response.data.total_objects;
        })
        .catch((error) => {
          this.loader = false;
          console.log(error.response);
        });
    },
    getExcel(){
      this.loader = true;
      this.filter_arendaData.tenant = this.tenant;
      this.filter_arendaData.landlord = this.landlord;
      let data = this.wagons.replaceAll(' ', ',')

      this.filter_arendaData.wagons_in = data
      
      api
        .getExportExcel(this.filter_arendaData)
        .then((response) => {
          this.loader = false;
          let arr = response.data.data;
          this.data = response.data.data;
          console.log(this.data);
          this.data = JSON.parse(JSON.stringify(arr));

          this.data.forEach((item) => {
            if (item.end_date == null) {
              item.end_date = null;
            }
            if (item.end_date != null) {
              item.end_date = new Date(item.end_date)
                .toLocaleString()
                .split(",")[0];
            }
            if (item.start_date == null) {
              item.start_date = null;
            }
            if (item.start_date != null) {
              item.start_date = new Date(item.start_date)
                .toLocaleString()
                .split(",")[0];
            }
            if (item.stavka_start_date == null) {
              item.stavka_start_date = null;
            }
            if (item.stavka_start_date != null) {
              item.stavka_start_date = new Date(item.stavka_start_date)
                .toLocaleString()
                .split(",")[0];
            }
            if (item.stavka_end_date == null) {
              item.stavka_end_date = null;
            }
            if (item.stavka_end_date != null) {
              item.stavka_end_date = new Date(item.stavka_end_date)
                .toLocaleString()
                .split(",")[0];
            }
          });
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
            this.notifyMessage = "Excel файл не создан, попробуйте позже";
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 2500);
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.block_answer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2%;
  width: 100%;
  margin: 0;
}
li {
  list-style-type: none;
}
li:hover {
  background: white;
}
.inputcontainer {
  position: relative;
}

input {
  width: 100%;
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
tr,
td,
th {
  border: 1px solid grey;
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
.hover:hover {
  background: lightcoral;
}
.hover {
  outline: none;
  border: none;
}
.col1 {
  width: 60px;
  max-width: 60px;
}
.col2 {
  width: 160px !important;
  max-width: 160px !important;
}
input {
  border: none;
  text-align: center;
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
.btn-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  button {
    width: 30%;
    margin-top: 5%;
  }
}
.table-content2 {
  width: 90% !important;
}
.table-content {
  margin-top: 4%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 1px solid lightgrey;
  padding: 1%;
  label {
    color: rgb(146, 146, 146);
  }
  button {
    height: 40px;
    width: 30%;
    margin-top: 2.5%;
    float: right !important;
    margin-left: auto;
  }
}

.WatchAllArenda {
  color: rgb(146, 146, 146);
  margin-top: 15%;
  font-size: 25px;
  cursor: pointer;
}
</style>