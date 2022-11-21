<template>
    <div>
        <div class="filterStaff" style="width: 100% !important">
            <div style="display:flex; flex-direction:column;">
                <div class='bg'>
                    <input class='textarea' id='input-filter-staff1' name='Pwd' v-model="filter_directory.search"
                        @change="updateFilterDataDirectory" />
                    <br>
                    <label for='input-filter-staff1' class='label'>Данные компании</label>
                </div>
                <!-- <label for="input_filter_staff1">Данные компании</label>
    <input type="text" id="input-filter-staff1"
      class="input_filter_staff"
      placeholder="введите наименование"
      v-model="filter_directory.search"
      @change="updateFilterDataDirectory"
      style="margin-top: -1px" -->


            </div>
            <div style="display:flex; flex-direction:column;">
                <div class='bg'>
                    <select class='textarea' id='input-filter-staff2' name='Pwd' v-model="filter_directory.group"
                        @change="updateFilterDataDirectory">
                        <option value="all">Все</option>
                    <option value="agent">Агенты</option>
                    <option value="renter">Арендодатель</option>
                    <option value="rail_tariff_supplier">Поставщики ЖД тарифа</option>
                    <option value="product_supplier">Поставщики товаров</option>
                    <option value="service_supplier">Поставщики услуг и МПЗ</option>
                    <option value="client">Клиенты</option>
                    <option value="tenant">Арендатор</option>
                    <option value="retail">Розничные</option>
                    <option value="bank">Банки</option>
                    <option value="depot">Депо</option>
                    <option value="our_firm">Наши фирмы</option>
                    <option value="individual">Физические лица</option>
                    <option value="other">Прочие</option>
                    <option value="branch">Филиалы</option>
                    <option value="specific">Специфические</option>
                    <option value="budget">Бюджет</option>
                    <option value="extra_budgetary_fond">Внебюджетные фонды</option>
                    <option value="founder">Учредители</option>
                    <option value="consignee">Грузополучатели</option>
                    <option value="warehouse_or_terminal">Склады и терминалы</option>
                    <option value="new_counterparty_by_edo">Новые контрагенты по ЭДО</option>
                    <option value="edo_operator">Операторы ЭДО</option>
                    <option value="court">Суды</option>
                    <option value="potential_customer">Потенциальные клиенты</option>
                    <option value="new_counterparty">Новый контрагент</option>
                    <option value="employee">Сотрудники</option>
                    <option value="archive">Архив</option>
                    <option value="deleted">Удаленные</option>
                    </select>
                    <br>
                    <label for='input-filter-staff2' class='label'>Тип контрагента</label>
                </div>
<!-- 
                <label for="input_filter_staff2" class="all-label">Тип контрагента</label>
                <select class="input_filter_wagon_dislocation" id="input_filter_staff2" style="cursor: pointer;"
                    v-model="filter_directory.group" @change="updateFilterDataDirectory">


                    <option value="all">Все</option>
                    <option value="agent">Агенты</option>
                    <option value="renter">Арендодатель</option>
                    <option value="rail_tariff_supplier">Поставщики ЖД тарифа</option>
                    <option value="product_supplier">Поставщики товаров</option>
                    <option value="service_supplier">Поставщики услуг и МПЗ</option>
                    <option value="client">Клиенты</option>
                    <option value="tenant">Арендатор</option>
                    <option value="retail">Розничные</option>
                    <option value="bank">Банки</option>
                    <option value="depot">Депо</option>
                    <option value="our_firm">Наши фирмы</option>
                    <option value="individual">Физические лица</option>
                    <option value="other">Прочие</option>
                    <option value="branch">Филиалы</option>
                    <option value="specific">Специфические</option>
                    <option value="budget">Бюджет</option>
                    <option value="extra_budgetary_fond">Внебюджетные фонды</option>
                    <option value="founder">Учредители</option>
                    <option value="consignee">Грузополучатели</option>
                    <option value="warehouse_or_terminal">Склады и терминалы</option>
                    <option value="new_counterparty_by_edo">Новые контрагенты по ЭДО</option>
                    <option value="edo_operator">Операторы ЭДО</option>
                    <option value="court">Суды</option>
                    <option value="potential_customer">Потенциальные клиенты</option>
                    <option value="new_counterparty">Новый контрагент</option>
                    <option value="employee">Сотрудники</option>
                    <option value="archive">Архив</option>
                    <option value="deleted">Удаленные</option>

                </select> -->
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'FilterAbadon',
    data() {
        return {
            filter_directory: {
                search: '',
                group: '',
            },
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
    methods: {
        updateFilterDataDirectory() {
            this.$emit('updateFilterDataDirectory', this.filter_directory)
        }
    },


}
</script>


<style>
.input_filter_staff {
    width: 50% !important;
    height: 30px;
    background: transparent !important;
}

.filterStaff {
    width: 100% !important;
    display: flex;
    justify-content: space-around;
    /* border-radius: 50px; */
    background: #EFEFEF !important;
    box-shadow: 20px 20px 60px #cecece,
        -20px -20px 60px #f2f2f2;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 1% 0;

}
</style>