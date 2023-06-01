<template>
  <div style="margin: 0 !important">
    <button class="button Accept" @click="postData(Standard)">
      Отправить данные
    </button>

    <table border="1">
      <thead>
        <tr>
          <th>Договор</th>
          <th>Дата договоренности</th>
          <th>Актуальность</th>
          <th>ДС</th>
          <th>Примечание</th>
          <th>Норматив на погрузке, дн</th>
          <th>Норматив по выгрузке, дн</th>
          <th>Штраф на погрузке, руб</th>
          <th>Штраф по выгрузке, руб</th>
          <th>Примечание по расчету</th>
          <th>Клиент</th>
          <th>Тип вагона</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in Standard" :key="item.id">
          <td><input type="text" v-model="item.agreement" /></td>
          <td><input type="date" v-model="item.agreement_date" /></td>
          <td>
            <select v-model="item.is_actual">
              <option :value="true">Да</option>
              <option :value="false">Нет</option>
            </select>
          </td>
          <td><input type="text" v-model="item.agreement_addictions" /></td>
          <td><input type="text" v-model="item.note" /></td>
          <td><input type="text" v-model="item.standard_loading" /></td>
          <td><input type="text" v-model="item.standard_unloading" /></td>
          <td><input type="text" v-model="item.penalty_loading" /></td>
          <td><input type="text" v-model="item.penalty_unloading" /></td>
          <td><input type="text" v-model="item.note_calc" /></td>
          <td><input type="text" v-model="item.client" /></td>
          <td>
            <select v-model="item.wagon_type">
              <option :value="'Полувагон'">ПВ</option>
              <option :value="'Цистерна'">ЦС</option>
            </select>
            <button class="add_row" @click="PlusCount()" v-if="index + 1 == rows">
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/api/directory";
export default {
  name: "StandartData",
  data() {
    return {
      rows: 1,

      Standard: [
        {
          agreement: "",
          agreement_date: "",
          is_actual: true,
          agreement_addictions: "",
          note: "",
          standard_loading: "",
          standard_unloading: "",
          penalty_loading: "",
          penalty_unloading: "",
          note_calc: "",
          client: "",
          wagon_type: "",
        }
      ],
    }
  },

  methods: {
    async postData(arr) {
      for (let i of arr) {
        await api.postPenaltyStandards(i)
        .then(response => {
           console.log(response)
        }).catch(error => {
          console.log(error)
        })
      }

    },

    PlusCount() {
      this.Standard.push({
        agreement: "",
        agreement_date: "",
        is_actual: true,
        agreement_addictions: "",
        note: "",
        standard_loading: "",
        standard_unloading: "",
        penalty_loading: "",
        penalty_unloading: "",
        note_calc: "",
        client: "",
        wagon_type: "",
      });
      this.rows = this.Standard.length;
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  width: 5em;
  height: auto;
  padding: 0;
  background: url(data:image/png;base64,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) no-repeat right 0.8em center/1.4em,
    linear-gradient(to left,
      rgba(255, 255, 255, 0.3) 3em,
      rgba(255, 255, 255, 0.2) 3em);
  color: #000000;
  border: none;
  cursor: pointer;
}

.Accept {
  width: 20%;
  margin-left: auto;
}

table {
  margin-top: 2%;
}

th {
  font-size: 14px !important;
}

tr {
  width: 500px;
}

td {
  max-width: 200px;
  // font-size: 12px;
}

input {
  width: 100%;
}

td:nth-last-child(1) {
  position: relative;
}

.add_row {
  border-radius: 10px;
  height: 2px !important;
  width: 10px !important;
  position: absolute;
  right: -20px;
  bottom: -10px;
  background: lightblue;
  color: black;
}

.add_row:hover {
  background: rgb(118, 149, 160);
}
</style>