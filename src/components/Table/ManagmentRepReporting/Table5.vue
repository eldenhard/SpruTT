<template>
  <div>
    <table class="table">
      <thead>
        <th>Дорога погрузки</th>
        <th>Клиент</th>
        <th>Дорога выгрузки</th>
      </thead>
      <template v-for="obj in objects">

        <tr :key="obj.id">
          <td :rowspan="getRowCount(obj)">{{ obj.road }}</td>
          <td :rowspan="obj.attr1[0].attr3.length">{{ obj.attr1[0].attr2 }}</td>
          <td>{{ obj.attr1[0].attr3[0] }}</td>
          <td>{{ obj.attr1[0].attr4[0] }}</td>
        </tr>

        <tr v-for="val2 in obj.attr1[0].attr3.slice(1) " :key="val2.id">
          <td>{{ val2 }}</td>
          <template  v-for="val3 in obj.attr1[0].attr4.slice(1) " >
            <td :key="val3.id">{{ val3 }}</td>
          </template>
        </tr>

        <template v-for="subkey in obj.attr1.slice(1)">
          <tr :key="subkey.id">
            <td :rowspan="subkey.attr3.length">{{ subkey.attr2 }}</td>
            <td>{{ subkey.attr3[0] }}</td>
            <td>{{ subkey.attr4[0] }}</td>
          </tr>

          <tr v-for="value3 in subkey.attr3.slice(1)" :key="value3.id">
            <td>{{ value3 }}</td>
                <template v-for="value4 in subkey.attr4.slice(1)" >
                    <td :key="value4.id">{{ value4 }}</td>
                </template>
          </tr>

        </template>
      </template>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      first: [],
      second: [],
      objects: [
        {
          road: "Дорога_1",
          attr1: [
            {
              attr2: "Клиент_1",
              attr3: ["a", "b", "c"],
              attr4: ["1", "2", "3"],
            },
            {
              attr2: "Клиент_2",
              attr3: ["d", "e"],
              attr4: ["4", "5"],

            },
          ],
        },
        {
          road: "Дорога_2",
          attr1: [
            {
              attr2: "Клиент_3",
              attr3: ["f", "s", "a"],
              attr4: ["6", "7", "8"],

            },
            {
              attr2: "Клиент_4",
              attr3: ["g", "h"],
              attr4: ["9", "10"],

            },
          ],
        },
      ],
    };
  },
  methods: {
    getRowCount(obj) {
      let total = 0;
      obj.attr1.forEach((item) => {
        total += item.attr3.length;
      });
      return total;
    },
  },
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table > tbody > tr > td,
table > tbody > tr > td.inner > div {
  vertical-align: top;
  border: 1px solid #ddd;
}
table > tbody > tr > td.inner {
  padding: 0;
  border-right: 0;
}
table > tbody > tr > td.inner > div {
  padding: 5px;
  border-width: 0 0 1px 0;
}
table > tbody > tr > td.inner > div:last-child {
  border: 0;
}
table > tbody > tr > td.inner > table {
  margin-bottom: 0;
}
table > tbody > tr > td.inner > table td {
  border-width: 0 1px 1px 0;
}
table > tbody > tr > td.inner > table tr:last-child td {
  border-bottom: 0;
}
table > tbody > tr > td.inner > div {
  border-right: 0;
}
</style>