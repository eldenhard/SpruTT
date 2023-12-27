<template>
    <div>
        <div class="filter_block">
            <label for="">Кол-во записей <br>
                <select v-model="filter.page_size">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </label>
            <button class="Accept mini" @click="getActs()">Запросить данные актов</button>
        </div>
        <p class="explanation">Всего записей: {{ total_objects }}</p>

        <div style="overflow: auto;">
            <table>
                <thead>
                    <tr class="TableHeader">
                        <th>№ акта</th>
                        <th>Дата акта</th>
                        <th>Продавец</th>
                        <th>Покупатель</th>
                        <th>Договор</th>
                        <th>№ вагона</th>
                        <th>№ накладной</th>
                        <th>Сумма без НДС</th>
                        <th>Сумма НДС</th>
                        <th>Сумма с НДС</th>
                        <th>Тип акта</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in responseActs" :key="index">
                        <td>
                            <input type="text" name="" id="" :value="item.number">
                        </td>
                        <td>
                            <input type="date" name="" id="" :value="item.on_date.split('T')[0]">
                        </td>
                        <td><input type="text" :value="item.seller"> &nbsp;</td>
                        <td><input type="text" :value="item.buyer"></td>
                        <td><input type="text" :value="item.agr"></td>
                        <td><input type="text" :value="item.wagon"></td>
                        <td><input type="text" :value="item.invoice_number"></td>
                        <td><input type="text" :value="item.total_wo_nds"></td>
                        <td><input type="text" :value="item.nds"></td>
                        <td><input type="text" :value="item.total"></td>
                        <td><input type="text" :value="item.act_type"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="wrapper">
            <ul id="pagination">
                <li v-for="btn in total_pages" :key="btn.id">
                    <a @click="getPagination(btn)" :class="{
                        active123: Truefalse(btn),
                        active_new: filter['page_number'] == btn,
                    }">{{ btn }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
export default {
    components: { Loader },
    data() {
        return {
            responseActs: null,
            loader: false,
            filter: {
                'page_size': 10,  // Значение по умолчанию
                'page_number': 1
            },
            // Пагинация
            pagination: "",
            total_pages: "",
            total_objects: 0,
            interval: 4,
        }
    },
    watch: {
        'filter.page_size': function (newPageSize) {
            this.filter.page_size = newPageSize;
        },
    },
    methods: {
        Truefalse(btn) {
            if (btn == this.filter['page_number']) {
                return true;
            }
            if (btn == 1) {
                return true;
            }
            if (btn == this.total_pages) {
                return true;
            }
            if (btn > this.filter['page_number'] && btn < this.filter['page_number'] + this.interval) {
                return true;
            }
            if (btn < this.filter['page_number'] && btn > this.filter['page_number'] - this.interval) {
                return true;
            }

            return false;
        },
        getPagination(pg_number) {
            this.$emit('startLoader')
            this.filter['page_number'] = pg_number
            api
                .getActs(this.filter)
                .then((response) => {
                    this.$emit('stopLoader')
                    this.responseActs = response.data.data
                    this.total_pages = response.data.total_pages;
                    this.total_objects = response.data.total_objects;
                })
                .catch((error) => {
                    this.$emit('stopLoader')            
                    console.log(error)
                });
        },

        getActs() {
            this.$emit('startLoader')
            api.getActs(this.filter)
                .then(response => {
                    this.responseActs = response.data.data
                    this.filter['page_number'] = response.data.page_number;
                    this.total_pages = response.data.total_pages;
                    this.total_objects = response.data.total_objects;
                    this.$emit('stopLoader')
                }).catch((err) => {
                    this.$emit('stopLoader')
                    console.error(err)
                })
        }
    }
}
</script>

<style scoped>
#wrapper {
    margin: 0 auto;
    display: block;
    margin-top: 2%;
    max-width: 80%;
    width: 80%;
}

#pagination {
    margin: 0;
    padding: 0;
    text-align: center;
}

#pagination li {
    display: inline;
}

#pagination li a {
    display: inline-block;
    text-decoration: none;
    padding: 5px 10px;
    color: #000;
    cursor: pointer;
}

/* Active and Hoverable Pagination */
#pagination li a {
    border-radius: 5px;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
}

#pagination li a.active_new {
    background-color: #18842a;
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
    background-color: #18842a;
    color: #fff;
}

#border-pagination li a:hover:not(.active_new) {
    background: #ddd;
}

.filter_block {
    border: 1px solid lightgrey;
    padding: 2%;
}

.mini {
    height: 40px;
    min-width: 20%;
    width: auto;
    margin-left: auto;
    white-space: nowrap;
}

td {
    white-space: nowrap !important;
    margin: 1% !important;
}

tr:hover {
    border: 2px solid rgb(39, 39, 39);
}

input {
    width: 100%;
    height: 100%;
    text-align: center;
}
</style>