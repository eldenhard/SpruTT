<template>
    <div>
        <Loader :loader="loader" />
        <p>Форма 4.16. "Операционные доходы и расходы в детализации «до вагона»"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="overflow: auto; margin-top: 4%;">
            <table >
                <thead>
                    <th>&nbsp;Показатель/ Группа вагонов / Вагон&nbsp;</th>
                    <th>Всего в т.ч</th>
                    <template v-for="item in getCollection">
                        <th :key="item.id">{{ item }}</th>
                    </template>
                    <tr class="RowAlphabet">
                        <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">
                            Выручка от предоставления вагонов под погрузку
                        </td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['loading_revenue'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['loading_revenue'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>

                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Выручка от сдачи в аренду</td>
                    </tr>

                    <template v-for="(allDataByWagonType, wagon_type) in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['rent_revenue'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['rent_revenue'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>

                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Штрафы к получению</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['penalties'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['penalties'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Тариф</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['tariff'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['tariff'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Привлеченеи ПС</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['attraction'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['attraction'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Подготовка вагонов</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['prepare'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['prepare'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Прочие условно-переменные расходы</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['other_charges'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['other_charges'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Амортизация</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['amortization'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['amortization'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Расходы на аренду ПС</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['rent_expenses'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['rent_expenses'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Ремонт, сервисное обслуживание и з/ч
                        </td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['repair'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['repair'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Расходы на оплату труда (произв.)</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['salary'] | format }}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['salary'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Прочие условно-постоянные произв.
                            Расходы</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['other_expenses'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['other_expenses'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Операционная прибыль</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)">{{ data[wagon_type]['profit'] | format}}</td>
                            <template v-if="typeof allDataByWagonType === 'object'">
                                <template v-for="(monthData, monthKey) in allDataByWagonType">
                                    <td v-if="typeof monthData === 'object'"  :key="monthKey">{{ monthData['profit'] | format}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>


                    <!-- <template v-for="monthData in allDataByWagonType">
                                <td v-if="typeof monthData == 'object'" :key="monthData.id">{{  monthData['other_expenses'] }}</td>
                            </template> -->



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
            amount_cols: 0,
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
   
    computed: {
        getTh() {
            // const table = document.getElementsByTagName('table')[0];
            // const numberOfColumns = table.rows[0].cells.length;
            return this.alphabet.slice(0, this.amount_cols)
        },
        HowManyNewCells() {
            if (this.getCollection) {
                return this.getCollection.length + 2
            }
        },
        getCollection() {
            this.amount_cols = 0
            let newCollection = new Set()
            for (let i in this.data) {
                if (typeof this.data[i] == 'object') {
                    for (let month in this.data[i]) {
                        if (this.CheckValue(month)) {
                            newCollection.add(month)
                        }
                    }
                    this.amount_cols = 2 + [...newCollection].length
                    return [...newCollection]
                }
                return
            }
        }
    },
    methods: {
        CheckValue(value) {
            let index = value;
            if (
                index != 'loading_revenue' &&
                index != 'rent_revenue' &&
                index != 'penalties' &&
                index != "tariff" &&

                index != 'attraction' &&
                index != 'prepare' &&
                index != 'other_charges' &&
                index != "amortization" &&

                index != 'rent_expenses' &&
                index != 'repair' &&
                index != 'salary' &&
                index != "other_expenses" &&
                index != "profit"
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (
                    i == 'loading_revenue' ||
                    i == 'rent_revenue' ||
                    i == 'penalties' ||
                    i == "tariff" ||

                    i == 'attraction' ||
                    i == 'prepare' ||
                    i == 'other_charges' ||
                    i == "amortization" ||

                    i == 'rent_expenses' ||
                    i == 'repair' ||
                    i == 'salary' ||
                    i == "other_expenses" ||
                    i == "profit") {
                    continue;
                } else {
                    correctKeys.push(i);
                }
            }
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },
        Actioned() {

            try {
                this.loader = true;

                api.getUO16(this.date_begin, this.date_end)
                    .then((response) => {
                        this.loader = false;
                        console.log(this.data);
                        this.data = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        // Внутри catch обработка ошибки, вы можете выполнить необходимые действия
                        // и пометить загрузчик как завершенный
                        this.loader = false;
                    });
            } catch (error) {
                // Этот код не будет выполняться, так как try...catch не обрабатывает ошибки из асинхронного кода
                this.loader = false;
            }

        },
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },
    }
}
</script>


<style scoped>
th {
    white-space: nowrap;
}
</style>