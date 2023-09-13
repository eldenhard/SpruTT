<template>
    <div>
        <Loader :loader="loader" />
        <div style="display: flex; justify-content: space-between;">
            <div>
                <label for="tenant" style="color: grey">Поля таблицы
                    <MultiSelectUni @change="updateSelectedCountries" :placeholder="'Поля таблицы'" :variants="CountrieObj"
                        :variant-title="'value'">
                    </MultiSelectUni>
                </label>

            </div>
            <div class="filter_block">
                <label for="">№ вагонов<br>
                    <input class="textarea" v-model="wagon_in">
                </label>
                <div style="display: flex; justify-content: space-between; gap: 2%">
                    <label for="">Дата начала<br>
                        <input type="datetime-local" v-model="date_begin" class="textarea">
                    </label>
                    <label for="">Дата конца<br>
                        <input type="datetime-local" v-model="date_end" class="textarea">
                    </label>
                </div>

                <br>
                <button @click="getData()" class="button Request">Запросить</button>
            </div>

        </div>
        <div style="display: flex; justify-content: start; flex-wrap: wrap;">
            <p style="padding-left: 1%;">Выбранные поля :</p> <br>
            <!-- <template v-if="selectedCountries"> -->
            <template>

                <span class="option_select_block_check" v-for="countrie in selectedCountries" :key="countrie.id"
                    @click="removeselectedCountries(countrie.id)">
                    <span style="color: black; font-size: 15px"> &#43;</span>
                    {{ countrie.value }}
                </span>
            </template>
        </div>
        <div style="overflow: auto">
            <table>
                <thead>
                    <tr>
                        <th v-for="countrie in selectedCountries" :key="countrie.id">{{ countrie.value }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="no_data">
                        <td colspan="15">
                            <h2>Нет данных</h2>
                        </td>
                    </tr>
                    <tr v-for="item in dislocation" :key="item.id">
                        <td v-for="countrie in selectedCountries" :key="countrie.id">
                            {{ item[countrie.valen] }}
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />
    </div>
</template>

<script>
import api from "@/api/wagonPark";
import Loader from '../../../loader/loader.vue';
import Notifications from "@/components/notifications/Notifications.vue";
import MultiSelectUni from '@/components/ui/MultiSelectUni.vue'

export default {
    components: { Loader, Notifications, MultiSelectUni },
    data() {
        return {
            wagon_in: "",
            date_begin: "",
            date_end: "",
            loader: false,
            dislocation: "",
            no_data: false,
            thTable: "",
            selectedCountriesIds: [],
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },
    computed: {
        CountrieObj() { //1
            const result = [
                { value: 'Дата последнего планового ремонта', id: 1, valen: 'last_plan_repair_date' },
                { value: 'Пробег фактический', id: 2, valen: 'run_fact' },
                { value: 'Текущее задание. Клиент', id: 3, valen: 'current_task_client' },
                { value: 'Квитанция', id: 4, valen: 'receipt' },
                { value: 'Инвойс', id: 5, valen: 'invoice' },
                { value: 'Вагон', id: 6, valen: 'wagon' },
                { value: 'Тип', id: 7, valen: 'wagon_type' },
                { value: 'Дата и время последней операции', id: 8, valen: 'last_operation_datetime' },
                { value: 'Дата прибытия на станцию дислокации', id: 9, valen: 'current_station_arrival' },
                { value: 'Операция', id: 10, valen: 'operation' },
                { value: 'Станция отправления', id: 11, valen: 'departure_station' },
                { value: 'Станция текущей дислокации', id: 12, valen: 'current_station' },
                { value: 'Станция назначения', id: 13, valen: 'destination_station' },
                { value: 'Простой на станции дислокации', id: 14, valen: 'current_station_downtime' },
                { value: 'Простой от последней операции', id: 15, valen: 'last_operation_downtime' },
                { value: 'Простой после оформления', id: 16, valen: 'documents_registration_downtime' },
                { value: 'Расстояние осталось (от текущей дислокации)', id: 17, valen: 'distance_left_from_current_dislocation' },
                { value: 'Расстояние осталось (от текущей дислокации)', id: 18, valen: 'distance_all_from_departure_station' },
                { value: 'Груз', id: 19, valen: 'cargo' },
                { value: 'Индекс поезда', id: 20, valen: 'train_index' },
                { value: 'Груж/порож', id: 21, valen: 'is_loaded' },
                { value: 'Вес', id: 22, valen: 'weight' },
                { value: 'Государтсво текущей дислокации', id: 23, valen: 'current_country' },
                { value: 'Бросание', id: 24, valen: 'drop' },
                { value: 'Полигон обращения', id: 25, valen: 'polygon' },
                { value: 'Дата погрузки', id: 26, valen: 'loading_date' },
                { value: 'Расчетная дата прибытия', id: 27, valen: 'calc_arrival_date' },
                { value: 'Дата и время отправления', id: 28, valen: 'arrival_date' },
                { value: 'Прибытие на станцию назначения', id: 29, valen: 'destination_station_arrival' },
                { value: 'Дата прибытия на станцию отправления', id: 30, valen: 'departure_station_arrival' }
            ]

            result.sort((a, b) => {
                const valueA = a.value.toLowerCase();
                const valueB = b.value.toLowerCase();
                return valueA.localeCompare(valueB); // Сравнение строк с учетом регистра
            });

            return result;
        },
        selectedCountries() { //2
            return this.CountrieObj.filter(el => this.selectedCountriesIds.includes(el.id))
        },
    },
    methods: {
        updateSelectedCountries(selected) {
            this.selectedCountriesIds = selected
        },
        removeselectedCountries(id) {
            this.selectedCountriesIds.splice(this.selectedCountriesIds.indexOf(id), 1)
        },
        getData() {
            if (this.wagon_in == null || this.wagon_in == "") {
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Укажите данные вагонов";
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3500);
                return
            }
            this.loader = true
            this.no_data = false
            let str = this.wagon_in.replace(/[^0-9]/g, "")
            let arr = str.match(/.{1,8}/g)
            api.getDislocation(arr, this.date_begin, this.date_end)
                .then(response => {
                    this.loader = false
                    this.dislocation = response.data
                   
                    this.dislocation.sort((a, b) => {
                        const wagonTypeA = a.wagon_type.toLowerCase();
                        const wagonTypeB = b.wagon_type.toLowerCase();
                        return wagonTypeA.localeCompare(wagonTypeB);
                    });

                    if (this.dislocation.length == 0) {
                        this.no_data = true
                    }

                }).catch((error) => {
                    this.loader = false
                })
        }
    },
    filters: {
        loaded(value) {
            return value == true ? 'Груж' : 'Порож'
        },
        formatdate(value) {
            if (value == null) {
                return value
            }
            let new_str = value.indexOf('T')
            return value = value.substr(0, new_str).split('-').reverse().join('.')
        }
    }
}
</script>

<style lang="scss" scoped>
.filter_block {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    width: 30%;
    border: none;

    input {
        width: 100%;
    }

    textarea {
        width: 100%;
    }

    label {
        color: grey;
    }
}

td {
    padding: 10px;
    white-space: nowrap;
}

th {
    padding: 10px;
}
</style>