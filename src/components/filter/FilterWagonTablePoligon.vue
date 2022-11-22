<template>
    <div>

        <div class="filterWagonDislocation">
            <div style="display:flex; flex-direction:column;">
                <div class='bg'>
                    <select class='textarea' id='input_filter_wagon_dislocation' name='Pwd'
                        v-model="filter_wagonpolygon.wagon__wagon_type" @change="updateFilterDataWagonDislocation">
                        <option value="">Все вагоны</option>
                        <option v-for="wagonDisl in wagonDislocation" :key="wagonDisl.name" :value="wagonDisl.name">
                            {{ wagonDisl.name }}
                        </option>
                    </select>
                    <br>
                    <label for='input_filter_wagon_dislocation' class='label'>Тип вагона</label>
                </div>
                <!-- <label for="input_filter_wagon_dislocation" class="all-label">Тип вагона</label>
                <select class="input_filter_wagon_dislocation" id="input_filter_wagon_dislocation"
                    style="cursor: pointer;" v-model="filter_wagonpolygon.wagon__wagon_type"
                    @change="updateFilterDataWagonDislocation">
                    <option value="">Все вагоны</option>
                    <option v-for="wagonDisl in wagonDislocation" :key="wagonDisl.name" :value="wagonDisl.name">
                        {{ wagonDisl.name }}
                    </option>
                </select> -->
            </div>
            <div style="display:flex; flex-direction:column;">
                <div class='bg'>
                    <select class='textarea' id='input_filter_dislocation' name='Pwd'
                        v-model="filter_wagonpolygon.polygon" @change="updateFilterDataWagonDislocation">
                        <option value="">Все полигоны</option>
                        <option v-for="polygon in polygonDislocations" :key="polygon" :value="polygon">
                            {{ polygon }}
                        </option>
                    </select>
                    <br>
                    <label for='input_filter_dislocation' class='label'>Полигон</label>
                </div>
            </div>
            <!-- <label for="input_filter_dislocation" class="all-label">Полигон</label>
                <select class="input_filter_wagon_dislocation" id="input_filter_dislocation" style="cursor: pointer;"
                    v-model="filter_wagonpolygon.polygon" @change="updateFilterDataWagonDislocation">


                    <option v-for="polygon in polygonDislocations" :key="polygon" :value="polygon">
                        {{ polygon }}
                    </option>
                </select> -->

            <div style="display: flex; flex-direction: column">
                <div class='bg'>
                    <select class='textarea' id="amoutRecordsDislocation" name='Pwd'
                        v-model="filter_wagonpolygon.page_size" @change="updateFilterDataWagonDislocation">
                        <option value="" selected>100</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="250">250</option>
                        <option value="500">500</option>
                    </select>
                    <br>
                    <label for="amoutRecordsDislocation" class='label'>Кол-во записей</label>
                </div>
                <!-- <label for="amoutRecordsDislocation" class="all-label">Кол-во записей</label>
            <select name="" id="amoutRecordsDislocation" v-model="filter_wagonpolygon.page_size"
                @change="updateFilterDataWagonDislocation">
                <option value="" selected>100</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="250">250</option>
                <option value="500">500</option>
            </select> -->

            </div>

        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/wagonPark'
import Loader from '@/components/loader/loader.vue'
export default {
    name: 'FilterDislocation',
    components: {Loader},
    data() {
        return {
            filter_wagonpolygon: {
                wagon__wagon_type: '',
                polygon: '',
                page_size: ''
            },
            wagonFilterDislocation: '',
            wagonDislocation: '',
            polygonDislocations: [],
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',
            loader: false,
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },

    mounted() {
        this.loader = true
        api.getWagonsThrowTypes()
            .then((response) => {
                this.wagonDislocation = response.data.data


            }),

            api.getFilters()
                .then(response => {
                    this.polygonDislocations = response.data.polygons
                    this.loader = false
                    console.log(this.polygonDislocations)
                })

    },
    methods: {
        updateFilterDataWagonDislocation() {
            this.$emit('updateFilterDataWagonDislocation', this.filter_wagonpolygon)
        }
    },
}
</script>

<style>
.input_filter_wagon_dislocation {
    width: 100% !important;
    height: 30px;
    background: transparent !important;
}

.filterWagonDislocation {
    width: 80% !important;
    display: flex;
    justify-content: space-around;
    /* border-radius: 50px; */
    background: #EFEFEF !important;
    box-shadow: 20px 20px 60px #cecece,
        -20px -20px 60px #f2f2f2;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 1% 0;
}
</style>