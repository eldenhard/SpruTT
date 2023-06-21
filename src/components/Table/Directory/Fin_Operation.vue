<template>
  <div>
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
        <template v-for="i in send_data">
          <th :key="i.id" :class="{ weekend: isWeekend(i) }">{{ i }}</th>
        </template>
      </thead>
      <tbody>
 
        <template v-for="(v, group) in data">
            {{ group }}
          <!-- <tr :key="v.id">
            <td class="col1">{{ group }}</td>
            <td><input type="text" ></td>

          </tr> -->

          <!-- <tr v-for="item in v" :key="item.id" style="border: 1px solid black">
            <td>{{ item?.name }}</td>
            <td><input type="text" /></td>
            <template v-for="(i, index2) in Object.values(item?.date_week)">
              <td><input type="text" :value="i.value" @keydown.enter="save_data(item?.name, index2+1, $event, k)"></td>
            </template>
          </tr> -->
        </template>
      </tbody>
    </table>
</div>
  </div>
</template>


<script>
import fin_counterpartie from "@/helpers/fin_counterpartie";
import InputLoader from "../../ui/InputLoader.vue";
import { mapState } from 'vuex';
export default {
  components: { InputLoader },
  data() {
    return {
      num: "",
      send_data: "",
      data: fin_counterpartie,
      current_date: ""
    };
  },
  computed:{
    ...mapState({
    uid: (state) => state.auth.uid
    })
  },
  mounted() {
    document.title = `Фин операции `;
    const a = window.location.href;
    this.current_date = a.substring(a.length - 7)

 
    let predata = this.data['fin_counerpartie']

    // перебор групп типа ПОСТУПЛЕНИЯ, Доходы ЦС
    for (let group in predata) {
        predata[group].plan = ""
        predata[group].date_week = {}
        // Перебор всех компаний внетри Доходы ЦС
        for (let company in predata[group]?.companies){
            predata[group].companies[company].week_days = {};
            predata[group].companies[company].name = company;
        }
    }
    console.log(predata)
    // this.data = predata;

    // let arr = this.current_date.split("-");
    //   let lastday = new Date(arr[0], arr[1], 0);
    //   this.num = lastday.getDate();

    //   let num = lastday.getDate();
    //   let array = [];
    //   for (let i = 1; i <= num; i++) {
    //     if (i <= 9) {
    //       array.push(`${this.current_date}-0${i}`);
    //     } else {
    //       array.push(`${this.current_date}-${i}`);
    //     }
    //   }
    //   let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];


    //   let data = array.map((item) => {
    //     return new Date(item);
    //   });
    //   let send_data = data.map((item) => {
    //     return days[item.getDay()];
    //   });
      
    //   this.send_data = send_data;
    //   let ArrDate = {};
    //   for (let i = 1; i <= this.num; i++) {
    //     ArrDate[i] = {
    //         'value': "",
    //         "user_id": ""
    //       };
    //   }

    //   for (let i in this.data) {
    //     Object.values(this.data[i]).forEach((item) => {
    //       return item.date_week = ArrDate;
    //     });
    //   }
  },
  methods: {
    save_data(name, ind, event, group){
        const arr = JSON.parse(JSON.stringify(this.data))

        let cp = name;
        let col_idx = Number(ind);
        let value = event.target.value;
        
        arr[group][cp]['date_week'][col_idx]['value'] = value;
        arr[group][cp]['date_week'][col_idx]['user_id'] = this.uid;
        // arr[group][cp]['date_week'].last_user = this.uid
       
        this.data = arr
       
    
        // const result = Object.entries(op).map(entry => ({[entry[0]]: entry[1]}));
            
            console.log(this.data)


    },
    all(name, i) {
      console.log(this.data)
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
// .col1 {
//   background: rgb(243, 243, 243);
//   font-family: "Montserrat", sans-serif;
//   color: black;
//   font-weight: bold;
//   text-align: left !important;
//   padding-left: 2% !important;
// }

input{
    width: 100% !important;
     height: 100% !important;
      border: none !important;
}
table{
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