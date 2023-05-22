<template>
    <div>
        <p>Форма 4.9. "Производство по универсальным перевозкам (привлеченный парк)"</p>
        <div style="overflow: auto;">
            <table>
                <thead>
                    <tr>
                    <th>Экспедитор</th>
                    <th>Клиент</th>
                    <th>Дорога отпр.</th>
                    <th>Станция отпр.</th>
                    <th>Дорога назнач.</th>
                    <th>Станция назнач.</th>
                    <th>Продукт</th>
                    <th>Кол-во погр.</th>
                    <th>Выручка</th>
                    <th>Штрафы</th>

                    <th>Экспедирование</th>
                    <th>Тариф порож.</th>
                    <th>Тариф CT</th>
                    <th>Тариф груж</th>
                    <th>Подготовка</th>
                    <th>Доп. услуги</th>
                    <th>МД</th>
                    <th>Удельный МД, руб./ваг.</th>

                </tr>
                </thead>
                <tbody >
                <template v-for="obj in objects[0].data">
                <tr v-for="subobj, index in obj.attr2" :key="subobj.id">
                    <!-- <td></td> -->
                    <td v-if="index == 0" :rowspan="obj.attr2.length" style="text-align: left !important; padding-left: 1% !important;">{{ obj.attr1 }}</td>
                    <td>{{ subobj.client }}</td>
                    <td>{{ subobj.road_dep }}</td>
                    <td>{{ subobj.station_dep }}</td>

                    <td>{{ subobj.road_dest }}</td>
                    <td>{{ subobj.station_dest }}</td>
                    <td>{{ subobj.product }}</td>

                    <td>{{ subobj.amount }}</td>
                    <td>{{ subobj.proceeds }}</td>
                    <td>{{ subobj.fines }}</td>
                    
                    <td>{{ subobj.forwarding }}</td>
                    <td>{{ subobj.tf_empty }}</td>
                    <td>{{ subobj.tf_st }}</td>

                          
                    <td>{{ subobj.tf_laden }}</td>
                    <td>{{ subobj.preparation }}</td>
                    <td>{{ subobj.add_service }}</td>

                    <td>{{ subobj.md }}</td>
                    <td>{{ subobj.spec_md }}</td>
                </tr>
                <tr class="total_row" :key="obj.id">
                    <td style="text-align: left !important; padding-left: 1% !important;">Итого {{ obj.attr1 }}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{ obj.total.amount }}</td>
                    <td>{{ obj.total.proceeds }}</td>
                    <td>{{ obj.total.fines }}</td>
                    
                    <td>{{ obj.total.forwarding }}</td>
                    <td>{{ obj.total.tf_empty }}</td>
                    <td>{{ obj.total.tf_st }}</td>

                          
                    <td>{{ obj.total.tf_laden }}</td>
                    <td>{{ obj.total.preparation }}</td>
                    <td>{{ obj.total.add_service }}</td>

                    <td>{{ obj.total.md }}</td>
                    <td>{{ obj.total.spec_md }}</td>
                </tr>
                </template>
                <tr v-for="obj in objects" :key="obj.id" class="all_total">
                    <!-- <td></td> -->
                    <td colspan="3" style="font-weight: bold; text-align: left !important; padding-left: 1% !important;">Всего по погрузке (привлеченный парк)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{ obj.ALL_TOTAL.amount }}</td>
                    <td>{{ obj.ALL_TOTAL.proceeds }}</td>
                    <td>{{ obj.ALL_TOTAL.fines }}</td>
                    
                    <td>{{ obj.ALL_TOTAL.forwarding }}</td>
                    <td>{{ obj.ALL_TOTAL.tf_empty }}</td>
                    <td>{{ obj.ALL_TOTAL.tf_st }}</td>

                          
                    <td>{{ obj.ALL_TOTAL.tf_laden }}</td>
                    <td>{{ obj.ALL_TOTAL.preparation }}</td>
                    <td>{{ obj.ALL_TOTAL.add_service }}</td>

                    <td>{{ obj.ALL_TOTAL.md }}</td>
                    <td>{{ obj.ALL_TOTAL.spec_md }}</td>

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
            objects: [{
                data: [{
                    attr1: 'Экспедитор 1',
                    attr2: [
                    { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' },
                    { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' },
                    { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' },
                    ],
                    total: { amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' }
                },
                {
                    attr1: 'Экспедитор 2',
                    attr2: [{ client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' },
                    { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' },
                    { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' },
                    ],
                    total: { amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123' }
                },
            ],
                ALL_TOTAL: {
                    amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789',  md: "980", spec_md: '123'
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

.total{
  background: #FDFFD9;
}
.total_2{
  background: #DDFACE;
}
tr:hover{
  background: rgb(236, 236, 236);
}
.itogo{
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
td, th {
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