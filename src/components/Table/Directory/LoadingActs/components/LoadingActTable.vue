<template>
    <div>
        <button class="mini_button Request" style="margin-left: auto;" @click="clearTable()">Очистить таблицу</button>
        <br>
        <button class="mini_button Accept" style="margin-left: auto;" @click="saveDataAndsendServer()">Сохранить
            данные</button>
        <br>
        <!-- Таблица для кнопок удаления столбцов -->
        <div style="overflow: auto;">
            <table>
                <tr class="tr_delete_cols">

                    <!-- Для каждого заголовка создаем кнопку удаления столбца -->
                    <td v-for="(header, index) in headers" :key="index">
                        <button class="mini" @click="deleteColumn(index)">Удалить столб</button>
                    </td>
                </tr>
            </table>
            <br>
            <table>
                <!-- Строка с инпутами для каждого заголовка -->
                <tr>
                    <td v-for="(header, index) in headers" :key="index">
                        <!-- Используем v-model для связи значения инпута с данными в хранилище -->
                        <input type="text" v-model="header.input" @keyup.enter="updateRows(index, $event.target)"
                            :placeholder="header.label">
                    </td>
                </tr>
                <!-- Строки с данными для каждого объекта LoadActs -->
                <tr v-for="(loadAct, rowIndex) in loadActs" :key="rowIndex">
                    <!-- Отображаем данные для каждого столбца -->
                    <td v-for="(header, colIndex) in headers" :key="colIndex">
                        <input v-model="loadAct[header.property]" :type="inputTypes[header.property]">
                    </td>
                </tr>
            </table>
        </div>

    </div>
</template>
  
<script>
class LoadActs {
    constructor() {
        this.number = null;
        this.on_date = null;
        this.wagon = null;
        this.invoice_number = null;
        this.total_wo_nds = null;
        this.nds = null;
        this.total = null;
    }
    get on_date() {
        return this._on_date; // Возвращаем значение on_date
    }

    set on_date(value) {
        if (value) {
            let correctDate = value.split('.').reverse().join('-');
            this._on_date = correctDate; // Устанавливаем значение в on_date
        } else {
            this._on_date = value; // Если значение falsy, устанавливаем его напрямую
        }
    }

    checkValueOnDate() {
        const obj = {};
        for (const key in this) {
            if (key.startsWith('_')) {
                const publicKeyName = key.substring(1);
                obj[publicKeyName] = this[key];
            } else {
                obj[key] = this[key];
            }
        }
        return obj;
    }

}
import api from "@/api/directory";

export default {
    props: {
        act_type: {
            type: String
        },
        seller: {
            type: String
        },
        buyer: {
            type: String
        },
        agr: {
            type: String
        }
    },
    data() {
        return {
            headers: [
                { label: "№ акта", property: "number", input: "" },
                { label: "Дата акта", property: "on_date", input: "" },
                { label: "№ вагонов", property: "wagon", input: "" },
                { label: "№ накладной", property: "invoice_number", input: "" },
                { label: "Сумма без НДС", property: "total_wo_nds", input: "" },
                { label: "Сумма НДС", property: "nds", input: "" },
                { label: "Сумма с НДС", property: "total", input: "" },
            ],
            loadActs: [],


        };
    },
    computed: {
        inputTypes() {
            const types = {};
            for (const header of this.headers) {
                types[header.property] = header.property === 'on_date' ? 'date' : 'text';
            }
            return types;
        },
    },
    methods: {
        saveDataAndsendServer() {
            let transformedLoadActs = this.loadActs.map(loadAct => loadAct.checkValueOnDate());
            for (let i in transformedLoadActs) {
                transformedLoadActs[i].act_type = this.act_type
                transformedLoadActs[i].seller = this.seller
                transformedLoadActs[i].buyer = this.buyer
                transformedLoadActs[i].agr = this.agr
            }
            this.$emit('startLoader')
            api.saveActs(transformedLoadActs)
                .then(response => {
                    console.log(response)
                    this.$emit('stopLoader')
                }).catch((err) => {
                    console.log(err)
                    this.$emit('stopLoader')
                })
        },
        deleteColumn(index) {
            this.loadActs.forEach((loadAct) => {
                loadAct[this.headers[index].property] = null;
            });
        },
        // Метод для обновления данных при вводе
        updateRows(index, event) {
            if (event.value) {
                const inputValues = this.headers[index].input.split(" ");
                const currentLoadActsLength = this.loadActs.length;

                if (inputValues.length > currentLoadActsLength) {
                    // Добавляем новые объекты LoadActs
                    this.loadActs.push(...Array(inputValues.length - currentLoadActsLength).fill().map(() => new LoadActs()));
                } else {
                    // Обрезаем лишние объекты LoadActs
                    this.loadActs.splice(inputValues.length);
                }

                // Присваиваем каждому объекту значение из введенных слов
                inputValues.forEach((value, i) => {
                    this.loadActs[i][this.headers[index].property] = value;
                });

                // Очищаем инпут
                this.headers[index].input = "";
            }
        },
        clearTable() {
            this.loadActs = []
        }
    }

};
</script>
  

<style scoped>
.mini {
    height: 20px;
    color: black;
    border: 1px solid white;
}

.mini:hover {
    height: 20px;
    color: black;
    background: lightgrey;
}

.mini_button {
    height: 20px;
    width: 20%;
    border-radius: 8px;
}

.tr_delete_cols,
.tr_delete_cols>td {
    border: none;
}

table:nth-child(2) {
    margin-top: 10px;
}

input[type=date] {
    width: 100%;
    height: 100%;
}
</style>