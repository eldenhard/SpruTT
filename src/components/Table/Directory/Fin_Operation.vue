<template>
  <div>
    <button @click="getData()">DOWNLOAD</button>
    <!-- <pre>{{ data }}</pre> -->
    <!-- <div class=" current_date_block">
      <label for="">
        Месяц <br />
        <input type=" current_date" class="textarea" v-model=" current_date" />
      </label>
      <button class="Accept button" @click="getDayOn current_date()">Загрузить</button>
    </div> -->
    <p>{{ current_date }}</p>
    <div style="overflow: auto">
      <table border="1" style="margin-top: 3%">
        <thead>
          <tr>
            <th rowspan="2">Наименование статьи</th>
            <th rowspan="2">План утв.</th>
            <template v-for="item in num">
              <th :key="item.id">{{ item }}</th>
            </template>
          </tr>
          <template v-for="day_of_week in send_data">
            <th
              :key="day_of_week.id"
              :class="{ weekend: isWeekend(day_of_week) }"
            >
              {{ day_of_week }}
            </th>
          </template>
        </thead>

        <tbody>
          <template v-for="(item_group, group) in data">
            <tr :key="item_group.id">
              <td class="col1">{{ group }}</td>
              <td class="col1">{{ item_group.plan }}</td>
              <template v-for="date_week in item_group.date_week">
                <td :key="date_week.id" class="col2">{{ date_week.value }}</td>
              </template>
            </tr>

            <tr
              v-for="name_companie in item_group.companies"
              :key="name_companie.id"
            >
              <td>{{ name_companie.name }}</td>
              <td>
                <input
                  type="text"
                  :value="name_companie.plan"
                  :readonly="WhoUser"
                  @keydown.enter="
                    save_plan(name_companie.name, $event.target.value, group)
                  "
                />
              </td>
              <template
                v-for="(date_week, num_day_week) in name_companie.week_days"
              >
                <td :key="date_week.id">
                  <input
                    type="text"
                    :value="date_week.value"
                    v-b-tooltip.hover :title="date_week.user_id"
                    @keydown.enter="
                      save_data(
                        name_companie.name,
                        num_day_week,
                        $event.target.value,
                        group
                      )
                    "
                  />
                </td>
              </template>
            </tr>
          </template>
      
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import fin_counterpartie from "@/helpers/fin_counterpartie";
import InputLoader from "../../ui/InputLoader.vue";
import api from "@/api/directory.js";
import { mapState } from "vuex";
export default {
  components: { InputLoader },
  data() {
    return {
      num: "",
      send_data: "",
      data: fin_counterpartie,
      current_date: "",
    };
  },
  computed: {
    ...mapState({
      uid: (state) => state.auth.uid,
      last_name: (state) => state.auth.user.user.last_name
    }),
    WhoUser() {
      if (this.uid == 202 || this.uid == 1 || this.uid == 102) {
        return false;
      }
      return true;
    },
  },
  mounted() {


    document.title = `Фин операции `;
    const a = window.location.href;
    this.current_date = a.substring(a.length - 7);
    let predata = this.data["fin_counerpartie"];

    let arr = this.current_date.split("-");
    let lastday = new Date(arr[0], arr[1], 0);
    this.num = lastday.getDate();

    let num = lastday.getDate();
    let array = [];
    for (let i = 1; i <= num; i++) {
      if (i <= 9) {
        array.push(`${this.current_date}-0${i}`);
      } else {
        array.push(`${this.current_date}-${i}`);
      }
    }
    let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    let data = array.map((item) => {
      return new Date(item);
    });
    let send_data = data.map((item) => {
      return days[item.getDay()];
    });

    this.send_data = send_data;

    let week_days = {};
    for (let i = 1; i <= num; i++) {
      week_days[i] = {
        value: "",
        user_id: "",
      };
    }
    // перебор групп типа ПОСТУПЛЕНИЯ, Доходы ЦС
    for (let group in predata) {
      predata[group].plan = "";
      predata[group].date_week = week_days;

      // Перебор всех компаний внетри Доходы ЦС
      for (let company in predata[group]?.companies) {
        predata[group].companies[company].week_days = week_days;
        predata[group].companies[company].name = company;
        predata[group].companies[company].plan = "";
      }
    }
    this.data = predata;
    console.log(this.data)
  },
  methods: {

    getData(){
        let data = {file_name : this.current_date}
        api.getIncomes(data)
        .then(response => {
            console.log(response.data)
        }).catch(error =>{
            console.log(error)
        })
    },
    save_data(cp, col_idx, value, group) {
        console.log(this.last_name)
      const arr = JSON.parse(JSON.stringify(this.data));
      console.log(cp, col_idx, value, group);
      arr[group]["companies"][cp]["week_days"][col_idx]["value"] = value;
      arr[group]["companies"][cp]["week_days"][col_idx]["user_id"] = this.last_name;

      this.data = arr;
      let arr1 = [];
      // Получение итого доходы по дню
      for (let i in this.data[group]["companies"]) {
        arr1.push(
          Number(this.data[group]["companies"][i]["week_days"][col_idx].value)
        );
      }
      let result = arr1.reduce((acc, item) => {
        return acc + item;
      });
    //   Итог по группе
      this.data[group]["date_week"][col_idx].value = result;
      let date_week_total = []

      for(let i in this.data){
        if(i == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ'){
            continue
        }
        date_week_total.push(Number(this.data[i]['date_week'][col_idx].value))
      }
      this.data['ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ']['date_week'][col_idx].value = date_week_total.reduce((acc,item) => {return acc += item})
      let data = {
        'file_name' : this.current_date,
        'content' : this.data
      }
     
      api.saveIncomes(data)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    //   for(let i in this.data){
    //     if(i == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ'){
    //         continue
    //     }
    //    console.log(this.data[i]['companies']['cp'])
    //   }
    },


    save_plan(cp, value, group) {
      let arr = JSON.parse(JSON.stringify(this.data));
      arr[group]["companies"][cp]["plan"] = value;
      this.data = arr;
      let arr1 = [];

      for (let i in this.data[group]["companies"]) {
        arr1.push(Number(this.data[group]["companies"][i]["plan"]));
      }
      let result = arr1.reduce((acc, item) => {
        return acc + item;
      });

      this.data[group]['plan'] = result
    //   Итоговый план
    let arr_total = []
      for(let i in this.data){
        if(i == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ'){
            continue
        }
        arr_total.push(Number(this.data[i].plan))
      }
      this.data['ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ']['plan'] = arr_total.reduce((acc,item) => {return acc += item})

    //   api.saveIncomes(this.current_date, this.data)
    //   .then(response => {
    //     console.log(response)
    //   }).catch(error => {
    //     console.log(error)
    //   })

      // Получение итого доходы по дню
    //   for (let i in this.data[group]["companies"]) {
    //     arr1.push(
    //       Number(this.data[group]["companies"][i]["week_days"][col_idx].value)
    //     );
    //   }
    //   let result_day_week = arr1.reduce((acc, item) => {
    //     return acc + item;
    //   });
    //   this.data[group]["date_week"][col_idx].value = result;
    },

    DataChange() {},
    isWeekend(data) {
      if (data == "ВС" || data == "СБ") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.col1 {
  background: rgb(243, 243, 243);
  font-family: "Montserrat", sans-serif;
  color: black;
  font-weight: bold;
  text-align: left !important;
  padding-left: 2% !important;
}
.col2 {
  background: rgb(243, 243, 243);
  font-family: "Montserrat", sans-serif;
  color: black;

}
input {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
}
table {
  content-visibility: auto;
}
th {
  font-weight: 400 !important;
  font-size: 13px !important;
}

.weekend {
  color: #f18a46;
}
</style>