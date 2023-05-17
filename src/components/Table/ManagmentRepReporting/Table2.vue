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
        <th class="blue_line"  style="font-weight: bold !important;">13 617</th>
        <th colspan="2">
            <tr>
              <th class="col1 blue_line" style="font-weight: bold !important;">94</th>
              <th class="col1 blue_line" style="font-weight: bold !important;">346</th>
            </tr>
          </th>
          <th  class="blue_line"  style="font-weight: bold !important;">14 595</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line" style="font-weight: bold !important;">242</th>
              <th class="col1 blue_line" style="font-weight: bold !important;">1530</th>
            </tr>
          </th>
          <th class="blue_line"  style="font-weight: bold !important;">13 437</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line" style="font-weight: bold !important;">620</th>
              <th class="col1 blue_line" style="font-weight: bold !important;">774</th>
            </tr>
          </th>
          <th class="blue_line">2 173 </th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line"> 366 </th>
              <th class="col1 blue_line">143</th>
            </tr>
          </th>
      </tr>
    </table>
  </div>
</template>



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