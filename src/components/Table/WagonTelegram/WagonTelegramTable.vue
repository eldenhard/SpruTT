
<template>
    <div style="margin-top: 5%">
      <b-form-group label="Настройки таблицы" label-cols-lg="2" v-slot="{ ariaDescribedby }">
        <b-form-checkbox v-model="striped" :aria-describedby="ariaDescribedby" inline>Полосы</b-form-checkbox>
        <b-form-checkbox v-model="bordered" :aria-describedby="ariaDescribedby" inline>Границы</b-form-checkbox>
        <b-form-checkbox v-model="borderless" :aria-describedby="ariaDescribedby" inline>Без границ</b-form-checkbox>
        <b-form-checkbox v-model="fixed" :aria-describedby="ariaDescribedby" inline>Фикс.шапку</b-form-checkbox>
        <b-form-checkbox v-model="footClone" :aria-describedby="ariaDescribedby" inline>Копировать шапку</b-form-checkbox>
      </b-form-group>
  
      <b-form-group label="Оформление шапки таблицы" label-cols-lg="2" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          v-model="headVariant"
          :aria-describedby="ariaDescribedby"
          class="mt-lg-2"
        >
          <b-form-radio :value="null" inline>Нет</b-form-radio>
          <b-form-radio value="light" inline>Светлый</b-form-radio>
          <b-form-radio value="dark" inline>Темный</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
  
  
      <b-table
        :striped="striped"
        :bordered="bordered"
        :borderless="borderless"
        :fixed="fixed"
        :foot-clone="footClone"
        :items="items"
        :fields="fields"
        :head-variant="headVariant"
      ></b-table>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
            fields: ['Груж/Порож', '№ договора', 'Ст.отправ', 'Ст.назнач', 'Грузоотправитель', 'Грузополучатель', 'Код груза', 'Тип вагона', 'Действие'],
          items: [
            { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
            { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
            { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
          ],

          striped: false,
          bordered: false,
          borderless: false,
          outlined: false,
          small: false,
          hover: false,
          dark: false,
          fixed: false,
          footClone: false,
          headVariant: null,
          tableVariant: '',
          noCollapse: false
        }
      }
    }
  </script>