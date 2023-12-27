<template>
    <div>
        <p>Форма 4.25. "Сводные показатели деятельности"</p>
        <table>
            <thead>
                <tr>
                    <th>Показатель</th>
                    <th>Всего в т.ч</th>
                    <template v-for="month in Object.keys(file)">
                        <th v-if="CheckValue(month)">Всего в {{ month }}</th>
                    </template>
                </tr>
                <tr class="RowAlphabet">
                    <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                </tr>
                <tr>
                    <th colspan="3">ДЕЯТЕЛЬНОСТЬ ПО ПРЕДОСТАВЛЕНИЮ ВАГОНОВ ПОД ПОГРУЗКУ</th>
                </tr>
            </thead>
            <tbody>

                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Общий объем перевозок компании (тн)&nbsp;&nbsp;</td>
                    <td>{{ file['вес'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['вес'] | format }}</td>
                    </template>
                </tr>
                <tr class="Total_1">
                    <td>Объем ЦС (тн)</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'вес') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['вес'] | format }}</td>
                    </template>

                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('вес', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['вес'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'вес') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['вес'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>

                <tr class="Total_1">
                    <td>Объем ПВ (тн)</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'вес') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['вес'] | format }}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('вес', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['вес'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'вес') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['вес'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Общий объем перевозок компании (ваг)&nbsp;&nbsp;</td>
                    <td>{{ file['погрузка'] }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['погрузка'] }}</td>
                    </template>
                </tr>
                <tr class="Total_1">
                    <td>Погрузка ЦС (тн)</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'погрузка') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['погрузка'] }}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('погрузка', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['погрузка'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'погрузка') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['погрузка'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Погрузка ПВ (тн)</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'погрузка') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['погрузка'] }}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('погрузка', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['погрузка'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'погрузка') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['погрузка'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Расстояние груж (собств.парк)&nbsp;&nbsp;</td>
                    <td>{{ file['расстояние_груженое'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['расстояние_груженое'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Расстояние груж ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'расстояние_груженое') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['расстояние_груженое'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Расстояние груж ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'расстояние_груженое') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['расстояние_груженое'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Груж плечо (собств/парк) (км) &nbsp;&nbsp;</td>
                    <td>{{ file['груженое_плечо'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['груженое_плечо'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Груж плечо ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'груженое_плечо') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['груженое_плечо'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Груж плечо ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'груженое_плечо') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['груженое_плечо'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Грузооборот (собст.парк) (тн*км)&nbsp;&nbsp;</td>
                    <td>{{ file['грузооборот'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['грузооборот'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Грузооборот ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'грузооборот') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['грузооборот'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Грузооборот ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'грузооборот') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['грузооборот'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Производительность (собст. парк) (тн*км/ваг*сут)&nbsp;&nbsp;</td>
                    <td>{{ (file['производительность'].reduce((acc, item) => acc += item) /
                        file['производительность'].length).toFixed(2) }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">
                            {{ (data['производительность'].reduce((acc, item) => acc += item) /
                        data['производительность'].length).toFixed(2)}}
                        </td>
                    </template>
                </tr>
                <tr>
<!-- Не считал общий -->
                    <td class="pre_amount">Производительность ЦС</td>
                    <td></td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">
                            {{ (data['Цистерна']['производительность'].reduce((acc, item) => acc += item) /
                        data['Цистерна']['производительность'].length).toFixed(2)}}
                        </td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Производительность ПВ</td>
                    <td row></td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">
                            {{ (data['Полувагон']['производительность'].reduce((acc, item) => acc += item) /
                        data['Полувагон']['производительность'].length).toFixed(2)}}
                        </td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Выручка от оперирования&nbsp;&nbsp;</td>
                    <td>{{ file['ДППВПД_выручка_от_оперирования'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_выручка_от_оперирования'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_1">
                    <td>Выручка ВЦ</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_выручка_от_оперирования') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_выручка_от_оперирования'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('ДППВПД_выручка_от_оперирования', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['ДППВПД_выручка_от_оперирования'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'ДППВПД_выручка_от_оперирования') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['ДППВПД_выручка_от_оперирования'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr>
                    <td class="pre_amount">Штрафы к получению ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_штрафы_к_получению') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_штрафы_к_получению'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_1">
                    <td>Выручка ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_выручка_от_оперирования') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_выручка_от_оперирования'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('ДППВПД_выручка_от_оперирования', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['ДППВПД_выручка_от_оперирования'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'ДППВПД_выручка_от_оперирования') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['ДППВПД_выручка_от_оперирования'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr>
                    <td class="pre_amount">Штрафы к получению ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_штрафы_к_получению') | format  }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_штрафы_к_получению'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Себестоимость&nbsp;&nbsp;</td>
                    <td>{{ file['ДППВПД_себестоимость'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_себестоимость'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_blue">
                    <td>&nbsp;&nbsp;Условно-переменные расходы&nbsp;&nbsp;</td>
                    <td>{{ file['ДППВПД_условно_переменные_расходы'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_условно_переменные_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>&nbsp;&nbsp;Ж/д тариф&nbsp;&nbsp;</td>
                    <td>{{ file['жд_тариф'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['жд_тариф'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>Тарифы ВЦ</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="Total_1">
                    <td>Тариф порожний всего</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'тариф_порожний') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['тариф_порожний'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('тариф_порожний', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['тариф_порожний'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'тариф_порожний') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['тариф_порожний'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Тариф груженный всего</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'тариф_груженый') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['тариф_груженый'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('тариф_груженый', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['тариф_груженый'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'тариф_груженый') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['тариф_груженый'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Тариф по сопредельным государствам всего</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'тариф_по_сопредельным_государствам') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['тариф_по_сопредельным_государствам'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('тариф_по_сопредельным_государствам', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['тариф_по_сопредельным_государствам'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'тариф_по_сопредельным_государствам') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['тариф_по_сопредельным_государствам'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_2">
                    <td>Тарифы ПВ</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="Total_1">
                    <td>Тариф порожний всего</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'тариф_порожний') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['тариф_порожний'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('тариф_порожний', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['тариф_порожний'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'тариф_порожний') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['тариф_порожний'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Тариф груженный всего</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'тариф_груженый') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['тариф_груженый'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('тариф_груженый', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['тариф_груженый'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'тариф_груженый') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['тариф_груженый'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Тариф по сопредельным государствам всего</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'тариф_по_сопредельным_государствам') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['тариф_по_сопредельным_государствам'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('тариф_по_сопредельным_государствам', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['тариф_по_сопредельным_государствам'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'тариф_по_сопредельным_государствам') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['тариф_по_сопредельным_государствам'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_red">
                    <td>&nbsp;&nbsp;Привлечение&nbsp;&nbsp;</td>
                    <td>{{ file['привлечение'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['привлечение'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Привлечение ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'привлечение') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['привлечение'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Привлечение ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'привлечение') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['привлечение'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>&nbsp;&nbsp;Доп услуги&nbsp;&nbsp;</td>
                    <td>{{ file['доп_услуги'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['доп_услуги'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>Доп услуги ЦС</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="Total_1">
                    <td>ППС ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ппс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ппс'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('ппс', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['ппс'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'ппс') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['ппс'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Отстой ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'отстой') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['отстой'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('отстой', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['отстой'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'отстой') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['отстой'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Прочие услуги ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'прочие_услуги') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['прочие_услуги'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('прочие_услуги', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['прочие_услуги'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'прочие_услуги') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['прочие_услуги'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_2">
                    <td>Доп услуги ПВ</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="Total_1">
                    <td>ППС ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ппс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ппс'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('ппс', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['ппс'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'ппс') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['ппс'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Отстой ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'отстой') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['отстой'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('отстой', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['отстой'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'отстой') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['отстой'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Прочие услуги ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'прочие_услуги') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['прочие_услуги'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('прочие_услуги', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['прочие_услуги'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'прочие_услуги') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['прочие_услуги'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_red">
                    <td>&nbsp;&nbsp;Штрафы к уплате&nbsp;&nbsp;</td>
                    <td>{{ file['штрафы_к_уплате'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['штрафы_к_уплате'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Маржинальный доход&nbsp;&nbsp;</td>
                    <td>{{ file['ДППВПД_маржинальный_доход'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_маржинальный_доход'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_1">
                    <td>Маржинальный доход ВЦ</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_маржинальный_доход') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_маржинальный_доход'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Маржинальный доход {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('ДППВПД_маржинальный_доход', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['ДППВПД_маржинальный_доход'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'ДППВПД_маржинальный_доход') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['ДППВПД_маржинальный_доход'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_1">
                    <td>Маржинальный доход ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_маржинальный_доход') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_маржинальный_доход'] | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Маржинальный доход {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('ДППВПД_маржинальный_доход', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['ДППВПД_маржинальный_доход'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'ДППВПД_маржинальный_доход') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['ДППВПД_маржинальный_доход'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>
                <tr class="Total_2">
                    <td>Вагонно-сутки</td>
                    <td>{{ file['вагоносутки'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['вагоносутки'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Вагонно-сутки ВЦ</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'вагоносутки') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['вагоносутки'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Вагонно-сутки ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'вагоносутки') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['вагоносутки'] | format}}</td>
                    </template>
                </tr>


                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_1">
                                <td >Доходность {{ polygon.toLowerCase() }} (Цистерна)</td>
                                <td>{{ calculateSum('ДППВПД_доходность', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]['ДППВПД_доходность'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'ДППВПД_доходность') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]['ДППВПД_доходность'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>

                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_1">
                                <td >Доходность {{ polygon.toLowerCase() }} (Полувагон)</td>
                                <td>{{ calculateSum('ДППВПД_доходность', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]['ДППВПД_доходность'] | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'ДППВПД_доходность') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]['ДППВПД_доходность'] | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template>

                <!-- <tr class="Total_2">
                    <td>Доходность в собственном парке</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="pre_amount">Доходность ВЦ</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="pre_amount">Доходность ПВ</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="Total_2">
                    <td>Доходность в привлеченном парке</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="pre_amount">Доходность ВЦ</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="pre_amount">Доходность ПВ</td>
                    <td></td>
                    <td></td>
                </tr> -->









                <tr class="Total_2">
                    <td>Маржинальная рентабельность </td>
                    <td>{{ file['ДППВПД_маржинальная_рентабельность'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_маржинальная_рентабельность'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Маржинальная рентабельность ВЦ</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_маржинальная_рентабельность') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_маржинальная_рентабельность'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Маржинальная рентабельность ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_маржинальная_рентабельность') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_маржинальная_рентабельность'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_blue">
                    <td>Условно постоянные расходы</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ file['ДППВПД_условно_постоянные_расходы'] | format}}</td>
                    </template>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_условно_постоянные_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Аренда ПС</td>
                    <td>{{ file['ДППВПД_аренда_пс'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_аренда_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Аренда ВЦ</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_аренда_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_аренда_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Аренда ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_аренда_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_аренда_пс'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Амортизация ПС</td>
                    <td>{{ file['ДППВПД_амортизация_пс'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_амортизация_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Амортизация ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_амортизация_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_амортизация_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Амортизация ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_амортизация_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_амортизация_пс'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Текущий ремонт включая з/ч</td>
                    <td>{{ file['ДППВПД_текущий_ремонт_включая_запчасти'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_текущий_ремонт_включая_запчасти'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Текущий ремонт ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_текущий_ремонт_включая_запчасти') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_текущий_ремонт_включая_запчасти'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Текущий ремонт ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_текущий_ремонт_включая_запчасти') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_текущий_ремонт_включая_запчасти'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Сервисное обслуживание ПС</td>
                    <td>{{ file['ДППВПД_сервисное_обслуживание_пс'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_сервисное_обслуживание_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Сервисное обслуживание ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_сервисное_обслуживание_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_сервисное_обслуживание_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Сервисное обслуживание ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_сервисное_обслуживание_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_сервисное_обслуживание_пс'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>&nbsp;Расходы на оплату труда в составе производственных расходов&nbsp;</td>
                    <td>{{ file['ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Оплата труда ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Оплата труда ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Прочие условно-постоянные расходы</td>
                    <td>{{ file['ДППВПД_прочие_условно_постоянные_расходы'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_прочие_условно_постоянные_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Прочие расходы ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_прочие_условно_постоянные_расходы') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_прочие_условно_постоянные_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Прочие расходы ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_прочие_условно_постоянные_расходы') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_прочие_условно_постоянные_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Операционная прибыль от предоставления вагонов под погрузку&nbsp;&nbsp;</td>
                    <td>{{ file['ДППВПД_операционная_прибыль'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДППВПД_операционная_прибыль'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Операционная прибыль ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДППВПД_операционная_прибыль') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДППВПД_операционная_прибыль'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Операционная прибыль ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДППВПД_операционная_прибыль') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДППВПД_операционная_прибыль'] | format}}</td>
                    </template>
                </tr>
                <br>
<!-- НОВЫЙ РАЗДЕЛ -->
                <tr class="Row_grey">
                    <th colspan="3">ДЕЯТЕЛЬНОСТЬ ПО СДАЧЕ ВАГОНОВ В АРЕНДУ</th>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Выручка от сдачи в аренду&nbsp;&nbsp;</td>
                    <td>{{ file['ДПСВВА_выручка_от_сдачи_в_аренду'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДПСВВА_выручка_от_сдачи_в_аренду'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Выручка от сдачи в аренду ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДПСВВА_выручка_от_сдачи_в_аренду') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДПСВВА_выручка_от_сдачи_в_аренду'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Выручка от сдачи в аренду ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДПСВВА_выручка_от_сдачи_в_аренду') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДПСВВА_выручка_от_сдачи_в_аренду'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;&nbsp;Себестоимость&nbsp;&nbsp;</td>
                    <td>{{ file['ДПСВВА_себестоимость'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДПСВВА_себестоимость'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Аренда ПС</td>
                    <td>{{ file['ДПСВВА_аренда_пс'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДПСВВА_аренда_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Аренда ВЦ</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДПСВВА_аренда_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДПСВВА_аренда_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Аренда ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДПСВВА_аренда_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДПСВВА_аренда_пс'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Амортизация ПС</td>
                    <td>{{ file['ДПСВВА_амортизация_пс'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДПСВВА_амортизация_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Амортизация ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДПСВВА_амортизация_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДПСВВА_амортизация_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Амортизация ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДПСВВА_амортизация_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДПСВВА_амортизация_пс'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td>Сервисное обслуживание ПС</td>
                    <td>{{ file['ДПСВВА_сервисное_обслуживание_пс'] | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ДПСВВА_сервисное_обслуживание_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Сервисное обслуживание ЦС</td>
                    <td>{{ calculateSumNotPolygon('Цистерна', 'ДПСВВА_сервисное_обслуживание_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']['ДПСВВА_сервисное_обслуживание_пс'] | format}}</td>
                    </template>
                </tr>
                <tr>
                    <td class="pre_amount">Сервисное обслуживание ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'ДПСВВА_сервисное_обслуживание_пс') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['ДПСВВА_сервисное_обслуживание_пс'] | format}}</td>
                    </template>
                </tr>
                <br>
<!-- НОВЫЙ РАЗДЕЛ -->
                <tr class="Row_grey">
                    <th colspan="3">ПРОЧИЕ ВИДЫ ОСНОВНОЙ ДЕЯТЕЛЬНОСТИ</th>
                </tr>
                <tr class="Total_2">
                    <td>Выручка</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['ПВОД_выручка'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ПВОД_выручка'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Выручка от оптовой торговли</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['выручка_от_оптовой_торговли'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['выручка_от_оптовой_торговли'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Выручка от реализации металлолома</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['выручка_от_реализации_металлолома'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['выручка_от_реализации_металлолома'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Выручка от агентской деятельности</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['выручка_от_агентской_деятельности'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['выручка_от_агентской_деятельности'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Прочая выручка от основной деятельности</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['прочая_выручка_от_основной_деятельности'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['прочая_выручка_от_основной_деятельности'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>Себестоимость</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['ПВОД_себестоимость'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ПВОД_себестоимость'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Себестоимость реализованных товаров</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['ПВОД_себестоимость_реализованных_товаров'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ПВОД_себестоимость_реализованных_товаров'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Себестоиость реализованного металлолома</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['ПВОД_себестоимость_реализованного_металлолома'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ПВОД_себестоимость_реализованного_металлолома'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;Операционная прибыль по прочим видам основной деятельности&nbsp;</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности'] | format}}</td>
                    </template>
                </tr>
                <br>
                <tr class="Total_2">
                    <td>&nbsp;Всего операционная прибыль&nbsp;</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['всего_операционная_прибыль'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['всего_операционная_прибыль'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Административно-хозяйственные расходы</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['административно_хозяйственные_расходы'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['административно_хозяйственные_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">В том числе амортизация</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['административно_хозяйственные_расходы_и_амортизация'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['административно_хозяйственные_расходы_и_амортизация'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>&nbsp;Прибыль / убыток от продаж&nbsp;</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['прибыль_и_убыток_от_продаж'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['прибыль_и_убыток_от_продаж'] | format}}</td>
                    </template>
                </tr>
                <br>
                <tr class="Total_2">
                    <td>&nbsp;Прочие доходы и расходы&nbsp;</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['прочие_доходы_и_расходы'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['прочие_доходы_и_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td >Прочие доходы</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['прочие_доходы'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['прочие_доходы'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Проценты к получению</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['проценты_к_получению'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['проценты_к_получению'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Доходы по курсовым разницам</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['доходы_по_курсовым_разницам'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['доходы_по_курсовым_разницам'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Иные прочие доходы</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['иные_прочие_доходы'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['иные_прочие_доходы'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_red">
                    <td >Прочие расходы</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['прочие_расходы'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['прочие_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Проценты к уплате</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['проценты_к_уплате'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['проценты_к_уплате'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Расходы по курсовым разницам</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['расходы_по_курсовым_разницам'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['расходы_по_курсовым_разницам'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Иные прочие расходы</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['иные_прочие_расходы'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['иные_прочие_расходы'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>EBITDA</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['ebitda'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['ebitda'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Рентабельность по EBITDA</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['рентабельность_по_ebitda'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['рентабельность_по_ebitda'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>Прибыль до налогооблажения</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['прибыль_до_налогооблажения'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['прибыль_до_налогооблажения'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Налог на прибыль</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['налог_на_прибыль'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['налог_на_прибыль'] | format}}</td>
                    </template>
                </tr>
                <tr class="Total_2">
                    <td>Чистая прибыль</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['чистая_прибыль'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['чистая_прибыль'] | format}}</td>
                    </template>
                </tr>
                <tr >
                    <td class="pre_amount">Рентабельность по чистой прибыли</td>
                    <td :key="index" v-if="CheckValue(index)">{{ file['рентабельность_по_чистой_прибыли'] | format}}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['рентабельность_по_чистой_прибыли'] | format}}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
td {
    white-space: nowrap !important;
}

.pre_amount {
    text-align: right !important;
    padding-right: 2% !important;
}
</style>
<script>

export default {
    data() {
        return {
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            file: {
                "01-2023": {
                    "вес": 144754.4900000005,
                    "погрузка": 2268,
                    "расстояние_груженое": 5459797.0,
                    "груженое_плечо": 5459797.0,
                    "грузооборот": 356098777.6849993,
                    "производительность": [
                        28097.09,
                        17000.7904,
                        11925.612500000001,
                       
                    ],
                    "ДППВПД_выручка_от_оперирования": 284012199.8499998,
                    "ДППВПД_штрафы_к_получению": 0,
                    "ДППВПД_себестоимость": 234677959.02999982,
                    "ДППВПД_условно_переменные_расходы": 233981895.23999986,
                    "жд_тариф": 226028401.27999994,
                    "тариф_порожний": 0,
                    "тариф_груженый": 226028401.27999994,
                    "тариф_по_сопредельным_государствам": 0,
                    "привлечение": 7953493.960000001,
                    "доп_услуги": 0,
                    "ппс": 0,
                    "отстой": 0,
                    "прочие_услуги": 0,
                    "штрафы_к_уплате": 0,
                    "ДППВПД_маржинальный_доход": 57983798.57000006,
                    "вагоносутки": 16118.0,
                    "ДППВПД_доходность": 11228016.033367144,
                    "ДППВПД_маржинальная_рентабельность": -288.55376847037115,
                    "ДППВПД_условно_постоянные_расходы": 696063.7900000005,
                    "ДППВПД_аренда_пс": 0,
                    "ДППВПД_амортизация_пс": 485286.42000000045,
                    "ДППВПД_текущий_ремонт_включая_запчасти": 210777.37,
                    "ДППВПД_сервисное_обслуживание_пс": 0,
                    "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                    "ДППВПД_прочие_условно_постоянные_расходы": 0,
                    "ДППВПД_операционная_прибыль": 57287734.78000005,
                    "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                    "ДПСВВА_себестоимость": 485286.42000000045,
                    "ДПСВВА_аренда_пс": 0,
                    "ДПСВВА_амортизация_пс": 485286.42000000045,
                    "ДПСВВА_сервисное_обслуживание_пс": 0,
                    "ПВОД_выручка": 0,
                    "выручка_от_оптовой_торговли": 0,
                    "выручка_от_реализации_металлолома": 0,
                    "выручка_от_агентской_деятельности": 0,
                    "прочая_выручка_от_основной_деятельности": 0,
                    "ПВОД_себестоимость": 0,
                    "ПВОД_себестоимость_реализованных_товаров": 0,
                    "ПВОД_себестоимость_реализованного_металлолома": 0,
                    "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                    "всего_операционная_прибыль": 56802448.36000005,
                    "административно_хозяйственные_расходы": 0,
                    "административно_хозяйственные_расходы_и_амортизация": 0,
                    "прибыль_и_убыток_от_продаж": 56802448.36000005,
                    "прочие_доходы_и_расходы": 0,
                    "прочие_доходы": 0,
                    "проценты_к_получению": 0,
                    "доходы_по_курсовым_разницам": 0,
                    "иные_прочие_доходы": 0,
                    "прочие_расходы": 0,
                    "проценты_к_уплате": 0,
                    "расходы_по_курсовым_разницам": 0,
                    "иные_прочие_расходы": 0,
                    "ebitda": 57773021.200000055,
                    "рентабельность_по_ebitda": -289.4705110078888,
                    "прибыль_до_налогооблажения": 56802448.36000005,
                    "налог_на_прибыль": 0,
                    "чистая_прибыль": 56802448.36000005,
                    "рентабельность_по_чистой_прибыли": -301.17655376179664,
                    "Цистерна": {
                        "вес": 84588.43800000005,
                        "погрузка": 1388,
                        "расстояние_груженое": 2284570.0,
                        "груженое_плечо": 2284570.0,
                        "грузооборот": 138681092.565,
                        "производительность": [
                            28097.09,
                            17000.7904,
                        ],
                        "ДППВПД_выручка_от_оперирования": 157724587.01000008,
                        "ДППВПД_штрафы_к_получению": 0,
                        "ДППВПД_себестоимость": 151836998.02999967,
                        "ДППВПД_условно_переменные_расходы": 151340934.23999992,
                        "жд_тариф": 143387440.27999997,
                        "тариф_порожний": 0,
                        "тариф_груженый": 143387440.27999997,
                        "тариф_по_сопредельным_государствам": 0,
                        "привлечение": 7953493.960000001,
                        "доп_услуги": 0,
                        "ппс": 0,
                        "отстой": 0,
                        "прочие_услуги": 0,
                        "штрафы_к_уплате": 0,
                        "ДППВПД_маржинальный_доход": 14337146.730000002,
                        "вагоносутки": 8556.0,
                        "ДППВПД_доходность": 5264741.473099668,
                        "ДППВПД_маржинальная_рентабельность": -489.2204001259847,
                        "ДППВПД_условно_постоянные_расходы": 496063.7900000005,
                        "ДППВПД_аренда_пс": 0,
                        "ДППВПД_амортизация_пс": 485286.42000000045,
                        "ДППВПД_текущий_ремонт_включая_запчасти": 10777.37,
                        "ДППВПД_сервисное_обслуживание_пс": 0,
                        "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                        "ДППВПД_прочие_условно_постоянные_расходы": 0,
                        "ДППВПД_операционная_прибыль": 13841082.940000003,
                        "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                        "ДПСВВА_себестоимость": 485286.42000000045,
                        "ДПСВВА_аренда_пс": 0,
                        "ДПСВВА_амортизация_пс": 485286.42000000045,
                        "ДПСВВА_сервисное_обслуживание_пс": 0,
                        "ПВОД_выручка": 0,
                        "выручка_от_оптовой_торговли": 0,
                        "выручка_от_реализации_металлолома": 0,
                        "выручка_от_агентской_деятельности": 0,
                        "прочая_выручка_от_основной_деятельности": 0,
                        "ПВОД_себестоимость": 0,
                        "ПВОД_себестоимость_реализованных_товаров": 0,
                        "ПВОД_себестоимость_реализованного_металлолома": 0,
                        "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                        "всего_операционная_прибыль": 13355796.520000005,
                        "административно_хозяйственные_расходы": 0,
                        "административно_хозяйственные_расходы_и_амортизация": 0,
                        "прибыль_и_убыток_от_продаж": 13355796.520000005,
                        "прочие_доходы_и_расходы": 0,
                        "прочие_доходы": 0,
                        "проценты_к_получению": 0,
                        "доходы_по_курсовым_разницам": 0,
                        "иные_прочие_доходы": 0,
                        "прочие_расходы": 0,
                        "проценты_к_уплате": 0,
                        "расходы_по_курсовым_разницам": 0,
                        "иные_прочие_расходы": 0,
                        "ebitda": 14326369.360000001,
                        "рентабельность_по_ebitda": -489.303809330169,
                        "прибыль_до_налогооблажения": 13355796.520000005,
                        "налог_на_прибыль": 0,
                        "чистая_прибыль": 13355796.520000005,
                        "рентабельность_по_чистой_прибыли": -501.00985208407553,
                        "Парк в управлении": {
                            "вес": 77713.434,
                            "погрузка": 1275,
                            "расстояние_груженое": 2074615.0,
                            "груженое_плечо": 2074615.0,
                            "грузооборот": 125823714.03999998,
                            "производительность": [
                                28097.09,
                                17000.7904,
                                11925.612500000001,
                                28443.52,
                                17526.846666666668,
                                24579.072,
                                25917.822,
                                14040.458,
                            ],
                            "ДППВПД_выручка_от_оперирования": 148235478.67000008,
                            "ДППВПД_штрафы_к_получению": 0,
                            "ДППВПД_себестоимость": 138332851.87999994,
                            "ДППВПД_условно_переменные_расходы": 137836788.08999997,
                            "жд_тариф": 137836788.08999997,
                            "тариф_порожний": 0,
                            "тариф_груженый": 137836788.08999997,
                            "тариф_по_сопредельным_государствам": 0,
                            "привлечение": 0,
                            "доп_услуги": 0,
                            "ппс": 0,
                            "отстой": 0,
                            "прочие_услуги": 0,
                            "штрафы_к_уплате": 0,
                            "ДППВПД_маржинальный_доход": 10398690.580000011,
                            "вагоносутки": 7896.0,
                            "ДППВПД_доходность": 4329809.717225228,
                            "ДППВПД_маржинальная_рентабельность": -552.9128933664551,
                            "ДППВПД_условно_постоянные_расходы": 496063.7900000005,
                            "ДППВПД_аренда_пс": 0,
                            "ДППВПД_амортизация_пс": 485286.42000000045,
                            "ДППВПД_текущий_ремонт_включая_запчасти": 10777.37,
                            "ДППВПД_сервисное_обслуживание_пс": 0,
                            "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                            "ДППВПД_прочие_условно_постоянные_расходы": 0,
                            "ДППВПД_операционная_прибыль": 9902626.790000008,
                            "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                            "ДПСВВА_себестоимость": 485286.42000000045,
                            "ДПСВВА_аренда_пс": 0,
                            "ДПСВВА_амортизация_пс": 485286.42000000045,
                            "ДПСВВА_сервисное_обслуживание_пс": 0,
                            "ПВОД_выручка": 0,
                            "выручка_от_оптовой_торговли": 0,
                            "выручка_от_реализации_металлолома": 0,
                            "выручка_от_агентской_деятельности": 0,
                            "прочая_выручка_от_основной_деятельности": 0,
                            "ПВОД_себестоимость": 0,
                            "ПВОД_себестоимость_реализованных_товаров": 0,
                            "ПВОД_себестоимость_реализованного_металлолома": 0,
                            "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                            "всего_операционная_прибыль": 9417340.370000003,
                            "административно_хозяйственные_расходы": 0,
                            "административно_хозяйственные_расходы_и_амортизация": 0,
                            "прибыль_и_убыток_от_продаж": 9417340.370000003,
                            "прочие_доходы_и_расходы": 0,
                            "прочие_доходы": 0,
                            "проценты_к_получению": 0,
                            "доходы_по_курсовым_разницам": 0,
                            "иные_прочие_доходы": 0,
                            "прочие_расходы": 0,
                            "проценты_к_уплате": 0,
                            "расходы_по_курсовым_разницам": 0,
                            "иные_прочие_расходы": 0,
                            "ebitda": 10387913.21000001,
                            "рентабельность_по_ebitda": -552.9963025706394,
                            "прибыль_до_налогооблажения": 9417340.370000003,
                            "налог_на_прибыль": 0,
                            "чистая_прибыль": 9417340.370000003,
                            "рентабельность_по_чистой_прибыли": -564.7023453245467,
                            "В управлении, Собственный": {
                                "вес": 45961.434000000045,
                                "погрузка": 751,
                                "расстояние_груженое": 1180798.0,
                                "груженое_плечо": 1180798.0,
                                "грузооборот": 71714944.15399994,
                                "производительность": [
                                    28097.09,
                                    17000.7904,
                                    11925.612500000001,

                                ],
                                "ДППВПД_выручка_от_оперирования": 80595905.39999995,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 81410687.14000021,
                                "ДППВПД_условно_переменные_расходы": 80925400.72000001,
                                "жд_тариф": 80925400.72000001,
                                "тариф_порожний": 0,
                                "тариф_груженый": 80925400.72000001,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": -329495.320000001,
                                "вагоносутки": 4606.0,
                                "ДППВПД_доходность": 1571.686307306889,
                                "ДППВПД_маржинальная_рентабельность": -485.3966771803214,
                                "ДППВПД_условно_постоянные_расходы": 485286.42000000045,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 485286.42000000045,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": -814781.7400000002,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 485286.42000000045,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 485286.42000000045,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": -1300068.1600000022,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": -1300068.1600000022,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": -329495.320000001,
                                "рентабельность_по_ebitda": -485.3966771803214,
                                "прибыль_до_налогооблажения": -1300068.1600000022,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": -1300068.1600000022,
                                "рентабельность_по_чистой_прибыли": -497.1027199342293
                            },
                            "В управлении, Арендованный": {
                                "вес": 31752.00000000001,
                                "погрузка": 524,
                                "расстояние_груженое": 893817.0,
                                "груженое_плечо": 893817.0,
                                "грузооборот": 54108769.88599999,
                                "производительность": [
                                    3239.207571428571,
                                    24253.1775,
                                    3239.262,
                                    15116.81,

                                ],
                                "ДППВПД_выручка_от_оперирования": 67639573.26999995,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 56922164.74,
                                "ДППВПД_условно_переменные_расходы": 56911387.370000005,
                                "жд_тариф": 56911387.370000005,
                                "тариф_порожний": 0,
                                "тариф_груженый": 56911387.370000005,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": 10728185.900000006,
                                "вагоносутки": 3290.0,
                                "ДППВПД_доходность": 4328238.030917921,
                                "ДППВПД_маржинальная_рентабельность": -67.51621618613403,
                                "ДППВПД_условно_постоянные_расходы": 10777.37,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 10777.37,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": 10717408.530000005,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": 10717408.530000005,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": 10717408.530000005,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": 10717408.530000005,
                                "рентабельность_по_ebitda": -67.5996253903182,
                                "прибыль_до_налогооблажения": 10717408.530000005,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": 10717408.530000005,
                                "рентабельность_по_чистой_прибыли": -67.5996253903182
                            }
                        },
                        "Привлеченный парк": {
                            "вес": 6326.899999999999,
                            "погрузка": 104,
                            "расстояние_груженое": 178788.0,
                            "груженое_плечо": 178788.0,
                            "грузооборот": 10899934.909999998,
                            "производительность": [
                                12339.547125000001,
                                29357.679999999997,
                                12851.012230769233,
                                12846.11676923077,

                            ],
                            "ДППВПД_выручка_от_оперирования": 9259220.579999996,
                            "ДППВПД_штрафы_к_получению": 0,
                            "ДППВПД_себестоимость": 12768045.959999995,
                            "ДППВПД_условно_переменные_расходы": 12768045.959999995,
                            "жд_тариф": 4814552.0,
                            "тариф_порожний": 0,
                            "тариф_груженый": 4814552.0,
                            "тариф_по_сопредельным_государствам": 0,
                            "привлечение": 7953493.960000001,
                            "доп_услуги": 0,
                            "ппс": 0,
                            "отстой": 0,
                            "прочие_услуги": 0,
                            "штрафы_к_уплате": 0,
                            "ДППВПД_маржинальный_доход": 4444668.580000001,
                            "вагоносутки": 634.0,
                            "ДППВПД_доходность": 911816.5596244361,
                            "ДППВПД_маржинальная_рентабельность": 60.474880597668474,
                            "ДППВПД_условно_постоянные_расходы": 0,
                            "ДППВПД_аренда_пс": 0,
                            "ДППВПД_амортизация_пс": 0,
                            "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                            "ДППВПД_сервисное_обслуживание_пс": 0,
                            "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                            "ДППВПД_прочие_условно_постоянные_расходы": 0,
                            "ДППВПД_операционная_прибыль": 4444668.580000001,
                            "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                            "ДПСВВА_себестоимость": 0,
                            "ДПСВВА_аренда_пс": 0,
                            "ДПСВВА_амортизация_пс": 0,
                            "ДПСВВА_сервисное_обслуживание_пс": 0,
                            "ПВОД_выручка": 0,
                            "выручка_от_оптовой_торговли": 0,
                            "выручка_от_реализации_металлолома": 0,
                            "выручка_от_агентской_деятельности": 0,
                            "прочая_выручка_от_основной_деятельности": 0,
                            "ПВОД_себестоимость": 0,
                            "ПВОД_себестоимость_реализованных_товаров": 0,
                            "ПВОД_себестоимость_реализованного_металлолома": 0,
                            "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                            "всего_операционная_прибыль": 4444668.580000001,
                            "административно_хозяйственные_расходы": 0,
                            "административно_хозяйственные_расходы_и_амортизация": 0,
                            "прибыль_и_убыток_от_продаж": 4444668.580000001,
                            "прочие_доходы_и_расходы": 0,
                            "прочие_доходы": 0,
                            "проценты_к_получению": 0,
                            "доходы_по_курсовым_разницам": 0,
                            "иные_прочие_доходы": 0,
                            "прочие_расходы": 0,
                            "проценты_к_уплате": 0,
                            "расходы_по_курсовым_разницам": 0,
                            "иные_прочие_расходы": 0,
                            "ebitda": 4444668.580000001,
                            "рентабельность_по_ebitda": 60.474880597668474,
                            "прибыль_до_налогооблажения": 4444668.580000001,
                            "налог_на_прибыль": 0,
                            "чистая_прибыль": 4444668.580000001,
                            "рентабельность_по_чистой_прибыли": 60.474880597668474,
                            "": {
                                "вес": 6326.899999999999,
                                "погрузка": 104,
                                "расстояние_груженое": 178788.0,
                                "груженое_плечо": 178788.0,
                                "грузооборот": 10899934.909999998,
                                "производительность": [
                                    12339.547125000001,
                                    29357.679999999997,
                                    12851.012230769233,
                                    12846.11676923077,

                                ],
                                "ДППВПД_выручка_от_оперирования": 9259220.579999996,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 12768045.959999995,
                                "ДППВПД_условно_переменные_расходы": 12768045.959999995,
                                "жд_тариф": 4814552.0,
                                "тариф_порожний": 0,
                                "тариф_груженый": 4814552.0,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 7953493.960000001,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": 4444668.580000001,
                                "вагоносутки": 634.0,
                                "ДППВПД_доходность": 911816.5596244361,
                                "ДППВПД_маржинальная_рентабельность": 60.474880597668474,
                                "ДППВПД_условно_постоянные_расходы": 0,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": 4444668.580000001,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": 4444668.580000001,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": 4444668.580000001,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": 4444668.580000001,
                                "рентабельность_по_ebitda": 60.474880597668474,
                                "прибыль_до_налогооблажения": 4444668.580000001,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": 4444668.580000001,
                                "рентабельность_по_чистой_прибыли": 60.474880597668474
                            }
                        },
                        "Сдан в аренду": {
                            "вес": 228.92400000000004,
                            "погрузка": 4,
                            "расстояние_груженое": 6892.0,
                            "груженое_плечо": 6892.0,
                            "грузооборот": 394436.052,
                            "производительность": [
                                12200.13225,
                                12159.426375000001,
                                12396.338875000001,
                                12548.609
                            ],
                            "ДППВПД_выручка_от_оперирования": 229887.76,
                            "ДППВПД_штрафы_к_получению": 0,
                            "ДППВПД_себестоимость": 44966.189999999995,
                            "ДППВПД_условно_переменные_расходы": 44966.189999999995,
                            "жд_тариф": 44966.189999999995,
                            "тариф_порожний": 0,
                            "тариф_груженый": 44966.189999999995,
                            "тариф_по_сопредельным_государствам": 0,
                            "привлечение": 0,
                            "доп_услуги": 0,
                            "ппс": 0,
                            "отстой": 0,
                            "прочие_услуги": 0,
                            "штрафы_к_уплате": 0,
                            "ДППВПД_маржинальный_доход": 184921.57,
                            "вагоносутки": 32.0,
                            "ДППВПД_доходность": 23115.19625,
                            "ДППВПД_маржинальная_рентабельность": 3.2176126428033154,
                            "ДППВПД_условно_постоянные_расходы": 0,
                            "ДППВПД_аренда_пс": 0,
                            "ДППВПД_амортизация_пс": 0,
                            "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                            "ДППВПД_сервисное_обслуживание_пс": 0,
                            "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                            "ДППВПД_прочие_условно_постоянные_расходы": 0,
                            "ДППВПД_операционная_прибыль": 184921.57,
                            "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                            "ДПСВВА_себестоимость": 0,
                            "ДПСВВА_аренда_пс": 0,
                            "ДПСВВА_амортизация_пс": 0,
                            "ДПСВВА_сервисное_обслуживание_пс": 0,
                            "ПВОД_выручка": 0,
                            "выручка_от_оптовой_торговли": 0,
                            "выручка_от_реализации_металлолома": 0,
                            "выручка_от_агентской_деятельности": 0,
                            "прочая_выручка_от_основной_деятельности": 0,
                            "ПВОД_себестоимость": 0,
                            "ПВОД_себестоимость_реализованных_товаров": 0,
                            "ПВОД_себестоимость_реализованного_металлолома": 0,
                            "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                            "всего_операционная_прибыль": 184921.57,
                            "административно_хозяйственные_расходы": 0,
                            "административно_хозяйственные_расходы_и_амортизация": 0,
                            "прибыль_и_убыток_от_продаж": 184921.57,
                            "прочие_доходы_и_расходы": 0,
                            "прочие_доходы": 0,
                            "проценты_к_получению": 0,
                            "доходы_по_курсовым_разницам": 0,
                            "иные_прочие_доходы": 0,
                            "прочие_расходы": 0,
                            "проценты_к_уплате": 0,
                            "расходы_по_курсовым_разницам": 0,
                            "иные_прочие_расходы": 0,
                            "ebitda": 184921.57,
                            "рентабельность_по_ebitda": 3.2176126428033154,
                            "прибыль_до_налогооблажения": 184921.57,
                            "налог_на_прибыль": 0,
                            "чистая_прибыль": 184921.57,
                            "рентабельность_по_чистой_прибыли": 3.2176126428033154,
                            "Сдан в аренду, Собственный": {
                                "вес": 228.92400000000004,
                                "погрузка": 4,
                                "расстояние_груженое": 6892.0,
                                "груженое_плечо": 6892.0,
                                "грузооборот": 394436.052,
                                "производительность": [
                                    12200.13225,
                                    12159.426375000001,
                                    12396.338875000001,
                                    12548.609
                                ],
                                "ДППВПД_выручка_от_оперирования": 229887.76,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 44966.189999999995,
                                "ДППВПД_условно_переменные_расходы": 44966.189999999995,
                                "жд_тариф": 44966.189999999995,
                                "тариф_порожний": 0,
                                "тариф_груженый": 44966.189999999995,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": 184921.57,
                                "вагоносутки": 32.0,
                                "ДППВПД_доходность": 23115.19625,
                                "ДППВПД_маржинальная_рентабельность": 3.2176126428033154,
                                "ДППВПД_условно_постоянные_расходы": 0,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": 184921.57,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": 184921.57,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": 184921.57,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": 184921.57,
                                "рентабельность_по_ebitda": 3.2176126428033154,
                                "прибыль_до_налогооблажения": 184921.57,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": 184921.57,
                                "рентабельность_по_чистой_прибыли": 3.2176126428033154
                            }
                        },
                        "null": {
                            "вес": 319.18,
                            "погрузка": 5,
                            "расстояние_груженое": 24275.0,
                            "груженое_плечо": 24275.0,
                            "грузооборот": 1563007.5629999998,
                            "производительность": [
                                0,
                                0,
                                0,
                                -73306.8625,
                                0
                            ],
                            "ДППВПД_выручка_от_оперирования": 0,
                            "ДППВПД_штрафы_к_получению": 0,
                            "ДППВПД_себестоимость": 691134.0,
                            "ДППВПД_условно_переменные_расходы": 691134.0,
                            "жд_тариф": 691134.0,
                            "тариф_порожний": 0,
                            "тариф_груженый": 691134.0,
                            "тариф_по_сопредельным_государствам": 0,
                            "привлечение": 0,
                            "доп_услуги": 0,
                            "ппс": 0,
                            "отстой": 0,
                            "прочие_услуги": 0,
                            "штрафы_к_уплате": 0,
                            "ДППВПД_маржинальный_доход": -691134.0,
                            "вагоносутки": -6.0,
                            "ДППВПД_доходность": 0,
                            "ДППВПД_маржинальная_рентабельность": 0,
                            "ДППВПД_условно_постоянные_расходы": 0,
                            "ДППВПД_аренда_пс": 0,
                            "ДППВПД_амортизация_пс": 0,
                            "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                            "ДППВПД_сервисное_обслуживание_пс": 0,
                            "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                            "ДППВПД_прочие_условно_постоянные_расходы": 0,
                            "ДППВПД_операционная_прибыль": -691134.0,
                            "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                            "ДПСВВА_себестоимость": 0,
                            "ДПСВВА_аренда_пс": 0,
                            "ДПСВВА_амортизация_пс": 0,
                            "ДПСВВА_сервисное_обслуживание_пс": 0,
                            "ПВОД_выручка": 0,
                            "выручка_от_оптовой_торговли": 0,
                            "выручка_от_реализации_металлолома": 0,
                            "выручка_от_агентской_деятельности": 0,
                            "прочая_выручка_от_основной_деятельности": 0,
                            "ПВОД_себестоимость": 0,
                            "ПВОД_себестоимость_реализованных_товаров": 0,
                            "ПВОД_себестоимость_реализованного_металлолома": 0,
                            "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                            "всего_операционная_прибыль": -691134.0,
                            "административно_хозяйственные_расходы": 0,
                            "административно_хозяйственные_расходы_и_амортизация": 0,
                            "прибыль_и_убыток_от_продаж": -691134.0,
                            "прочие_доходы_и_расходы": 0,
                            "прочие_доходы": 0,
                            "проценты_к_получению": 0,
                            "доходы_по_курсовым_разницам": 0,
                            "иные_прочие_доходы": 0,
                            "прочие_расходы": 0,
                            "проценты_к_уплате": 0,
                            "расходы_по_курсовым_разницам": 0,
                            "иные_прочие_расходы": 0,
                            "ebitda": -691134.0,
                            "рентабельность_по_ebitda": 0,
                            "прибыль_до_налогооблажения": -691134.0,
                            "налог_на_прибыль": 0,
                            "чистая_прибыль": -691134.0,
                            "рентабельность_по_чистой_прибыли": 0,
                            "-": {
                                "вес": 319.18,
                                "погрузка": 5,
                                "расстояние_груженое": 24275.0,
                                "груженое_плечо": 24275.0,
                                "грузооборот": 1563007.5629999998,
                                "производительность": [
                                    0,
                                    0,
                                    0,
                                    -73306.8625,
                                    0
                                ],
                                "ДППВПД_выручка_от_оперирования": 0,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 691134.0,
                                "ДППВПД_условно_переменные_расходы": 691134.0,
                                "жд_тариф": 691134.0,
                                "тариф_порожний": 0,
                                "тариф_груженый": 691134.0,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": -691134.0,
                                "вагоносутки": -6.0,
                                "ДППВПД_доходность": 0,
                                "ДППВПД_маржинальная_рентабельность": 0,
                                "ДППВПД_условно_постоянные_расходы": 0,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": -691134.0,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": -691134.0,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": -691134.0,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": -691134.0,
                                "рентабельность_по_ebitda": 0,
                                "прибыль_до_налогооблажения": -691134.0,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": -691134.0,
                                "рентабельность_по_чистой_прибыли": 0
                            }
                        }
                    },
                    "Полувагон": {
                        "вес": 60164.05200000016,
                        "погрузка": 880,
                        "расстояние_груженое": 3175227.0,
                        "груженое_плечо": 3175227.0,
                        "грузооборот": 217417685.1200004,
                        "производительность": [
                            31464.183333333334,
                            47011.541666666664,

                        ],
                        "ДППВПД_выручка_от_оперирования": 126287612.83999993,
                        "ДППВПД_штрафы_к_получению": 0,
                        "ДППВПД_себестоимость": 82840961.0,
                        "ДППВПД_условно_переменные_расходы": 82640961.0,
                        "жд_тариф": 82640961.0,
                        "тариф_порожний": 0,
                        "тариф_груженый": 82640961.0,
                        "тариф_по_сопредельным_государствам": 0,
                        "привлечение": 0,
                        "доп_услуги": 0,
                        "ппс": 0,
                        "отстой": 0,
                        "прочие_услуги": 0,
                        "штрафы_к_уплате": 0,
                        "ДППВПД_маржинальный_доход": 43646651.84000002,
                        "вагоносутки": 7562.0,
                        "ДППВПД_доходность": 5963274.560267468,
                        "ДППВПД_маржинальная_рентабельность": 200.66663165561545,
                        "ДППВПД_условно_постоянные_расходы": 200000.0,
                        "ДППВПД_аренда_пс": 0,
                        "ДППВПД_амортизация_пс": 0,
                        "ДППВПД_текущий_ремонт_включая_запчасти": 200000.0,
                        "ДППВПД_сервисное_обслуживание_пс": 0,
                        "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                        "ДППВПД_прочие_условно_постоянные_расходы": 0,
                        "ДППВПД_операционная_прибыль": 43446651.84000002,
                        "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                        "ДПСВВА_себестоимость": 0,
                        "ДПСВВА_аренда_пс": 0,
                        "ДПСВВА_амортизация_пс": 0,
                        "ДПСВВА_сервисное_обслуживание_пс": 0,
                        "ПВОД_выручка": 0,
                        "выручка_от_оптовой_торговли": 0,
                        "выручка_от_реализации_металлолома": 0,
                        "выручка_от_агентской_деятельности": 0,
                        "прочая_выручка_от_основной_деятельности": 0,
                        "ПВОД_себестоимость": 0,
                        "ПВОД_себестоимость_реализованных_товаров": 0,
                        "ПВОД_себестоимость_реализованного_металлолома": 0,
                        "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                        "всего_операционная_прибыль": 43446651.84000002,
                        "административно_хозяйственные_расходы": 0,
                        "административно_хозяйственные_расходы_и_амортизация": 0,
                        "прибыль_и_убыток_от_продаж": 43446651.84000002,
                        "прочие_доходы_и_расходы": 0,
                        "прочие_доходы": 0,
                        "проценты_к_получению": 0,
                        "доходы_по_курсовым_разницам": 0,
                        "иные_прочие_доходы": 0,
                        "прочие_расходы": 0,
                        "проценты_к_уплате": 0,
                        "расходы_по_курсовым_разницам": 0,
                        "иные_прочие_расходы": 0,
                        "ebitda": 43446651.84000002,
                        "рентабельность_по_ebitda": 199.8332983222821,
                        "прибыль_до_налогооблажения": 43446651.84000002,
                        "налог_на_прибыль": 0,
                        "чистая_прибыль": 43446651.84000002,
                        "рентабельность_по_чистой_прибыли": 199.8332983222821,
                        "Парк в управлении": {
                            "вес": 58368.22400000017,
                            "погрузка": 854,
                            "расстояние_груженое": 3083920.0,
                            "груженое_плечо": 3083920.0,
                            "грузооборот": 211103832.1720004,
                            "производительность": [
                                31464.183333333334,
                                47011.541666666664,
                                18285.1296875,
                            ],
                            "ДППВПД_выручка_от_оперирования": 125250802.83999993,
                            "ДППВПД_штрафы_к_получению": 0,
                            "ДППВПД_себестоимость": 82174523.0,
                            "ДППВПД_условно_переменные_расходы": 81974523.0,
                            "жд_тариф": 81974523.0,
                            "тариф_порожний": 0,
                            "тариф_груженый": 81974523.0,
                            "тариф_по_сопредельным_государствам": 0,
                            "привлечение": 0,
                            "доп_услуги": 0,
                            "ппс": 0,
                            "отстой": 0,
                            "прочие_услуги": 0,
                            "штрафы_к_уплате": 0,
                            "ДППВПД_маржинальный_доход": 43276279.84000002,
                            "вагоносутки": 7410.0,
                            "ДППВПД_доходность": 5920008.563849671,
                            "ДППВПД_маржинальная_рентабельность": 198.57793150604266,
                            "ДППВПД_условно_постоянные_расходы": 200000.0,
                            "ДППВПД_аренда_пс": 0,
                            "ДППВПД_амортизация_пс": 0,
                            "ДППВПД_текущий_ремонт_включая_запчасти": 200000.0,
                            "ДППВПД_сервисное_обслуживание_пс": 0,
                            "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                            "ДППВПД_прочие_условно_постоянные_расходы": 0,
                            "ДППВПД_операционная_прибыль": 43076279.84000002,
                            "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                            "ДПСВВА_себестоимость": 0,
                            "ДПСВВА_аренда_пс": 0,
                            "ДПСВВА_амортизация_пс": 0,
                            "ДПСВВА_сервисное_обслуживание_пс": 0,
                            "ПВОД_выручка": 0,
                            "выручка_от_оптовой_торговли": 0,
                            "выручка_от_реализации_металлолома": 0,
                            "выручка_от_агентской_деятельности": 0,
                            "прочая_выручка_от_основной_деятельности": 0,
                            "ПВОД_себестоимость": 0,
                            "ПВОД_себестоимость_реализованных_товаров": 0,
                            "ПВОД_себестоимость_реализованного_металлолома": 0,
                            "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                            "всего_операционная_прибыль": 43076279.84000002,
                            "административно_хозяйственные_расходы": 0,
                            "административно_хозяйственные_расходы_и_амортизация": 0,
                            "прибыль_и_убыток_от_продаж": 43076279.84000002,
                            "прочие_доходы_и_расходы": 0,
                            "прочие_доходы": 0,
                            "проценты_к_получению": 0,
                            "доходы_по_курсовым_разницам": 0,
                            "иные_прочие_доходы": 0,
                            "прочие_расходы": 0,
                            "проценты_к_уплате": 0,
                            "расходы_по_курсовым_разницам": 0,
                            "иные_прочие_расходы": 0,
                            "ebitda": 43076279.84000002,
                            "рентабельность_по_ebitda": 197.74459817270935,
                            "прибыль_до_налогооблажения": 43076279.84000002,
                            "налог_на_прибыль": 0,
                            "чистая_прибыль": 43076279.84000002,
                            "рентабельность_по_чистой_прибыли": 197.74459817270935,
                            "В управлении, Арендованный": {
                                "вес": 40797.31400000001,
                                "погрузка": 596,
                                "расстояние_груженое": 2164732.0,
                                "груженое_плечо": 2164732.0,
                                "грузооборот": 148314008.4330003,
                                "производительность": [
                                    31464.183333333334,
                                    47011.541666666664,
                                    18285.1296875,
                                    -14373.333333333334,
                                 
                                ],
                                "ДППВПД_выручка_от_оперирования": 86859720.93999998,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 57678412.0,
                                "ДППВПД_условно_переменные_расходы": 57478412.0,
                                "жд_тариф": 57478412.0,
                                "тариф_порожний": 0,
                                "тариф_груженый": 57478412.0,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": 29381308.94000001,
                                "вагоносутки": 5205.0,
                                "ДППВПД_доходность": 4006535.9461445767,
                                "ДППВПД_маржинальная_рентабельность": 133.7245583731139,
                                "ДППВПД_условно_постоянные_расходы": 200000.0,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 200000.0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": 29181308.94000001,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": 29181308.94000001,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": 29181308.94000001,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": 29181308.94000001,
                                "рентабельность_по_ebitda": 132.89122503978058,
                                "прибыль_до_налогооблажения": 29181308.94000001,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": 29181308.94000001,
                                "рентабельность_по_чистой_прибыли": 132.89122503978058
                            },
                            "В управлении, Собственный": {
                                "вес": 17570.90999999996,
                                "погрузка": 258,
                                "расстояние_груженое": 919188.0,
                                "груженое_плечо": 919188.0,
                                "грузооборот": 62789823.738999955,
                                "производительность": [
                                    17681.25,
                                    16251.375,
                                    12044.388461538463,
                                    34884.48888888888,
                                  
                                ],
                                "ДППВПД_выручка_от_оперирования": 38391081.900000006,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 24496111.0,
                                "ДППВПД_условно_переменные_расходы": 24496111.0,
                                "жд_тариф": 24496111.0,
                                "тариф_порожний": 0,
                                "тариф_груженый": 24496111.0,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": 13894970.899999999,
                                "вагоносутки": 2205.0,
                                "ДППВПД_доходность": 1913472.6177051042,
                                "ДППВПД_маржинальная_рентабельность": 64.85337313292865,
                                "ДППВПД_условно_постоянные_расходы": 0,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": 13894970.899999999,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": 13894970.899999999,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": 13894970.899999999,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": 13894970.899999999,
                                "рентабельность_по_ebitda": 64.85337313292865,
                                "прибыль_до_налогооблажения": 13894970.899999999,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": 13894970.899999999,
                                "рентабельность_по_чистой_прибыли": 64.85337313292865
                            }
                        },
                        "СЛ": {
                            "вес": 473.828,
                            "погрузка": 7,
                            "расстояние_груженое": 23876.0,
                            "груженое_плечо": 23876.0,
                            "грузооборот": 1622074.948,
                            "производительность": [
                                10090.585294117647,
                                38963.924999999996,
                                25936.069153846158,
                                28344.45825,
                                26017.274999999998,
                                10338.39705882353,
                                43221.6
                            ],
                            "ДППВПД_выручка_от_оперирования": 1036810.0,
                            "ДППВПД_штрафы_к_получению": 0,
                            "ДППВПД_себестоимость": 666438.0,
                            "ДППВПД_условно_переменные_расходы": 666438.0,
                            "жд_тариф": 666438.0,
                            "тариф_порожний": 0,
                            "тариф_груженый": 666438.0,
                            "тариф_по_сопредельным_государствам": 0,
                            "привлечение": 0,
                            "доп_услуги": 0,
                            "ппс": 0,
                            "отстой": 0,
                            "прочие_услуги": 0,
                            "штрафы_к_уплате": 0,
                            "ДППВПД_маржинальный_доход": 370372.0,
                            "вагоносутки": 76.0,
                            "ДППВПД_доходность": 43265.99641779789,
                            "ДППВПД_маржинальная_рентабельность": 2.088700149572759,
                            "ДППВПД_условно_постоянные_расходы": 0,
                            "ДППВПД_аренда_пс": 0,
                            "ДППВПД_амортизация_пс": 0,
                            "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                            "ДППВПД_сервисное_обслуживание_пс": 0,
                            "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                            "ДППВПД_прочие_условно_постоянные_расходы": 0,
                            "ДППВПД_операционная_прибыль": 370372.0,
                            "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                            "ДПСВВА_себестоимость": 0,
                            "ДПСВВА_аренда_пс": 0,
                            "ДПСВВА_амортизация_пс": 0,
                            "ДПСВВА_сервисное_обслуживание_пс": 0,
                            "ПВОД_выручка": 0,
                            "выручка_от_оптовой_торговли": 0,
                            "выручка_от_реализации_металлолома": 0,
                            "выручка_от_агентской_деятельности": 0,
                            "прочая_выручка_от_основной_деятельности": 0,
                            "ПВОД_себестоимость": 0,
                            "ПВОД_себестоимость_реализованных_товаров": 0,
                            "ПВОД_себестоимость_реализованного_металлолома": 0,
                            "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                            "всего_операционная_прибыль": 370372.0,
                            "административно_хозяйственные_расходы": 0,
                            "административно_хозяйственные_расходы_и_амортизация": 0,
                            "прибыль_и_убыток_от_продаж": 370372.0,
                            "прочие_доходы_и_расходы": 0,
                            "прочие_доходы": 0,
                            "проценты_к_получению": 0,
                            "доходы_по_курсовым_разницам": 0,
                            "иные_прочие_доходы": 0,
                            "прочие_расходы": 0,
                            "проценты_к_уплате": 0,
                            "расходы_по_курсовым_разницам": 0,
                            "иные_прочие_расходы": 0,
                            "ebitda": 370372.0,
                            "рентабельность_по_ebitda": 2.088700149572759,
                            "прибыль_до_налогооблажения": 370372.0,
                            "налог_на_прибыль": 0,
                            "чистая_прибыль": 370372.0,
                            "рентабельность_по_чистой_прибыли": 2.088700149572759,
                            "-": {
                                "вес": 473.828,
                                "погрузка": 7,
                                "расстояние_груженое": 23876.0,
                                "груженое_плечо": 23876.0,
                                "грузооборот": 1622074.948,
                                "производительность": [
                                    10090.585294117647,
                                    38963.924999999996,
                                    25936.069153846158,
                                    28344.45825,
                                    26017.274999999998,
                                    10338.39705882353,
                                    43221.6
                                ],
                                "ДППВПД_выручка_от_оперирования": 1036810.0,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 666438.0,
                                "ДППВПД_условно_переменные_расходы": 666438.0,
                                "жд_тариф": 666438.0,
                                "тариф_порожний": 0,
                                "тариф_груженый": 666438.0,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": 370372.0,
                                "вагоносутки": 76.0,
                                "ДППВПД_доходность": 43265.99641779789,
                                "ДППВПД_маржинальная_рентабельность": 2.088700149572759,
                                "ДППВПД_условно_постоянные_расходы": 0,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": 370372.0,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": 370372.0,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": 370372.0,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": 370372.0,
                                "рентабельность_по_ebitda": 2.088700149572759,
                                "прибыль_до_налогооблажения": 370372.0,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": 370372.0,
                                "рентабельность_по_чистой_прибыли": 2.088700149572759
                            }
                        },
                        "null": {
                            "вес": 1322.0,
                            "погрузка": 19,
                            "расстояние_груженое": 67431.0,
                            "груженое_плечо": 67431.0,
                            "грузооборот": 4691778.0,
                            "производительность": [
                                61663.875,
                                62107.5,
                                61663.875,
                                62107.5,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                61663.875,
                                62107.5,
                                61663.875,
                                61663.875
                            ],
                            "ДППВПД_выручка_от_оперирования": 0,
                            "ДППВПД_штрафы_к_получению": 0,
                            "ДППВПД_себестоимость": 0,
                            "ДППВПД_условно_переменные_расходы": 0,
                            "жд_тариф": 0,
                            "тариф_порожний": 0,
                            "тариф_груженый": 0,
                            "тариф_по_сопредельным_государствам": 0,
                            "привлечение": 0,
                            "доп_услуги": 0,
                            "ппс": 0,
                            "отстой": 0,
                            "прочие_услуги": 0,
                            "штрафы_к_уплате": 0,
                            "ДППВПД_маржинальный_доход": 0,
                            "вагоносутки": 76.0,
                            "ДППВПД_доходность": 0,
                            "ДППВПД_маржинальная_рентабельность": 0,
                            "ДППВПД_условно_постоянные_расходы": 0,
                            "ДППВПД_аренда_пс": 0,
                            "ДППВПД_амортизация_пс": 0,
                            "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                            "ДППВПД_сервисное_обслуживание_пс": 0,
                            "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                            "ДППВПД_прочие_условно_постоянные_расходы": 0,
                            "ДППВПД_операционная_прибыль": 0,
                            "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                            "ДПСВВА_себестоимость": 0,
                            "ДПСВВА_аренда_пс": 0,
                            "ДПСВВА_амортизация_пс": 0,
                            "ДПСВВА_сервисное_обслуживание_пс": 0,
                            "ПВОД_выручка": 0,
                            "выручка_от_оптовой_торговли": 0,
                            "выручка_от_реализации_металлолома": 0,
                            "выручка_от_агентской_деятельности": 0,
                            "прочая_выручка_от_основной_деятельности": 0,
                            "ПВОД_себестоимость": 0,
                            "ПВОД_себестоимость_реализованных_товаров": 0,
                            "ПВОД_себестоимость_реализованного_металлолома": 0,
                            "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                            "всего_операционная_прибыль": 0,
                            "административно_хозяйственные_расходы": 0,
                            "административно_хозяйственные_расходы_и_амортизация": 0,
                            "прибыль_и_убыток_от_продаж": 0,
                            "прочие_доходы_и_расходы": 0,
                            "прочие_доходы": 0,
                            "проценты_к_получению": 0,
                            "доходы_по_курсовым_разницам": 0,
                            "иные_прочие_доходы": 0,
                            "прочие_расходы": 0,
                            "проценты_к_уплате": 0,
                            "расходы_по_курсовым_разницам": 0,
                            "иные_прочие_расходы": 0,
                            "ebitda": 0,
                            "рентабельность_по_ebitda": 0,
                            "прибыль_до_налогооблажения": 0,
                            "налог_на_прибыль": 0,
                            "чистая_прибыль": 0,
                            "рентабельность_по_чистой_прибыли": 0,
                            "-": {
                                "вес": 1322.0,
                                "погрузка": 19,
                                "расстояние_груженое": 67431.0,
                                "груженое_плечо": 67431.0,
                                "грузооборот": 4691778.0,
                                "производительность": [
                                    61663.875,
                                    62107.5,
                                    61663.875,
                                    62107.5,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    61663.875,
                                    62107.5,
                                    61663.875,
                                    61663.875
                                ],
                                "ДППВПД_выручка_от_оперирования": 0,
                                "ДППВПД_штрафы_к_получению": 0,
                                "ДППВПД_себестоимость": 0,
                                "ДППВПД_условно_переменные_расходы": 0,
                                "жд_тариф": 0,
                                "тариф_порожний": 0,
                                "тариф_груженый": 0,
                                "тариф_по_сопредельным_государствам": 0,
                                "привлечение": 0,
                                "доп_услуги": 0,
                                "ппс": 0,
                                "отстой": 0,
                                "прочие_услуги": 0,
                                "штрафы_к_уплате": 0,
                                "ДППВПД_маржинальный_доход": 0,
                                "вагоносутки": 76.0,
                                "ДППВПД_доходность": 0,
                                "ДППВПД_маржинальная_рентабельность": 0,
                                "ДППВПД_условно_постоянные_расходы": 0,
                                "ДППВПД_аренда_пс": 0,
                                "ДППВПД_амортизация_пс": 0,
                                "ДППВПД_текущий_ремонт_включая_запчасти": 0,
                                "ДППВПД_сервисное_обслуживание_пс": 0,
                                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                                "ДППВПД_операционная_прибыль": 0,
                                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                                "ДПСВВА_себестоимость": 0,
                                "ДПСВВА_аренда_пс": 0,
                                "ДПСВВА_амортизация_пс": 0,
                                "ДПСВВА_сервисное_обслуживание_пс": 0,
                                "ПВОД_выручка": 0,
                                "выручка_от_оптовой_торговли": 0,
                                "выручка_от_реализации_металлолома": 0,
                                "выручка_от_агентской_деятельности": 0,
                                "прочая_выручка_от_основной_деятельности": 0,
                                "ПВОД_себестоимость": 0,
                                "ПВОД_себестоимость_реализованных_товаров": 0,
                                "ПВОД_себестоимость_реализованного_металлолома": 0,
                                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                                "всего_операционная_прибыль": 0,
                                "административно_хозяйственные_расходы": 0,
                                "административно_хозяйственные_расходы_и_амортизация": 0,
                                "прибыль_и_убыток_от_продаж": 0,
                                "прочие_доходы_и_расходы": 0,
                                "прочие_доходы": 0,
                                "проценты_к_получению": 0,
                                "доходы_по_курсовым_разницам": 0,
                                "иные_прочие_доходы": 0,
                                "прочие_расходы": 0,
                                "проценты_к_уплате": 0,
                                "расходы_по_курсовым_разницам": 0,
                                "иные_прочие_расходы": 0,
                                "ebitda": 0,
                                "рентабельность_по_ebitda": 0,
                                "прибыль_до_налогооблажения": 0,
                                "налог_на_прибыль": 0,
                                "чистая_прибыль": 0,
                                "рентабельность_по_чистой_прибыли": 0
                            }
                        }
                    }
                },


                "вес": 144752.4900000005,
                "погрузка": 2268,
                "расстояние_груженое": 5459797.0,
                "груженое_плечо": 5459797.0,
                "грузооборот": 356098777.6849993,
                "производительность": [
                    28097.09,
                    17000.7904,
                    31772.399999999998
                ],
                "ДППВПД_выручка_от_оперирования": 284012199.8499998,
                "ДППВПД_штрафы_к_получению": 0,
                "ДППВПД_себестоимость": 234677959.02999982,
                "ДППВПД_условно_переменные_расходы": 233981895.23999986,
                "жд_тариф": 226028401.27999994,
                "тариф_порожний": 0,
                "тариф_груженый": 226028401.27999994,
                "тариф_по_сопредельным_государствам": 0,
                "привлечение": 7953493.960000001,
                "доп_услуги": 0,
                "ппс": 0,
                "отстой": 0,
                "прочие_услуги": 0,
                "штрафы_к_уплате": 0,
                "ДППВПД_маржинальный_доход": 57983798.57000006,
                "вагоносутки": 16118.0,
                "ДППВПД_доходность": 11228016.033367144,
                "ДППВПД_маржинальная_рентабельность": -288.55376847037115,
                "ДППВПД_условно_постоянные_расходы": 696063.7900000005,
                "ДППВПД_аренда_пс": 0,
                "ДППВПД_амортизация_пс": 485286.42000000045,
                "ДППВПД_текущий_ремонт_включая_запчасти": 210777.37,
                "ДППВПД_сервисное_обслуживание_пс": 0,
                "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов": 0,
                "ДППВПД_прочие_условно_постоянные_расходы": 0,
                "ДППВПД_операционная_прибыль": 57287734.78000005,
                "ДПСВВА_выручка_от_сдачи_в_аренду": 0,
                "ДПСВВА_себестоимость": 485286.42000000045,
                "ДПСВВА_аренда_пс": 0,
                "ДПСВВА_амортизация_пс": 485286.42000000045,
                "ДПСВВА_сервисное_обслуживание_пс": 0,
                "ПВОД_выручка": 0,
                "выручка_от_оптовой_торговли": 0,
                "выручка_от_реализации_металлолома": 0,
                "выручка_от_агентской_деятельности": 0,
                "прочая_выручка_от_основной_деятельности": 0,
                "ПВОД_себестоимость": 0,
                "ПВОД_себестоимость_реализованных_товаров": 0,
                "ПВОД_себестоимость_реализованного_металлолома": 0,
                "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности": 0,
                "всего_операционная_прибыль": 56802448.36000005,
                "административно_хозяйственные_расходы": 0,
                "административно_хозяйственные_расходы_и_амортизация": 0,
                "прибыль_и_убыток_от_продаж": 56802448.36000005,
                "прочие_доходы_и_расходы": 0,
                "прочие_доходы": 0,
                "проценты_к_получению": 0,
                "доходы_по_курсовым_разницам": 0,
                "иные_прочие_доходы": 0,
                "прочие_расходы": 0,
                "проценты_к_уплате": 0,
                "расходы_по_курсовым_разницам": 0,
                "иные_прочие_расходы": 0,
                "ebitda": 57773021.200000055,
                "рентабельность_по_ebitda": -289.4705110078888,
                "прибыль_до_налогооблажения": 56802448.36000005,
                "налог_на_прибыль": 0,
                "чистая_прибыль": 56802448.36000005,
                "рентабельность_по_чистой_прибыли": -301.17655376179664
            },
        }
    },

    computed: {
        getTh() {
            return this.alphabet.slice(0, 3)
        },
    },
    filters: {
        format(value) {
            if (value != "" && !!value) {
                let TwoSignNum = value?.toFixed(2)
                return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            }
            return value

        },

    },
    methods: {
        calculateSum(property, polygon, wagon_type) {
            let sum = 0;
            for (const index of Object.keys(this.file)) {
                if (this.CheckValue(index)) {
                    sum += parseFloat(this.file[index][wagon_type][polygon][property]) || 0;
                }
            }
            return sum;
        },
        calculateSumNotPolygon(wagon_type, property){
            let sum = 0;
            for (const index of Object.keys(this.file)) {
                if (this.CheckValue(index)) {
                    sum += parseFloat(this.file[index][wagon_type][property]) || 0;
                }
            }
            return sum;
        },
        calculateSumPolygon2(wagon_type, polygon, polygon2, property){
            let sum = 0;
            for (const index of Object.keys(this.file)) {
                if (this.CheckValue(index)) {
                    sum += parseFloat(this.file[index][wagon_type][polygon][polygon2][property]) || 0;
                }
            }
            return sum;
        },
        getNextKey(obj) {
            console.log(obj)
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let client of keys) {
                if (
                    client == "вес" ||
                    client == "погрузка" ||
                    client == "расстояние_груженое" ||
                    client == "груженое_плечо" ||
                    client == "грузооборот" ||
                    client == "производительность" ||
                    client == "ДППВПД_выручка_от_оперирования" ||
                    client == "ДППВПД_штрафы_к_получению" ||
                    client == "ДППВПД_себестоимость" ||
                    client == "ДППВПД_условно_переменные_расходы" ||
                    client == "жд_тариф" ||
                    client == "тариф_порожний" ||
                    client == "тариф_груженый" ||
                    client == "тариф_по_сопредельным_государствам" ||
                    client == "привлечение" ||
                    client == "доп_услуги" ||
                    client == "ппс" ||
                    client == "отстой" ||
                    client == "вагоносутки" ||
                    client == "ДППВПД_доходность" ||
                    client == "ДППВПД_маржинальная_рентабельность" ||
                    client == "ДППВПД_условно_постоянные_расходы" ||
                    client == "ДППВПД_аренда_пс" ||
                    client == "ДППВПД_амортизация_пс" ||
                    client == "ДППВПД_текущий_ремонт_включая_запчасти" ||
                    client == "ДППВПД_сервисное_обслуживание_пс" ||
                    client == "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов" ||
                    client == "ДППВПД_прочие_условно_постоянные_расходы" ||
                    client == "ДППВПД_операционная_прибыль" ||
                    client == "ДПСВВА_выручка_от_сдачи_в_аренду" ||
                    client == "ДПСВВА_себестоимость" ||
                    client == "ДПСВВА_аренда_пс" ||
                    client == "ДПСВВА_амортизация_пс" ||
                    client == "ДПСВВА_сервисное_обслуживание_пс" ||
                    client == "ПВОД_выручка" ||
                    client == "выручка_от_оптовой_торговли" ||
                    client == "выручка_от_реализации_металлолома" ||
                    client == "выручка_от_агентской_деятельности" ||
                    client == "прочая_выручка_от_основной_деятельности" ||
                    client == "ПВОД_себестоимость" ||
                    client == "ПВОД_себестоимость_реализованных_товаров" ||
                    client == "ПВОД_себестоимость_реализованного_металлолома" ||
                    client == "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности" ||
                    client == "всего_операционная_прибыль" ||
                    client == "административно_хозяйственные_расходы" ||
                    client == "административно_хозяйственные_расходы_и_амортизация" ||
                    client == "прибыль_и_убыток_от_продаж" ||
                    client == "прочие_доходы_и_расходы" ||
                    client == "прочие_доходы" ||
                    client == "проценты_к_получению" ||
                    client == "доходы_по_курсовым_разницам" ||
                    client == "иные_прочие_доходы" ||
                    client == "прочие_расходы" ||
                    client == "проценты_к_уплате" ||
                    client == "расходы_по_курсовым_разницам" ||
                    client == "иные_прочие_расходы" ||
                    client == "ebitda" ||
                    client == "рентабельность_по_ebitda" ||
                    client == "прибыль_до_налогооблажения" ||
                    client == "налог_на_прибыль" ||
                    client == "чистая_прибыль" ||
                    client == "рентабельность_по_чистой_прибыли"||
                    client == "прочие_услуги" ||
                    client == "штрафы_к_уплате" ||
                    client == "ДППВПД_маржинальный_доход" ) {
                    continue;
                } else {
                   
                    correctKeys.push(client);
                    
                }
            }
            console.log(correctKeys)
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },
            CheckValue(value) {
                let client = value;
                if (
                    client != "вес" &&
                    client != "погрузка" &&
                    client != "расстояние_груженое" &&
                    client != "груженое_плечо" &&
                    client != "грузооборот" &&
                    client != "производительность" &&
                    client != "ДППВПД_выручка_от_оперирования" &&
                    client != "ДППВПД_штрафы_к_получению" &&
                    client != "ДППВПД_себестоимость" &&
                    client != "ДППВПД_условно_переменные_расходы" &&
                    client != "жд_тариф" &&
                    client != "тариф_порожний" &&
                    client != "тариф_груженый" &&
                    client != "тариф_по_сопредельным_государствам" &&
                    client != "привлечение" &&
                    client != "доп_услуги" &&
                    client != "ппс" &&
                    client != "отстой" &&
                    client != "вагоносутки" &&
                    client != "ДППВПД_доходность" &&
                    client != "ДППВПД_маржинальная_рентабельность" &&
                    client != "ДППВПД_условно_постоянные_расходы" &&
                    client != "ДППВПД_аренда_пс" &&
                    client != "ДППВПД_амортизация_пс" &&
                    client != "ДППВПД_текущий_ремонт_включая_запчасти" &&
                    client != "ДППВПД_сервисное_обслуживание_пс" &&
                    client != "ДППВПД_расходы_на_оплату_труда_в_составе_производственных_расходов" &&
                    client != "ДППВПД_прочие_условно_постоянные_расходы" &&
                    client != "ДППВПД_операционная_прибыль" &&
                    client != "ДПСВВА_выручка_от_сдачи_в_аренду" &&
                    client != "ДПСВВА_себестоимость" &&
                    client != "ДПСВВА_аренда_пс" &&
                    client != "ДПСВВА_амортизация_пс" &&
                    client != "ДПСВВА_сервисное_обслуживание_пс" &&
                    client != "ПВОД_выручка" &&
                    client != "выручка_от_оптовой_торговли" &&
                    client != "выручка_от_реализации_металлолома" &&
                    client != "выручка_от_агентской_деятельности" &&
                    client != "прочая_выручка_от_основной_деятельности" &&
                    client != "ПВОД_себестоимость" &&
                    client != "ПВОД_себестоимость_реализованных_товаров" &&
                    client != "ПВОД_себестоимость_реализованного_металлолома" &&
                    client != "ПВОД_операционная_прибыль_по_прочим_видам_основной_деятельности" &&
                    client != "всего_операционная_прибыль" &&
                    client != "административно_хозяйственные_расходы" &&
                    client != "административно_хозяйственные_расходы_и_амортизация" &&
                    client != "прибыль_и_убыток_от_продаж" &&
                    client != "прочие_доходы_и_расходы" &&
                    client != "прочие_доходы" &&
                    client != "проценты_к_получению" &&
                    client != "доходы_по_курсовым_разницам" &&
                    client != "иные_прочие_доходы" &&
                    client != "прочие_расходы" &&
                    client != "проценты_к_уплате" &&
                    client != "расходы_по_курсовым_разницам" &&
                    client != "иные_прочие_расходы" &&
                    client != "ebitda" &&
                    client != "рентабельность_по_ebitda" &&
                    client != "прибыль_до_налогооблажения" &&
                    client != "налог_на_прибыль" &&
                    client != "чистая_прибыль" &&
                    client != "рентабельность_по_чистой_прибыли"&&
                    client != "прочие_услуги" &&
                    client != "штрафы_к_уплате" &&
                    client != "ДППВПД_маржинальный_доход" 
                ) {
                    return true;
                }
            },
        }
}
</script>