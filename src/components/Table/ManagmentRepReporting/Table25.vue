<template>
    <div>
        <Loader :loader="loader" />
        <p>Форма 4.25. "Сводные показатели деятельности"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />

<div style="margin-top: 4%; overflow: auto;">
        <table>
            <thead>
                <tr>
                    <th>Показатель</th>
                    <th>Всего в т.ч</th>
                    <template v-for="month in Object.keys(file)">
                        <th v-if="CheckValue(month)">Всего в {{ checkMonth(month) }}</th>
                    </template>
                </tr>
                <tr class="RowAlphabet">
                    <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                </tr>
          
            </thead>
            <tbody v-if="Object.keys(file).length > 1">
                <tr>
                    <td :colspan="HowManyNewCells">ДЕЯТЕЛЬНОСТЬ ПО ПРЕДОСТАВЛЕНИЮ ВАГОНОВ ПОД ПОГРУЗКУ</td>
                </tr>
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
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
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
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
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
                
<!-- Не считал общий --> <br><br>
<tr> 
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
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
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
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
                <tr class="Total_1">
                    <td>Тариф груженный всего</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'тариф_груженый') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['тариф_груженый'] | format}}</td>
                    </template>
                </tr>
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
                <tr class="Total_1">
                    <td>Тариф по сопредельным государствам всего</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'тариф_по_сопредельным_государствам') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['тариф_по_сопредельным_государствам'] | format}}</td>
                    </template>
                </tr>
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
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
                        <td :key="index" v-if="CheckValue(index)">{{ data['Цистерна']?.отстой | format}}</td>
                    </template>
                </tr>
                <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Цистерна' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('отстой', polygon, 'Цистерна') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon]?.отстой | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Цистерна' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Цистерна', polygon,poligon2,  'отстой') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Цистерна'][polygon][poligon2]?.отстой | format }}</td>
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
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
                <tr class="Total_1">
                    <td>Отстой ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'отстой') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']?.отстой | format}}</td>
                    </template>
                </tr>
                <!-- <template v-for="(item, indication) in file">
                    <template v-for="group in getNextKey(item)">
                        <template v-for="polygon in getNextKey(item[group])" v-if="group === 'Полувагон' && CheckValue(indication)" >
                            <tr class="Total_grey">
                                <td >Объем - полигон {{ polygon.toLowerCase() }}</td>
                                <td>{{ calculateSum('отстой', polygon, 'Полувагон') | format }}</td>
                                <template v-for="index in Object.keys(file)">
                                    <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon]?.отстой | format }}</td>
                                </template>
                            </tr>
                            <template v-for="poligon2 in getNextKey(item[group][polygon])"> 
                                <tr v-if="group === 'Полувагон' && CheckValue(indication) && poligon2.trim() !== ''">
                                    <td class="pre_amount">{{ poligon2 }}</td>
                                    <td>{{ calculateSumPolygon2('Полувагон', polygon,poligon2,  'отстой') | format }}</td>
                                    <template v-for="index in Object.keys(file)">
                                        <td :key="index" v-if="CheckValue(index)">{{ file[index]['Полувагон'][polygon][poligon2]?.отстой | format }}</td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </template>
                </template> -->
                <tr class="Total_1">
                    <td>Прочие услуги ПВ</td>
                    <td>{{ calculateSumNotPolygon('Полувагон', 'прочие_услуги') | format }}</td>
                    <template v-for="(data, index) in file">
                        <td :key="index" v-if="CheckValue(index)">{{ data['Полувагон']['прочие_услуги'] | format}}</td>
                    </template>
                </tr>
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
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
                <!-- <template v-for="(item, indication) in file">
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
                </template> -->
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

                <!-- <template v-for="(item, indication) in file">
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
                </template> -->



                <!-- снизу все работает --> <br><br><br><br>
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
                    <td :key="index" v-if="CheckValue(index)">{{ file['ДППВПД_условно_постоянные_расходы'] | format}}</td>
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
                    <th :colspan="HowManyNewCells">ДЕЯТЕЛЬНОСТЬ ПО СДАЧЕ ВАГОНОВ В АРЕНДУ</th>
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
                    <th :colspan="HowManyNewCells">ПРОЧИЕ ВИДЫ ОСНОВНОЙ ДЕЯТЕЛЬНОСТИ</th>
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
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    />
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
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import check from './check.json'

export default {
    components: {
        Periods,
        Notifications,
        Loader,
    },
    data() {
        return {
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            file:check,
            amount_cols: 2,
            loader: false,
            date_begin: "",
            date_end: "",
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },

    computed: {
        
        getTh() {
            return this.alphabet.slice(0, this.amount_cols+1)
        },
        HowManyNewCells() {
            if (this.getCollection) {
                return this.getCollection.length + 2
            }
        },
        getCollection() {
            this.amount_cols = 2
            let newCollection = new Set()
            for (let i in this.file) {
                if (typeof this.file[i] == 'object') {
                    for (let month in this.file[i]) {
                        if (this.CheckValue(month)) {
                            newCollection.add(month)
                        }
                    }
                    this.amount_cols = 2 + [...newCollection].length - 1
                    return [...newCollection]
                }
                return
            }
        }
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
        checkMonth(val){
            if(val.includes('-')){
                return val
            } else {
            let month = ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек']
               return month.filter((_, index) => val-1 == index)[0]
            }
        },
        calculateSum(property, polygon, wagon_type) {
            let sum = 0;
            for (const index of Object.keys(this.file)) {
                if (this.CheckValue(index)) {
                    console.log(this.file[index][wagon_type][polygon], 'calculateSum')
                    if(this.file[index][wagon_type][polygon] === 'undefined') continue
                    sum += (this.file[index][wagon_type][polygon][property]) ?? 0;
                }
            }
            return sum;
        },
        calculateSumNotPolygon(wagon_type, property){
            let sum = 0;
            for (const index of Object.keys(this.file)) {
                if (this.CheckValue(index)) {
                    console.log(this.file[index][wagon_type], 'calculateSumNotPolygon')
                    if(this.file[index][wagon_type] === 'undefined') continue

                    sum += (this.file[index][wagon_type][property]) ?? 0;
                }
            }
            return sum;
        },
        calculateSumPolygon2(wagon_type, polygon, polygon2, property){
            let sum = 0;
            for (const index of Object.keys(this.file)) {
                if (this.CheckValue(index)) {
                    console.log(this.file[index][wagon_type][polygon][polygon2], 'calculateSumPolygon2')
                    if(this.file[index][wagon_type][polygon][polygon2] === 'undefined') continue

                    sum += (this.file[index][wagon_type][polygon][polygon2][property]) ?? 0;
                }
            }
            return sum;
        },
        getNextKey(obj) {
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
        Actioned() {
            try {
                this.loader = true;
                api.getUO425(this.date_begin, this.date_end)
                    .then((response) => {
                        this.loader = false;
                        this.file = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    this.showNotify = true;
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = `Таблица не создана, повторите запрос позже. ${error}`;
                    this.notifyClass = "wrapper-error";
                    this.loader = false;
                    setTimeout(() => (this.showNotify = false), 3000);
                        this.loader = false;
                    });
            } catch (error) {
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