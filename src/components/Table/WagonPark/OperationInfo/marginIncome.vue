<template>
    <section>
        <div class="filter_b">

            <label for="">
                Дата <br>
                <input type="month" v-model="date_begin_create" class="textarea"
                    style="background: white;width: 20vw ">
            </label>
            <br>
            <button class="Accept button" style="width: 20vw" @click="getBPData">Запросить</button>
        </div>
        <br>
        <div style="overflow: auto; width: 100%">
            <table>
                <thead>
                    <tr class="TableHeader">
                        <td rowspan="2">Клиент</td>
                        <td rowspan="2">Отправление</td>
                        <td rowspan="2">Груз</td>
                        <td rowspan="2">Назначение</td>
                        <td colspan="5">Объем</td>
                        <td colspan="5">Выручка (без штрафов)</td>
                        <td colspan="5">МД (без штрафов)</td>
                        <td colspan="2">Стат нагрузка</td>
                        <td colspan="2">Оборот</td>
                        <td colspan="2">Штрафы</td>
                        <td colspan="6">Доходность</td>
                    </tr>
                    <tr class="TableHeader">
                        <td>БП</td>
                        <td>Б</td>
                        <td>Факт</td>
                        <td>Откл. БП</td>
                        <td>Откл. Б</td>

                        <td>БП</td>
                        <td>Б</td>
                        <td>Факт</td>
                        <td>Откл. БП</td>
                        <td>Откл. Б</td>

                        <td>БП</td>
                        <td>Б</td>
                        <td>Факт</td>
                        <td>Откл. БП</td>
                        <td>Откл. Б</td>

                        <td>План</td>
                        <td>Факт</td>

                        <td>План</td>
                        <td>Факт</td>

                        <td>План</td>
                        <td>Факт</td>

                        <td>План(без штр)</td>
                        <td>План(со штр)</td>
                        <td>Факт(без штр)</td>
                        <td>Факт(со штр)</td>
                        <td>+/-(без штр)</td>
                        <td>+/-(со штр)</td>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in businessPlanData" :key="index">
                        <td>{{ item.client }}</td>
                        <td></td>
                        <td>{{ item.product }}</td>
                        <td>{{ item.destination }}</td>
                        <td>{{ item.volume| format }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ item.revenue_wo_nds | format}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ item.md_wo_penalties | format}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>


<script>
import api from '@/api/directory'
export default {
    data() {
        return {
            date_begin_create: "",
            businessPlanData: "",
        }
    },
    filters: {
        format(value) {
            if (value != "" && !!value) {
                if (Number.isFinite(value)) {
                    let TwoSignNum = value?.toFixed(0)
                    return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                } else {
                    return 0;
                }

            }
            return value

        },
    },
    methods: {
        async getBPData() {
            this.$emit('stateLoader', true)
            try{
                let response = await api.getBusinessPlan(this.date_begin_create + '-01')
                this.businessPlanData = response.data.data
                console.log(response.data)
                this.$toast.success(`Успешно\nДанные маржинальной доходности получены`, {
                    timeout: 2000
                })
            } catch(error) {
                this.$toast.error(`Ошибка получения данных\n${error.response}`, {
                    timeout: 2000
                })
                this.$emit('stateLoader', false)
            } finally{
                this.$emit('stateLoader', false)
            }

        },
    }
}
</script>

<style scoped>
td {
    white-space: nowrap;
    padding: 2px 10px !important;
}

.filter_b {
    width: 20vw;
}
</style>