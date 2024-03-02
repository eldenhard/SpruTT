<template>
    <div>

        <br>
        <Loader :loader="loader" />
        <div class="air_block">
            <div class="air_block_header"
                style="display: flex !important;justify-content: space-between !important; width: 100%;">
                <h5>Данные по ставкам (полувагоны)</h5>
                <h6 v-on:click="visible = !visible" style="padding-right: 4%; cursor: pointer">
                    {{ visible ? "Свернуть " : "Развернуть" }}
                </h6>
            </div>
            <hr />
            <br />
            <p class="explanation" v-if="picked != 'agreement_number'">
                АЛГОРИТМ РАБОТЫ: <br>
            <ol>
                <li>Создайте шапку требуемой таблицы (!) и нажмите кнопку "Подтвердить создание шапки"</li>
                <li>Обратите внимание, что страна назначения добавляется автоматически при выборе поля "станция". <br> Поле
                    страна заполнять не нужно, оно заполняется автоматически </li>
                <li>Скопируйте данные из Excel в область загрузки</li>
                <li>Нажмите загрузить в таблицу ( проверьте данные таблицы )</li>
            </ol>
            КАК НАЙТИ ДОГОВОР?
            <ol>
                <li>Выбрать контрагента</li>
                <li>В меню всех договор Вам станут доступны все договора по этому контрагенту</li>
            </ol>
            <br>
            Требования: <br>
            <ol>
                <li>Станция или дорога отправления/назначения всегда должны быть первыми</li>
                <li>Воспрещается ставить их в середину таблицы или конец !</li>
            </ol>
            </p>

            <div style="display: flex;justify-content: space-between;" v-show="visible">
                <!-- Выбран договор -->
                <section style="flex: 1 0 auto;">
                    <table>
                        <tr>
                            <td class="col1">Клиент <sup style="color: rgb(172, 9, 9); font-size: 18px">*</sup></td>
                            <td>
                                <input type="text" id="a" class="textarea" v-model="Standard.client" placeholder="Клиент" />
                            </td>
                        </tr>
                        <br />
                        <tr v-show="ten_visible">
                            <td></td>
                            <td>
                                <div class="textarea" style="height: auto; width: 100%; margin-bottom: 1%"
                                    v-show="ten_visible">
                                    <ul id="root_tenant">
                                        <li v-for="item in filter_client" :key="item.id" @click="checkClient(item.client)">
                                            <span>{{ item.client }}</span>
                                            <hr />
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>№ документа <sup style="color: rgb(172, 9, 9);font-size: 18px">*</sup></td>
                            <td>
                                <div style="display: flex; justify-content: space-between">
                                    <input type="radio" id="one1p" value="agreement_number" v-model="picked" />
                                    <label for="one1p">Договор</label>
                                    <br />
                                    <input type="radio" id="two2p" value="annex_number" v-model="picked" />
                                    <label for="two2p">Приложение</label>
                                    <br />
                                </div>

                                <input type="text" class="textarea" v-model.trim="Standard.agreement_number"
                                    :placeholder="placeholderAgreement" v-show="visible_inp_ag" />
                                <input type="text" class="textarea" v-model.trim="Standard.annex_number"
                                    :placeholder="placeholderAgreement" v-show="visible_inp_an" />
                            </td>
                        </tr>
                        <br />
                        <tr v-if="visible_agreement">
                            <td class="col1">Все договора <sup style="color: rgb(172, 9, 9); font-size: 18px">*</sup></td>
                            <td>
                                <v-select v-model="new_comp" :options="all_agreement_number"
                                    label="agreement_number"></v-select>

                                <!-- <select name="" id="data-select" v-model="agreement_number_test" @change="FullDocument()">
                                    <option :value="[item.agreement_number, item.client, item.id]"
                                        v-for="item in all_agreement_number" :key="item.id">
                                        {{ item.agreement_number }} {{ item.client }} {{ item.on_date }}
                                    </option>
                                </select> -->
                            </td>
                        </tr>
                        <br />

                        <tr>
                            <td class="col1">Дата начала <sup style="color: rgb(172, 9, 9); font-size: 18px">*</sup></td>
                            <td>
                                <input type="date" id="a" class="textarea" v-model="Standard.on_date" placeholder="Дата" />
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td class="col1">Дата окончания</td>
                            <td>
                                <input type="date" id="a" class="textarea" v-model="Standard.end_date" placeholder="Дата" />
                            </td>
                        </tr>
                        <br />
                        <tr v-if="picked !== 'agreement_number'">
                            <td class="col1">Дата начала действия ставки</td>
                            <td>
                                <label for="dateEqual">
                                    <input type="checkbox" id="dateEqual" v-model="checkEqualDate"> Дата действия = дате
                                    приложения</label>
                                <input type="date" id="a" class="textarea" v-model="Standard.stavka_date_begin"
                                    placeholder="Дата" :disabled="checkEqualDate" />
                            </td>
                        </tr>
                        <br />
                        <br />

                        <tr>
                            <td></td>
                            <td>
                                <button class="button Accept" style="height: 40px;" v-if="picked == 'agreement_number'"
                                    @click="createAgreement()">Создать договор</button>
                            </td>
                        </tr>

                    </table>

                </section>
                <!-- Выбрано приложение -->
                <section style="flex: 2 0 auto;" v-if="picked != 'agreement_number'">
                    <textarea v-model="excelData" placeholder="Вставьте данные из Excel сюда" class="textarea"
                        style="width: 100%;  margin-top: 8%; height: 25vh;"></textarea>
                    <button class="Accept" @click="loadFromExcel()" :disabled="active_load_button"
                        style="margin-top: 2%;width: 100%;margin-left: auto;height: 40px;">Загрузить в таблицу</button>
                    <br>
                    <button class="Request button" style="width: 100%; height: 40px; "
                        @click="active_load_button = !active_load_button">Подтвердить создание шапки</button>
                </section>
            </div>

            <br />
        </div>


        <div class="air_block" style="margin-top: 2%;" v-if="picked != 'agreement_number'">
            <section style="display: flex;justify-content: space-between; gap: 15px;">
                <button class="Delete button" style="width: 25%; height: 40px; margin-right: auto;"
                    @click="clearTable()">Очистить таблицу</button>
                <br>
                <button class="button Action" style="width: 25%; height: 40px;" @click="checkingData()">Проверка введеных
                    данных</button>
                <button class="Accept button" style="width: 25%; height: 40px;" @click="saveData()">Отправить данные и
                    создать приложение</button>
            </section>
            <br>
            <label for="">Маски шапки таблицы <br>
                <select v-model="maskHeadTable">
                    <option style="font-size: 16px;" value="1">Станция/Дорога/Страна отправления - Станция/Дорога/Страна
                        назначения- Груз наименование - Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                    <option style="font-size: 16px;" value="2">Станция/Дорога/Страна отправления - Станция/Дорога/Страна
                        назначения- <b>Код ЕТСНГ </b>- Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                    <option style="font-size: 16px;" value="3">Станция/Дорога/Страна отправления - Станция/Дорога/Страна
                        назначения- <b>Группа по ЕТСНГ</b> - Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                    <option style="font-size: 16px;" value="4">Станция/Дорога/Страна отправления - Станция/Дорога/Страна
                        назначения- <b>Класс груза</b> - Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                    <br>
                    <option style="font-size: 16px;" value="5">Множ.станция. - Станция/Дорога/Страна
                        назначения- Груз наименование - Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                    <option style="font-size: 16px;" value="6">Множ.станция. - Станция/Дорога/Страна
                        назначения- <b>Код ЕТСНГ </b>- Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                    <option style="font-size: 16px;" value="7">Множ.станция. - Станция/Дорога/Страна
                        назначения- <b>Группа по ЕТСНГ</b> - Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                    <option style="font-size: 16px;" value="8">Множ.станция. - Станция/Дорога/Страна
                        назначения- <b>Класс груза</b> - Ставка менее 75т - Ставка более 75т - Ставка НДС</option>
                </select>
            </label>

            <div class="info_block" style="display: flex; justify-content: start; gap: 15px; margin-top: 2%">
                <div>
                    <button
                        style="background: lightblue;  width: 10vw; padding: 1%; color: black; font-size: 14px; white-space: nowrap"
                        @click="info_block = !info_block">
                        Справочник стран
                    </button>
                    <br>
                    <div v-if="info_block">
                        <input type="search"
                            style="width: 100%; border: none; outline: none; border: 1px solid black; border-radius: 4px;"
                            placeholder="Поиск..." v-model="search_country">
                        <div style="max-height: 20vh; width: 100%; overflow: auto;">
                            <table>
                                <tr>
                                    <th style="border: 1px solid black">Наименование страны</th>
                                    <th style="border: 1px solid black">Сокращение</th>
                                </tr>
                                <tr v-for="name in all_roads" class="hover_tr" :key="name.id"
                                    @click="saveToCashUserData(name?.name, 'Страна')">
                                    <td style="border: 1px solid black">{{ name?.name }}</td>
                                    <td style="border: 1px solid black">{{ name?.short_name }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
                <div>
                    <button
                        style="background: lightblue;  width: 10vw; padding: 1%; color: black; font-size: 14px; white-space: nowrap"
                        @click="info_block2 = !info_block2">
                        Справочник дорог
                    </button>
                    <br>
                    <div v-if="info_block2">
                        <input type="search"
                            style="width: 100%; border: none; outline: none; border: 1px solid black; border-radius: 4px;"
                            placeholder="Поиск..." v-model="search_road">
                        <div style="max-height: 20vh; width: 100%; overflow: auto;">
                            <table>
                                <tr>
                                    <th style="border: 1px solid black">Наименование дороги</th>
                                    <th style="border: 1px solid black">Сокращение</th>
                                </tr>
                                <tr v-for="item, index in road_dictionary" :key="index" class="hover_tr"
                                    @click="saveToCashUserData(item, 'Дорога')">
                                    <th style="border: 1px solid black">{{ index }}</th>
                                    <th style="border: 1px solid black">{{ item }}</th>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
            </div>



            <table>
                <thead>
                    <tr style="background: #e1e1e2">
                        <th style="border: 1px solid grey;">Действие</th>

                        <template v-for="field in selectedFields">
                            <th :key="field" @click="deleteTH(field)" v-b-tooltip.hover
                                title="По клику удаление элемента шапки таблицы" class="deleteth"
                                style="border: 1px solid grey;">{{ field }}</th>
                        </template>

                        <th>
                            <b-dropdown id="dropdown-1" text="Добавить поле" dropup class="m-md-2">
                                <b-dropdown id="dropdown-2" text="Груз" class="m-md-2" dropleft style="width: 90%">
                                    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                                        значный)</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                                        (123*)</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                                        3)</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                                </b-dropdown>
                                <b-dropdown id="dropdown-2" dropleft text="Грузоподъемность" class="m-md-2"
                                    style="z-index: 50000000000 !important; width: 90%">
                                    <div style="height: 30vh; overflow-y: auto;">


                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность менее 65,5 т')">Ставка при:
                                            Грузоподъемность
                                            менее 65,5 т</b-dropdown-item>
                                        <hr>

                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность менее 66 т')">Ставка
                                            при: Грузоподъемность менее
                                            66 т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность 66 т')">Ставка при:
                                            Грузоподъемность 66
                                            т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность более 66 т')">Ставка
                                            при: Грузоподъемность более
                                            66 т</b-dropdown-item>
                                        <hr>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность менее 69 т')">Ставка
                                            при: Грузоподъемность менее
                                            69 т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность 69 т')">Ставка при:
                                            Грузоподъемность 69
                                            т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность более 69 т')">Ставка
                                            при: Грузоподъемность более
                                            69 т</b-dropdown-item>
                                        <hr>
                                        <b-dropdown-item
                                            @click="addField('Ставка при: Грузоподъемность менее 69,5 т')">Ставка
                                            при: Грузоподъемность
                                            менее 69,5 т</b-dropdown-item>
                                        <hr>
                                        <b-dropdown-item
                                            @click="addField('Ставка при: Грузоподъемность менее 70,3 т')">Ставка
                                            при: Грузоподъемность
                                            менее 70,3 т</b-dropdown-item>
                                        <hr>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность менее 71 т')">Ставка
                                            при: Грузоподъемность менее
                                            71 т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность 71 т')">Ставка при:
                                            Грузоподъемность 71
                                            т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность более 71 т')">Ставка
                                            при: Грузоподъемность более
                                            71 т</b-dropdown-item>
                                        <hr>

                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность менее 75 т')">Ставка
                                            при: Грузоподъемность менее
                                            75 т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность 75 т')">Ставка при:
                                            Грузоподъемность 75
                                            т</b-dropdown-item>
                                        <b-dropdown-item @click="addField('Ставка при: Грузоподъемность более 75 т')">Ставка
                                            при: Грузоподъемность более
                                            75 т</b-dropdown-item>
                                    </div>
                                </b-dropdown>


                                <b-dropdown-item
                                    @click="addField('Станция/Дорога/Страна отправления')">Станция/Дорога/Страна
                                    отправления</b-dropdown-item>
                                <b-dropdown-item @click="addField('Мн. станций отпр.')">Множество станций
                                    отправки</b-dropdown-item>
                                <b-dropdown-item @click="addField('Станция/Дорога/Страна назначения')">Станция/Дорога/Страна
                                    назначения</b-dropdown-item>
                                <b-dropdown-item @click="addField('Станция след.погр.')">Станция следующей
                                    погрузки</b-dropdown-item>
                                <b-dropdown-item @click="addField('Станции искл.назначения')">Станции исключения
                                    назначения</b-dropdown-item>
                                <b-dropdown-item @click="addField('Коэффициент')">Коэффициент</b-dropdown-item>
                                <b-dropdown-item @click="addField('Расстояние')">Расстояние</b-dropdown-item>
                                <b-dropdown-item @click="addField('НДС')">НДС</b-dropdown-item>
                                <b-dropdown-item @click="addField('Оборот, сут')">Оборот, сут</b-dropdown-item>
                                <b-dropdown-item @click="addField('Вагоны')">Вагоны</b-dropdown-item>

                                <b-dropdown-item @click="addField('Ставка НДС')">Ставка НДС</b-dropdown-item>


                                <!-- <b-dropdown id="dropdown-2" text="Тип отправки" class="m-md-2" dropright style="width: 85%">
                                    <b-dropdown-item @click="addField('Вагонная')">Вагонная</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Маршрутная')">Маршрутная</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Групповая: 2-5 ваг')">Групповая: 2-5
                                        ваг</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Групповая: 6-20 ваг')">Групповая: 6-20
                                        ваг</b-dropdown-item>

                                </b-dropdown> -->
                            </b-dropdown>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                        <td class="deleteRow" @click="deleteRow(rowIndex)" style="border: 1px solid black !important;">
                            Удалить</td>
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex"
                            style="position: relative; border: 1px solid black !important;">
                            {{ cell }}
                            <!-- <input v-model="tableData[rowIndex][cellIndex]" @click="editCell(rowIndex, cellIndex)"
                            @blur="saveCell()" @keyup.enter="saveCell(rowIndex, cellIndex)"
                            v-if="activeCell === `${rowIndex}-${cellIndex}`" ref="editableInput[rowIndex][cellIndex]"
                            class="editable-input" />
                        <div style="width: 100%" v-else @click="editCell(rowIndex, cellIndex)">
                            <span class="editable-text">{{ cell }}</span>
                        </div> -->
                        </td>
                    </tr>
                </tbody>
            </table>



        </div>

        <br><br> <br><br> <br><br>

        <stavkipvWatchDB></stavkipvWatchDB>

        <br><br>

        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />
    </div>
