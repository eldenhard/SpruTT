<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">

            <a class="WatchAllArenda">Данные по продлению срока ввоза</a>
            <div class="table-content" v-show="visible">

                <label for="tenant">№ вагонов
                    <br />
                    <input type="text" class="textarea mini" style="margin-top: 3%;" v-model="wagons" />
                </label>

                <label for="tenant">Страны
                    <MultiSelectUni @change="updateSelectedCountries" :placeholder="'Страны'" :variants="CountrieObj"
                        :variant-title="'value'">
                    </MultiSelectUni>
                </label>



                <button class="button Accept mini" @click="SendExtension()">
                    Запросить
                </button>
            </div>

            <div style="display: flex; justify-content: start; flex-wrap: wrap;">
                <p style="padding-left: 1%;"> Выбранные страны :</p> <br>
                <!-- <template v-if="selectedCountries"> -->
                <template>

                    <span class="option_select_block_check" v-for="countrie in selectedCountries" :key="countrie.id"
                        @click="removeselectedCountries(countrie.id)">
                        <span style="color: black; font-size: 15px"> &#43;</span>
                        {{ countrie.value }}
                    </span>
                </template>
            </div>

            <table style="margin-top: 2%; margin-left: 1%; ">

                <button @click="tableWagon = !tableWagon" style="border: none !important; width: 250px;"
                    class="Accept button mini">{{ tableWagon ? 'Скрыть номера вагонов' : 'Посмотреть номера вагонов'
                    }}</button>
                <br>

                <tbody v-show="tableWagon">
                    <th>№ вагонов</th>
                    <tr v-for="wagon, index in wagonsTable" :key="index">
                        <td>{{ wagon }}</td>
                    </tr>
                </tbody>
            </table>
            <br><br>
            <div>

                <button class="Accept button mini" style="border: none !important; width: 250px; margin-left: 1%;"
                    @click="fnExcelReport()" v-show="watchInformation">Скачать Excel</button>
                <table class="watchInformation" v-show="watchInformation" ref="theTableExtension">
                    <thead>
                        <tr>
                            <th>Вагон</th>
                            <th>Текущая страна</th>
                            <th>Текущая станция</th>
                            <th>Дата последней операции</th>
                            <th>Операция</th>
                            <th>Полигон</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, index in InformationByWagon" :key="index">
                            <td>{{ item.wagon }}</td>
                            <td>{{ item.current_country }}</td>
                            <td>{{ item.current_station__name }}</td>
                            <td>{{ item.last_operation_datetime.slice(0, 10) }}</td>
                            <td>{{ item.operation }}</td>
                            <td>{{ item.polygon }}</td>
                        </tr>
                    </tbody>
                </table>
                <br><br>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/wagonPark'
import MultiSelectUni from '@/components/ui/MultiSelectUni.vue'
import { mapState } from 'vuex';
import Loader from '@/components/loader/loader.vue';
export default {
    components: { MultiSelectUni, Loader },
    data() {
        return {
            visible: true,
            loader: false,
            wagons: "",
            tableWagon: false,
            wagonsTable: "",
            selectedCountriesIds: [],
            InformationByWagon: "",
            watchInformation: false,
        }
    },
    watch: {
        wagons() {
            let str = this.wagons.replace(/[^0-9]/g, "")
            let arr = str.match(/.{1,8}/g)
            this.wagonsTable = arr
        }
    },
    computed: {
        ...mapState({
            countries: (state) => state.countries.countrie
        }),
        CountrieObj() { //1
            const result = []
            this.countries.forEach((el, idx) => {
                el && result.push({ id: idx, value: el })
            })
            return result
        },
        selectedCountries() { //2
            return this.CountrieObj.filter(el => this.selectedCountriesIds.includes(el.id))
        },
    },

    methods: {
        SendExtension() {
            this.loader = true
            let countries = []
            this.selectedCountries.forEach(item => {
                countries.push(item.value)
            })
            let data = ({
                'wagons': this.wagonsTable ? this.wagonsTable.join(',') : null,
                'countries': countries ? countries.join(',') : null
            })

            api.getExtensionData(data)
                .then(response => {
                    this.InformationByWagon = response.data
                    this.watchInformation = true
                    this.loader = false
                }).catch(error => {
                    console.log(error)
                    this.loader = false
                })
        },
        fnExcelReport() {
            let table = this.$refs.theTableExtension;
            let tableHTML = table.outerHTML;
            let fileName = "Таблица  продление срока ввоза.xls"

            // let msie = window.navigator.userAgent.indexOf("MSIE ");

            let a = document.createElement("a");
            tableHTML = tableHTML.replace(/  /g, "").replace(/ /g, "%20");
            a.href = "data:application/vnd.ms-excel," + tableHTML;
            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        updateSelectedCountries(selected) {
            this.selectedCountriesIds = selected
        },
        removeselectedCountries(id) {
            this.selectedCountriesIds.splice(this.selectedCountriesIds.indexOf(id), 1)
        },

    }
}
</script>

<style lang="scss" scoped>
.watchInformation {
    margin-top: 2%;
    margin-left: 1%;
    margin-right: 1%;
}

.air_block {
    width: 65%;
    height: auto;
    min-height: 40vh;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}

tr,
td,
th {
    border: 1px solid black;

}

.table-content {
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    gap: 5%;
    flex-wrap: wrap;
    border: 1px solid lightgrey;
    padding: 1%;

    label {
        color: rgb(146, 146, 146);
    }

    button {
        height: 45px;
        width: 20%;
        margin-top: 3%;
        float: right !important;
        margin-left: auto;
    }
}

.mini {
    height: 45px;
}

.WatchAllArenda {
    color: rgb(146, 146, 146);
    margin-top: 20%;
    padding: 1%;
    font-size: 25px;
    cursor: pointer;
    outline: none;

    &:hover {
        outline: none;
        text-decoration: none;
    }
}
</style>