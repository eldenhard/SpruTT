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


            <div style="display: flex;justify-content: space-between;" v-show="visible">
                <section style="flex: 1 0 auto;">
                    <table>
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
                                <v-select v-model="new_comp" :options="all_agreement_number" label="agreement_number"></v-select>
                          
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
                <button class="Accept" @click="loadFromExcel()"
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
        <p class="amount">Таблица "Данные из Excel"</p>
        <table>
            <thead>
                <tr style="background: #e1e1e2">
                    <th style="border: 1px solid grey;">Действие</th>
                    <th style="border: 1px solid grey;">Станция отправления</th>
                    <th style="border: 1px solid grey;">Станция назначения</th>
                    <th style="border: 1px solid grey; position: relative;">Груз
                        <select name="" id="" style="width: 70%">
                            <option value="nameCargo">Наименование</option>
                            <option value="classCargo">Класс</option>
                        </select>
                    </th>
                    <template v-for="field in selectedFields">
                        <th :key="field" @click="deleteTH(field)" v-b-tooltip.hover
                            title="По клику удаление элемента шапки таблицы" class="deleteth"
                            style="border: 1px solid grey;">{{ field }}</th>
                    </template>

                    <th>
                        <b-dropdown id="dropdown-1" text="Добавить поле" class="m-md-2">
                            <b-dropdown-item @click="addField('Дорога назначения')">Дорога назначения</b-dropdown-item>
                            <b-dropdown-item @click="addField('Дорога отправления')">Дорога
                                отправления</b-dropdown-item>
                            <b-dropdown-item @click="addField('Коэффициент')">Коэффициент</b-dropdown-item>
                            <b-dropdown-item @click="addField('НДС')">НДС</b-dropdown-item>
                            <b-dropdown-item @click="addField('Оборот, сут')">Оборот, сут</b-dropdown-item>


                            <b-dropdown-item @click="addField('Ставка НДС')">Ставка НДС</b-dropdown-item>

                            <b-dropdown id="dropdown-2" text="Грузоподъемность" class="m-md-2" dropright>
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
                                <b-dropdown-item @click="addField('Грузоподъемность более 69 т')">Грузоподъемность более
                                    69 т</b-dropdown-item>
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
                        </b-dropdown>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                    <td class="deleteRow" @click="deleteRow(rowIndex)">Удалить</td>
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex" style="position: relative">
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






    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
        id="notif" />
</div></template>
  <!-- postTarifData -->
<script>
import Handsontable from "handsontable";
import api from "@/api/directory";
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
        ifIncludeValue() {

        },
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
        new_comp(){
            console.log(this.new_comp)
        },

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
        deleteTH(value) {
            return this.selectedFields.splice(this.selectedFields.indexOf(value), 1)
        },
        addField(field) {
            this.selectedFields.push(field); // Добавляем выбранный элемент в массив
        },
        // Загрузка из Excel в таблицу
        loadFromExcel() {
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
            // Обновляем tableData

            this.tableData = data;

            this.excelData = "";
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
  
<style lang="scss"  scoped>
body {
  font-family: 62.5%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: 90vh;
  background: #fff;
  display: flex;
  justify-content: center;
}

span {
  display: flex;

  img {
    width: 50px;
    margin-right: 20px;
  }
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

td,
th,
tr {
    border: none;
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
    background: #ffb0a2;
    color: grey !important;
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