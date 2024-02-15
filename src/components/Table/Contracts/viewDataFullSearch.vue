<template>
    <div>
        <div v-if="isVisibleFilterElementsExtended">


            <div class="filter_new_block">
                <div class="sortage">
                    <span>(РП) Сортировка по: </span>
                    <select v-model="sort_paramsExtended" style="height: 30px; width: 25%;">
                        <option value=""></option>
                        <option value="year">Годам</option>
                        <option value="counterparty">Контрагентам</option>
                    </select>

                    <span @click="changeSortDirection()" style="font-weight: 600; margin-left: 2%;"
                        v-if="sort_paramsExtended != ''"><b-icon :icon="sortElement" variant="dark"
                            font-scale="1.7"></b-icon>
                        {{ sortElement == 'sort-up' ? 'По возрастанию' : 'По убыванию' }}</span>
                </div>
                <!-- <div class="filter_main">
                    <span @click="isShowFilterExtended = !isShowFilterExtended">
                        <b-icon icon="funnel-fill" :variant="isShowFilterExtended ? 'primary' : 'dark'"
                            font-scale="1.4"></b-icon>Фильтр
                    </span>
                    <br>
                </div> -->

            </div>
            <div class="filter" v-if="isShowFilterExtended">
                <div class="filter-row">
                    <label for="">Статус договора<br>
                        <select style="height: 30px; width: 10vw">
                            <option value=""></option>
                            <option value="" disabled>Действующий</option>
                            <option value="" disabled>Недействующий</option>
                        </select>
                    </label>
                    <label for="">Тип <br>
                        <select style="height: 30px; width: 10vw" v-model="contract_type">
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
                    <label>Дата заключения договора от <br>
                        <input type="date" style="height: 30px; width: 10vw" v-model="created_at_gte">
                    </label>
                </div>
                <br>

            </div>
            <button class="Accept" v-if="isShowFilterExtended" @click="applyChanges()">Применить</button>
            <hr style="border: 1px solid rgb(184, 184, 184);">
            <div class="pagination_page_element">
                <label for="">Отображение на странице<br>
                    <select v-model="elInPage" style="width: 12vw; height: 30px;">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="100">100</option>
                    </select>
                </label>
                <div id="wrapper">
                    <ul id="pagination">
                        <li v-for="btn in total_pages" :key="btn.id">

                            <a @click="getPagination(elInPage, btn)"
                                :class="{ active123: Truefalse(btn), active_new: pageNumber == btn }">{{ btn }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="view_info">

            <ul>
                <li class="responseListItem" v-for="item, index in infoFromSmartSearchExtended" :key="index">
                    <section class="element_list">
                        <div>
                            (РП)
                            <br>
                            <b class="superB">Договор :</b> № {{ item?.number }} <br>
                            <b class="superB" v-if="item?.annex_number">Приложение : № {{
                                item?.annex_number.split("-").reverse().join('.') }}<br></b>

                            <b class="superB">Тип:</b> {{ item?.contract_type }} <br>
                            <b class="superB">Дата заключения договора: </b>{{ item.created_at ?
                                item.created_at.split('-').reverse().join('.') : "—" }}
                            <br>
                            <b class="superB" v-if="item?.annex_number">Дата заключения приложения: </b>
                            <span v-if="item?.annex_number">{{ item.annex_date ?
                                item?.annex_date?.slice(0, 10).split('-').reverse().join(".") : "—" }}</span>
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
import api from "@/api/directory";

export default {
    props: {
        infoFromSmartSearchExtended: {
            type: Array,
            variant: String,
            default: []
        },
        objectElementFilter: {
            type: Array
        },

        isVisibleFilterElementsExtended: {
            type: Boolean
        },
        total_pages: {
            type: Number
        }

    },
    data() {
        return {
            isShowFilterExtended: false,
            elInPage: 100,
            sortElement: 'sort-up',
            sort_paramsExtended: "",
            loader: false,
            pageNumber: 1,
            interval: 2,
            contract_type: "",
            annex_date_gte: "",
           
        }
    },

    watch: {

        // infoFromSmartSearch() {
        //    if(this.infoFromSmartSearch.length == 1){
        //         this.total_pages = 1
        //    }
        // },
        elInPage() {
            this.$emit('getDataFromChildComponentExtended',  this.objectElementFilter, this.elInPage, this.pageNumber) },
        // isFilterBlock() {
        //     return this.isFilterBlock == true ? this.sortElement = 'sort-up' : this.sortElement = ""
        // },
        sortElement(newValue) {
            if (newValue == "sort-up" && this.sort_paramsExtended == "year") {
                console.log('year sort-up')
                this.infoFromSmartSearchExtended.sort((a, b) => {
                    let dateA = this.getComparisonDate(a)
                    let dateB = this.getComparisonDate(b)
                    return this.compareDates(dateA, dateB)
                })
            } else if (newValue == "sort-down" && this.sort_paramsExtended == "year") {
                console.log('year sort-down')
                this.infoFromSmartSearchExtended.sort((a, b) => {
                    let dateA = this.getComparisonDate(a)
                    let dateB = this.getComparisonDate(b)
                    return this.compareDates(dateB, dateA)
                })
            }
            else if (newValue == "sort-up" && this.sort_paramsExtended == "counterparty") {
                console.log('counterparty sort-up')
                return this.infoFromSmartSearchExtended.sort((a, b) => a.counterparty > b.counterparty ? 1 : -1)
            }
            else if (newValue == "sort-down" && this.sort_paramsExtended == "counterparty") {
                console.log('counterparty sort-down')
                return this.infoFromSmartSearchExtended.sort((a, b) => b.counterparty > a.counterparty ? 1 : -1)
            }
        }
    },
    methods: {
        // Подтверждение фильтраци
        async applyChanges() {
            this.$emit('startLoader')
            try {
                  let response = await api.getAgreementAdvancedFilter(this.searchFullSetting.category, this.searchFullSetting.counterparty, this.searchFullSetting.number)
                  this.infoFromSmartSearchExtended = response.data.data
                    this.total_pages = response.data.total_pages
                } catch (err) {
                  console.err(err, 'ОШИБКА')
                }
                finally {
                    this.$emit('stopLoader')
                }
            // this.$emit('getDataFromChildComponent', this.dataForSearchByUser, this.elInPage, this.pageNumber, this.contract_type, this.created_at_gte, this.annex_date_gte)
        },
        getPagination(page_size, page) {
            this.$emit('getDataFromChildComponentExtended', this.objectElementFilter, page_size, page)
            this.pageNumber = page;
        },
        Truefalse(btn) {
            if (btn == this.pageNumber) {
                return true;
            }
            if (btn == 1) {
                return true;
            }
            if (btn == this.total_pages) {
                return true;
            }
            if (btn > this.pageNumber && btn < this.pageNumber + this.interval) {
                return true;
            }
            if (btn < this.pageNumber && btn > this.pageNumber - this.interval) {
                return true;
            }
            return false;
        },
        getComparisonDate(item) {
            return item.created_at || item.annex_date

        },
        compareDates(dateA, dateB) {
            if (dateA === null && dateB === null) {
                return 0;
            } else if (dateA === null) {
                return 1; // dateA равен null, поэтому dateB должна быть выше (правее)
            } else if (dateB === null) {
                return -1; // dateB равен null, поэтому dateA должна быть выше (левее)
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
.pagination_page_element {
    display: flex;
    justify-content: space-between;
    align-items: center;
    vertical-align: baseline;
}

#wrapper {
    margin-left: auto;
    display: block;
    margin-top: 1% !important;
    /* max-width: 80%; */
    width: auto;
}

.page-header {
    text-align: center;
    font-size: 1.5em;
    font-weight: normal;
    border-bottom: 1px solid #ddd;
    margin: 30px 0;
}

#pagination {
    margin: 0;
    padding: 0;
    text-align: center;

}

#pagination li {
    display: inline;
    margin-left: auto;
}

#pagination li a {
    display: inline-block;
    text-decoration: none;
    padding: 5px 10px;
    color: #000;
    cursor: pointer;
    margin-left: auto;
}

/* Active and Hoverable Pagination */
#pagination li a {
    border-radius: 5px;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
}

#pagination li a.active_new {
    background-color: #007BFF;
    color: #fff;
}

#pagination li a:hover:not(.active_new) {
    background-color: #ddd;
}

#pagination li a:not(.active123) {
    display: none;
}

/* border-pagination */
.b-pagination-outer {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    display: flex;
}

#border-pagination {
    margin: 0 auto;
    padding: 0;
    text-align: center;
}

#border-pagination li {
    display: inline;
}

#border-pagination li a {
    display: block;
    text-decoration: none;
    color: #000;
    padding: 5px 10px;
    border: 1px solid #ddd;
    float: left;
}

#border-pagination li a {
    -webkit-transition: background-color 0.4s;
    transition: background-color 0.4s;
}

#border-pagination li a.active_new {
    background-color: #007BFF;
    color: #fff;
}

#border-pagination li a:hover:not(.active_new) {
    background: #ddd;
}

.btn-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
}



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
    display: flex;
    flex-wrap: wrap;
    /* Тень блока */
}

.filter-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
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
    font-size: 12px;
}

select {
    max-width: 15vw;
    width: auto;
}
</style>
