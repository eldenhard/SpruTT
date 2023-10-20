
import users from '@/store/modules/users';
<template>
    <div>
        <Loader :loader="loader"></Loader>
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
                        <button class="Accept button" @click="getInformationEmployee(filter_staff)">Запросить</button>
                        <button class="Request button">Добавить сотрудника</button>
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
                        <tr v-for="user in user_name" :key="user.id">
                            <td>
                                <img :src="user.photo" alt="фото пользователя">
                            </td>
                            <td>{{ user.last_name }}</td>
                            <td>{{ user.first_name }}</td>
                            <td>{{ user.middle_name }}</td>
                            <td>{{ user.phone_corp }}</td>
                            <td>{{ user.email }}</td>
                            <template v-for="cell in selectedTableCells">
                                <td :key="cell.id">
                                    {{ user[cell?.valen] }}
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
import { getGroupName } from "@/helpers/getGroupName";
import { getUserById } from "@/helpers/getAllUsers";
import Loader from "@/components/loader/loader.vue";
import MultiSelectUni from '@/components/ui/MultiSelectUni.vue'

export default {
    components: { FilterStaff, Notifications, Loader, MultiSelectUni },
    data() {
        return {
            filter_staff: "",
            loader: false,
            user_name: "",
            selectedTableCellsIds: "",
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
                console.log('1')
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Введите пользователя";
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => this.showNotify = false, 2500)
                return
            }
            api.getAllStaff(name_employee)
                .then(response => {
                    this.user_name = response.data.data
                }).catch((error) => {
                    console.error(error)
                })
        },
        updateSelectedTAbleCells(selected) {
            this.selectedTableCellsIds = selected
        },
        removeSelectedCells(id) {
            this.selectedTableCellsIds.splice(this.selectedTableCellsIds.indexOf(id), 1)
        },
    }
}
</script>


<style lang="scss" scoped>
img {
    max-width: 50%;
    height: auto;
    padding: 1%
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
    // overflow: hidden;

    .main_block__filter {
        width: 100%;

        .action_group {
            width: 90%;
            margin-left: 5%;
            display: flex;
            justify-content: space-evenly;
        }

        .btn_group {
            width: 90%;
            margin-left: 5%;
            display: flex;
            flex-direction: column;

            button {
                margin-left: auto;
                width: 25%;
                height: 40px;
                margin-top: 2%;
            }
        }
    }

    .main_block__content {
        display: flex;
        justify-content: center;
        max-width: 90%;
        overflow: auto;
        margin-left: 5%;

        table {
            margin-top: 2%;

            th {
                background: lightgray;
            }
        }

        overflow: auto;
        /* Добавьте прокрутку */
    }
}
</style>
