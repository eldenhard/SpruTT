
<template>
    <div v-if="isFilterBlock">
        <div class="filter_new_block">
            <div class="sortage">
                <span> Сортировка по: </span>
                <select v-model="sort_params" style="height: 30px; width: 25%;">
                    <option value=""></option>
                    <option value="year">Годам</option>
                    <option value="counterparty">Контрагентам</option>
                </select>

                <span @click="changeSortDirection()" style="font-weight: 600; margin-left: 2%;"
                    v-if="sort_params != ''"><b-icon :icon="sortElement" variant="dark" font-scale="1.7"></b-icon>
                    {{ sortElement == 'sort-up' ? 'По возрастанию' : 'По убыванию' }}</span>
            </div>
            <div class="filter_main">
                <span @click="isShowFilter = !isShowFilter">
                    <b-icon icon="funnel-fill" :variant="isShowFilter ? 'primary' : 'dark'" font-scale="1.4"></b-icon>Фильтр
                </span>
                <br>
            </div>

        </div>
        <div class="filter" v-if="isShowFilter">
            <div class="filter-row">
                <label for="">Статус <br>
                    <select style="height: 30px; width: 10vw">
                        <option value=""></option>
                        <option value="">Дейсвительный</option>
                        <option value="">Недействительный</option>
                    </select>
                </label>
                <label for="">Тип <br>
                    <select style="height: 30px; width: 10vw">
                        <option value=""></option>
                        <option value="Абонентский">Абонентский</option>
                        <option value="Аренда">Аренда</option>
                        <option value="Возмещение расходов">Возмещение расходов</option>
                        <option value="Комиссия">Комиссия</option>
                        <option value="Купля-продажа">Купля-продажа</option>
                        <option value="Оказание услуг">Оказание услуг</option>
                        <option value="Организация расчетов">Организация расчетов</option>
                        <option value="Перевозка">Перевозка</option>
                        <option value="Поставка">Поставка</option>
                        <option value="Субаренда">Субаренда</option>
                        <option value="Цессия">Цессия</option>
                        <option value="ЭДО">ЭДО</option>
                        <option value="Экспедиция">Экспедиция</option>
                    </select>
                </label>
                <label for="">Вид <br>
                    <select style="height: 30px; width: 10vw">
                        <option value=""></option>
                        <option value="" disabled>Доп. соглашение</option>
                        <option value="" disabled>Протокол согласования</option>
                        <option value="" disabled>Соглашение</option>
                        <option value="" disabled>Соглашение об урегулировании (погашении задолженности)</option>
                        <option value="" disabled>Приложение</option>
                        <option value="" disabled>Прочие соглашения</option>
                    </select>
                </label>
                <label>Дата заключения от <br>
                    <input type="date" style="height: 30px; width: 10vw">
                </label>
            </div>
            <br>

        </div>
        <button class="Accept" v-if="isShowFilter">Применить</button>
        <hr style="border: 1px solid rgb(184, 184, 184);">
        <div class="pagination_page_element">
            <label for="">Отображение на странице<br>
                <select v-model="elInPage" style="width: 12vw; height: 30px;">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </label>
        </div>
        <div class="view_info">
            <h4>{{ commentForResponse }}</h4>
            <ul>
                <li class="responseListItem" v-for="item, index in infoFromSmartSearch" :key="index">

                    <section class="element_list">
                        <div>
                            <b class="superB">Договор:</b> № {{ item?.number }} <br>
                            <b class="superB" v-if="item?.annex_number">Приложение : № {{ item?.annex_number.split("-").reverse().join('.') }}<br></b>

                            <b class="superB">Тип:</b> {{ item?.contract_type }} <br>
                            <b class="superB">Дата заключения договора: </b>{{ item.created_at ? item.created_at.split('-').reverse().join('.') : "—" }}
                            <br>
                            <b class="superB" v-if="item?.annex_number">Дата заключения приложения: </b>
                            <span v-if="item?.annex_number">{{ item.annex_date ? item?.annex_date?.slice(0,10).split('-').reverse().join(".") : "—" }}</span>
                            <br v-if="item?.annex_number">

                            <b class="superB">Предмет договора</b> {{ item?.contract_object }} <br>
                            <b class="superB">Контрагент: </b> {{ item?.counterparty }} <br>
                            <b class="superB">Вид: </b> {{ TypeAgr(item?.category) }} <br>
                        </div>
                        <div class="right_section">
                            <b-icon icon="file-pdf" variant="secondary" font-scale="3.5"></b-icon>
                            <div @click="CopyTEXT(item?.scan_path)">
                                <b class="superB">Ссылка: </b>
                                <b-icon icon="link" variant="primary" font-scale="1.4"></b-icon>
                            </div>
                        </div>
                    </section>

                </li>
            </ul>
        </div>






    </div>
