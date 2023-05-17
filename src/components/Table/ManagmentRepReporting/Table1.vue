<template>
  <div style="overflow: auto; margin-top: 5%">
    <table border="1" align="center">
      <thead>
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
         
        </tr>

        <tr>
          <th class="number">1</th>
          <th class="blue_line" style="text-align: left !important;">Собственный парк</th>
          <th class="blue_line">6 221</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line">0</th>
              <th class="col1 blue_line">5</th>
            </tr>
          </th>
          <th class="blue_line">7 406</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line">96</th>
              <th class="col1 blue_line">3</th>
            </tr>
          </th>
          <th class="blue_line">7 502</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line">0</th>
              <th class="col1 blue_line">4</th>
            </tr>
          </th>
        </tr>
        <tr>
          <th class="number">2</th>
          <th>Полувагоны</th>
          <th>1 317</th>
          <th colspan="2">
            <tr>
              <th class="col1">0</th>
              <th class="col1">0</th>
            </tr>
          </th>
          <th>2 507</th>
          <th colspan="2">
            <tr>
              <th class="col1">96</th>
              <th class="col1">0</th>
            </tr>
          </th>
          <th>2 603</th>
          <th colspan="2">
            <tr>
              <th class="col1">0</th>
              <th class="col1">0</th>
            </tr>
          </th>
        </tr>
        
        <tr>
          <th class="number">3</th>
          <th>Цистерны</th>
          <th>4 904</th>
          <th colspan="2">
            <tr>
              <th class="col1">0</th>
              <th class="col1">5</th>
            </tr>
          </th>
          <th>4 899</th>
          <th colspan="2">
            <tr>
              <th class="col1">0</th>
              <th class="col1">3</th>
            </tr>
          </th>
          <th>4 899</th>
          <th colspan="2">
            <tr>
              <th class="col1">0</th>
              <th class="col1">4</th>
            </tr>
          </th>
        </tr>
        <tr>
          <th class="number">4</th>
          <th class="blue_line" style="text-align: left !important;">Арендованный парк</th>
          <th class="blue_line">5 400</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line">226</th>
              <th class="col1 blue_line">307</th>
            </tr>
          </th>
          <th class="blue_line">5 253</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line">141</th>
              <th class="col1 blue_line">1362</th>
            </tr>
          </th>
          <th class="blue_line">4 030</th>
          <th colspan="2">
            <tr>
              <th class="col1 blue_line">514</th>
              <th class="col1 blue_line">14</th>
            </tr>
          </th>
        </tr>
        <tr>
          <th class="number">5</th>
          <th>Полувагоны</th>
          <th>3 344</th>
          <th colspan="2">
            <tr>
              <th class="col1">96</th>
              <th class="col1">307</th>
            </tr>
          </th>
          <th>3 132</th>
          <th colspan="2">
            <tr>
              <th class="col1">126</th>
              <th class="col1">1361</th>
            </tr>
          </th>
          <th>1 897</th>
          <th colspan="2">
            <tr>
              <th class="col1">494</th>
              <th class="col1">14</th>
            </tr>
          </th>
        </tr>
        <tr>
          <th class="number">6</th>
          <th>Цистерны</th>
          <th>2 056</th>
          <th colspan="2">
            <tr>
              <th class="col1">130</th>
              <th class="col1">0</th>
            </tr>
          </th>
          <th>2 121</th>
          <th colspan="2">
            <tr>
              <th class="col1">15</th>
              <th class="col1">1</th>
            </tr>
          </th>
          <th>2 131</th>
          <th colspan="2">
            <tr>
              <th class="col1">20</th>
              <th class="col1">0</th>
            </tr>
          </th>
        </tr>
        
        <tr>
          <th class="number">7</th>
          <th style="font-weight: bold !important; text-align: left !important;">Всего ПС</th>
          <th>11 621</th>
          <th colspan="2">
            <tr>
              <th class="col1">226</th>
              <th class="col1">312</th>
            </tr>
          </th>
          <th>12 659</th>
          <th colspan="2">
            <tr>
              <th class="col1">237</th>
              <th class="col1">1 365</th>
            </tr>
          </th>
          <th>11 532</th>
          <th colspan="2">
            <tr>
              <th class="col1">514</th>
              <th class="col1">18</th>
            </tr>
          </th>
        </tr>
        <tr>
          <th class="number">8</th>
          <th>Полувагоны</th>
          <th>4 661</th>
          <th colspan="2">
            <tr>
              <th class="col1">96</th>
              <th class="col1">307</th>
            </tr>
          </th>
          <th>5 639</th>
          <th colspan="2">
            <tr>
              <th class="col1">222</th>
              <th class="col1">1 361</th>
            </tr>
          </th>
          <th>4 500</th>
          <th colspan="2">
            <tr>
              <th class="col1">494</th>
              <th class="col1">14</th>
            </tr>
          </th>
        </tr>
        <tr>
          <th class="number">9</th>
          <th>Цистерны</th>
          <th>6 960</th>
          <th colspan="2">
            <tr>
              <th class="col1">130</th>
              <th class="col1">5</th>
            </tr>
          </th>
          <th>7 020</th>
          <th colspan="2">
            <tr>
              <th class="col1">15</th>
              <th class="col1">4</th>
            </tr>
          </th>
          <th>7 032</th>
          <th colspan="2">
            <tr>
              <th class="col1">20</th>
              <th class="col1">5</th>
            </tr>
          </th>
        </tr>
      
      </thead>
      <!-- <thead>
         
            <th class="widthFirst"></th>
            <th style="font-weight: bold !important; width: 200px !important; min-width: 200px !important; max-width: 200px !important;">Подвижной состав, ед</th>
          
              <th ></th>
          <tr>
            <td colspan="2" class="col2"></td>
          </tr>
          <tr>
            <th class="col1" style="font-size: 13px !important">Ввод</th>
            <th class="col1" style="font-size: 13px !important">Вывод</th>
          </tr>
         
        

         
            <th class="number">1</th>
            <th class="styles">Оперерирование</th>
              <th></th>
          <tr>
            <th class="col1"></th>
            <th class="col1"></th>
          </tr>
        

            <th class="number">2</th>
            <th class="styles">Сдача в аренду</th>
              <th></th>
          <tr>
            <th class="col1"></th>
            <th class="col1"></th>
          </tr>

          <tr >
            <th class="number">3</th>
            <th class="styles">Итого</th>
              <th></th>
            <th class="col1"></th>
            <th class="col1"></th>
          </tr>
        </thead> -->
    </table>
  </div>
</template>





<style scoped>
.col1 {
  min-width: 70px;
  max-width: 70px;
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
  font-weight: bold !important;

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