<template>
    <div>
        <b-modal id="AcTNotPPSDelete" hide-footer>
            <template #modal-title> Подтверждение действия </template>
            <div class="d-block text-center">
                <h4>Вы уверены, что хотите удалить данные?</h4>
                <p>В случае удаления, данные будут потеряны безвозвратно</p>
            </div>
            <b-button variant="danger" @click="deleteActs(selected_record)">Да, я уверен</b-button>
            <b-button class="mt-3" block @click="$bvModal.hide('AcTNotPPSDelete')">Нет, отменить</b-button>
        </b-modal>
        <button class="Delete button" style="width: 15%; white-space: nowrap; margin: 2% 0; height: 30px"
            @click="open_modal(selectedItems)">Удалить выбранное</button>
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
                        <th style="border-left: 1px solid white; border-top: 1px solid white;">
                            <label for="all"
                                style="display: flex; align-items: center; justify-content: center">Все&nbsp;<input id="all"
                                    type="checkbox" :checked="selectAll" @change="toggleSelectAll"></label>
                        </th>
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
                            <input type="checkbox" :checked="isSelected(item.id)" @change="toggleItemSelection(item.id)">
                        </td>
                        <td>
                            <InputLoader :nameInp="`number`" :idRow="item.id" :idLoader="`numberload ${item.id}`"
                                :idElement="`number ${item.id}`" :valueDataInp="item.number" :typeInp="'text'"
                                @changeDate="DateChange" />
                        </td>
                        <td>
                            <!-- <input type="date" name="" id="" :value="item.on_date.split('T')[0]"> -->
                            <InputLoader :nameInp="`on_date`" :idRow="item.id" :idLoader="`on_dateload ${item.id}`"
                                :idElement="`on_date ${item.id}`" :valueDataInp="item.on_date.split('T')[0]" :typeInp="'date'"
                                @changeDate="DateChange" />
                        </td>

                        <td>
                            <InputLoader :nameInp="`seller`" :idRow="item.id" :idLoader="`sellerload ${item.id}`"
                                :idElement="`seller ${item.id}`" :valueDataInp="item.seller" :typeInp="'text'"
                                @changeDate="DateChange" />
                        </td>

                        <td>
                            <InputLoader :nameInp="`buyer`" :idRow="item.id" :idLoader="`buyerload ${item.id}`"
                                :idElement="`buyer ${item.id}`" :valueDataInp="item.buyer" :typeInp="'text'"
                                @changeDate="DateChange" />
                        </td>
                        <td>
                            <InputLoader :nameInp="`agr`" :idRow="item.id" :idLoader="`agrload ${item.id}`"
                                :idElement="`agr ${item.id}`" :valueDataInp="item.agr" :typeInp="'text'"
                                @changeDate="DateChange" />
                        </td>
                        <td>
                            <InputLoader :nameInp="`wagon`" :idRow="item.id" :idLoader="`wagonload ${item.id}`"
                                :idElement="`wagon ${item.id}`" :valueDataInp="item.wagon" :typeInp="'text'"
                                @changeDate="DateChange" />
                        </td>
                        <td>
                            <InputLoader :nameInp="`invoice_number`" :idRow="item.id"
                                :idLoader="`invoice_numberload ${item.id}`" :idElement="`invoice_number ${item.id}`"
                                :valueDataInp="item.invoice_number" :typeInp="'text'" @changeDate="DateChange" />
                        </td>
                        <td>
                            <InputLoader :nameInp="`total_wo_nds`" :idRow="item.id"
                                :idLoader="`total_wo_ndsload ${item.id}`" :idElement="`total_wo_nds ${item.id}`"
                                :valueDataInp="item.total_wo_nds" :typeInp="'text'" @changeDate="DateChange" />

                        </td>
                        <td>
                            <InputLoader :nameInp="`nds`" :idRow="item.id" :idLoader="`ndsload ${item.id}`"
                                :idElement="`nds ${item.id}`" :valueDataInp="item.nds" :typeInp="'text'"
                                @changeDate="DateChange" />

                        </td>
                        <td>
                            <InputLoader :nameInp="`total`" :idRow="item.id" :idLoader="`totalload ${item.id}`"
                                :idElement="`total ${item.id}`" :valueDataInp="item.total" :typeInp="'text'"
                                @changeDate="DateChange" />

                        </td>
                        <td>
                            <input type="text" :value="item.act_type" disabled>
                            <!-- <InputLoader :nameInp="`act_type`" :idRow="item.id" :idLoader="`act_typeload ${item.id}`"
                                :idElement="`act_type ${item.id}`" :valueDataInp="item.act_type" :typeInp="'text'"
                                @changeDate="DateChange" /> -->

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="wrapper">
            <ul id="pagination">
                <li v-for="btn in total_pages" :key="btn.id">
                    <a @click="getPagination(btn)" :class="{
                        active123: Truefalse(btn),
                        active_new: filter['page'] == btn,
                    }">{{ btn }}</a>
                </li>
            </ul>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>

