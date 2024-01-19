<template>
    <div>
        <h1 align="center">Раздел находится в разработке</h1>
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
            <p class="explanation">
                АЛГОРИТМ РАБОТЫ: <br>
            <ol>
                <li>Создайте шапку требуемой таблицы (!) и нажмите кнопку "Шапка создана"</li>
                <li>Обратите внимание, что страна назначения добавляется автоматически при выборе поля "станция". <br> Поле
                    страна заполнять не нужно, оно заполняется автоматически </li>
                <li>Скопируйте данные из Excel в область загрузки</li>
                <li>Нажмите загрузить в таблицу ( проверьте данные таблицы )</li>
            </ol>
            <br>
            Требования: <br>
            <ol>
                <li>Станция или дорога отправления/назначения всегда должны быть первыми</li>
                <li>Воспрещается ставить их в середину или иное место !</li>
                <li></li>
            </ol>
            </p>

            <div style="display: flex;justify-content: space-between;" v-show="visible">
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
                        <tr v-show="visible_agreement">
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
                <section style="flex: 2 0 auto;">
                    <textarea v-model="excelData" placeholder="Вставьте данные из Excel сюда" class="textarea"
                        style="width: 100%;  margin-top: 8%; height: 25vh;"></textarea>
                    <button class="Accept" @click="loadFromExcel()" :disabled="active_load_button"
                        style="margin-top: 2%;width: 100%;margin-left: auto;height: 40px;">Загрузить в таблицу</button>
                </section>
            </div>

            <!-- <div class="btn-group_tarif" v-show="visible">
                <button class="button Action" @click="checkingData()">
                    Проверка введеных данных
                </button>
                <button class="button Request" @click="data = []" v-show="visible">
                    Очистить таблицу
                </button>
                <button class="button Accept" @click="postData()" v-show="visible">
                    Отправить данные
                </button>
            </div> -->
            <br />
        </div>


        <div class="air_block" style="margin-top: 2%;">
            <section style="display: flex;align-items: end; gap: 15px; flex-direction: column;">
                <!-- <button class="Action button" style="width: 15%; height: 40px;">Преобразовать данные</button> -->
                <button class="Request button" style="width: 15%; height: 40px;"
                    @click="active_load_button = !active_load_button">Шапка создана</button>
                <button class="Accept button" style="width: 15%; height: 40px;" @click="saveData()">Отправить
                    данные</button>
            </section>
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
                            <b-dropdown id="dropdown-1" text="Добавить поле" class="m-md-2">
                                <b-dropdown id="dropdown-2" text="Груз" class="m-md-2" dropright style="width: 85%">
                                    <b-dropdown-item @click="addField('Код ЕТСНГ')">Код ЕТСНГ</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Группа позиций по ЕТСНГ')">Группа позиций по
                                        ЕТСНГ</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Класс груза')">Класс груза</b-dropdown-item>
                                </b-dropdown>
                                <b-dropdown-item @click="addField('Станция отправления')">Станция
                                    отправления</b-dropdown-item>
                                <b-dropdown-item @click="addField('Станция назначения')">Станция
                                    назначения</b-dropdown-item>
                                <b-dropdown-item @click="addField('Дорога отправления')">Дорога
                                    отправления</b-dropdown-item>
                                <b-dropdown-item @click="addField('Дорога назначения')">Дорога
                                    назначения</b-dropdown-item>
                                <b-dropdown-item @click="addField('Коэффициент')">Коэффициент</b-dropdown-item>
                                <b-dropdown-item @click="addField('НДС')">НДС</b-dropdown-item>
                                <b-dropdown-item @click="addField('Оборот, сут')">Оборот, сут</b-dropdown-item>


                                <b-dropdown-item @click="addField('Ставка НДС')">Ставка НДС</b-dropdown-item>

                                <b-dropdown id="dropdown-2" text="Грузоподъемность" class="m-md-2" dropright>
                                    <b-dropdown-item @click="addField('Грузоподъемность менее 65,5 т')">Грузоподъемность
                                        менее 65,5 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность менее 66 т')">Грузоподъемность менее
                                        66 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность 66 т')">Грузоподъемность 66
                                        т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность более 66 т')">Грузоподъемность более
                                        66 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность менее 69 т')">Грузоподъемность менее
                                        69 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность 69 т')">Грузоподъемность 69
                                        т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность менее 69,5 т')">Грузоподъемность
                                        менее 69,5 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность более 69 т')">Грузоподъемность более
                                        69 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность менее 70,3 т')">Грузоподъемность
                                        менее 70,3 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность менее 71 т')">Грузоподъемность менее
                                        71 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность 71 т')">Грузоподъемность 71
                                        т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность более 71 т')">Грузоподъемность более
                                        71 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность менее 75 т')">Грузоподъемность менее
                                        75 т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность 75 т')">Грузоподъемность 75
                                        т</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Грузоподъемность более 75 т')">Грузоподъемность более
                                        75 т</b-dropdown-item>
                                </b-dropdown>
                                <b-dropdown id="dropdown-2" text="Тип отправки" class="m-md-2" dropright style="width: 85%">
                                    <b-dropdown-item @click="addField('Вагонная')">Вагонная</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Маршрутная')">Маршрутная</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Групповая: 2-5 ваг')">Групповая: 2-5
                                        ваг</b-dropdown-item>
                                    <b-dropdown-item @click="addField('Групповая: 6-20 ваг')">Групповая: 6-20
                                        ваг</b-dropdown-item>

                                </b-dropdown>
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

        <br><br><br>


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

