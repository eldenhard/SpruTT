<template>
  <div>
    <!--  -->
    <b-modal
      id="bv-modal-example"
      size="xl"
      hide-footer
      style="width: 100% !important"
    >
      <div
        style="
          max-width: 50% !important;
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
            <tr v-for="tarif in tariff" :key="tarif.id">
              <td>{{ tarif.country_name }}</td>
              <td>{{ tarif.calc_type }}</td>
              <td>{{ tarif.distance }}</td>
              <td>{{ tarif.distance_transit }}</td>
              <td>{{ tarif.distance_real }}</td>
              <td>{{ tarif.base_price }}</td>
              <td>{{ tarif.base_price_nds }}</td>
              <td>{{ tarif.base_pert }}</td>
              <td>{{ tarif.base_pert_nds }}</td>
              <td>{{ tarif.buffer_car_price }}</td>
              <td>{{ tarif.buffer_car_price_nds }}</td>
              <td>{{ tarif.locomotive_price }}</td>
              <td>{{ tarif.locomotive_price_nds }}</td>
              <td>{{ tarif.wagon_diesel_el_price }}</td>
              <td>{{ tarif.guard_price }}</td>
              <td>{{ tarif.guard_price_nds }}</td>
              <td>{{ tarif.add_dues }}</td>
              <td>{{ tarif.add_dues_nds }}</td>
              <td>{{ tarif.sopr_price }}</td>
              <td>{{ tarif.sopr_cost_nds }}</td>
              <td>{{ tarif.total_cost_wo_nds }}</td>
              <td>{{ tarif.total_price }}</td>
              <td>{{ tarif.nds }}</td>
              <td>{{ tarif.pert }}</td>
              <td>{{ tarif.pert_wo_nds }}</td>
              <td>{{ tarif.abbr }}</td>
              <td>{{ tarif.currency_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-button
        class="mt-3"
        variant="outline-danger"
        block
        @click="$bvModal.hide('bv-modal-example')"
        >Close Me</b-button
      >
    </b-modal>
  </div>
</template>
 <script>
export default {
  name: "ModalRalTariff",
  props: ["tariff"],

};
</script>


<style scoped>
#bv-modal-example___BV_modal_content_,
#bv-modal-example {
  width: 100% !important;
  height: 50vh !important;
  margin: 0;
  padding: 0;
}
</style>