<template>
    <div>
        <Loader :loader="loader" />
        <div class="filter_block">
            <label for="">№ вагонов<br>
                <input class="textarea" v-model="wagon_in">
            </label>
            <label for="">Дата <br>
                <input type="date" v-model="on_date" class="textarea">
            </label>
            <button @click="getData()" class="button Request">Запросить</button>
        </div>
        <div style="overflow: auto">
            <table>
                <thead>
                    <tr>
                        <th>Дата последнего планового ремонта</th>
                        <th>Пробег фактический</th>
                        <th>Текущее задание. Клиент</th>
                        <th>Квитанция</th>
                        <th>Инвойс</th>
                        <th>Вагон</th>
                        <th>Дата и время последней операции</th>
                        <th>Дата прибытия на станцию дислокации</th>
                        <th>Операция</th>
                        <th>Станция отправления</th>
                        <th>Станция текущей дислокации</th>
                        <th>Станция назначения</th>
                        <th>Простой на станции дислокации</th>
                        <th>Простой от последней операции</th>
                        <th>Простой после оформления</th>
                        <th>Расстояние осталось (от текущей дислокации)</th>
                        <th>Расстояние осталось (от текущей дислокации)</th>
                        <th>Груз</th>
                        <th>Индекс поезда</th>
                        <th>Груж/порож</th>
                        <th>Вес</th>
                        <th>Государтсво текущей дислокации</th>
                        <th>Бросание</th>
                        <th>Полигон обращения</th>
                        <th>Дата погрузки</th>
                        <th>Расчетная дата прибытия</th>
                        <th>Дата и время отправления</th>
                        <th>Прибытие на станцию назначения</th>
                        <th>Дата прибытия на станцию отправления</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="no_data">
                        <td colspan="15"><h2>Нет данных</h2></td>
                    </tr>
                    <tr v-for="item in dislocation" :key="item.id">
                        <td>{{ item.last_plan_repair_date | formatdate}}</td>
                        <td>{{ item.run_fact }}</td>
                        <td>{{ item.current_task_client }}</td>
                        <td>{{ item.receipt }}</td>
                        <td>{{ item.invoice }}</td>
                        <td>{{ item.wagon }}</td>
                        <td>{{ item.last_operation_datetime | formatdate}}</td>
                        <td>{{ item.current_station_arrival | formatdate}}</td>
                        <td>{{ item.operation }}</td>
                        <td>{{ item.departure_station }}</td>
                        <td>{{ item.current_station }}</td>
                        <td>{{ item.destination_station }}</td>
                        <td>{{ item.current_station_downtime  }}</td>
                        <td>{{ item.last_operation_downtime  }}</td>
                        <td>{{ item.documents_registration_downtime }}</td>
                        <td>{{ item.distance_left_from_current_dislocation }}</td>
                        <td>{{ item.distance_all_from_departure_station }}</td>
                        <td>{{ item.cargo }}</td>
                        <td>{{ item.train_index }}</td>
                        <td>{{ item.is_loaded | loaded}}</td>
                        <td>{{ item.weight }}</td>
                        <td>{{ item.current_country }}</td>
                        <td>{{ item.drop }}</td>
                        <td>{{ item.polygon }}</td>
                        <td>{{ item.loading_date | formatdate}}</td>
                        <td>{{ item.calc_arrival_date  | formatdate}}</td>
                        <td>{{ item.arrival_date | formatdate}}</td>
                        <td>{{ item.destination_station_arrival  | formatdate}}</td>
                        <td>{{ item.departure_station_arrival  | formatdate}}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from "@/api/wagonPark";
import Loader from '../../../loader/loader.vue';
export default {
    components: { Loader },
    data() {
        return {
            wagon_in: "",
            on_date: "",
            loader: false,
            dislocation: "",
            no_data: false,
        }
    },
    methods: {
        getData() {
            this.loader = true
            this.no_data = false
            let str = this.wagon_in.replace(/[^0-9]/g, "")
            let arr = str.match(/.{1,8}/g)
            api.getDislocation(arr, this.on_date)
                .then(response => {
                    this.loader = false
                    this.dislocation = response.data.data
                    if(this.dislocation.length == 0){
                        this.no_data = true
                    }
                    console.log(this.dislocation)
                }).catch((error) => {
                    this.loader = false
                })
        }
    },
    filters: {
        loaded(value){
            return value == true ? 'Груж' : 'Порож'
        },
        formatdate(value){
            if(value == null){
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
td{
    padding: 10px;
    white-space: nowrap;
}
th{
    padding: 10px;
}
</style>