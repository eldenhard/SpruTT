<template>
    <div>
        <Loader :loader="loader"></Loader>
        <h2>БДР отчеты</h2>
        <br><br>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <button class="button Action" @click="createBDRreport()"
                        style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Создать
                        шаблон БДР отчета</button>
                </b-col>

                <b-col>
                    <button class="button Action" @click="OpenCreateBDRreport()"
                        style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Загрузить
                        БДР отчет</button>
                </b-col>
            </b-row>

        </b-container>
        <br>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <div
                        style="width: 100%; overflow-x: auto; height: 80vh; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0); margin-bottom: 3%;">
                        <table class="table table-sm table-bordered table-hover"  >
                            <thead class="thead-light">
                                <tr>
                                    <th>
                                        Название</th>
                                    <th>
                                        Дата создания</th>
                                    <th>
                                        Последнее обновление</th>
                                    <th>
                                        Файл</th>
                                    <th>
                                        Действие</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bdr in BDRreport" :key="bdr.id">
                                    <td>
                                        {{ bdr.name }}</td>
                                    <td>
                                        {{ new Date(bdr.created_at).toLocaleString() }}</td>
                                    <td>
                                        {{ new Date(bdr.updated_at).toLocaleString() }}</td>
                                    <td>
                                        <a target="_blank" :href="bdr.file" v-if="bdr.file"><img
                                                src="@/assets/excel.png" alt="" width="20px !important"></a>
                                    </td>
                                    <td>
                                        <button
                                            style="height: 100%; vertical-align: middle; display: flex;align-items: center;justify-content: center;"
                                            class="Accept" @click="openCurrentReport(bdr.id)">Редактировать</button>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                </b-col>
            </b-row>
        </b-container>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />
        <editBDR v-if="showEditbdr"></editBDR>
    </div>
</template>

<script>
import api from '@/api/report'
import { mapState } from 'vuex';
import Notifications from '@/components/notifications/Notifications.vue'
import editBDR from '@/views/editBDR.vue';
import Loader from '@/components/loader/loader.vue'

export default {
    name: 'BDRreport',
    components: { Notifications, editBDR, Loader },

    data() {
        return {
            BDRreport: '',
            showNotify: false,
            showEditbdr: false,
            loader: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    mounted() {
        document.title = 'БДР отчеты'
    },
    methods: {
        openCurrentReport(id) {
            window.open('/edit-bdr/' + `${id}`, '_blank');

        },
        createBDRreport() {
            this.loader = true
            api.createBDRreport()
                .then(response => {
                    api.getBDRreport()
                        .then(response => {
                            this.BDRreport = response.data.data
                            this.loader = false
                            this.notifyHead = 'Успешно'
                            this.notifyMessage = 'Отчет создан'
                            this.notifyClass = 'wrapper-success'
                            this.showNotify = true
                            setTimeout(this.closeNotification, 1500)

                        })
                }).catch(error => {
                    this.loader = false
                    this.notifyHead = 'Ошибка'
                    this.notifyMessage = 'Шаблон не создан'
                    this.notifyClass = 'wrapper-error'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 2000)
                })
        },
        OpenCreateBDRreport() {
            this.loader = true
            api.getBDRreport()
                .then(response => {
                    this.BDRreport = response.data.data
                    this.loader = false
                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Отчеты загружены'
                    this.notifyClass = 'wrapper-success'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                })
        },
        closeNotification() {
            this.showNotify = false
        }
    }
}
</script>

