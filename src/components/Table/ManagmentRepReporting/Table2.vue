<template>
   <div style="overflow: auto; margin-top: 5%">
    <p>Форма 4.2 "Размещение парка"</p>
    <table border="1" align="center">
      <tr>
        <th></th>
        <th>Подвижной состав, ед</th>
          <th>На 01.01.2023</th>
          <th colspan="2" class="col2">
            Янв. 2023
            <tr>
              <th class="col1">Ввод</th>
              <th class="col1">Вывод</th>
            </tr>
          </th>
          <th>На 01.02.2023</th>
          <th colspan="2" class="col2">
            Фев. 2023
            <tr>
              <th class="col1">Ввод</th>
              <th class="col1">Вывод</th>
            </tr>
          </th>
          <th>На 01.03.2023</th>
          <th colspan="2" class="col2">
            Мар. 2023
            <tr>
              <th class="col1">Ввод</th>
              <th class="col1">Вывод</th>
            </tr>
          </th>   
          <th>На 01.04.2023</th>
          <th colspan="2" class="col2">
            Апр. 2023
            <tr>
              <th class="col1">Ввод</th>
              <th class="col1">Вывод</th>
            </tr>
          </th>     
      </tr>
      <tr>
        <th class="number">1</th>
        <th>Оперерирование</th>
        <th>11 621</th>
        <th colspan="2">
            <tr>
              <th class="col1">135</th>
              <th class="col1">312</th>
            </tr>
          </th>
          <th>12 659</th>
          <th colspan="2">
            <tr>
              <th class="col1">237</th>
              <th class="col1">1365</th>
            </tr>
          </th>
          <th>11 532</th>
          <th colspan="2">
            <tr>
              <th class="col1">506</th>
              <th class="col1">18</th>
            </tr>
          </th>
          <th> 1 865 </th>
          <th colspan="2">
            <tr>
              <th class="col1"> 366 </th>
              <th class="col1"> 4 </th>
            </tr>
          </th>
      </tr>
      <tr>
        <th class="number">2</th>
        <th>Сдача в аренду</th>
        <th>1 996</th>
        <th colspan="2">
            <tr>
              <th class="col1">24</th>
              <th class="col1">34</th>
            </tr>
          </th>
          <th>1 936</th>
        <th colspan="2">
            <tr>
              <th class="col1">5</th>
              <th class="col1">165</th>
            </tr>
          </th>
          <th>1 905</th>
          <th colspan="2">
            <tr>
              <th class="col1">114</th>
              <th class="col1">756</th>
            </tr>
          </th>
          <th> 308</th>
          <th colspan="2">
            <tr>
              <th class="col1"> 0 </th>
              <th class="col1">139</th>
            </tr>
          </th>
      </tr>
      <tr>
        <th class="number">3</th>
        <th class="blue_line" style="font-weight: bold !important; text-align:  left !important;">Итого</th>
        <th class="blue_line"  style="font-weight: bold !important;">{{ 11621+1996 | filter }}</th>
        <th colspan="2">
            <tr>
              <th class="col1 blue_line" style="font-weight: bold !important;">{{ 135+24 }}</th>
              <th class="col1 blue_line" style="font-weight: bold !important;">{{ 312+34 }}</th>
            </tr>
          </th>
          <th  class="blue_line"  style="font-weight: bold !important;">{{ 12659+1936 | filter }}</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line" style="font-weight: bold !important;">{{ 237+5 }}</th>
              <th class="col1 blue_line" style="font-weight: bold !important;">{{1365 +165 | filter}}</th>
            </tr>
          </th>
          <th class="blue_line"  style="font-weight: bold !important;">{{ 11532 +1905 | filter }}</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line" style="font-weight: bold !important;">{{ 506+114 | filter }}</th>
              <th class="col1 blue_line" style="font-weight: bold !important;">{{ 756+18 | filter }}</th>
            </tr>
          </th>
          <th class="blue_line" style="font-weight: bold !important;">{{ 1865+308 | filter }} </th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line" style="font-weight: bold !important;"> 366 </th>
              <th class="col1 blue_line" style="font-weight: bold !important;">143</th>
            </tr>
          </th>
      </tr>
    </table>
  </div>
</template>

<script>
import api from '@/api/reportUO'
export default{
  data(){
    return {
      data_response: ''
    }
  },
  filters: {
    filter(value){
         return  String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        },
  }
 
}
</script>

<style scoped>
.col1 {
  min-width: 75px;
  max-width: 75px;
  /* border: lightgray; */
}
.col2 {
  min-width: 120px;
  max-width: 120px;
  /* border: lightgray; */
}
.number {
  background: #b6df89;
  color: #41766f;
  /* width: calc(v-bind("index_font_size") * 5); */
}

.blue_line {
  background: #daeef3;

}
tr:hover {
  background: #dddddd !important;
  cursor: pointer;
}
/* tr>.blue_line:hover{
    background: #ddd;
} */
th {
  font-weight: 400 !important;
  border: 1px solid grey;
}

.widthFirst {
  /* width: calc(v-bind("index_font_size") * 8); */
}
.headers {
  text-align: left !important;
  padding-left: 1%;
}
</style>