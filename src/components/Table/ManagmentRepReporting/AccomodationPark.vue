<template>
    <div style="overflow: auto;">
        <table border="1">
            <thead>
                <tr>
                    <th class="widthFirst"></th>
                    <th class="styles" style="font-weight: bold !important;">Подвижной состав, ед</th>
                    <template v-for="(data, key) in dataFormation">
                        <th :key="data.id">{{ key }}</th>
                <tr>
                    <th colspan=2>{{ key | GetNameMounth }}</th>
                </tr>
                <tr>
                    <th>Ввод</th>
                    <th>Вывод</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number">1</th>
                    <th class="styles" >Оперерирование</th>
                    <template v-for="data in dataFormation">
                        <th  :key="data.id" >{{ data.own?.total }}</th>
                <tr>
                    <th >{{ data.own?.total_in }}</th>
                    <th >{{ data.own?.total_out }}</th>
                </tr>
                </template>

                </tr>
                <tr>
                    <th class="number">2</th>
                    <th class="styles" > Сдача в аренду</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id" >{{ data.own?.pv?.on_date }}</th>
                <tr>
                    <th>{{ data.own?.pv?.in }}</th>
                    <th>{{ data.own?.pv?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number">3</th>
                    <th class="styles" >Итого</th>
                    <template  v-for="data in dataFormation" >
                        <th :key="data.id" >{{ data.own?.cs?.on_date }}</th>
                    <tr>
                    <th>{{ data.own?.cs?.in }}</th>
                    <th>{{ data.own?.cs?.out }}</th>
                </tr>
                </template>
                   
                </tr>
              
            </thead>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            index_font_size: '1%',
        }
    }
}
</script>
<style scoped>
.number {
    background: #B6DF89;
    color: #41766F;
    /* width: calc(v-bind('index_font_size') * 5) */
}
th{
    width: 00%
}
</style>