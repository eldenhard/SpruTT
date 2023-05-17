<template>
    <div style="overflow: auto; margin-top: 5%">
      <table border="1" align="center">
        <thead>
          <tr>
            <th>Мар.2023</th>
            <th>Тип ПС/ Арендодатель</th>
            <th>Кол-во на начало периода</th>
            <th>Кол-во на конец периода</th>
            <th>Кол-во в/с</th>
            <th>Ставка руб без НДС</th>
            <th>Аренда, руб без НДС</th>
          </tr>
          <tr>
            <th class="number">1</th>
            <th>Полувагоны</th>
            <th>96</th>
            <th>105</th>
            <th>3 138</th>
            <th>7 000</th>
            <th>10 979 200</th>
          </tr>
          <tr>
            <th class="number">2</th>
            <th>Тонжлогистик</th>
            <th>50</th>
            <th>50</th>
            <th>1 550</th>
            <th>3 600</th>
            <th>5 580 000</th>
  
       
          </tr>
          <tr>
            <th class="number">3</th>
            <th>Дулаанвинг</th>
            <th>46</th>
            <th>55</th>
            <th>1 588</th>
            <th>3 400</th>
            <th>5 399 200</th>
          </tr>
        
          <tr>
            <th class="number">4</th>
            <th>Цистерны</th>
            <th>1 809</th>
            <th>1 158</th>
            <th>48 039</th>
            <th>26 155</th>
            <th>71 607 325</th>
          </tr>
          <tr>
            <th class="number">5</th>
            <th>ММСК</th>
            <th>18</th>
            <th>18</th>
            <th>552</th>
            <th>2 500</th>
            <th>1 380 000</th>
          </tr>
          <tr>
            <th class="number">6</th>
            <th>Эдельвейс</th>
            <th>150</th>
            <th>150</th>
            <th>4 634</th>
            <th>2 400</th>
            <th>11 121 600</th>
          </tr>
          <tr>
            <th class="number">7</th>
            <th>Софит</th>
            <th>101</th>
            <th>95</th>
            <th>2 955</th>
            <th>4 800</th>
            <th>7 092 000</th>
          </tr>
          <tr>
            <th class="number">8</th>
            <th>Союзметаллсервис</th>
            <th>77</th>
            <th>88</th>
            <th>2 670</th>
            <th>2 500</th>
            <th>6 675 000</th>
          </tr>
          <tr>
            <th class="number">9</th>
            <th>Рутгерс Севертар</th>
            <th>30</th>
            <th>30</th>
            <th>914</th>
            <th>2 400</th>
            <th>2 193 600</th>
          </tr>
          <tr>
            <th class="number">10</th>
            <th>Энергоресурсы</th>
            <th>8</th>
            <th>8</th>
            <th>248</th>
            <th>700</th>
            <th>173 600</th>
          </tr>
          <tr>
            <th class="number">11</th>
            <th>РТС-Транс/PTC Operator</th>
            <th>295</th>
            <th>186</th>
            <th>7 779</th>
            <th>2 550</th>
            <th>11 849 000</th>
          </tr>
          <tr>
            <th class="number">12</th>
            <th>ПМХ-Транспорт</th>
            <th>1</th>
            <th>1</th>
            <th>31</th>
            <th>1 050</th>
            <th>32 550</th>
          </tr>
          <tr>
            <th class="number">13</th>
            <th>ПромСтройМаш</th>
            <th>3</th>
            <th>3</th>
            <th>93</th>
            <th>1 010</th>
            <th>93 930</th>
          </tr>
          <tr>
            <th class="number">14</th>
            <th>Нефтетранспорт/ ТрансОйл</th>
            <th>973</th>
            <th>437</th>
            <th>23 757</th>
            <th>1 245</th>
            <th>19 705 445</th>
          </tr>
          <tr>
            <th class="number">15</th>
            <th>Дулаанвинг</th>
            <th>30</th>
            <th>26</th>
            <th>825</th>
            <th>2 400</th>
            <th>1 980 000</th>
          </tr>
          <tr>
            <th class="number">16</th>
            <th>Тонжлогистик</th>
            <th>123</th>
            <th>116</th>
            <th>3 581</th>
            <th>2 600</th>
            <th>9 310 600</th>
          </tr>
          <tr>
            <th class="number">17</th>
            <th>Итого</th>
            <th>1 905</th>
            <th>1 263</th>
            <th>51 177</th>
            <th>33 155</th>
            <th>82 586 525</th>
          </tr>
        </thead>
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