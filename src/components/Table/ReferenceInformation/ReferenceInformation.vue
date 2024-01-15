<template>
    <div>
        <Loader :loader="loader"></Loader>
        <modal_window :what_is_ref="currentModal" :title_modal="title_currentModal" :info="info_user_modal"
            @getData="getInformationEmployee(filter_staff)" />

        <div class="air_block">
            <Loader :loader="loader" />
            <div class="air_block_header">
                <h5>Справочник сотрудников</h5>
            </div>
            <hr>

            <section class="search_bloc">
                <div class="long_search">
                    <input type="text" placeholder="Поиск..." v-model="search" @input="IputProcessing(search)">
                    <button class="Request" @click="InputTable(search)">
                        <span v-if="isSearch">Найти</span>
                        <b-icon v-if="!isSearch" icon="three-dots" animation="cylon" font-scale="3"></b-icon>
                    </button>
                </div>
                <div class="answer_block" v-show="isAnswerBlock">
                    <ul>
                        <li v-for="item, index in responseSearchData" :key="index"
                            @click="open_watch_modal('Просмотр сотрудника', item)">
                            <b-icon icon="search" variant="secondary"></b-icon>
                            <span> {{ item?.last_name }} {{ item?.first_name }} {{ item?.middle_name }}</span>
                        </li>
                    </ul>
                </div>
            </section>


            <section class="advanced_settings_block">
                <button class="Action button" @click="isAdvancedSettings = !isAdvancedSettings">{{ !isAdvancedSettings ?
          "Расширенный поиск" : 'Закрыть' }}</button>
                <Transition name="fade">
                    <div v-if="isAdvancedSettings" class="advanced_settings">
                        <div class="section_category">
                            <div class="left_section">
                                <p>Подразделение:</p>
                            </div>

                            <div class="right_section">
                                <select v-model="subdivision">
                                    <option value="">Не выбрано</option>
                                    <option v-for="group, index in allGroups" :key="index" :value="group.id">{{ group.name }}</option>
                                    
                                </select>

                            </div>
                        </div>
                        <hr>
                        <div class="section_date">
                            <div class="left_section">
                                <p>Внутренний номер</p>
                            </div>
                            <div class="right_section">
                                <input type="number" class="textarea" v-model="inner_number">
                            </div>
                        </div>
                        <hr>

                        <button class="Request" style="border-radius: 8px; margin-left: auto;"
                            @click="sendToServerFullDecription()">
                            <span v-if="isSearchFullSettings">Найти</span>
                            <b-icon v-if="!isSearchFullSettings" icon="three-dots" animation="cylon"
                                font-scale="3"></b-icon>
                        </button>
                    </div>
                </Transition>
            </section>

            <div class="main_block__content">
                <table>
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>
                            <th>Тел.внутр</th>
                            <th>Почта</th>
                            <template v-for="cell in selectedTableCells">
                                <th :key="cell.id">{{ cell.value }}</th>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="open_watch_modal('Просмотр сотрудника', user)" v-for="user, index in dataForTable"
                            :key="index">
                            <td>
                                <img v-if="user && user.photo" :src="user.photo" alt="фото пользователя">
                            </td>
                            <td>{{ user?.last_name != '[]' ? user?.last_name : "" }}</td>
                            <td>{{ user?.first_name != '[]' ? user?.first_name : "" }}</td>
                            <td>{{ user?.middle_name != '[]' ? user?.middle_name : "" }}</td>
                            <td style="white-space: nowrap;">{{ user?.phone_corp }}</td>
                            <td style="white-space: nowrap;">{{ user?.email }}</td>
                            <template v-for="cell in selectedTableCells">
                                <td :key="cell.id">
                                    {{ WhatTheData(user[cell?.valen], cell?.valen) }}
                                </td>

                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <!--   <div style="width: 15vw; padding-top: 2%;">
                            <MultiSelectUni @change="updateSelectedTAbleCells" :placeholder="'Поля таблицы'"
                                :variants="UserObj" :variant-title="'value'">
                            </MultiSelectUni>
                        </div>
                        <div style="display: flex; justify-content: start; flex-wrap: wrap; width: 90%; margin-left: 5%;">
                            <p style="padding-left: 1%;">Выбранные столбцы :</p> <br>
                            <template>

                                <span class="option_select_block_check" v-for="cell in selectedTableCells" :key="cell.id"
                                    @click="removeSelectedCells(cell.id)">
                                    <span style="color: black; font-size: 15px"> &#43;</span>
                                    {{ cell.value }}
                                </span>
                            </template>
                        </div>
 -->
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>

