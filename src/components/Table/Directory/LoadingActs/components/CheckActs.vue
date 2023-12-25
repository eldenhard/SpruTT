<template>
    <div>
        <div class="filter_block">
            <label for="">Кол-во записей <br>
                <select v-model="filter.page_size">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </label>
            <button class="Accept mini" @click="getActs()">Запросить данные актов</button>
        </div>
        <div style="overflow: auto;">
            <table>
                <thead>
                    <tr class="TableHeader">
                        <th>№ акта</th>
                        <th>Дата акта</th>
                        <th>Продавец</th>
                        <th>Покупатель</th>
                        <th>Договор</th>
                        <th>№ вагона</th>
                        <th>№ накладной</th>
                        <th>Сумма без НДС</th>
                        <th>Сумма НДС</th>
                        <th>Сумма с НДС</th>
                        <th>Тип акта</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in responseActs" :key="index">
                        <td>
                            <input type="text" name="" id="" :value="item.number">
                        </td>
                        <td>
                            <input type="date" name="" id="" :value="item.on_date.split('T')[0]">
                        </td>
                        <td><input type="text" :value="item.seller"> &nbsp;</td>
                        <td><input type="text" :value="item.buyer"></td>
                        <td><input type="text" :value="item.agr"></td>
                        <td><input type="text" :value="item.wagon"></td>
                        <td><input type="text" :value="item.invoice_number"></td>
                        <td><input type="text" :value="item.total_wo_nds"></td>
                        <td><input type="text" :value="item.nds"></td>
                        <td><input type="text" :value="item.total"></td>
                        <td><input type="text" :value="item.act_type"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
export default {
    components: { Loader },
    data() {
        return {
            responseActs: null,
            loader: false,
            filter: {
                'page_size': 10,  // Значение по умолчанию
            },
        }
    },
    watch: {
        'filter.page_size': function (newPageSize) {
            this.filter.page_size = newPageSize;
        },
    },
    methods: {
        getActs() {
            this.$emit('startLoader')
            api.getActs(this.filter)
                .then(response => {
                    this.responseActs = response.data.data
                    this.$emit('stopLoader')
                }).catch((err) => {
                    this.$emit('stopLoader')
                    console.error(err)
                })
        }
    }
}
</script>

<style scoped>
.filter_block {
    border: 1px solid lightgrey;
    padding: 2%;
}

.mini {
    height: 40px;
    min-width: 20%;
    width: auto;
    margin-left: auto;
    white-space: nowrap;
}

td {
    white-space: nowrap !important;
    margin: 1% !important;
}

tr:hover {
    border: 2px solid rgb(39, 39, 39);
}

input {
    width: 100%;
    height: 100%;
    text-align: center;
}
</style>