<template>
  <div>
    <b-modal
      id='railModal'
      size="xl"
      hide-footer
      title="Расчет тарифа"
    >
      <div
        style="max-width: 80% !important;
          overflow: auto;
          position: relative;
          left: 50%;
          transform: translate(-50%, 0);
        "
         
      >
        <table class="table-sm table-bordered">
          <thead>
            <tr>
              <th>название страны</th>
              <th>тип тарифа</th>
              <th>расстояние, которое пойдет в расчет</th>
              <th>транзитное расстояние, если есть</th>
              <th>расстояние по ТРН№4</th>
              <th>стоимость перевозки за все транспортные средства</th>
              <th>НДС на стоимость перевозки</th>
              <th>стоимость перевозки за 1т</th>
              <th>НДС на стоимость перевозки за 1т</th>
              <th>вагон прикрытия</th>
              <th>НДС на вагон прикрытия</th>
              <th>локомотив</th>
              <th>НДС на локомотив</th>
              <th>Вагон-дизель-электростанция</th>
              <th>охрана и договорная охрана</th>
              <th>НДС на охрану</th>
              <th>доп. сборы</th>
              <th>НДС на доп. сборы</th>
              <th>сопровождение</th>
              <th>НДС на сопровождение</th>
              <th>итого без НДС</th>
              <th>итоговая стоимость</th>
              <th>суммарный НДС</th>
              <th>стоимость за 1т</th>
              <th>стоимость за 1т без НДС</th>
              <th>аббревиатура валюты</th>
              <th>код валюты</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>


            </tr>
            <tr v-for="tarif in tariff" :key="tarif.id">
              <td>1{{ tarif.country_name }}</td>
              <td>1{{ tarif.calc_type }}</td>
              <td>1{{ tarif.distance }}</td>
              <td>1{{ tarif.distance_transit }}</td>
              <td>11{{ tarif.distance_real }}</td>
              <td>11{{ tarif.base_price }}</td>
              <td>11{{ tarif.base_price_nds }}</td>
              <td>11{{ tarif.base_pert }}</td>
              <td>11{{ tarif.base_pert_nds }}</td>
              <td>11{{ tarif.buffer_car_price }}</td>
              <td>11{{ tarif.buffer_car_price_nds }}</td>
              <td>11{{ tarif.locomotive_price }}</td>
              <td>11{{ tarif.locomotive_price_nds }}</td>
              <td>11{{ tarif.wagon_diesel_el_price }}</td>
              <td>11{{ tarif.guard_price }}</td>
              <td>11{{ tarif.guard_price_nds }}</td>
              <td>11{{ tarif.add_dues }}</td>
              <td>11{{ tarif.add_dues_nds }}</td>
              <td>11{{ tarif.sopr_price }}</td>
              <td>11{{ tarif.sopr_cost_nds }}</td>
              <td>11{{ tarif.total_cost_wo_nds }}</td>
              <td>11{{ tarif.total_price }}</td>
              <td>11{{ tarif.nds }}</td>
              <td>11{{ tarif.pert }}</td>
              <td>11{{ tarif.pert_wo_nds }}</td>
              <td>11{{ tarif.abbr }}</td>
              <td>11{{ tarif.currency_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="button Delete" style="width: 10%; float: right; margin-top: 3%; margin-right: 10%;" variant="outline-danger"  block @click="$bvModal.hide('railModal')">Закрыть</button>

    </b-modal>

  </div>
</template>
 <script>
export default {
  name: "ModalRalTariff",
  props: ["tariff"],

};
</script>

<style>
table{
  background: white;
}
th{
  /* min-width: 150px !important;
  max-width: 150px; */
  max-height: 85px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
}
</style>


