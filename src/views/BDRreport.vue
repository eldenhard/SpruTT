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
                        style="width: 100%; overflow-x: auto; height: 80vh; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0);">
                        <table class="table" style="table-layout: fixed;">
                            <thead>
                                <tr>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Название</th>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Дата создания</th>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Дата последнего обновления</th>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Файл</th>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Действие</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bdr in BDRreport" :key="bdr.id">
                                    <td
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        {{ bdr.name }}</td>
                                    <td
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        {{ new Date(bdr.created_at).toLocaleString() }}</td>
                                    <td
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        {{ new Date(bdr.updated_at).toLocaleString() }}</td>
                                    <td
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        <a target="_blank" :href="bdr.file" v-if="bdr.file"><img
                                                src="@/assets/excel.png" alt="" width="50px!important"></a>
                                    </td>
                                    <td
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        <button class="Accept" @click="openCurrentReport(bdr.id)">Редактировать</button>
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
    mounted(){
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

