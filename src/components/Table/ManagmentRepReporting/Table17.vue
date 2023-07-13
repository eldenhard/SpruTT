<template>
    <div>
        <p>Форма 4.17. "Свод доходов и расходов по производственной деятельности"</p>
        <div style="overflow: auto;">
            <table>
                <thead>
                    <tr >
                        <th>Наименование</th>
                        <th>Всего</th>
                        <th>Полувагоны</th>
                        <th>Цистерны</th>
              

                    </tr>
                </thead>
                <tbody>
                    <tr class="col0">
                        <td>Доходы</td>
                        <td>123</td>
                        <td>123</td>
                        <td>123</td>
   
                    </tr>
                    <tr>
                        <td>Выручка от предоставления вагонов по погрузку</td>
                        <td>12312</td>
                        <td>1231</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>Выручка от сдачи в аренду</td>
                        <td>14124</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                    <tr>
                        <td>Штрафы к получению</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>


                    <tr class="col0">
                        <td>Расходы</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>

                    <tr class="col2">
                        <td>Условно-переменные расходы</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                    <tr >
                        <td>Тариф РФ</td>
                        <td>12312</td>
                        <td>123</td>
                        <td>123123</td>
      
                    </tr>
                    <tr>
                        <td>Тариф СТ</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                    <tr >
                        <td>Расходы на привлечение вагонов</td>
                        <td>12312</td>
                        <td>1231</td>
                        <td>123</td>
   
                    </tr>
                    <tr>
                        <td>Расходы на подготовку вагонов</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                    <tr >
                        <td>Прочие условно-переменные расходы</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>

                    <tr class="col2">
                        <td>Условно-постоянные расходы</td>
                        <td>12312</td>
                        <td>1231</td>
                        <td>123123</td>
                    </tr>
                    <tr>
                        <td>Расходы на аренду вагонов</td>
                        <td>14124</td>
                        <td>12132</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>Расходы на ремонт и сервисное обслуживание вагонов</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                    <tr >
                        <td>Амортизация</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                    <tr >
                        <td>Расходы на оплату труда в составе производственных расходов</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                    <tr >
                        <td>Прочие условно-постоянные расходы 1</td>
                        <td>12312</td>
                        <td>1231</td>
                        <td>123</td>
                    </tr>
                    <tr class="col0">
                        <td>Операционная прибыль</td>
                        <td>12132</td>
                        <td>12132</td>
                        <td>12132</td>
                    </tr>
                  

                </tbody>

            </table>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {

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
.col0{
    background: #DAEEF3;
    text-align: left;
    font-weight: bold;
}
.col1{
    background: #F2F2F2
}
.col2{
    background: #FDFFD9;
}
.total {
    background: #FDFFD9;
}

.total_2 {
    background: #DDFACE;
}

tr:hover {
    background: rgb(236, 236, 236);
}

.itogo {
    font-weight: bold;
    border-right: none !important;

}

.all_total {
    background: #EAF1DD;
}

/* .last:nth-last-of-type(3n) {
   border-bottom: 2px solid rgb(0, 0, 0) !important
} */
.total_row {
    background: #DAEEF3;
}

td,
th {
    border: 1px solid rgb(102, 102, 102) !important;
    color: black !important;
}

.all_total {
    background: #EAF1DD;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table>tbody>tr>td,
table>tbody>tr>td.inner>div {
    vertical-align: top;
    border: 1px solid #ddd;
}

table>tbody>tr>td.inner {
    padding: 0;
    border-right: 0;
}

table>tbody>tr>td.inner>div {
    padding: 5px;
    border-width: 0 0 1px 0;
}

table>tbody>tr>td.inner>div:last-child {
    border: 0;
}

table>tbody>tr>td.inner>table {
    margin-bottom: 0;
}

table>tbody>tr>td.inner>table td {
    border-width: 0 1px 1px 0;
}

table>tbody>tr>td.inner>table tr:last-child td {
    border-bottom: 0;
}

table>tbody>tr>td.inner>div {
    border-right: 0;
}

thead>th {
    border: 1px solid black;
}</style>