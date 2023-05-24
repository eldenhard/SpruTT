<template>
    <div>
        <Loader :loader="loader" />
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="overflow: auto; margin-top: 5%;">
            <table border="1" align="center">
                <thead>
                    <tr>
                        <th class="widthFirst"></th>
                        <th style="font-weight: bold !important; width: 200px !important; min-width: 200px !important; max-width: 200px !important;">Подвижной состав, ед</th>
                        <template v-for="(data, key) in dataFormation">
                            <th :key="data.id">{{ key | getCorrectData }}</th>
                    <tr :key="data.id">
                        <th colspan=2 class="col2">{{ key | GetNameMounth }}</th>
                    </tr>
                    <tr :key="data.id">
                        <th class="col1" style="font-size: 13px !important">Ввод</th>
                        <th class="col1" style="font-size: 13px !important">Вывод</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">1</th>
                        <th class="blue_line headers">Собственный парк</th>
                        <template v-for="data in dataFormation">
                            <th class="blue_line" :key="data.id" style="font-weight: bold !important;">{{ data.own?.total | format}}</th>
                    <tr :key="data.id">
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data.own?.total_in | format}}</th>
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data.own?.total_out| format }}</th>
                    </tr>
                    </template>

                    </tr>
                    <tr>
                        <th class="number widthFirst">2</th>
                        <th> Полувагоны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data.own?.pv?.on_date | format }}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data.own?.pv?.in | format}}</th>
                        <th class="col1">{{ data.own?.pv?.out | format }}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">3</th>
                        <th>Цистерны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data.own?.cs?.on_date | format }}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data.own?.cs?.in | format}}</th>
                        <th class="col1">{{ data.own?.cs?.out | format}}</th>
                    </tr>
                    </template>

                    </tr>

                    <tr>
                        <th class="number widthFirst">5</th>
                        <th class="blue_line headers">Парк в лизинге</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id" class="blue_line" style="font-weight: bold !important;">{{ data?.lease?.total | format}}</th>
                    <tr :key="data.id">
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data?.lease?.total_in | format}}</th>
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data?.lease?.total_out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst"> 6</th>
                        <th >Полувагоны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.lease?.pv?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.lease?.pv?.in | format}}</th>
                        <th class="col1">{{ data?.lease?.pv?.out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst"> 7</th>
                        <th > Цистерны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.lease?.cs?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.lease?.cs?.in | format}}</th>
                        <th class="col1">{{ data?.lease?.cs?.out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">8</th>
                        <th class="blue_line headers">Аренд. парк</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id" class="blue_line" style="font-weight: bold !important;">{{ data?.rent?.total | format}}</th>
                    <tr :key="data.id">
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data?.rent?.total_in | format}}</th>
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data?.rent?.total_out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">9</th>
                        <th>Полувагоны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.rent?.pv?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.rent?.pv?.in | format}}</th>
                        <th class="col1">{{ data?.rent?.pv?.out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">10</th>
                        <th>Цистерны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.rent?.cs?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.rent?.cs?.in | format}}</th>
                        <th class="col1">{{ data?.rent?.cs?.out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">11</th>
                        <th class="blue_line headers">Привлеч. парк</th>
                        <template v-for="data in dataFormation">
                            <th class="blue_line" :key="data.id" style="font-weight: bold !important;">{{ data?.attracted?.total | format}}</th>
                    <tr :key="data.id">
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data?.attracted?.total_in | format}}</th>
                        <th class="blue_line col1" style="font-weight: bold !important;">{{ data?.attracted?.total_out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">12</th>
                        <th>Полувагоны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.attracted?.pv?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.attracted?.pv?.in | format}}</th>
                        <th class="col1">{{ data?.attracted?.pv?.out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">13</th>
                        <th>Цистерны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.attracted?.cs?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.attracted?.cs?.in | format}}</th>
                        <th class="col1">{{ data?.attracted?.cs?.out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">14</th>
                        <th style="font-weight: bold !important;" class="headers" >Всего ПС</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id" style="font-weight: bold !important;">{{ data?.total?.total | format}}</th>
                    <tr :key="data.id">
                        <th class="col1" style="font-weight: bold !important;">{{ data?.total?.total_in | format}}</th>
                        <th class="col1" style="font-weight: bold !important;">{{ data?.total?.total_out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">15</th>
                        <th>Полувагоны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.total?.pv?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.total?.pv?.in | format}}</th>
                        <th class="col1">{{ data?.total?.pv?.out | format}}</th>
                    </tr>
                    </template>
                    </tr>
                    <tr>
                        <th class="number widthFirst">16</th>
                        <th>Цистерны</th>
                        <template v-for="data in dataFormation">
                            <th :key="data.id">{{ data?.total?.cs?.on_date | format}}</th>
                    <tr :key="data.id">
                        <th class="col1">{{ data?.total?.cs?.in | format}}</th>
                        <th class="col1">{{ data?.total?.cs?.out | format}}</th>
                    </tr>
                    </template>

                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>
<script>
import Loader from '@/components/loader/loader.vue'
import Periods from './Periods.vue'
import api from '@/api/reportUO'
export default {
    components: { Periods, Loader },
    data() {
        return {
            formation_park_data: true,
            index_font_size: '1%',
            dataFormation: '',
            date_begin: '',
            date_end: '',
            loader: false,
        }
    },
    methods: {
        Actioned() {
            this.loader = true
            api.getUO41(this.date_begin, this.date_end)
                .then((response) => {
                    this.loader = false
                   this.dataFormation = response.data
                   console.log(response.data)
                }).catch(error => {
                    this.loader = false
                    console.log(error, 'AAAAAAAAAAAAAAAAA')
                })
        },
        getCurrentData(data) {
            this.date_begin = data.date_begin
            this.date_end = data.date_end
        }
    },
    filters: {
        GetNameMounth(value) {
            let date = new Date(value)
            let monthName = date.toLocaleString('default', { month: 'long' }).slice(0, 3)
            let getYear = date.getFullYear()
            return `${monthName}. ${getYear}`
        },
        getCorrectData(value) {
            let date = new Date(value);
            return date.toLocaleDateString();
            },
        format(value){
         return  String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        }
    }
}
</script>

<style scoped>


.col1 {
    min-width: 60px;
    max-width: 60px;
    /* border: lightgray; */
}
.col2 {
    min-width: 120px;
    max-width: 120px;
    /* border: lightgray; */
}
.number {
    background: #B6DF89;
    color: #41766F;
    width: calc(v-bind('index_font_size') * 5)
}

.blue_line {
    background: #DAEEF3;
}
tr:hover{
    background: #dddddd !important;
    cursor: pointer;
}
/* tr>.blue_line:hover{
    background: #ddd;
} */
th {
    font-weight: 400 !important;
    border: 1px solid grey
}

.widthFirst {
    width: calc(v-bind('index_font_size') * 8)
}
.headers{
    text-align: left !important;
    padding-left: 1%;
    font-weight: bold !important;
}
</style>