export default {
    components: {
        Loader,
        Notifications,
        vSelect,
    },
    data() {
        return {
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

            isDropdown2Visible: false,
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

    },
    computed: {
        ...mapState({
            name_client: (state) => state.client.name_client,
            name_cargo: (state) => state.cargo_code.cargo_code,
            uid: (state) => state.auth.uid,
        }),

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
        picked() {
            if (this.picked == "agreement_number") {
                this.placeholderAgreement = "введите номер договора";
                this.visible_agreement = false;
                this.visible_inp_ag = true;
                this.visible_inp_an = false;
                this.Standard.annex_number = "";
                this.agreement_number_test = "";
            } else {
                this.placeholderAgreement = "введите номер приложения";
                this.visible_agreement = true;
                this.visible_inp_ag = false;
                this.visible_inp_an = true;
                this.Standard.agreement_number = "";
            }
        },
        agreement_number_test() {
            console.log(this.agreement_number_test)
            this.flagCheck = false
        },
    },
    methods: {
        // Создать договор
        createAgreement() {
            let agreement = [{
                agreement_number: this.Standard.agreement_number,
                on_date: this.Standard.on_date,
                end_date: this.Standard.end_date,
                client: this.Standard.client,
            }]
            api.postTarifData(agreement)
                .then(response => {
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Договор создан";
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                }).catch((error) => {
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
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Договора получены";
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
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
            if (value == 'Станция отправления') {
                this.selectedFields.splice(this.selectedFields.indexOf(value), 1)
                this.selectedFields.splice(this.selectedFields.indexOf('Дорога отправления'), 1)
            }
            else if (value == 'Станция назначения') {
                this.selectedFields.splice(this.selectedFields.indexOf(value), 1)
                this.selectedFields.splice(this.selectedFields.indexOf('Дорога назначения'), 1)
            } else {
                return this.selectedFields.splice(this.selectedFields.indexOf(value), 1)
            }

        },
        // Добавить элемент шапки таблицы
        addField(field) {
            if (this.selectedFields.includes(field)) return

            if (field == 'Станция отправления') {
                this.selectedFields.push(field); // Добавляем выбранный элемент в массив
                this.selectedFields.push('Дорога отправления');
            } else if (field == 'Станция назначения') {
                this.selectedFields.push(field); // Добавляем выбранный элемент в массив
                this.selectedFields.push('Дорога назначения');
            } else {
                this.selectedFields.push(field);
            }
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
            // ВЕРНУТЬ КАК ДОДЕЛАЕШЬ
            // if(data[0].length != this.selectedFields.length){
            //     this.notifyHead = "Ошибка";
            //     this.notifyMessage = "Кол-во столбцов шапки не соответствует количеству столбцов загружаемых из источника !";
            //     this.notifyClass = "wrapper-error";
            //     this.showNotify = true;
            //     setTimeout(() => {
            //         this.showNotify = false;
            //     }, 4000);
            //     this.active_load_button = true
            //     return
            // }
            if (this.selectedFields[0].includes('Станция')) {
                this.tableData = data.map(item => {
                    const firstElementParts = item[0].match(/^(.*?)([А-Я]{3}[^ ]*)/);
                    const secondElementParts = item[1].match(/^(.*?)([А-Я]{3}[^ ]*)/);

                    return [
                        firstElementParts ? firstElementParts[1].trim() : '',
                        firstElementParts ? firstElementParts[2].trim() : '',
                        // Второй элемент массива
                        secondElementParts ? secondElementParts[1].trim() : '',
                        secondElementParts ? secondElementParts[2].trim() : '',
                        ...item.slice(3)
                        // ... (остальные элементы оставляем без изменений)
                    ];
                });
            } else if (this.selectedFields[0].includes('Дорога')) {
                this.tableData = data.map(item => {
                    const firstElementParts = item[0].match(/^(.*?)([А-Я]{3}[^ ]*)/);
                    const secondElementParts = item[1].match(/^(.*?)([А-Я]{3}[^ ]*)/);

                    return [
                        // firstElementParts ? firstElementParts[1].trim() : '',
                        firstElementParts ? firstElementParts[2].trim() : '',
                        // Второй элемент массива
                        // secondElementParts ? secondElementParts[1].trim() : '',
                        secondElementParts ? secondElementParts[2].trim() : '',
                        ...item.slice(3)
                        // ... (остальные элементы оставляем без изменений)
                    ];
                });
            } else {
                this.tableData = data
            }
            // console.log(this.selectedFields)


            this.excelData = "";
        },
        // Отправка данных на сервер
        async saveData() {

            this.collectionStation = new Set()
            this.tableData.forEach((item) => {
                this.collectionStation.add(item[0])
                this.collectionStation.add(item[2])
            })
            let response
            for (let item of Array.from(this.collectionStation)) {
                let request = await apiWagon.getCurrentStation(item)
                response = await request.data.data.filter((el) => el.name.toLowerCase() == item.toLowerCase())[0]
                this.tableData.forEach((rowData) => {
                    if (rowData[0] === item) {
                        rowData[0] = response.code
                    }
                    if (rowData[2] === item) {
                        rowData[2] = response.code
                    }
                })
            }
            console.log(this.tableData)

            // let request = Array.from(collectionStation).map((item) => apiWagon.getCurrentStation(item));

            // Promise.allSettled(request)
            //     .then(responses => {
            //         const matchedResponses = responses
            //             .filter(response => response.status === 'fulfilled' && response.value.data && response.value.data.data)
            //             .map(response => response.value.data.data.filter(item => item.name?.toLowerCase().trim() === collectionStation[index]?.toLowerCase().trim()))
            //             .flat();

            //         console.log(matchedResponses);
            //     });
            // console.log(Array.from(collectionStation))
            // console.log(this.tableData)
        },



        editCell(rowIndex, cellIndex) {
            this.activeCell = `${rowIndex}-${cellIndex}`;
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