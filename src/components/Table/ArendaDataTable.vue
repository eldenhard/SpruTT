<template>
  <div>
    <h4 class="WatchAllArenda" v-on:click="visible = !visible">
      {{ visible ? "Скрыть данные по аренде" : "Отобразить данные по аренде" }}
    </h4>
    <div class="table-content" v-show="visible">
      <label for="amount"
        >Количество строк <br />
        <select name="amount_row" id="amount" v-model="filter_arendaData.page_size">
          <option value="" disabled>кол-во строк на странице</option>
          <option value="1">1</option>
          <option value="15">50</option>
          <option value="15">100</option>
          <option value="15">500</option>
        </select>
      </label>
      <button class="button Accept" @click="getArenda()">Запросить</button>
    </div>
    <table border="1" v-show="visible">
      <thead>
        <tr>
          <th>№ вагона</th>
          <th>Дата начала аренды</th>
          <th>Дата конца аренды</th>
          <th>Ставка</th>
          <th>Дата начала акта</th>
          <th>Дата конца акта</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.wagon }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.stavka }}</td>
          <td>{{ item.stavka_start_date }}</td>
          <td>{{ item.stavka_end_date }}</td>
        </tr>
      </tbody>
    
    </table>
    <div class="btn-group" v-show="visible">
        <button
          class="button Cancel prev"
          v-show="prevLink"

          @click="goToPage(prevLink)"
        >
          назад
        </button>
        <button
          class="button Cancel next"
          v-show="nextLink"
          @click="goToPage(nextLink)"
        >
          вперед
        </button>
      </div>
  </div>
</template>

<script>
import api from "@/api/directory.js";
export default {
  name: "ArendaDataTable",
  data() {
    return {
      visible: true,
      data: "",
      nextLink: null,
      prevLink: null,
      pageNumber: '',
      filter_arendaData: {
        page_size: ""
      }
    };
  },
  methods: {
    goToPage(link) {
      let url = new URL(link);
      let pageNumber = url.searchParams.get("page");
      this.pageNumber = pageNumber
      if (pageNumber != null) {
        this.filter_arendaData.page = pageNumber;
      } else {
        delete this.filter_arendaData.page;
      }
      this.getArenda();
    },
    getArenda() {
      api
        .getAllArendaDataStavka(this.filter_arendaData)
        .then((response) => {
          this.nextLink = response.data.links.next;
          this.prevLink = response.data.links.previous;

          this.data = response.data.data;
          this.pagination = response.data.links;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
        button {
            width: 30%;
            margin-top: 5%;
        }
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