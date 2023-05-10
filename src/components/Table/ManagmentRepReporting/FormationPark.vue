<template>
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th class="widthFirst"></th>
                    <th style="font-weight: bold !important;">Подвижной состав, ед</th>
                        <template v-if="formation_park_data">
                            <th>на 01.01.2023</th>
                            <tr>
                                <th colspan=2>Янв.23</th>
                            </tr> 
                            <tr> 
                                <th>Ввод</th> 
                                <th>Вывод</th> 
                            </tr> 
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">1</th>
                    <th class="blue_line">Собственный парк</th>
                        <template v-if="formation_park_data">
                                    <th class="blue_line">***</th>
                                    <tr>
                                        <th class="blue_line">123</th>
                                        <th class="blue_line">321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">2</th>
                    <th> Полувагоны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">3</th>
                    <th>Цистерны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst"> 4</th>
                    <th style="font-style: italic;">в том числе</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">5</th>
                    <th>Парк в лизинге</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst"> 6</th>
                    <th>Полувагоны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst"> 7</th>
                    <th> Цистерны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">8</th>
                    <th>Арендованный парк</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">9</th>
                    <th>Полувагоны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">10</th>
                    <th>Цистерны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">11</th>
                    <th class="blue_line">Привлеченный парк</th>
                      <template v-if="formation_park_data">
                                    <th class="blue_line">***</th>
                                    <tr>
                                        <th class="blue_line">123</th>
                                        <th class="blue_line">321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">12</th>
                    <th>Полувагоны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">13</th>
                    <th>Цистерны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">14</th>
                    <th style="font-weight: bold !important;">Всего ПС</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">15</th>
                    <th>Полувагоны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>
                </tr>
                <tr>
                    <th class="number widthFirst">16</th>
                    <th>Цистерны</th>
                      <template v-if="formation_park_data">
                                    <th>***</th>
                                    <tr>
                                        <th>123</th>
                                        <th>321</th>
                                    </tr>
                        </template>

                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
export default{
    data() {
        return{
            formation_park_data: true,
            index_font_size: '1%',
        }
    }
}
</script>

<style scoped>
 tr:nth-child(1) {
    background: rgb(255, 255, 255);
 }
.number {
    background: #B6DF89;
    color: #41766F;
    width:  calc(v-bind('index_font_size') * 5)
}
.blue_line {
    background: #DAEEF3;
}
th{
    font-weight: 400 !important;
}
.widthFirst {
    width:  calc(v-bind('index_font_size') * 8)

}

</style>