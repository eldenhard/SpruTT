<template>
    <div>
        <Loader :loader="loader" />
        <p>Форма 4.17. "Свод доходов и расходов по производственной деятельности"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="overflow: auto;  margin: 4% auto;">
            <table>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Всего</th>
                        <th>Полувагоны</th>
                        <th>Цистерны</th>
                    </tr>
                    <tr class="RowAlphabet">
                        <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="Total_blue">
                        <td style="font-weight: 600;">Доходы</td>
                        <td>{{ data?.dohod ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.dohod ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.dohod ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Выручка от предоставления вагонов под погрузку</td>
                        <td>{{ data?.loading_revenue ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.loading_revenue ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.loading_revenue ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Выручка от сдачи в аренду</td>
                        <td>{{ data?.rent_revenue ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.rent_revenue ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.rent_revenue ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Штрафы к получению</td>
                        <td>{{ data?.penalties ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.penalties ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.penalties ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Расходы</td>
                        <td>{{ data?.rashod ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.rashod ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.rashod ?? "" | format }}</td>
                    </tr>
                    <tr class="Total_1">
                        <td style="font-weight: 600;">Условно переменные расходы</td>
                        <td>{{ data?.peremen_rashod ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.peremen_rashod ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.peremen_rashod ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Тариф РФ</td>
                        <td>{{ data?.tariff_rf ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.tariff_rf ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.tariff_rf ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Тариф СТ</td>
                        <td>{{ data?.tariff_inroad ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.tariff_inroad ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.tariff_inroad ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Расходы на привлечение вагонов</td>
                        <td>{{ data?.expedition ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.expedition ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.expedition ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Расходы на подготовку вагонов</td>
                        <td>{{ data?.prepare ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.prepare ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.prepare ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Прочие условно-переменные расходы</td>
                        <td>{{ data?.pps ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.pps ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.pps ?? "" | format }}</td>
                    </tr>
                    <tr class="Total_1">
                        <td style="font-weight: 600;">Условно-постоянные расходы</td>
                        <td>{{ data?.post_rashod ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.post_rashod ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.post_rashod ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Расходы на аренду вагонов</td>
                        <td>{{ data?.rent_expenses ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.rent_expenses ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.rent_expenses ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Расходы на ремонт и сервисное обслеживание вагонов</td>
                        <td>{{ data?.repair ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.repair ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.repair ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Амортизация</td>
                        <td>{{ data?.amortization ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.amortization ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.amortization ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Расходы на оплату труда в составе производственных расходов</td>
                        <td>{{ data?.salary ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.salary ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.salary ?? "" | format }}</td>
                    </tr>
                    <tr>
                        <td>Прочие условно-постоянные расходы</td>
                        <td>{{ data?.other_expenses ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.other_expenses ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.other_expenses ?? "" | format }}</td>
                    </tr>
                    <tr class="Total_blue">
                        <td style="font-weight: 600;">Операционная прибыль</td>
                        <td>{{ data?.oper_prib ?? "" | format }}</td>
                        <td>{{ data?.Полувагон?.oper_prib ?? "" | format }}</td>
                        <td>{{ data?.Цистерна?.oper_prib ?? "" | format }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import AverageValue from '@/mixins/AverageValue'
export default {
    components: { Periods, Notifications, Loader, },
    mixins: [AverageValue],
    data() {
        return {
            loader: false,
            data: "",
            date_begin: "",
            date_end: "",
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],


        }
    },
    computed: {
        getTh() {
            return this.alphabet.slice(0, 4)
        },
        HowManyNewCells() {
            return this.getCollection.length + 2
        },
        getCollection() {
            let newCollection = new Set()
            for (let i in this.data) {
                if (typeof this.data[i] == 'object') {
                    for (let month in this.data[i]) {
                        if (this.CheckValue(month)) {
                            newCollection.add(month)
                        }
                    }
                    return [...newCollection]
                }
                return
            }
        }
    },
    filters: {
        format(value) {
            if (value != "") {
                let TwoSignNum = value?.toFixed(2)
                return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            }
            return value

        },
    },
    methods: {
        Actioned() {
            this.loader = true;
            api
                .getUO17(this.date_begin, this.date_end)
                .then((response) => {
                    this.loader = false;
                    console.log(this.data)
                    this.data = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.loader = false;
                });


        },
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },
    }
}
</script>


<style scoped>
@import '../../../style/UOTableStyle.css';

td,
th {
    white-space: nowrap;
    padding: 0 10px !important;
}

tr>td:first-child {
    text-align: left !important;
}

tr:hover {
    background: lightcyan;
}

</style>