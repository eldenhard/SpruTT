<!-- <th>Полигон</th>
<th>Тип</th>
<th>Кол-во по-грузок</th>
<th>Выручка, руб.</th>
<th>Вагоно-сутки</th>
<th>Средний оборот (сут)</th>
<th>МД, руб.</th>
<th>Доходность, руб./сут.</th> -->

<template>
  <div>
      <Loader :loader="loader" />
    <p class="explanation">* По клику на строку таблицы вы можете дополнительно выделить её цветом, для собственных нужд, <br>
       для снятия выделения повторно кликните на этот элменет</p>
      <p>Форма 4.12. "Доходность по виду перевозок по сегменту полувагонов"</p>
      <Periods @Action="Actioned" @data="getCurrentData" />

      <br>
      <div  style="overflow: auto; max-height: 65vh;">
       
          <table>
              <thead>
              <tr class="TableHeader">
                <th>Тип</th>
                <th>Кол-во погрузок</th>
                <th>Выручка, руб.</th>
                <th>Вагоно-сутки</th>
                <th>Средний оборот (сут)</th>
                <th>МД, руб.</th>
                <th>Доходность, руб./сут.</th>
              </tr>
              <tr class="RowAlphabet">
                  <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
              </tr>
          </thead>
              <tbody v-show="Object.keys(data).length > 0">
                <template v-for="grandTotal, typeClient in data">
                  <td v-if="CheckValue(typeClient)"  class="ClientRow" colspan="4">{{ typeClient }}</td>
                  <td v-if="CheckValue(typeClient)"  class="ClientRow" colspan="4">{{ typeClient }}</td>
                  <template v-for="amountLoad in getNextKey(grandTotal)">
                  <tr>
                   
                    <td v-if="CheckValue(typeClient)" @click="ChangeColorRow($event.target)">{{ amountLoad }}</td>
                    <td v-if="CheckValue(typeClient)" @click="ChangeColorRow($event.target)">{{ grandTotal[amountLoad]['aid'] }}</td>
                    <td v-if="CheckValue(typeClient)" @click="ChangeColorRow($event.target)">{{ grandTotal[amountLoad]['revenue']?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)" @click="ChangeColorRow($event.target)">{{ grandTotal[amountLoad]['travel_time']?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)" @click="ChangeColorRow($event.target)">{{ AverageValue(grandTotal[amountLoad]['mean_turnover'])?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)" @click="ChangeColorRow($event.target)">{{ grandTotal[amountLoad]['md']?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)" @click="ChangeColorRow($event.target)">{{ AverageValue(grandTotal[amountLoad]['income'])?.toFixed(2) | format}}</td>
                  </tr>
                </template>
                <tr class="Total_1">
                    <td v-if="CheckValue(typeClient)">Итого: {{ typeClient }}</td>
                    <td v-if="CheckValue(typeClient)">{{ grandTotal['aid'] }}</td>
                    <td v-if="CheckValue(typeClient)">{{ grandTotal['revenue']?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)">{{ grandTotal['travel_time']?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)">{{ AverageValue(grandTotal['mean_turnover'])?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)">{{ grandTotal['md']?.toFixed(2) | format}}</td>
                    <td v-if="CheckValue(typeClient)">{{ AverageValue(grandTotal['income'])?.toFixed(2) | format}}</td>
                </tr>
                </template>
                <tr class="GrandTotal">
                  <td>Итого</td>
                  <td>{{ data?.aid }}</td>
                  <td>{{ data?.revenue?.toFixed(2) | format}}</td>
                  <td>{{ data?.travel_time?.toFixed(2) | format}}</td>
                  <td>{{ AverageValue(data?.mean_turnover) | format}}</td>
                  <td>{{ data?.md?.toFixed(2) | format}}</td>
                  <td>{{ AverageValue(data?.income) | format}}</td> 
                </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>
<style scoped>
@import '../../../style/UOTableStyle.css';

td,
th {
  white-space: nowrap;

}

tr:hover {
  background: lightcyan;
}
</style>
<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import AverageValue from '@/mixins/AverageValue'

export default {
  components: { Periods, Notifications, Loader, },
  mixins: [AverageValue],
  data() {
      return {
        loader: false,
          wag_type: "",
          alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
          loader: false,
          data: "",
         date_begin: "",
         date_end: "",
      }
  },
  mounted() {
      // this.OpenChildren(document.getElementById('FuckingData11'), this.data)
  },
  filters: {
      format(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
      },
    },
  computed:{
      getTh(){
          return this.alphabet.slice(0, 7)
      }
  },
  methods: {
    ChangeColorRow(element){
        if( element.parentNode.classList.contains('active_row')){
            element.parentNode.classList.remove('active_row')
        }else {
            element.parentNode.classList.add('active_row')

        }
    },
      ChangeColorRow(element){
      if( element.parentNode.classList.contains('active_row')){
          element.parentNode.classList.remove('active_row')
      }else {
          element.parentNode.classList.add('active_row')

      }
  },
      CheckValue(value) {
          let client = value;
          if (
              client != "aid" &&
              client != "revenue" &&
              client != "travel_time" &&
              client != "mean_turnover" &&
              client != "md" &&
              client != "income"
          ) {
              return true;
          }
      },
      getNextKey(obj) {
          const keys = Object.keys(obj);
          let correctKeys = [];
          for (let i of keys) {
              if (i == "weight" ||
              i == "aid" ||
              i == "revenue" ||
              i == "travel_time" ||
              i == "mean_turnover" ||
              i == "md" ||
              i == "income") {
                  continue;
              } else {
                  correctKeys.push(i);
              }
          }
          return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
      },
      Translate(val) {
          switch (val) {
              case 'amount':
                  return 'Количество'
                  break
              case 'cost':
                  return 'Сумма'
                  break
              case "product":
                  return 'Продукт'
                  break
              case "fine":
                  return 'Штраф'
                  break
              case "":
                  return 'Не определено'
                  break
              case val:
                  return val
                  break

          }
      },
      FilterValue(val) {
          return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
      },


      Actioned() {



          this.loader = true;
          api
              .getUO12(this.date_begin, this.date_end)
              .then((response) => {
                  this.loader = false;
                  this.data = response.data;
              })
              .catch((error) => {
                  console.log(error);
                  this.loader = false;
              });


      },
      getCurrentData(data) {
          this.date_begin = data.date_begin;
          this.date_end = data.date_end;
      },

  }
}


</script>