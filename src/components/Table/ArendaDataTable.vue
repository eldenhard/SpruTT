<template>
  <div>
    <Loader :loader="loader" />
    <h4 class="WatchAllArenda" v-on:click="visible = !visible">
      {{ visible ? "Скрыть данные по аренде" : "Отобразить данные по аренде" }}
    </h4>
    <div class="table-content" v-show="visible">
      <label for="amount"
        >Количество строк <br />
        <select
          name="amount_row"
          id="amount"
          v-model="filter_arendaData.page_size"
        >
          <option value="" disabled>кол-во строк на странице</option>
          <option value="15">15</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </label>
      <button class="button Accept" @click="getArenda()">Запросить</button>
    </div>

    Номер страницы {{ pageNumber }}
    <div class="">
      <table border="1" v-show="visible">
        <thead>
          <tr>
            <th class="col1">#</th>
            <th class="col2">№ вагона</th>
            <th class="col2">Дата начала аренды</th>
            <th class="col2">Дата конца аренды</th>
            <th class="col2">Ставка</th>
            <th class="col2">Дата начала акта</th>
            <th class="col2">Дата конца акта</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id" :id="item.id">
            <td class="col1">
              <input
                class="hover"
                style="width: 100%"
                :value="index + 1"
                readonly
                @click="deleteStavkiArenda(item.id)"
              />
            </td>
            <td class="col1">
              <input
                style="width: 100%"
                :id="`wag` + item.id"
                v-model="item.wagon"
                v-on:keyup.enter="submitWagon(item.wagon, item.id)"
              />
            </td>
            <td class="col2">
              <input
                style="width: 100%"
                :id="`start_date` + item.id"
                v-model="item.start_date"
                v-on:keyup.enter="submitStartArenda(item.start_date, item.id)"
              />
            </td>
            <td class="col2">
              <input
                style="width: 100%"
                :id="`end_date` + item.id"
                v-model="item.end_date"
                v-on:keyup.enter="submitEndArenda(item.end_date, item.id)"
              />
            </td>
            <td class="col2">
              <input
                style="width: 100%"
                :id="`stavka` + item.id"
                v-model="item.stavka"
                v-on:keyup.enter="submitStavka(item.stavka, item.id)"
              />
            </td>
            <td class="col2">
              <input
                style="width: 100%"
                :id="`stavka_start_date` + item.id"
                v-model="item.stavka_start_date"
                v-on:keyup.enter="
                  submitStartStavka(item.stavka_start_date, item.id)
                "
              />
            </td>
            <td class="col2">
              <input
                style="width: 100%"
                :id="`stavka_end_date` + item.id"
                v-model="item.stavka_end_date"
                v-on:keyup.enter="
                  submitEndStavka(item.stavka_end_date, item.id)
                "
              />
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
  </div>
</template>

<script>
import api from "@/api/directory.js";
import Loader from "../loader/loader.vue";
export default {
  name: "ArendaDataTable",
  components: { Loader },
  data() {
    return {
      success: false,
      length_pagination: "",
      interval: 2,

      loader: false,
      visible: true,
      data: "",
      pagination: "",
      total_pages: "",
      total_objects: "",
      nextLink: null,
      prevLink: null,
      pageNumber: 1,
      filter_arendaData: {
        page_size: "",
      },
    };
  },
  computed: {
    rows() {
      return this.data.length;
    },
  },

  methods: {
    deleteStavkiArenda(id) {
      api
        .deleteStavkiArenda(id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      let row = document.getElementById(id);
      row.parentNode.removeChild(row);
    },
    submitWagon(element, id) {
      let data = { wagon: element };
      api.patchStavkiArenda(id, data).then((response) => {
        console.log(response);
        let wagon_DOM = document.getElementById(`wag${id}`);
        wagon_DOM.classList.add("success");
        setTimeout(() => {
          wagon_DOM.classList.remove("success");
        }, 1000);
      });
    },
    submitStartArenda(element, id) {
      let data = { start_date: element };
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          let wagon_DOM = document.getElementById(`start_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitEndArenda(element, id) {
      let data = { end_date: element };
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          let wagon_DOM = document.getElementById(`end_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitStavka(element, id) {
      let data = { stavka: element };
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          let wagon_DOM = document.getElementById(`stavka${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitStartStavka(element, id) {
      let data = { stavka_start_date: element };
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          let wagon_DOM = document.getElementById(`stavka_start_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitEndStavka(element, id) {
      let data = { stavka_start_date: element };
      api
        .patchStavkiArenda(id, data)
        .then((response) => {
          let wagon_DOM = document.getElementById(`stavka_end_date${id}`);
          wagon_DOM.classList.add("success");
          setTimeout(() => {
            wagon_DOM.classList.remove("success");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
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
      api
        .getAllArendaDataStavkaPage(pg_size, pg_number)
        .then((response) => {
          console.log(pg_number);
          this.data = response.data.data;
          this.pageNumber = response.data.page_number;
          console.log(this.data);
          console.log(this.pageNumber);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArenda() {
      // this.loader = true
      api
        .getAllArendaDataStavka(this.filter_arendaData)
        .then((response) => {
          this.loader = false;

          this.data = response.data.data;
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
  },
};
</script>
<style lang="scss" scoped>
.success {
  transition: 0.5s ease-in-out;
  background: rgba(42, 190, 67, 0.4);
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
// tr :first-child {
//   width: 0;
//   white-space: nowrap;
// }

// tr :last-child {
//   width: 100%;
// }
input {
  border: none;
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
  border: 1px solid lightgrey;
  padding: 1%;
  label {
    color: rgb(146, 146, 146);
  }
  button {
    height: 40px;
    width: 30%;
    margin-top: 3%;
  }
}

.WatchAllArenda {
  color: rgb(146, 146, 146);
  margin-top: 5%;
  cursor: pointer;
}
</style>