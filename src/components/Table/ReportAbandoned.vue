<template>
    <div>
        <h2>Брошенные вагоны</h2>
        <br><br>
        <Loader :loader="loader"></Loader>
        <FilterReportAbandon @update-filter="updateFilter"></FilterReportAbandon>

        <button class="button Action"
            style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin: 2% 0 1%" 
            @click="ThrowWagons()">Предварительный запрос вагонов</button>
        <div style="width: 100%; overflow-x: auto; height: 40vh; overflow-y: auto;">
            <table class="table" style="table-layout: fixed;">
                <thead>
                    <tr>
                        <th
                            style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                            Тип вагона</th>
                        <th
                            style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                            Полигон обращения</th>
                        <th
                            style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                            Государство</th>
                        <th
                            style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                            Код причины бросания</th>
                        <th
                            style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                            Причина бросания</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="broc in throwWagons" :key="broc.id">
                        <td style="height: 50px !important; vertical-align: middle !important;" v-if=" broc.wagon != null">
                            {{ broc.wagon.wagon_type }}</td>
                        <td style="height: 50px !important; vertical-align: middle !important;">
                            {{ broc.polygon }}</td>
                        <td style="height: 50px !important; vertical-align: middle !important;">
                            {{ broc.current_country }}</td>
                        <td style="height: 50px !important; vertical-align: middle !important;"
                            v-if="broc.drop != null">
                            {{ broc.drop.code }}</td>
                        <td style="height: 50px !important; vertical-align: middle !important;"
                            v-if="broc.drop != null">
                            <textarea name="" id="" cols="20" rows="1" :value="broc.drop.reason"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <button class="button Action" @click="CreateReportAbandones()"
                        style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Создать
                        отчет</button>

                </b-col>

                <b-col>
                    <button class="button Action" @click="DownloadReportAbandones()"
                        style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Загрузить
                        отчеты</button>

                </b-col>
            </b-row>

        </b-container>
        <br><br>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <div style="width: 100%; overflow-x: auto; height: 70vh; overflow-y: auto;">
                        <table class="table" style="table-layout: fixed;">
                            <thead>
                                <tr>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Файл</th>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Дата создания</th>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Создатель</th>
                                    <th
                                        style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                                        Тип вагона</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="reports in report_abandoned" :key="reports.id">
                                    <td style="height: 50px !important; vertical-align: middle !important;">
                                        <a download target="_blank" :href="reports.file" v-if="reports.file"><img
                                                src="@/assets/excel.png" alt="" width="50px !important"></a>
                                    </td>
                                    <td style="height: 50px !important; vertical-align: middle !important;">
                                        {{ new Date(reports.created_at).toLocaleString() }}</td>
                                    <td style="height: 50px !important; vertical-align: middle !important;">
                                        {{ reports.creator.last_name }} {{ reports.creator.first_name }}</td>
                                    <td style="height: 50px !important; vertical-align: middle !important;">{{
                                            reports.wagon_type
                                    }}
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

    </div>
</template>

<style>

</style>

<script>
import api from '@/api/report'
import apiWagon from '@/api/wagonPark'
import { mapState } from 'vuex'
import Notifications from '@/components/notifications/Notifications.vue'
import Loader from '@/components/loader/loader.vue'
import FilterReportAbandon from '@/components/filter/FilterReportAbandon.vue'
export default {
    name: 'ReportAbandoned',
    components: { Notifications, Loader, FilterReportAbandon },
    data() {
        return {
            report_abandoned: '',
            loader: false,

            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

            throwWagons: [],
            filter_FilterReportAbandon: {

            },
            filter: {},
        }
    },
    methods: {
        CreateReportAbandones() {
            this.loader = true
            api.CreateReportAbandone()
                .then((response) => {
                    this.loader = false
                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Отчет создан'
                    this.notifyClass = 'wrapper-success'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                })

        },
        DownloadReportAbandones() {
            this.loader = true
            api.GetReportAbandone()
                .then((response) => {
                    this.report_abandoned = response.data.data
                    this.loader = false
                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Отчеты загружены'
                    this.notifyClass = 'wrapper-success'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                })
        },

        ThrowWagons(url = null, clear = true) {
            if (url == null) url = 'wagon-park/dislocations/'
            if(clear) this.throwWagons = []

            this.loader = true

            apiWagon.getWagonsThrow(url, this.filter) //this.filter_abadon)
                .then(response => {
                    this.throwWagons = [...this.throwWagons, ...response.data.data]
                    if (response.data.links.next != null) {
                        this.ThrowWagons(response.data.links.next, false)
                        this.loader = false
                    } else {
                        this.loader = false
                        this.throwWagons = response.data.data
                        this.notifyHead = 'Успешно'
                        this.notifyMessage = 'Данные отфильтрованы'
                        this.notifyClass = 'wrapper-success'
                        this.showNotify = true
                        setTimeout(this.closeNotification, 1500)
                    }
                })
        },
        updateFilter(filter) {
            this.filter = filter
        },
        closeNotification() {
            this.showNotify = false
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
}
</script>