</template>
<script>
import Handsontable from "handsontable";
import api from "@/api/directory";
import apiWagon from '@/api/wagonPark';
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from '../../../loader/loader.vue';
import { mapState } from "vuex";
import vSelect from "vue-select";
import stavkipvWatchDB from "./stavkipvWatchDB.vue";
export default {
    components: {
        Loader,
        Notifications,
        vSelect,
        stavkipvWatchDB,
    },
    data() {
        return {
            search_country: "",
            search_road: "",
            info_block: false,
            info_block2: false,
            flagCheck: false,
            stationCache: {},
            countryCashe: {},
            cargoCashe: {},
            checkCompleteData: [], // данные для отпарвки на сервер
            maskHeadTable: "",

            checkEqualDate: null,
            visible: true,
            picked: "agreement_number",
            placeholderAgreement: "введите номер договора",
            Standard: {
                agreement_number: null,
                annex_number: null,
                on_date: null,
                end_date: null,
                client: "",
                base: null,
                responsible: null,
                stavka_date_begin: null,
            },
            visible_inp_an: false,
            visible_inp_ag: true,
            visible_agreement: false,
            all_agreement_number: [],
            agreement_number_test: "",
            ten_visible: false,
            new_comp: "",
            active_load_button: true,
            collectionStation: null,



            excelData: "",
            tableData: [],
            TableDataRTS: [],
            selectedFields: [],
            hot: null,
            activeCell: null,
            loader: false,
            // Уведомелния
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",

            allRoads: [],
            isDropdown2Visible: false,
            road_hadrcode: [
                { "id": 2, "code": 81, "name": "Австрия", "short_name": null }, { "id": 3, "code": 57, "name": "Азербайджан", "short_name": "АЗ" }, { "id": 4, "code": 41, "name": "Албания", "short_name": null }, { "id": 5, "code": 92, "name": "Алжир", "short_name": null }, { "id": 6, "code": 135, "name": "Андорра", "short_name": null }, { "id": 7, "code": 58, "name": "Армения", "short_name": "АРМ" }, { "id": 8, "code": 39, "name": "Афганистан", "short_name": "АРА" }, { "id": 16, "code": 139, "name": "Бангладеш", "short_name": null }, { "id": 20, "code": 21, "name": "Беларусь", "short_name": "БЧ" }, { "id": 74, "code": 88, "name": "Бельгия", "short_name": null }, { "id": 42, "code": 52, "name": "Болгария", "short_name": "БДЖ" }, { "id": 40, "code": 50, "name": "Босния и Герцеговина, Мусульманско-Хорватская Федерация", "short_name": null }, { "id": 38, "code": 44, "name": "Босния и Герцеговина, Сербская Республика", "short_name": null }, { "id": 57, "code": 70, "name": "Великобритания", "short_name": null }, { "id": 45, "code": 55, "name": "Венгрия", "short_name": "МАВ" }, { "id": 32, "code": 32, "name": "Вьетнам", "short_name": "ВЖД" }, { "id": 66, "code": 80, "name": "Германия", "short_name": null }, { "id": 60, "code": 73, "name": "Греция", "short_name": null }, { "id": 28, "code": 28, "name": "Грузия", "short_name": "ГР" }, { "id": 72, "code": 86, "name": "Дания", "short_name": null }, { "id": 1, "code": 99, "name": "Другие третьи страны", "short_name": null }, { "id": 75, "code": 90, "name": "Египет", "short_name": null }, { "id": 80, "code": 95, "name": "Израиль", "short_name": null }, { "id": 17, "code": 166, "name": "Индия", "short_name": null }, { "id": 18, "code": 167, "name": "Индонезия", "short_name": null }, { "id": 34, "code": 36, "name": "Ирак", "short_name": null }, { "id": 81, "code": 96, "name": "Иран", "short_name": "РАИ" }, { "id": 51, "code": 60, "name": "Ирландия", "short_name": null }, { "id": 58, "code": 71, "name": "Испания", "short_name": null }, { "id": 69, "code": 83, "name": "Италия", "short_name": null }, { "id": 30, "code": 30, "name": "КНДР", "short_name": "ЗЧ" }, { "id": 27, "code": 27, "name": "Казахстан", "short_name": "КЗХ" }, { "id": 50, "code": 59, "name": "Киргизия", "short_name": "КРГ" }, { "id": 33, "code": 33, "name": "Китай", "short_name": "КЖД" }, { "id": 24, "code": 25, "name": "Латвия", "short_name": "ЛДЗ" }, { "id": 83, "code": 98, "name": "Ливан", "short_name": null }, { "id": 23, "code": 24, "name": "Литва", "short_name": "ЛГ" }, { "id": 68, "code": 82, "name": "Люксембург", "short_name": null }, { "id": 53, "code": 65, "name": "Македония", "short_name": null }, { "id": 14, "code": 134, "name": "Мальта", "short_name": null }, { "id": 78, "code": 93, "name": "Марокко", "short_name": null }, { "id": 22, "code": 23, "name": "Молдова", "short_name": "ЧФМ" }, { "id": 13, "code": 129, "name": "Монако", "short_name": null }, { "id": 31, "code": 31, "name": "Монголия", "short_name": "УБЖД" }, { "id": 70, "code": 84, "name": "Нидерланды", "short_name": null }, { "id": 63, "code": 76, "name": "Норвегия", "short_name": null }, { "id": 41, "code": 51, "name": "Польша", "short_name": "ПКП" }, { "id": 79, "code": 94, "name": "Португалия", "short_name": null }, { "id": 52, "code": 61, "name": "Республика Корея", "short_name": "КОРЕЙЛ" }, { "id": 19, "code": 20, "name": "Россия", "short_name": "РЖД" }, { "id": 43, "code": 53, "name": "Румыния", "short_name": "ЧФР-Марфа" }, { "id": 56, "code": 68, "name": "Сербия", "short_name": null }, { "id": 82, "code": 97, "name": "Сирия", "short_name": null }, { "id": 46, "code": 56, "name": "Словакия", "short_name": "ЗССК" }, { "id": 65, "code": 79, "name": "Словения", "short_name": null }, { "id": 54, "code": 66, "name": "Таджикистан", "short_name": "ТДЖ" }, { "id": 11, "code": 118, "name": "Таиланд", "short_name": null }, { "id": 12, "code": 119, "name": "Тайвань", "short_name": null }, { "id": 76, "code": 91, "name": "Тунис", "short_name": null }, { "id": 55, "code": 67, "name": "Туркмения", "short_name": "ТРК" }, { "id": 62, "code": 75, "name": "Турция", "short_name": null }, { "id": 29, "code": 29, "name": "Узбекистан", "short_name": "УТЙ" }, { "id": 21, "code": 22, "name": "Украина", "short_name": "УЗ" }, { "id": 10, "code": 10, "name": "Финляндия", "short_name": null }, { "id": 73, "code": 87, "name": "Франция", "short_name": null }, { "id": 64, "code": 78, "name": "Хорватия", "short_name": null }, { "id": 39, "code": 49, "name": "Черногория", "short_name": null }, { "id": 44, "code": 54, "name": "Чехия", "short_name": "ЧД" }, { "id": 71, "code": 85, "name": "Швейцария", "short_name": null }, { "id": 61, "code": 74, "name": "Швеция", "short_name": null }, { "id": 26, "code": 26, "name": "Эстония", "short_name": "ЭВР" }, { "id": 59, "code": 72, "name": "Югославия", "short_name": "ЮЖ" }, { "id": 37, "code": 42, "name": "Япония", "short_name": null }
            ],
        };
    },
    mounted() {
        this.$root.$on('bv::dropdown::show', bvEvent => {
            if (bvEvent.componentId === 'dropdown-2') {
                this.isDropdown2Visible = true;
            }
        })
        this.$root.$on('bv::dropdown::hide', bvEvent => {
            if (bvEvent.componentId === 'dropdown-2') {
                this.isDropdown2Visible = false;
            }
            if (this.isDropdown2Visible) {
                bvEvent.preventDefault()
            }
        })
        apiWagon.getAllRoads()
            .then(response => {
                this.allRoads.push(response.data.data)
            })


    },
    computed: {
        ...mapState({
            name_client: (state) => state.client.name_client,
            name_cargo: (state) => state.cargo_code.cargo_code,
            uid: (state) => state.auth.uid,
            road: (state) => state.road.roadAsCountries

        }),
        // Поиск по all_roads

        all_roads() {
            if (this.search_country.length <= 1) {
                return this.road_hadrcode.sort((a, b) => (a.name > b.name ? 1 : -1))
            } else {
                return this.road_hadrcode.filter((road) => road.name.toLowerCase().includes(this.search_country.toLowerCase()))
            }
        },
        road_dictionary() {
            let directory = JSON.parse(localStorage.getItem('road'))
            if (this.search_road.length <= 1) {
                return directory
            } else {
                // Найти в объекте по ключу
                for (let i in directory) {
                    if (directory[i].toLowerCase().includes(this.search_road.toLowerCase())) {
                        return {
                            [i]: directory[i]
                        }
                    } else {
                        return directory
                    }
                }
                // return Object.keys(directory).filter((key) => directory[key].toLowerCase().includes(this.search_road.toLowerCase()))
            }
        },
        info_btn() {
            if (this.info_block == false) {
                return require(`@/assets/info.png`)
            } else {
                return require(`@/assets/cross.png`)
            }
        },
        filter_client() {
            if (this.Standard.client.length > 1) {
                this.ten_visible = true;
            }

            return this.Standard.client.length > 1
                ? this.name_client.filter((item) =>
                    item.client
                        .toLowerCase()
                        .includes(this.Standard.client.toLowerCase())
                )
                : "";
        },
        filter_cargo() {
            if (this.cargo_user.length > 1) {
                this.cargo_list = true;
            }
            return this.cargo_user.length > 1
                ? this.name_cargo.filter((item) =>
                    item.name.toLowerCase().includes(this.cargo_user.toLowerCase())
                )
                : "";
        },
    },
    watch: {
        'Standard.client': {
            handler(newValue, oldValue) {
                this.Standard.on_date = null
                this.Standard.agreement_number = null
                this.Standard.annex_number = null
                this.Standard.on_date = null
                this.Standard.end_date = null
                this.Standard.base = null
                this.Standard.stavka_date_begin = null
                this.all_agreement_number = []
                this.new_comp = null
            },
            deep: true

        },
        maskHeadTable() {
            if (this.maskHeadTable == 1) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Станция/Дорога/Страна отправления', 'Станция/Дорога/Страна назначения', 'Груз наимен', 'Грузоподъемность менее 75 т', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
            if (this.maskHeadTable == 2) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Станция/Дорога/Страна отправления', 'Станция/Дорога/Страна назначения', 'Код ЕТСНГ', 'Грузоподъемность менее 75 т', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
            if (this.maskHeadTable == 3) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Станция/Дорога/Страна отправления', 'Станция/Дорога/Страна назначения', 'Группа позиций по ЕТСНГ', 'Грузоподъемность менее 75 т', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
            if (this.maskHeadTable == 4) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Станция/Дорога/Страна отправления', 'Станция/Дорога/Страна назначения', 'Класс груза', 'Грузоподъемность менее 75 т', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
            if (this.maskHeadTable == 5) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Мн. станций отпр.', 'Станция/Дорога/Страна назначения', 'Груз наимен', 'Грузоподъемность менее 75 т', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
            if (this.maskHeadTable == 6) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Мн. станций отпр.', 'Станция/Дорога/Страна назначения', 'Код ЕТСНГ', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
            if (this.maskHeadTable == 7) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Мн. станций отпр.', 'Станция/Дорога/Страна назначения', 'Группа позиций по ЕТСНГ', 'Грузоподъемность менее 75 т', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
            if (this.maskHeadTable == 8) {
                if (this.selectedFields.length > 0) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Нельзя создать маску, при созданной шапке таблицы <br> Очистите таблицу и повторите попытку снова";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    this.maskHeadTable = ""
                    return
                }
                // Мн. станций отпр.
                //    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ (6-ти
                // значный)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по ЕТСНГ
                //                     (123*)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Класс груза')">Класс груза (1 или 2 или
                //                     3)</b-dropdown-item>
                //                 <b-dropdown-item @click="addField('Груз наимен')">Наименование груза</b-dropdown-item>

                this.selectedFields.push('Мн. станций отпр.', 'Станция/Дорога/Страна назначения', 'Класс груза', 'Грузоподъемность менее 75 т', 'Грузоподъемность более 75 т', 'Ставка НДС')
                this.maskHeadTable = ""
            }
        },
        checkEqualDate() {
            if (this.checkEqualDate == true) {
                this.Standard.stavka_date_begin = this.Standard.on_date
            } else {
                this.Standard.stavka_date_begin = null
            }

        },
        picked() {
            if (this.picked == "agreement_number") {
                this.placeholderAgreement = "введите номер договора";
                this.visible_agreement = false;
                this.visible_inp_ag = true;
                this.visible_inp_an = false;
                // this.Standard.annex_number = "";
                this.agreement_number_test = "";
                for (let i in this.Standard) {
                    this.Standard[i] = ""
                }
            } else {
                this.placeholderAgreement = "введите номер приложения";
                this.visible_agreement = true;
                this.visible_inp_ag = false;
                this.visible_inp_an = true;
                // this.Standard.agreement_number = "";
                for (let i in this.Standard) {
                    this.Standard[i] = ""
                }

            }
        },
        agreement_number_test() {
            console.log(this.agreement_number_test)
            this.flagCheck = false
        },
    },
    methods: {
        // Сохранить в кэш юзера
        saveToCashUserData(data, typeRoad) {
            navigator.clipboard.writeText(data)
                .then((res) => {
                    this.notifyHead = "Успешно";
                    this.notifyMessage = `${typeRoad}: ${data} скопирована в буфер обмена`;
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 4000);
                })
        },
        clearTable() {
            this.tableData = []
            this.selectedFields = []
            this.checkCompleteData = []
        },
        async checkingData() {
            this.flagCheck = false;
            this.loader = true;
            let stationNameSet = new Set();
            this.errorp = [];
            let DataValueFrom = [...this.tableData]
            // Сделать каждый массив из массива массивов объектом
            try {
                let newData = [];
                for (let i = 0; i < DataValueFrom.length; i++) {
                    const newObj = {};
                    const currentItem = DataValueFrom[i];
                    for (let j = 0; j < this.selectedFields.length; j++) {
                        let key = this.selectedFields[j];
                        let value = currentItem[j];
                        if (key === 'Станция/Дорога/Страна отправления') {
                            // Обработка для отправления
                            if (value.match(/[А-Я]{3}/) && !value.includes('Станции')) {
                                key = 'departure_station';
                                value = value.replace(/[А-Я]{3}/, '').trim()
                                stationNameSet.add(value)
                            } else if (value.match(/[А-Я]{3}/) && value.includes('Станции')) {
                                key = 'departure_road';
                                value = value.replace('Станции', '').trim().substring(0, 3).toUpperCase();
                            } else if (key === 'Станция/Дорога/Страна отправления') {
                                key = 'country_from';
                            }
                        }
                        else if (key === 'Станция/Дорога/Страна назначения') {
                            // Обработка для назначения
                            if (value.match(/[А-Я]{3}/) && !value.includes('Станции')) {
                                key = 'destination_station';
                                value = value.replace(/[А-Я]{3}/, '').trim()
                                stationNameSet.add(value)

                            } else if (value.match(/[А-Я]{3}/) && value.includes('Станции')) {
                                key = 'destination_road';
                                value = value.replace('Станции', '').trim().substring(0, 3).toUpperCase();
                            } else if (key === 'Станция/Дорога/Страна назначения') {
                                key = 'country_to';
                            }

                        }
                        else if (key === 'Станция след.погр.') {
                            key = 'next_loading_stations_list'
                            value = value.replace(/[А-Я]{3}/g, '').trim().split(',')
                        }
                        else if (key === 'Станции искл.назначения') {
                            key = 'exclude_next_loading_stations_list'
                            value = value.replace(/[А-Я]{3}/g, '').trim().split(',')
                        }
                        else if (key === 'Мн. станций отпр.') {
                            key = 'departure_stations_list'
                            value = value.replace(/\s[А-Я]{3}/g, "/").split("/")

                            value = value.map(item => item.replaceAll(',', "").trim()).filter((item) => item !== "")
                            // .map(item => item.replace(/\s[А-Я]{3}/g, "").trim()).split(',')
                            // .map(item => item.replace(/\s[А-Я]{3}/g, "").trim()).split(',')
                        }
                        else if (key === 'Коэффициент') {
                            key = 'k'
                            value = Number(value.replace(',', '.'))
                        }
                        else if (key === 'НДС') {
                            key = 'nds'
                            value = Number(value)
                        }
                        else if (key === 'Cтавка НДС') {
                            key = 'stavka_nds'
                            value = Number(value)
                        }
                        else if (key === 'Оборот, сут') {
                            key = 'turnover'
                            value = value
                        }
                        else if (key === 'Группа позиций по ЕТСНГ') {
                            key = 'cargo_type'
                            value = 'mask'
                            newObj['cargo_var'] = currentItem[j].replace(/[^0-9]/g, "").slice(0, 3)
                        }
                        else if (key === 'Класс груза') {
                            key = 'cargo_type'
                            value = 'dangerous_code'
                            // получить из строки только числа
                            newObj['cargo_var'] = currentItem[j].replace(/[^0-9]/g, "").slice(0, 1)
                        }
                        else if (key === 'Код ЕТСНГ') {
                            key = 'cargo_type'
                            value = 'etsng'
                            newObj['cargo_var'] = currentItem[j]
                        }
                        else if (key === 'Расстояние') {
                            key = 'distance'
                            value = Number(value?.replace(',', '.'))
                        }
                        else if (key === 'Груз наимен') {
                            key = 'cargos_list'
                            value = String(value.replaceAll(',', ';'))
                        } else if (key === 'Вагоны') {
                            key = 'wagons'
                        }
                        newObj[key] = value;
                    }
                    newData.push(newObj);
                }
                DataValueFrom = newData;
            } catch (error) {
                console.error(error);
            }

            // Добавление стандартных параметров к данным
            for (let i in DataValueFrom) {
                Object.assign(DataValueFrom[i], this.Standard);
            }

            // // Создание новых данных на основе преобразованных данных
            let new_data = await this.createNewData(DataValueFrom);
            console.log(new_data, new_data);
            this.loader = false;
            // Вывод сообщения при отсутствии ошибок
            if (this.errorp.length == 0) {
                this.flagCheck = true;
                this.checkCompleteData = new_data;
                console.log(this.checkCompleteData, this.checkCompleteData)
                this.notifyHead = "Успешно";
                this.notifyMessage = "Данные проверку прошли!";
                this.notifyClass = "wrapper-success";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3000);
            }
        },


        // Занесение данных в New_data Для отдачи н7а сервер данных приведенных, но не измененных на клиенте
        async createNewData(DataValueFrom) {
            const newData = [];
            for (const [index, item] of DataValueFrom.entries()) {
                const newItem = { ...item };

                if (item.destination_station) {
                    try {
                        const code = await this.getStationCode(item.destination_station, index);
                        if (code !== null) {
                            newItem.destination_station = code.code;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении кода для станции "${item.destination_station}" на индексе ${index}`, error);
                    }
                }
                if (item.departure_station) {
                    try {
                        const code = await this.getStationCode(item.departure_station, index);
                        if (code !== null) {
                            newItem.departure_station = code.code;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении кода для станции "${item.departure_station}" на индексе ${index}`, error);
                    }
                }
                if (item.departure_road) {
                    try {
                        const code = await this.getRoadMiniName(item.departure_road, index);
                        if (code !== null) {
                            newItem.departure_road = code;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении дороги отпарвления "${item.departure_road}" на индексе ${index}`, error);
                    }
                }
                if (item.destination_road) {
                    try {
                        const code = await this.getRoadMiniName(item.destination_road, index);
                        if (code !== null) {
                            newItem.destination_road = code;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении дороги отпарвления "${item.destination_road}" на индексе ${index}`, error);

                    }
                }
                if (item.country_from) {
                    try {
                        const code = await this.getCountryId(item.country_from, index);
                        if (code !== null) {
                            newItem.country_from = code;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении страны"${item.country_from}" на индексе ${index}`, error);
                    }
                }
                if (item.country_to) {
                    try {
                        const code = await this.getCountryId(item.country_to, index);
                        if (code !== null) {
                            newItem.country_to = code;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении страны"${item.country_to}" на индексе ${index}`, error);
                    }
                }
                if (item.next_loading_stations_list) {
                    try {
                        let dataForResponse = item.next_loading_stations_list.map((station) => this.getStationCode(station, index));
                        let promiseResults = await Promise.allSettled(dataForResponse);

                        // Фильтруем только успешные промисы и получаем коды станций
                        let codes = promiseResults
                            .filter((result) => result.status === "fulfilled" && result.value && result.value.id)
                            .map((result) => result.value.id);

                        if (codes.length > 0) {
                            newItem.next_loading_stations_list = codes;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении кода для станции "${item.next_loading_stations_list}" на индексе ${index}: ${error}`);
                    }
                }
                if (item.exclude_next_loading_stations_list) {
                    try {
                        let dataForResponse = item.exclude_next_loading_stations_list.map((station) => this.getStationCode(station, index));
                        let promiseResults = await Promise.allSettled(dataForResponse);
                        console.log(promiseResults)
                        // Фильтруем только успешные промисы и получаем коды станций
                        let codes = promiseResults
                            .filter((result) => result.status === "fulfilled" && result.value && result.value.id)
                            .map((result) => result.value.id);

                        console.log(codes, 'codes')
                        if (codes.length > 0) {

                            newItem.exclude_next_loading_stations_list = codes;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении кода для станции "${item.exclude_next_loading_stations_list}" на индексе ${index}: ${error}`);
                    }
                }
                if (item.departure_stations_list) {
                    try {
                        let dataForResponse = item.departure_stations_list.map((station) => this.getStationCode(station, index));
                        let promiseResults = await Promise.allSettled(dataForResponse);
                        console.log(promiseResults)
                        // Фильтруем только успешные промисы и получаем коды станций
                        let codes = promiseResults
                            .filter((result) => result.status === "fulfilled" && result.value && result.value.id)
                            .map((result) => result.value.id);

                        console.log(codes, 'codes')
                        if (codes.length > 0) {

                            newItem.departure_stations_list = codes;
                        }
                    } catch (error) {
                        console.error(`Ошибка при получении кода для станции "${item.departure_stations_list}" на индексе ${index}: ${error}`);
                    }
                }
                if (item.cargos_list) {
                    newItem.cargos_list = []; // Инициализируем массив для исключений следующей погрузки
                    for (const cargo of item.cargos_list.split(";")) {
                        try {
                            const cargo_name = await this.getCargoCode(cargo, index);
                            if (cargo_name !== null) {
                                newItem.cargos_list.push(cargo_name);
                            }
                        } catch (error) {
                            console.error(`Ошибка при обработке груза "${item.cargos_list}" на индексе ${index}`, error);
                        }
                    }
                }
                if (item.wagons) {
                    newItem.wagons = []; // Инициализируем массив для исключений следующей погрузки
                    for (const wagon of item.wagons.split(',')) {

                        try {
                            const wagon_id = await this.getWagonData(wagon, index);
                            if (wagon_id !== null) {
                                newItem.wagons.push(wagon_id);
                            }
                        } catch (error) {
                            console.error(`Ошибка при обработке вагона "${item.wagons}" на индексе ${index}`, error);
                        }
                    }
                }
                newData.push(newItem);
                // console.log(newData)
            }
            if (this.errorp.length > 0) {
                this.flagCheck = false;
                this.notifyHead = "Ошибка. Не найдены данные";
                this.notifyMessage = this.errorp.filter(
                    (item) => !item.includes("NaN")
                );
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 10000);
            } else {
                this.notifyHead = "Успешно";
                this.notifyMessage = "Ошибок нет, отправка данных возможна";
                this.notifyClass = "wrapper-success";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 10000);
            }

            return newData;
        },
        // Функция для обработки стран
        async getCountryId(country_name, index, name_cells) {
            try {
                if (this.road.length === 0) {
                    throw new Error("Пожалуйста, дождитесь синхронизации данных. Индикация в правом верхнем углу");
                }

                const lowerCountryName = country_name.toLowerCase(); // Приводим ввод пользователя к нижнему регистру
                const country = this.road.find(item => item.name.toLowerCase() === lowerCountryName);
                console.log(country)
                if (!country) {
                    throw new Error(`Не удалось найти страну: "${country_name}" на строке ${index + 1}. Уточните существующие страны в справочнике на этой странице`);
                }

                return country.id;
            } catch (error) {
                this.errorp.push(error.message);
                return null; // Возвращаем null в случае ошибки
            }
        },
        // Функция для поиска сокращений стран по LocalStorage
        async getRoadMiniName(station_name, index) {
            try {
                const roads = JSON.parse(localStorage.getItem('road'));
                let road = null;
                for (const key in roads) {
                    if (roads[key] === station_name) {
                        road = key
                        break; // Прерываем цикл после нахождения соответствия
                    }
                }
                if (road === null) {
                    throw new Error(`Ошибка при нахождении дороги "${station_name}" на строке ${index + 1}.`);
                }
                let response = await apiWagon.getAllRoads(road);
                road = response.data.data.filter((item) => item.name.toLowerCase() === road.toLowerCase() + ' ж. д.')[0]?.id;
                console.log(road, 'Дорога')
                return road;
            } catch (error) {
                this.errorp.push(error.message);
                return null; // Возвращаем null в случае ошибки
            }
        },
        // Функция меммоизации
        async getStationCode(station_name, index, name_cells) {
            try {
                if (this.stationCache[station_name]) {
                    return this.stationCache[station_name];
                } else {
                    const response = await apiWagon.getCurrentStation(station_name);
                    const server_response = response.data.data.map((item) => item.name.toLowerCase()); // Получаем все имена станций в нижнем регистре
                    const lowerStationName = station_name.toLowerCase(); // Приводим ввод пользователя к нижнему регистру
                    const stationNameMatch = server_response.find((name) => name === lowerStationName); // Ищем точное совпадение имени станции
                    if (stationNameMatch == undefined) {
                        const res = await apiWagon.getCurrentStationByName(station_name);

                        // Добавьте проверку на наличие данных и кода в ответе
                        if (!res.data || !res.data.data || res.data.data.length === 0 || !res.data.data[0].code) {
                            throw new Error(`Ошибка: Не удалось получить код станции "${station_name}"(код) на строке ${index + 1} `);
                        }

                        const stationCode2 = res.data.data[0];
                        this.$set(this.stationCache, station_name, stationCode2);
                        return stationCode2;
                    }
                    if (stationNameMatch) {
                        const stationIndex = server_response.indexOf(stationNameMatch);
                        const stationCode6 = response.data.data[stationIndex]; // Получаем все данные по станациям

                        this.$set(this.stationCache, station_name, stationCode6);
                        return stationCode6;
                    } else {
                        throw new Error(
                            `Совпадений для станции "${station_name}"(код) не найдено на строке ${index + 1
                            } `
                        );
                    }
                }
            } catch (error) {
                this.errorp.push(error.message);
                return null; // Возвращаем null в случае ошибки
            }
        },
        // Получение данных по номерам вагонов
        async getWagonData(wagonNumber, index) {
            try {
                const response = await apiWagon.getWagon(wagonNumber);
                console.log(response.data, response.status)
                // Проверяем, получены ли данные о вагоне
                if (!response.data || response.data.length === 0 || response.status == '404') {
                    throw new Error(`Данные о вагоне "${wagonNumber}" не найдены`);
                }
                // Возвращаем данные о вагоне
                return response.data.id
            } catch (error) {
                if (error.response.status == '404') {
                    this.errorp.push(`Данные о вагоне "${wagonNumber}" не найдены`);
                }
                return null; // Возвращаем null в случае ошибки
            }
        },
        // Функция для обработки грузов введеных как наименование
        async getCargoCode(cargos_list, index) {
            try {
                if (this.cargoCashe[cargos_list]) {
                    return this.cargoCashe[cargos_list];
                } else {
                    const response = await apiWagon.getCargoCodeSearch(cargos_list);
                    const server_response = response.data.data.map((item) => item.name.toLowerCase()); // Получаем все имена грузов в нижнем регистре
                    const lowerCargoName = cargos_list.toLowerCase(); // Приводим ввод пользователя к нижнему регистру
                    const cargoNameMatch = server_response.find((name) => name === lowerCargoName); // Ищем точное совпадение имени груза
                    if (cargoNameMatch == undefined) {
                        const res = await apiWagon.getCargoCodeSearch(cargos_list);

                        // Добавьте проверку на наличие данных и кода в ответе
                        if (!res.data || !res.data.data || res.data.data.length === 0) {
                            throw new Error(`Ошибка: Не удалось найти груз: "${cargos_list}" на строке ${index + 1}`);
                        }

                        const cargoCode2 = cargos_list
                        this.$set(this.cargoCashe, cargos_list);
                        return cargos_list;
                    }
                    if (cargoNameMatch) {
                        const cargoIndex = server_response.indexOf(cargoNameMatch);
                        const cargoCode6 = response.data.data[cargoIndex]; // Получаем все данные по станациям

                        this.$set(this.cargoCashe, cargos_list);
                        return cargos_list;
                    } else {
                        throw new Error(
                            `Совпадений для груза "${cargos_list}" не найдено на строке ${index + 1} `
                        );
                    }
                }
            } catch (error) {
                this.errorp.push(error.message);
                return null; // Возвращаем null в случае ошибки
            }
        },

        createAgreement() {
            this.loader = true
            let agreement = [{
                agreement_number: this.Standard.agreement_number,
                on_date: this.Standard.on_date,
                end_date: this.Standard.end_date,
                client: this.Standard.client,
                wagon_type: 'Полувагон'
            }]
            api.postTarifData(agreement)
                .then(response => {
                    this.loader = false
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Договор создан";
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                }).catch((error) => {
                    this.loader = false
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = `Договор не создан! Повторите попытку позже`;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                })
        },
        // Получить все договора по клиенту
        getAgreementByClient() {
            this.loader = true
            api.getAllDocumentsByClient(this.Standard.client)
                .then(response => {
                    this.loader = false

                    this.all_agreement_number = response.data.data
                    if (this.all_agreement_number.length == 0) {
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = `Договоры у контрагента ${this.Standard.client} не найдены`;
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 5000);
                    } else {
                        this.notifyHead = "Успешно";
                        this.notifyMessage = "Договоры получены";
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 3000);
                    }

                }).catch((error) => {
                    this.loader = false
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Договора не получены! Повторите попытку позже";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                    console.error(error)
                })
        },
        // Заполнить поля приложения из выбранного договора
        FullDocument() {
            this.Standard.agreement_number = this.agreement_number_test[0];
            this.Standard.client = this.agreement_number_test[1];
            this.Standard.base = this.agreement_number_test[2];
            // console.log(this.agreement_number_test)
        },
        // Выбор клиента для селекта
        checkClient(value) {
            this.Standard.client = value;
            this.$nextTick(() => {
                if (this.picked != 'agreement_number') {
                    this.getAgreementByClient()
                }
                this.ten_visible = false;
                this.cargo_list = false;
            })
        },
        // Удалить элемент шапки таблицы
        deleteTH(value) {
            return this.selectedFields.splice(this.selectedFields.indexOf(value), 1)
        },
        // Добавить элемент шапки таблицы
        addField(field) {
            if (this.selectedFields.includes(field)) return
            this.selectedFields.push(field);
        },
        // Загрузка из Excel в таблицу
        loadFromExcel() {
            if (this.selectedFields.length < 1) {
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Вы не заполнили шапку таблицы!";
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3000);
                this.active_load_button = true
                return
            }
            const excelData = this.excelData;
            // Парсим данные из Excel, разделяя их по строкам и столбцам
            const rows = excelData.split("\n");
            const data = rows.map((row) => row.split("\t"));

            // Уничтожаем текущий экземпляр Handsontable, если он существует
            if (this.hot) {
                this.hot.destroy();
            }
            for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                for (
                    let cellIndex = 0;
                    cellIndex < data[rowIndex].length;
                    cellIndex++
                ) {
                    if (data[rowIndex][cellIndex].trim() === "") {
                        data[rowIndex][cellIndex] = "0";
                    }
                }
            }
            // Инициализируем Handsontable внутри <tbody> и передаем данные
            const tbody = document.querySelector("tbody");
            this.hot = new Handsontable(tbody, {
                data: data,
                colHeaders: false, // Отключаем заголовки столбцов
                rowHeaders: false, // Отключаем заголовки строк
            });
            for (let i of data) {
                if (i.length == 1) {
                    data.splice(data.indexOf(i), 1);
                }
            }

            this.tableData = data;

            // КОНЕЦ РАБОЧЕГО КОДА
            this.excelData = "";
        },

        async saveData() {

            if (!this.flagCheck) {
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Вы не прошли проверку данных!";
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3000);
                return
            }
            try {
                this.loader = true;
                // Добавление данных о грузоподъемности
                const translationMap = {
                    'Станция отправления': 'departure_station',
                    'Станция назначения': 'destination_station',
                    'Дорога назначения': 'destination_road',
                    'Дорога отправления': 'departure_road',
                    'Коэффициент': 'k',
                    'НДС': 'nds',
                    'Cтавка НДС': 'stavka_nds',
                    'Оборот, сут': 'turnover',
                    "Группа позиций по ЕТСНГ": "mask",
                    "Класс груза": 'dangerous_code',
                    "Код ЕТСНГ": 'etsng'
                };

                const capacityIndices = this.selectedFields.reduce((acc, field, index) => {
                    if (field.includes('Грузоподъемность')) {
                        acc.push(index);
                    }
                    return acc;
                }, []);
                let finallyDataToSend
                if (capacityIndices.length > 1) {
                    const transformedData = this.checkCompleteData.map(item => {
                        const capacityFields = Object.keys(item).filter(key => key.includes('Грузоподъемность'));
                        const stavkaField = Object.keys(item).find(key => this.selectedFields.includes(key));
                        const data = [];

                        capacityFields.forEach(capacityField => {
                            let capacity_compare;
                            let capacity_value_match;
                            let capacity_value;
                            let stavka
                            // let stavka_nds
                            if (capacityField) {
                                capacity_compare = capacityField.includes('менее') ? 'less' : capacityField.includes('более') ? 'more' : 'equal';
                                capacity_value_match = capacityField.match(/[0-9]+/);
                                capacity_value = parseFloat(capacity_value_match ? capacity_value_match[0] : 0);

                                stavka = Number(item[capacityField].replaceAll(' ', '').replace(',', '.')); // Получаем значение по ключу capacityField
                            }



                            const cargos_list = Array.isArray(item.cargos_list) ? item.cargos_list.join(';') : '';

                            const capacityObject = { capacity_compare, capacity_value, stavka, cargos_list };

                            for (const key in item) {
                                const newKey = translationMap[key] || key;
                                capacityObject[newKey] = item[key] || '';
                            }

                            data.push(capacityObject);
                        });

                        return data;
                    });

                    // Собираем все данные в один массив объектов
                    finallyDataToSend = transformedData.flat().map(item => ({
                        ...item,
                        nds: parseFloat((item && item.nds ? item.nds.replace(',', '.') : 0) || 0),
                        client: this.Standard?.client,
                        agreement_number: this.Standard.annex_number,
                        on_date: this.Standard.on_date,
                        end_date: this.Standard.end_date,
                        base: this.new_comp?.id,
                        responsible: this.uid,
                        wagon_type: 'Полувагон',
                        // cargos_list: item.cargos_list.join(';')
                    }));

                    console.log(finallyDataToSend, 'if');
                } else {
                    const transformedData = this.checkCompleteData.map(item => {
                        const capacityField = Object.keys(item).find(key => key.includes('Грузоподъемность'));
                        const stavkaField = Object.keys(item).find(key => this.selectedFields.includes(key));
                        let capacity_compare;
                        let capacity_value_match;
                        let capacity_value;
                        let stavka
                        // let stavka_nds;

                        if (capacityField) {
                            capacity_compare = capacityField.includes('менее') ? 'less' : capacityField.includes('более') ? 'more' : 'equal';
                            capacity_value_match = capacityField.match(/[0-9]+/);
                            capacity_value = parseFloat(capacity_value_match ? capacity_value_match[0] : 0);
                            stavka = stavkaField ? parseFloat(item[stavkaField].replace(/[^0-9,]/g, '').replace(',', '.')) || 0 : 0;

                            // console.log(capacityField)
                            // stavka_nds = Number(item[capacityField]) || 0; // Получаем значение по ключу capacityField
                        }

                        const cargos_list = Array.isArray(item.cargos_list) ? item.cargos_list.join(';') : '';

                        const capacityObject = { capacity_compare, capacity_value, stavka, cargos_list };

                        for (const key in item) {
                            const newKey = translationMap[key] || key;
                            capacityObject[newKey] = item[key] || '';
                        }

                        return capacityObject;
                    });
                    // Собираем все данные в огдин массив объектов
                    finallyDataToSend = transformedData.flat().map(item => ({
                        ...item,
                        nds: parseFloat((item && item.nds ? item.nds.replace(',', '.') : 0) || 0),
                        client: this.Standard?.client,
                        agreement_number: this.Standard.annex_number,
                        on_date: this.Standard.on_date,
                        end_date: this.Standard.end_date,
                        base: this.new_comp?.id,
                        responsible: this.uid,
                        wagon_type: 'Полувагон',
                        // cargos_list: item.cargos_list.join(';')
                    }));
                    console.log(finallyDataToSend, 'else')
                }
                for (let i in finallyDataToSend) {
                    if (finallyDataToSend[i].cargos_list) {
                        finallyDataToSend[i].cargos_list = finallyDataToSend[i].cargos_list.join(';');
                    } else {
                        finallyDataToSend[i].cargos_list = ""
                    }
                    if (finallyDataToSend[i].stavka_date_begin == "") {
                        finallyDataToSend[i].stavka_date_begin = null
                    }
                    if (finallyDataToSend[i].on_date == "") {
                        finallyDataToSend[i].on_date = null
                    }
                    if (finallyDataToSend[i].end_date == "") {
                        finallyDataToSend[i].end_date = null
                    } if (finallyDataToSend[i]['Ставка НДС']) {
                        finallyDataToSend[i].stavka_nds = Number(finallyDataToSend[i]['Ставка НДС']?.replace(',', '.'))
                    }
                    if (isNaN(finallyDataToSend[i].stavka)) {
                        console.log('ошибка ставки')
                        throw new Error(`<br> Ставка не может быть обработа. Проверьте поле ставок. <br> Строка: ${i}`);
                    }
                }
                console.log(finallyDataToSend, 'finallyDataToSend')
                api.postTarifData(finallyDataToSend)
                    .then(response => {
                        console.log(response)
                        this.loader = false
                        this.tableData = []
                        this.notifyHead = "Успешно";
                        this.notifyMessage = "Данные отправлены!";
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 2000);
                    }).catch((err) => {
                        console.log(err)
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = err.response.data;
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 5500);
                    })

            } catch (error) {
                console.error("Ошибка в блоке try:", error);
                this.loader = false;
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Очистите таблицу и повторите загрузку повторно! " + error.message;
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3500);
            }

        },

        editCell(rowIndex, cellIndex) {
            this.activeCell = `${rowIndex} -${cellIndex} `;
            //  Этот блок кода выполняется в следующем такте рендера Vue, что позволяет убедиться, что DOM-элементы обновлены после изменения activeCell.
            this.$nextTick(() => {
                const input = this.$refs.editableInput;
                if (input && input[rowIndex] && input[rowIndex][cellIndex]) {
                    input[rowIndex][cellIndex].focus();
                }
            });
        },
        deleteRow(rowIndex) {
            this.tableData.splice(rowIndex, 1);
            if (this.hot) {
                this.hot.loadData(this.tableData);
            }
        },
        saveCell() {
            this.activeCell = null; // Завершаем редактирование ячейки
        },
    },
};
</script>
  
