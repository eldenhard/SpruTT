<template>
  <div>
    <p>Форма 4.8 "Производство по универсальным перевозкам (собственный парк)"</p>

    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData">

    </Periods>
    <br>
    <div id="TableReport8"></div>
  </div>
</template>

<script>
import api from "@/api/reportUO";
import Periods from "./Periods.vue";
import Loader from "@/components/loader/loader.vue";
import jsonData from '@/components/Table/ManagmentRepReporting/f8.json';
export default {
  components: { Periods, Loader },
  data() {
    return {
      jsonData,
      dataReport8: "",
      loader: false,
      date_begin: "",
      date_end: "",
    }
  },
  mounted() {
    console.log(this.jsonData)
  },
  updated() {
    this.processTables();
  },
  methods: {
    Actioned() {
      // this.loader = true;
      // api
      //   .getUO48(this.date_begin, this.date_end, this.wag_type)
      //   .then((response) => {
      //     this.loader = false;
      //     this.dataReport8 = response.data;
          this.OpenChildren(document.getElementById('TableReport8'), this.jsonData)

        // })
        // .catch((error) => {
        //   console.log(error);
        //   this.loader = false;
        // });
    },
    getCurrentData(data) {
      this.date_begin = data.date_begin;
      this.date_end = data.date_end;
    },
    Translate(val) {
      switch (val) {
        case 'null':
          return 'Не определено'
          break
        case 'wagon':
          return 'Вагоны'
          break
        case 'penalties':
          return 'Штрафы'
          break
        case 'expedition':
          return 'Экспедирование'
          break
        case 'tariff_inroad':
          return 'Тариф СТ'
          break
        case 'tariff_empty':
          return 'Тариф порож'
          break
        case 'tariff_loaded':
          return 'Тариф груж'
          break
        case 'prepare':
          return 'Подготовка'
          break
        case 'pps':
          return 'ППС'
          break
        case 'travel_time':
          return 'Время в пути'
          break
        case 'income':
          return 'Доход'
          break
        case 'stavka_rub_wagons':
          return 'Ставка за вагон, руб.'
          break
        case 'oborot':
          return 'Оборот'
          break


        case 'amount':
          return 'Количество'
          break
        case 'cost':
          return 'Сумма'
          break
        case 'weight':
          return 'Вес'
          break
        case 'stavka_per_ton':
          return 'Ставка за тонну'
          break
        case 'revenue':
          return 'Доход'
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
    TEST(obj) {
      let arr = []
      for (let i in obj) {

        arr.push([i, obj[i]])
      }

      arr.sort(function (a, b) {
        if (Array.isArray(a[1])) {
          return 1
        }
        if (Array.isArray(b[1])) {
          return -1
        }
        if (Array.isArray(a[1]) && Array.isArray(b[1])) {
          return 0
        }
        if (typeof a[1] < typeof b[1]) {
          return 1
        }
        if (typeof a[1] > typeof b[1]) {
          return -1
        }
        return 0;
      });
      return arr
    },


  OpenChildren(eventDiv = null, val) {
  let collapse = "+";
  let val_copy = this.TEST(val);
  let hr = null;
  let resultName = eventDiv.innerHTML;
  // Проверяем наличие класса, указывающего на раскрытие
  let isOpened = eventDiv.classList.contains('opened');

  // Удаляем дочерние элементы, если вложенность уже раскрыта
  if (isOpened) {
    eventDiv.classList.remove('opened');
    while (eventDiv.childNodes.length > 1) {
      eventDiv.removeChild(eventDiv.lastChild);
    }
    return;
  }

  // Создаем таблицу
  let thead = [];
  let tbody = [];

  for (let i in val_copy) {
    let key = val_copy[i][0];
    let value = val_copy[i][1];

    if (typeof value == 'number' || typeof value == 'string' || Array.isArray(value)) {
      hr = null;
      let name = this.Translate(key);
      let value123 = Array.isArray(value)
        ? this.FilterValue(value.reduce((acc, item) => acc + item)?.toFixed(2))
        : this.FilterValue(value?.toFixed(2));

      thead.push(name);
      tbody.push(value123);
    } else {
      let div = document.createElement('div');
      div.innerHTML = `${this.Translate(key)} ${collapse}`;
      div.style = 'padding-left: 2% !important; font-weight: 500; color: darkblue; border: 1px solid lightgrey; padding: 1%;';

      div.addEventListener('click', (event) => {
        event.stopPropagation();
        this.OpenChildren(div, value);
      });

      eventDiv.appendChild(div);
    }
  }

  if (thead.length > 0 && tbody.length > 0) {
    let div = document.createElement('div');
    div.innerHTML = `
      <span style="margin: 0 1%; font-size: 20px">${resultName != "" ? `Итого ${resultName.slice(0, -1)}` : 'Общий итог'}</span>
      <table>
        <thead>
          <tr>
            ${thead.map((header, ind) => `<th style="white-space: nowrap; background: white">${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${tbody.map(value => `<td style="white-space: nowrap; background: white">${value}</td>`).join('')}
          </tr>
        </tbody>
      </table>
    `;
    div.style = 'font-weight: 500; color: black; padding: 1% 0; background: #dddddd;';

    // Добавляем класс, указывающий на раскрытие
    eventDiv.classList.add('opened');
    this.$nextTick(() => eventDiv.innerHTML.split('<')[0].slice(0, -1))

    eventDiv.appendChild(div);
  }
},

    async processTables() {
      // Дождитесь, пока данные полностью накопятся
      await this.$nextTick();

      let childTables = this.$el.querySelectorAll('table');
      let tablesArray = Array.from(childTables);
      let uniqueTables = new Set();

      // Функция для получения строки из таблицы
      const getTableString = (table) => {
        let tableString = '';
        table.querySelectorAll('tr').forEach(row => {
          row.querySelectorAll('th, td').forEach(cell => {
            tableString += cell.textContent.trim();
          });
        });
        return tableString;
      };

      // Удалить повторяющиеся таблицы
      tablesArray.forEach((table, index) => {
        let tableString = getTableString(table);
        if (!uniqueTables.has(tableString)) {
          uniqueTables.add(tableString);
        } else {
          table.parentElement.removeChild(table);
        }
      });
    },





  }
}
</script>

<style scoped>
.total {
  background: #FDFFD9;
}

.total_2 {
  background: #DDFACE;
}

tr:hover {
  background: rgb(236, 236, 236);
}

.itogo {
  font-weight: bold;
  border-right: none !important;

}

.all_total {
  background: #EAF1DD;
}

/* .last:nth-last-of-type(3n) {
   border-bottom: 2px solid rgb(0, 0, 0) !important
} */
.total_row {
  background: #DAEEF3;
}

td,
th {
  border: 1px solid rgb(102, 102, 102) !important;
  color: black !important;
}

.all_total {
  background: #EAF1DD;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table>tbody>tr>td,
table>tbody>tr>td.inner>div {
  vertical-align: top;
  border: 1px solid #ddd;
}

table>tbody>tr>td.inner {
  padding: 0;
  border-right: 0;
}

table>tbody>tr>td.inner>div {
  padding: 5px;
  border-width: 0 0 1px 0;
}

table>tbody>tr>td.inner>div:last-child {
  border: 0;
}

table>tbody>tr>td.inner>table {
  margin-bottom: 0;
}

table>tbody>tr>td.inner>table td {
  border-width: 0 1px 1px 0;
}

table>tbody>tr>td.inner>table tr:last-child td {
  border-bottom: 0;
}

table>tbody>tr>td.inner>div {
  border-right: 0;
}

thead>th {
  border: 1px solid black;
}
</style>