<script>
import api from "@/api/directory";
import InputLoader from "../../../../ui/InputLoader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
    components: { InputLoader, Notifications },

    data() {
        return {
            responseActs: null,
            filter: {
                'page_size': 10,  // Значение по умолчанию
                'page': 1
            },
            // Пагинация
            pagination: "",
            total_pages: "",
            total_objects: 0,
            interval: 4,

            all_checkbox: [],
            selectAll: false,
            selectedItems: [],


            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },
    watch: {
        'filter.page_size': function (newPageSize) {
            this.filter.page_size = newPageSize;
        },
    },
    methods: {
        Truefalse(btn) {
            if (btn == this.filter['page']) {
                return true;
            }
            if (btn == 1) {
                return true;
            }
            if (btn == this.total_pages) {
                return true;
            }
            if (btn > this.filter['page'] && btn < this.filter['page'] + this.interval) {
                return true;
            }
            if (btn < this.filter['page'] && btn > this.filter['page'] - this.interval) {
                return true;
            }

            return false;
        },
        getPagination(pg_number) {
            this.$emit('startLoader')
            this.filter['page'] = pg_number
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
                    this.filter['page'] = response.data.page_number;
                    this.total_pages = response.data.total_pages;
                    this.total_objects = response.data.total_objects;
                    this.$emit('stopLoader')
                }).catch((err) => {
                    this.$emit('stopLoader')
                    console.error(err)
                })
        },
        DateChange(data) {
            let elementLoader = document.getElementById(data.loader);
            let element = document.getElementById(data.idElement);
            elementLoader.style.display = "block";
            const result = Object.entries(data).map((item) => ({
                [item[0]]: item[1],
            }));
            api
                .patchActs(result[1].id, result[0])
                .then((response) => {
                    elementLoader.style.display = "none";
                    element.classList.add("successStatus");
                    setTimeout(() => {
                        element.classList.remove("successStatus");
                    }, 1000);
                })
                .catch((error) => {
                    elementLoader.style.display = "none";
                    element.classList.add("errorStatus");
                    setTimeout(() => {
                        element.classList.remove("errorStatus");
                    }, 1000);

                    this.notifyHead = "Ошибка";
                    this.notifyMessage = error.response.data;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3500);
                });
        },
        deleteChecked(indexArray) {
            this.responseActs = this.responseActs.filter((_, index) => !indexArray.includes(index));
            this.selectedItems = [];
        },
        toggleSelectAll() {
            this.selectAll = !this.selectAll
            if (this.selectAll) {
                this.selectedItems = this.responseActs.map((_, index) => index)
            } else {
                this.selectedItems = []
            }
            console.log(this.selectedItems)
        },
        toggleItemSelection(itemId) {
            if (this.isSelected(itemId)) {
                this.selectedItems = this.selectedItems.filter(id => id !== itemId)
            } else {
                this.selectedItems.push(itemId)
            }

            console.log(this.selectedItems)
        },
        isSelected(itemId) {
            return this.selectedItems.includes(itemId)
        },
        deleteActs(id) {
           
            if (Array.isArray(id)) {
                this.loader = true
                let requests = id.map(url => api.deleteActs(url))
                Promise.all(requests)
                    .then(res => {
                        this.loader = false
                        this.notifyHead = "Успешно";
                        this.notifyMessage = "Данные удалены";
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 2500);
                        this.getPPS()
                        this.$bvModal.hide("AcTDelete");
                    }).catch((err) => {
                        this.loader = false
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = "Данные не удалены";
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 2500);
                        this.$bvModal.hide("AcTDelete");
                    })

                return
            }
            this.loader = true;
            // В случае если выбран 1 чекбокс (на сервере не реализован механизм удлаления множества элементов)
            api
                .deleteActs(id)
                .then((response) => {
                    this.loader = false;
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Данные удалены";
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2500);
                    this.$bvModal.hide("AcTDelete");
                })
                .catch((error) => {
                    this.loader = false;
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Данные не удалены";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2500);
                    console.log(error);
                    this.$bvModal.hide("AcTDelete");
                });
            let row = document.getElementById(id);
            row.parentNode.removeChild(row);
        },
        open_modal(id) {
            this.selected_record = id;
            this.$bvModal.show("AcTNotPPSDelete");
        },
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

input:not([type=checkbox]) {
    width: 100%;
    height: 100%;
    text-align: center;
}
</style>