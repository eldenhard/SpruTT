<template>
    <div>
        <p>Форма 4.7 "Анализ перевозки и выручки по сегменту полувагонов"</p>
        <table border="1">
            <thead>

                <tr>
                    <!-- <th></th> -->
                    <th>Парк (собств. / привлеченный)</th>
                    <th>Полигон</th>
                    <th>Кол-во погрузок</th>
                    <th>Выручка, руб. без НДС</th>
                </tr>
            </thead>
            <tbody >
                <template v-for="obj in objects[0].data">
                <tr v-for="subobj, index in obj.attr2" :key="subobj.id">
                    <!-- <td></td> -->
                    <td v-if="index == 0" :rowspan="obj.attr2.length" style="text-align: left !important; padding-left: 1% !important;">{{ obj.attr1 }}</td>
                    <td>{{ subobj.polygon }}</td>
                    <td>{{ subobj.amount }}</td>
                    <td>{{ subobj.wo_nds }}</td>

                </tr>
                <tr class="total_row" :key="obj.id">
                    <!-- <td style="background: white !important ;"></td> -->
                    <td style="text-align: left !important; padding-left: 1% !important;">Итого {{ obj.attr1 }}</td>
                    <td></td>
                    <td>{{ obj.total.amount }}</td>
                    <td>{{ obj.total.wo_nds }}</td>
                </tr>
                </template>
                <tr v-for="obj in objects" :key="obj.id" class="all_total">
                    <!-- <td></td> -->
                    <td style="font-weight: bold; text-align: left !important; padding-left: 1% !important;">Всего погрузки</td>
                    <td></td>
                    <td>{{ obj.ALL_TOTAL.amount }}</td>
                    <td>{{ obj.ALL_TOTAL.wo_nds }}</td>

                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    data() {
        return {
            objects: [{
                data: [{
                    attr1: 'Собственный парк',
                    attr2: [{ polygon: 'Якорная площадка 1', amount: '1', wo_nds: '2' },
                    { polygon: 'Якорная площадка 2', amount: '1', wo_nds: '2' },
                    ],
                    total: { amount: '3', wo_nds: '4' }
                },
                {
                    attr1: 'Привлеченный парк',
                    attr2: [{ polygon: 'Якорная площадка 1', amount: '1', wo_nds: '2' },
                    { polygon: 'Якорная площадка 2', amount: '1', wo_nds: '2' }
                    ],
                    total: { amount: '5', wo_nds: '6' }
                }],
                ALL_TOTAL: {
                    amount: 'ALL_TOTALA',
                    wo_nds: 'ALL_TOTALWO'
                }

            }]
        }
    },
 
    methods: {
        getRowCount(obj) {
            let total = 0;
            let last_item = '';
            obj.attr1.forEach((item) => {
                total += item.attr3.length;
            });
            return total;
        }
    }
}
</script>


<style scoped>
.total_row {
    background: #DAEEF3;
}
td {
  border: 1px solid black !important;
  color: black !important;
}
.all_total {
    background: #EAF1DD;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table > tbody > tr > td,
table > tbody > tr > td.inner > div {
  vertical-align: top;
  border: 1px solid #ddd;
}
table > tbody > tr > td.inner {
  padding: 0;
  border-right: 0;
}
table > tbody > tr > td.inner > div {
  padding: 5px;
  border-width: 0 0 1px 0;
}
table > tbody > tr > td.inner > div:last-child {
  border: 0;
}
table > tbody > tr > td.inner > table {
  margin-bottom: 0;
}
table > tbody > tr > td.inner > table td {
  border-width: 0 1px 1px 0;
}
table > tbody > tr > td.inner > table tr:last-child td {
  border-bottom: 0;
} 

table > tbody > tr > td.inner > div {
  border-right: 0;
}
thead > th {
  border: 1px solid black;
}
</style>