<script>
import { mapState } from "vuex";
import api from '../../../api/staff'
import FilterStaff from "@/components/filter/FilterStaff.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import MultiSelectUni from '@/components/ui/MultiSelectUni.vue'
import modal_window from "./modal_window.vue";
//this.$refs["delete-user"].show();
export default {
    components: { FilterStaff, Notifications, Loader, MultiSelectUni, modal_window },
    data() {
        return {
            isAdvancedSettings: false,
            isAnswerBlock: true,
            responseSearchData: null,
            intervalResponse: null,
            isSearch: true,
            search: "",
            dataForTable: null,
            isSearchFullSettings: true,
            subdivision: "",
            inner_number: "",

            filter_staff: "",
            loader: false,
            user_name: "",
            info_user_modal: null,
            selectedTableCellsIds: "",
            // Для модального окна
            currentModal: "",
            title_currentModal: "",
            // Уведомления
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },
    computed: {
        ...mapState({
            user: (state) => state.auth.user,
            uid: (state) => state.auth.uid,
            allGroups: (state) => state.auth.groups,
            staffGlobal: (state) => state.auth.users,
        }),
        UserObj() { //1
            const result = [
                { value: 'Должность', id: 1, valen: 'post' },
                { value: 'Отдел', id: 2, valen: 'groups' },
                { value: 'Телефон личный', id: 3, valen: 'phone_personal' },
                { value: 'Внутренний номер', id: 4, valen: 'inner_number' },
                { value: 'Время работы', id: 5, valen: 'schedule' },
                { value: 'Начальник', id: 6, valen: 'manager' },
            ]
            result.sort((a, b) => {
                const valueA = a.value.toLowerCase();
                const valueB = b.value.toLowerCase();
                return valueA.localeCompare(valueB); // Сравнение строк с учетом регистра
            });
            return result;
        },
        selectedTableCells() { //2
            return this.UserObj.filter(el => this.selectedTableCellsIds.includes(el.id))
        },
    },

    watch: {
        search() {
            return this.search.length <= 1 ? this.responseSearchData = null : this.responseSearchData
        }
    },
    methods: {
        async sendToServerFullDecription(){
            this.isSearchFullSettings = false
            let obj = {
              inner_number: this.inner_number,
              post: [this.subdivision]
            }
            let response =  await api.getUserByQuery(obj)
            this.dataForTable = await response.data.data
            console.log(this.dataForTable)
            this.isSearchFullSettings = true
        },
        closeBlock() {
            this.isAnswerBlock = false
        },
        updateSelectedTAbleCells(selected) {
            this.selectedTableCellsIds = selected
        },
        removeSelectedCells(id) {
            this.selectedTableCellsIds.splice(this.selectedTableCellsIds.indexOf(id), 1)
        },
        WhatTheData(value, type) {
            if (type == 'groups') {
                return this.allGroups.filter(item => item.id == value)[0].name
            } else if (type == 'manager') {
                let data = this.staffGlobal.filter(item => item.id == value)[0]
                return `${data?.last_name ?? ""} ${data?.first_name?.slice(0, 1) ?? ""}`
            } else {
                return value
            }
        },
        ModalWindow(refs, title, info) {
            this.currentModal = refs
            this.title_currentModal = title
            this.info_user_modal = info
            this.$nextTick(() => {
                this.$bvModal.show(refs);
            });
        },
        open_watch_modal(refs, val) {

            this.currentModal = refs
            this.title_currentModal = refs
            this.info_user_modal = val
            this.$nextTick(() => {
                this.$bvModal.show(refs);
            });
        },

        IputProcessing(val) {
            clearInterval(this.intervalResponse)
            this.intervalResponse = setTimeout(() => {
                this.sendRequestToServerData(val)
            }, 500)
        },
        sendRequestToServerData(val) {
            if (this.search == "" || this.search.length <= 1) return
            this.isSearch = false
            api.searchUser(val)
                .then(response => {
                    this.isSearch = true
                    this.responseSearchData = response.data.data
                    this.isAnswerBlock = true
                }).catch((err) => {
                    this.isSearch = true
                    console.log(err)
                })
        },
        // При нажатии на Найти
        InputTable(val) {
            if (val) {
                this.isAnswerBlock = false
                this.dataForTable = this.responseSearchData
            }
        }
    }
}
</script>


<style scoped>
img {
    max-width: 50%;
    height: auto;
    padding: 1%;
}

.main_block__content {
    margin-top: 4%;
    width: 100%;
    overflow: auto;
}



.air_block {
    width: 100%;
    height: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #e4e4e4;
    position: relative;
    left: 50%;
    padding: 1%;
    transform: translate(-50%, 0);
    box-sizing: border-box;
}

.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}

.long_search {
    position: relative;
    width: 90%;
    margin: 0 auto;
}

.long_search {
    position: relative;
    width: 100%;
    height: 5vh;
}

.long_search input {
    width: 100%;
    height: 100%;
    border: 2px solid #007BFF !important;
    border-radius: 10px;
    text-align: left !important;
    padding-left: 2% !important;
}

::-webkit-input-placeholder {
    text-align: left;
}

:-moz-placeholder {
    /* Firefox 18- */
    text-align: left;
}

::-moz-placeholder {
    /* Firefox 19+ */
    text-align: left;
}

:-ms-input-placeholder {
    text-align: left;
}

.long_search button {
    width: 10%;
    height: 80%;
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 1%;
    border-radius: 8px;
}

.advanced_settings {
    width: 100%;
    margin: 0 auto;
    background: rgb(243, 243, 243);
    border-radius: 8px;
    margin-top: 1%;
}

.advanced_settings_block button {
    min-width: 10vw;
    height: 40px;
    width: auto;
    margin: 2% 0 0 auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.left_section p {
    font-size: 18px;
    font-weight: 600;
}

.answer_block {
    width: 100%;
    height: auto;
    background: rgb(238, 238, 238);
    margin-top: 1%;
    border-radius: 8px;
}

ul {
    width: 100%;
    margin: 0;
    padding: 0;
}

li {
    list-style-type: none;
    padding: 1% 2%;
}

li:hover {
    background: rgb(255, 255, 255);
}

li span {
    padding-left: 3%;
}

tr:hover {
    background: lightblue;
}

.section_category,
.section_date,
.inn_ogrn,
.income_expense {
  padding: 10px;
  width: 65%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.right_section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

label {
  font-weight: 18px;
  font-weight: bold;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
</style>
