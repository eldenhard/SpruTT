<template>
    <div>
        <p>Форма 4.23. "Депо плановых ремонтов"</p>
        <div style="overflow: auto;">
            <table>
                <thead>
                    <tr >
                        <th>Наименование ВРД</th>
                        <th>Доля, %</th>
                        <th>Всего в т.ч</th>
                        <th>ПВ</th>
                        <th>ЦС</th>
                       

                    </tr>
                </thead>
                <tbody>
                    <tr class="col0">
                        <td>Ремонт</td>
                        <td>{{ Math.floor(Math.random() * 100) }}</td>
                        <td>{{ Math.floor(Math.random() * 140) }}</td>
                        <td>{{ Math.floor(Math.random() * 215) }}</td>
                        <td>{{ Math.floor(Math.random() * 215) }}</td>

                    </tr>
                    <tr class="col0">
                        <td>Профилактика</td>
                        <td>{{ Math.floor(Math.random() * 100) }}</td>
                        <td>{{ Math.floor(Math.random() * 140) }}</td>
                        <td>{{ Math.floor(Math.random() * 215) }}</td>
                        <td>{{ Math.floor(Math.random() * 215) }}</td>

                    </tr>
                
                    <tr class="total">
                        <td>Итого</td>
                        <td>{{ Math.floor(Math.random() * 100) }}</td>
                        <td>{{ Math.floor(Math.random() * 215) }}</td>
                        <td>{{ Math.floor(Math.random() * 215) }}</td>
                        <td>{{ Math.floor(Math.random() * 752) }}</td>

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