</template>


<script>
import { getTime } from '@amcharts/amcharts5/.internal/core/util/Time'

export default {

    props: {
        infoFromSmartSearch: {
            default: []
        },
        searchFullSetting: {
            type: Object
        },
        commentForResponse: {
            type: String
        },
        isFilterBlock: {
            type: Boolean
        }
    },
    data() {
        return {
            isShowFilter: false,
            elInPage: 5,
            sortElement: 'sort-up',
            sort_params: "",

        }
    },
    watch: {
        infoFromSmartSearch() {
            console.log(this.infoFromSmartSearch)
        },
        isFilterBlock(){
            return this.isFilterBlock == true ?  this.sortElement = 'sort-up' : this.sortElement =  ""
        },
        sortElement(newValue) {
            if (newValue == 'sort-up') {
                console.log('1')
                this.infoFromSmartSearch.sort((a, b) => {
                    let dateA = this.getComparisonDate(a)
                    let dateB = this.getComparisonDate(b)
                    return this.compareDates(dateA, dateB)
                })
            } else if(newValue == "sort-down") {
                console.log('2')
                this.infoFromSmartSearch.sort((a, b) => {
                    let dateA = this.getComparisonDate(a)
                    let dateB = this.getComparisonDate(b)
                    return this.compareDates(dateB, dateA)
                })
            }
        }
    },
    methods: {
        getComparisonDate(item) {
            return item.created_at || item.annex_date

        },
        compareDates(dateA, dateB) {
            if (dateA === null && dateB === null) {
                return 0;
            } else if (dateA === null) {
                return 1; // dateA равен null, поэтому dateB должна быть выше
            } else if (dateB === null) {
                return -1; // dateB равен null, поэтому dateA должна быть выше
            } else {
                return dateA.localeCompare(dateB);
            }
        },
        CopyTEXT(value) {
            navigator.clipboard.writeText(value)
                .then(() => {
                    this.$emit("openNotif", true);
                })
        },
        TypeAgr(val) {
            if (val == 'buyer') {
                return 'Доходный'
            } else {
                return 'Расходный'
            }
        },
        changeSortDirection() {
            return this.sortElement == 'sort-up' ? this.sortElement = 'sort-down' : this.sortElement = 'sort-up'
        },

    }
}
</script>






<style scoped>
.Accept {
    height: 30px;
    width: 20%;
    margin-left: auto;
    margin-top: 2%;
}

.filter_new_block {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sortage {
    flex-grow: 1;
    /* Растягиваем блок на всю доступную ширину */
}

.filter_main {
    display: flex;
    align-items: center;
}

.filter {
    margin-left: auto;
    width: 100%;
    margin-top: 20px;
    display: flex;
    box-sizing: border-box;
    /* width: 100%; */
    /* Занимаем всю ширину родительского блока */
    background-color: #fff;
    /* Цвет фона блока */
    border: 1px solid #ccc;
    /* Граница блока */
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Тень блока */
}

.filter-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    /* margin-bottom: 15px;
    flex-wrap: wrap; */
    /* Отступ между строками */
}



.view_info {
    width: 100%;
    overflow: auto;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    max-height: 70vh;
}

.responseListItem {
    margin-top: 2%;
}

.responseListItem:hover {
    background: rgb(241, 241, 241);
}

.superB {
    font-weight: 500;
    font-size: 14px;
}

ul {
    width: 100%;
    margin: 0;
    padding: 0;
}



/* li:hover {
    background: rgb(255, 255, 255);
} */

li span {
    padding-left: 3%;
}

.element_list {
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    border-radius: 6px;
    padding: 2%;
    transition: background .2s ease;
}

/* .element_list:hover{
    background: rgb(240, 240, 240);
} */
.right_section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

label {
    font-family: 'Montserrar', sans-serif;
    color: grey;
    font-weight: 400;
}

select {
    max-width: 15vw;
    width: auto;
}
</style>
