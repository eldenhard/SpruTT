<template>
  <div>
    <div class="month_block">
      <label for="">
        Месяц <br />
        <input type="month" class="textarea" v-model="month" />
      </label>
      <button class="Accept button" @click="getDayOnMonth()">Загрузить</button>
    </div>


    <table border="1" style="margin-top: 3%;">
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
        <template v-for="item in data">
          <tr v-for="keyed in Object.keys(item)" :key="keyed.id">
            <td class="col1">{{ keyed.toLowerCase() }}</td>
          </tr>
        </template>
        <tr  v-for="val in Object.values(item)" :key="val.id">
            <td>{{ val }}</td>
        </tr>
      </tbody>

    </table>

  </div>
</template>


<script>
import fin_counterpartie from '@/helpers/fin_counterpartie';
export default {
  data() {
    return {
      month: "",
      num: "",
      send_data: "",
      data: fin_counterpartie,

    };
  },

  methods: {
    isWeekend(data) {
      if (data == 'ВС' || data == 'СБ') {
        return true
      } return false
    },
    getDayOnMonth() {
      let arr = this.month.split('-')
      let lastday = new Date(arr[0], arr[1], 0)
      this.num = lastday.getDate()

      let num = lastday.getDate()
      let array = []
      for (let i = 1; i <= num; i++) {
        if (i <= 9) {
          array.push(`${this.month}-0${i}`)
        } else {
          array.push(`${this.month}-${i}`)
        }

      }
      let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
      let data = array.map(item => {
        return new Date(item)
      })
      let send_data = data.map(item => {
        return days[item.getDay()]
      })
      this.send_data = send_data
    }
  },



};
</script>

<style lang="scss" scoped>
.col1 {
  background: rgb(243, 243, 243);
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-weight: 400;
}

.month_block {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;


  button {
    width: 25%
  }
}

th {
  font-weight: 400 !important;
  font-size: 13px !important;
}

.weekend {
  color: #F18A46;
}</style>