<style  scoped>
button:disabled {
    background: lightgray;
}

.col1 {
    border: none !important;
}

tr,
td,
th {
    border: none;
}

.hover_tr:hover {
    background: #cfcfcf !important;
}

.deleteth {
    background: rgb(139, 144, 148);
}

.deleteth:hover {
    background: lightcoral !important;
}

.btn-group_tarif {
    width: 30%;
    margin-left: auto;
}

.btn-group_tarif button {
    margin-top: 2%;
    width: 80%;
    margin-left: auto;
    height: 40px;
}

.dropdown-menu li {
    position: relative;
}

.dropdown-menu .dropdown-submenu {
    display: none;
    position: absolute;
    left: 100%;
    top: -7px;
}

.dropdown-menu .dropdown-submenu-left {
    right: 100%;
    left: auto;
}

.dropdown-menu>li:hover>.dropdown-submenu {
    display: block;
}



.editable-input {
    width: 100%;
}

.editable-text {
    cursor: pointer;
}


.radio {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    padding: 1%;
    gap: 5%;
}

.radio label {
    font-size: 16px;
    font-weight: bold;
}

.deleteRow {
    background: #ca8b8b;
    color: rgb(0, 0, 0) !important;
}

.deleteRow:hover {
    background: #b94343;
    color: rgb(0, 0, 0) !important;
}

table {
    margin-top: 4%;
}

.air_block {
    width: 100%;
    height: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    padding: 1%;
    transform: translate(-50%, 0);
}

.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}
</style>