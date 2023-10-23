<template>
    <div>
        <Loader :loader="loader"></Loader>
        <modal_window :what_is_ref="currentModal" :title_modal="title_currentModal" :info="info_user_modal"
            @getData="getInformationEmployee(filter_staff)" />
        <div class="main_block">
            <div class="main_block__filter">
                <FilterStaff @updateFiltersStaff="updateFiltersStaff"></FilterStaff>
                <div class="action_group">
                    <div style="width: 25vw; margin-left: -1%;">
                        <MultiSelectUni @change="updateSelectedTAbleCells" :placeholder="'Поля таблицы'" :variants="UserObj"
                            :variant-title="'value'">
                        </MultiSelectUni>
                    </div>
                    <div class="btn_group">
                        <div v-if="user_name.length > 0">
                            <button class="Action button"
                                @click="ModalWindow('change_user', 'Редактирование сотрудника', user_name)">Редатировать
                                сотрудника</button>
                            <button class="Delete button" style="margin-top: 6%;"
                                @click="ModalWindow('delete_user', 'Удаление сотрудника', user_name)">Удалить
                                сотрудника</button>
                        </div>
                        <div>
                            <button class="Accept button" @click="getInformationEmployee(filter_staff)">Запросить
                                данные</button>
                            <button class="Request button"
                                @click="ModalWindow('add_user', 'Добавление сотрудника')">Добавить сотрудника</button>
                        </div>

                    </div>
                </div>
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
                        <!-- <tr>
                            <td v-if="user_name.length == 0" colspan="6">Данные не найдены</td>
                        </tr> -->
                        <tr @click="open_watch_modal('Просмотр сотрудника', user_name)">
                            <td>
                                <img v-if="user_name[0] && user_name[0].photo" :src="user_name[0].photo"
                                    alt="фото пользователя">
                            </td>
                            <td>{{ user_name[0]?.last_name }}</td>
                            <td>{{ user_name[0]?.first_name }}</td>
                            <td>{{ user_name[0]?.middle_name }}</td>
                            <td>{{ user_name[0]?.phone_corp }}</td>
                            <td>{{ user_name[0]?.email }}</td>
                            <template v-for="cell in selectedTableCells">
                                <td :key="cell.id">
                                    {{ WhatTheData(user_name[0][cell?.valen], cell?.valen) }}
                                </td>

                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>



        </div>
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
    methods: {
        updateFiltersStaff(filter_staff) {
            this.filter_staff = filter_staff;
        },
        getInformationEmployee(name_employee = null) {
            if (!name_employee) {
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Введите пользователя";
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => this.showNotify = false, 2500)
                return
            }
            this.loader = true
            api.getAllStaff(name_employee)
                .then(response => {
                    let regex = 'http://10.1.5.20/'
                    this.user_name = response.data.data
                    // this.user_name[0]['photo'] =  data[0].photo.replace(regex, 'https')
                    this.user_name.forEach((element) => {
                        if (element.photo != null) {
                            element.photo = element.photo.replace(regex, "");
                        }
                    });
                    console.log(this.user_name)
                    this.loader = false
                }).catch((error) => {
                    this.loader = false
                    console.error(error)
                })
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
            if (this.user_name.length == 0) {
                return
            }
            this.currentModal = refs
            this.title_currentModal = refs
            this.info_user_modal = val
            this.$nextTick(() => {
                this.$bvModal.show(refs);
            });
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

.main_block {
    width: 100%;
    height: auto;
    min-height: 40vh;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 1%;
}

.main_block .main_block__filter {
    width: 100%;
}

.main_block .main_block__filter .action_group {
    width: 90%;
    margin-left: 5%;
    display: flex;
    justify-content: space-evenly;
}

.main_block .main_block__filter .btn_group {
    width: 90%;
    margin-left: 5%;
    display: flex;
    justify-content: flex-end;
    gap: 5%;
}

.main_block .main_block__filter .btn_group button {
    margin-left: auto;
    width: 100%;
    height: 45px;
    margin-top: 8%;
}

.main_block .main_block__content {
    display: flex;
    justify-content: center;
    max-width: 90%;
    overflow: auto;
    margin-left: 5%;
    overflow: auto;
    /* Добавьте прокрутку */
}

.main_block .main_block__content table {
    margin-top: 2%;
}

.main_block .main_block__content table th {
    background: lightgray;
}</style>
