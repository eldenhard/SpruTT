<template>
  <div style="display: flex; flex-direction: column; ">
    <div class="btn-group">
      <label for="dateStart" :class="{ Error: is_error_start }"
        >Начало периода
        <br />
        <input type="date" id="dateStart" v-model="date_begin" min="2022-01-01" />
      </label>

      <label for="dateEnd" :class="{ Error: is_error_end }"
        >Конец периода
        <br />
        <input type="date" id="dateEnd" v-model="date_end" min="2022-01-01"/>
      </label>
    </div>
<slot></slot>
    <button class="button Request" @click="getData()">Загрузить данные</button>
  </div>
</template>

<script>

export default {
    props: ['func1'],
  data() {
    return {
      date_begin: "",
      date_end: "",
      is_error_start: false,
      is_error_end: false,
    };
  },
  watch: {
    date_begin() {
      return this.date_begin == ""
        ? (this.is_error_start = true)
        : (this.is_error_start = false);
    },
    date_end() {
      return this.date_end == ""
        ? (this.is_error_end = true)
        : (this.is_error_end = false);
    },
  },
  methods: {
    getData() {
      if (this.date_begin == "") {
        this.is_error_start = true;
      } if (this.date_end == "") {
        this.is_error_end = true;
      } else {
        let date_beginTime = String(this.date_begin + ' 00:00:00')
        let date_endTime = String(this.date_end + ' 23:59:59')
        this.$emit('data', {
            date_begin: date_beginTime,
            date_end: date_endTime,
        })
        this.$emit('Action')
      }
    },
  },
};
</script>

<style scoped>
input{
  width: 100%
}
.Error {
  color: rgb(247, 0, 0);
}
.Request {
  width: 108%;

}
.btn-group {
  /* width: 25%; */
  /* display: flex; */
  gap: 8%;
  /* justify-content: end; */
}
label {
  color: grey;
}
</style>