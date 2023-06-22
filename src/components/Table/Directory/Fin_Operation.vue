<template>
  <div>

    <h4 class="month">{{ mounth_report }}</h4>
<table border="1">
  <thead>
    <tr>
      <th rowspan="2">Контрагент</th>
      <th rowspan="2">План</th>
      <template v-for="day in days">
        <th>{{day}}</th>
      </template>
    </tr>
  </thead>
  <tbody>
    <!---10 groups-->
    <template v-for="(group, group_name) in data">
      <tr>
        <td >{{ group_name }}</td>
        <td >{{ group.plan }}</td>
        <template v-for="day in group.week_days">
          <td >{{ day.val }}</td> 
        </template>
      </tr>
      <!--companies names-->
      <tr v-for="(company, company_name) in group.companies" :key="company_name.id">
        <td>{{ company_name }}</td>
        <td>{{ company.plan }}</td>
        <template v-for="(day, index) in company.week_days">
          <td :key="day.id" :id="group_name +'_'+'companies' +'_' + company_name+'_'+index" @click="TdToInp(group_name +'_'+'companies' +'_' + company_name+'_'+index, day.val)">{{ day.val }}</td> 
        </template>
      </tr>
  </template>
  </tbody>
</table>
  
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
      days: "",
      send_data: "",
      data: fin_counterpartie.fin_counerpartie,
      current_date: "",
      visible: false,
      mounth_report: "",
      last_clicked_id: "",
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
  mounted(){
    let week_days = {};
    
    // получаем количество дней в выбранном месяце
    let page_date = window.location.href.substring(window.location.href.length - 7);
    let split_date = page_date.split("-");
    let lastday = new Date(split_date[0], split_date[1], 0);
    let days = lastday.getDate();

    for (let i = 1; i <= days; i++ ){
        week_days[i] = {
          "user": this.last_name,
          "val": 0
        }
    }

    for (let group in this.data){
        this.data[group]['week_days'] = week_days;
        for (let company in this.data[group]?.companies){
          this.data[group]['companies'][company]['week_days'] = week_days;
        }
    }

    this.days = days;
  },
  methods: {
    TdToInp(elem_id, val){

      let input_elements = document.getElementsByTagName('input');
      if (input_elements.length >= 1){
        return
      }

      // получаем текущий элемент, он уже, можно сказать, предыдущий
      let prev_el = document.getElementById(elem_id);

      console.log({
        'id': elem_id,
        'value': val
      })
      // создаем инпут, которым подменим контент старого элемент
      let input = document.createElement('input')
      input.id = elem_id + "_input";
      input.value = val;
      input.addEventListener('keyup', function(event) {
        if(event.key === "Enter"){
          console.log(elem_id);

          // td-шка старая
          let new_el = document.getElementById(elem_id); 
          new_el.innerHTML = event.target.value;
        }
      })

      prev_el.innerHTML = ""; //`<input value="${val}" id=${elem_id} onkeyup.enter=>`;
      // появление фокуса при выборе клетки
      prev_el.insertAdjacentElement('beforeend', input).focus();
      
      this.last_clicked_id = elem_id;

    },
    Collapse(){
        console.log(111)
        this.visible = !this.visible
    },
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
.button {
    width: 10%;
    background: rgb(168, 168, 168);
    color: white;
    
}
.month{
    padding-left: 2%;
    font-size: 18px;
}
.col1 {
  background: rgb(243, 243, 243);
  font-family: "Montserrat", sans-serif;
  color: black;
  font-weight: bold;
  text-align: left !important;
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
  margin-top: 1%;
}
th {
  font-weight: 400 !important;
  font-size: 13px !important;
}

.weekend {
  color: #f18a46;
}
</style>