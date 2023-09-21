<template>
    <div>
        <h1 align="center">Раздел находится в разработке</h1>
        <div>

        </div>
        <Loader :loader="loader" />
        <div class="getDataExcel">

            <div class="dataAct">

                <label for="">№ договора <br />
                    <input type="text" v-model="act_number" class="textarea" />
                </label>
                <label for="">Дата акта<br />
                    <input type="date" v-model="act_date" class="textarea" />
                </label>
            </div>

            <textarea v-model="excelData" placeholder="Вставьте данные из Excel сюда" class="textarea"></textarea>
            <button class="Accept" @click="loadFromExcel()">Загрузить</button>
        </div>

        <table class="table-hover">
            <thead>
                <tr class="table-secondary" style="background: #e1e1e2">
                    <th></th>
                    <th>Станция отправления</th>
                    <th>Станция назначения</th>
                    <th>Груз</th>
                    <template v-for="field in selectedFields">
                        <th :key="field" @click="deleteTH(field)">{{ field }}</th>
                    </template>
                    <th>
                        <b-dropdown id="dropdown-1" text="Добавить поле" class="m-md-2">
                            <b-dropdown-item @click="addField('Оборот, сут')">Оборот, сут</b-dropdown-item>
                            <b-dropdown-item @click="addField('НДС')">НДС</b-dropdown-item>
                            <b-dropdown-item @click="addField('Коэффициент')">Коэффициент</b-dropdown-item>
                            <b-dropdown id="dropdown-2" text="Ставка по тарифу" class="m-md-2" dropright>
                                <b-dropdown-item @click="addField('Ставка без НДС')">Ставка без НДС</b-dropdown-item>
                                <b-dropdown-item @click="addField('Ставка с 20% НДС')">Ставка с 20% НДС</b-dropdown-item>
                                <b-dropdown-item @click="addField('Ставка 0% НДС')">Ставка 0% НДС</b-dropdown-item>
                            </b-dropdown>

                            <b-dropdown id="dropdown-2" text="Грузподъемность" class="m-md-2" dropright>
                                <b-dropdown-item @click="addField('Грузподъемность менее 66 т')">Грузподъемность менее 66
                                    т</b-dropdown-item>
                                <b-dropdown-item @click="addField('Грузподъемность более 66 т')">Грузподъемность более 66
                                    т</b-dropdown-item>
                                <b-dropdown-item @click="addField('Грузподъемность менее 69 т')">Грузподъемность менее 69
                                    т</b-dropdown-item>
                                <b-dropdown-item @click="addField('Грузподъемность более 69 т')">Грузподъемность более 69
                                    т</b-dropdown-item>
                                <b-dropdown-item @click="addField('Грузподъемность менее 71 т')">Грузподъемность менее 71
                                    т</b-dropdown-item>
                                <b-dropdown-item @click="addField('Грузподъемность более 71 т')">Грузподъемность более 71
                                    т</b-dropdown-item>
                                <b-dropdown-item @click="addField('Грузподъемность менее 75 т')">Грузподъемность менее 75
                                    т</b-dropdown-item>
                                <b-dropdown-item @click="addField('Грузподъемность более 75 т')">Грузподъемность более 75
                                    т</b-dropdown-item>

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







        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />
    </div>
</template>
  
<script>
import Handsontable from "handsontable";
import api from "@/api/directory";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from '../../../loader/loader.vue';
export default {
    components: {
        Loader,
        Notifications,
    },
    data() {
        return {
            excelData: "",
            tableData: [],
            TableDataRTS: [],
            selectedFields: [],
            hot: null,
            activeCell: null,
            sericeRTS: "service5",
            act_number: "",
            act_date: "",
            loader: false,

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
    methods: {
        deleteTH(value) {
            return this.selectedFields.splice(this.selectedFields.indexOf(value), 1)
        },
        addField(field) {
            this.selectedFields.push(field); // Добавляем выбранный элемент в массив
        },
        sendData() {
            if (this.act_number == "" || this.act_date == "") {
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Заполните поля № договора/Дата акта";
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 2500);
                return;
            }
            this.loader = true;
            let new_obj = this.tableData.map((item) => {
                return {
                    wagon: item[0].trim(),
                    from_cargo: item[1].trim(),
                    arrival_date: item[2].split(".").reverse().join("-"),
                    parking_begin_date: item[3].split(".").reverse().join("-"),
                    departure_date: item[4].split(".").reverse().join("-"),
                    days: Number(item[5].trim()),
                    service1: item[6].trim(),
                    service2: item[7].trim(),
                    service3: item[8].trim(),
                    service4: item[9].trim(),
                    service5: item[10].trim(),
                    service6: item[11].trim(),
                    cost: Number(item[12].replace(" ", "").replace(",", ".")) ?? null,
                    act_number: this.act_number,
                    act_date: this.act_date,
                    contractor: this.table_type,
                };
            });
            api
                .postOtherChanges(new_obj)
                .then((response) => {
                    this.loader = false;
                    this.tableData = [];
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Данные отправлены";
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2500);
                })
                .catch((error) => {
                    this.loader = false;
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Данные не отправлены, повторите позже";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2500);
                });
        },
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
  
<style lang="scss" scoped>
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

.Accept {
    margin-top: 2%;
    width: 25%;
    margin-left: auto;
    height: 40px;
}

.editable-input {
    width: 100%;
}

.editable-text {
    cursor: pointer;
}

.dataAct {
    display: flex;
    flex-direction: column;

    label {
        width: 100%;
    }

    input {
        width: 100%;
    }
}

.getDataExcel {
    display: flex;
    width: 25%;
    position: relative;
    margin-left: auto !important;
    flex-direction: column;

    textarea {
        width: 100%;
        margin-top: 2%;
    }

    button {
        margin-top: 2%;
        width: 100%;
    }
}

.radio {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 5px;
    padding: 1%;
    gap: 5%;

    label {
        font-size: 16px;
        font-weight: bold;
    }
}

.deleteRow {
    background: rgb(255, 176, 162);
    color: grey !important;
}

table {
    margin-top: 4%;
}
</style>