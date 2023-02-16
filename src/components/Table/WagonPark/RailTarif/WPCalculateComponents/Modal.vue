<template>
  <div>
    <b-modal id="bv-modal-example" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
       <table>
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
       </table>
        <!-- country_name: str, # название страны
                calc_type: int, # тип тарифа
                distance: float, # расстояние, которое пойдет в расчет
                distance_transit: float, # транзитное расстояние, если есть
                distance_real: float, # расстояние по ТРН№4
                base_price: float, # стоимость перевозки за все транспортные средства
                base_price_nds: float, # НДС на стоимость перевозки
                base_pert: float, # стоимость перевозки за 1т
                base_pert_nds: float, # НДС на стоимость перевозки за 1т
                buffer_car_price: float, # вагон прикрытия
                buffer_car_price_nds: float, # НДС на вагон прикрытия
                locomotive_price: float, # локомотив 
                locomotive_price_nds: float, # НДС на локомотив
                wagon_diesel_el_price: float, # Вагон-дизель-электростанция
                guard_price: float, # охрана и договорная охрана
                guard_price_nds: float, # НДС на охрану
                add_dues: float, # доп. сборы
                add_dues_nds: float, # НДС на доп. сборы
                sopr_price: float, # сопровождение
                sopr_cost_nds: float, # НДС на сопровождение
                total_cost_wo_nds: float, # итого без НДС
                total_price: float, # итоговая стоимость
                nds: float, # суммарный НДС
                pert: float, # стоимость за 1т
                pert_wo_nds: float, # стоимость за 1т без НДС
                abbr: float, # аббревиатура валюты
                currency_id: float # код валюты -->
      </div>
      <b-button class="mt-3" variant="outline-danger" block  @click="$bvModal.hide('bv-modal-example')"
        >Close Me</b-button
      >

    </b-modal>
  </div>
</template>
 <script>
  export default {
    name: 'ModalRalTariff',
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    }
  }
</script>