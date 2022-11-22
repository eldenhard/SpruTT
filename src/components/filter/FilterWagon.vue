<template>
    <div class="filterStaff">
        <div style="display:flex; flex-direction:column; ">
            <div class='bg'>
                <p style="color: #757575;">Активность</p>
                <input type="checkbox" id="switch" v-model="filters.is_active" @change="updateFilterData"
                    class='textarea' style="  height: 0; width: 0;  visibility: hidden; margin-top: -10% !important;" />
                <label for="switch" class="active-wagon">{{ activeWagonLabel }}
                </label>

                <!-- <input type="checkbox" id="checkbox" v-model="filters.is_active" @change="updateFilterData"
                        checked class="textarea" style="width: 15px !important;   border: black 2px solid;">
                    <br>
                    <label for='checkbox' class='label'>{{ activeWagonLabel }}</label> -->
            </div>

        </div>
        <div style="display:flex; flex-direction:column">
            <div class='bg'>
                <select v-model="filters.wagon_type" @change="updateFilterData" class="textarea">
                    <!-- <option value="">{{ wagonTypes }}</option> -->
                    <option v-for="wagType in wagonTypes" :key="wagType">
                        {{ wagType }}
                    </option>
                </select>
                <br>
                <label for='input-filter-staff2' class='label'>Тип вагона</label>
            </div>

        </div>
    </div>
    <!-- <table class="tableFilterWagon">
            <tr>
                <td style="width: 150px !important; height: 80px !important;">
                    <p>Используется</p>
                    <input type="checkbox" id="activeWagon" v-model="filters.is_active" @change="updateFilterData"
                        checked>
                    <label for="activeWagon"> {{ activeWagonLabel }}</label>

                </td>

                <td style="width: 150px !important; height: 80px !important;">
                    <p>Тип</p>

                    <select v-model="filters.wagon_type" @change="updateFilterData">
                        <option v-for="wagType in wagonTypes" :key="wagType.id">
                            {{ wagType.name }}
                        </option>
                    </select>
                </td>

            </tr>

        </table> -->

</template>


<style>
.tableFilterWagon {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
}

.tableFilterWagon td {
    background: rgb(255, 255, 255);
    box-shadow: 2px 3px rgb(218, 218, 218);
}



.active-wagon {
    cursor: pointer;
    text-indent: -9999px;
    width: 70px;
    height: 30px;
    background: grey;
    display: block;
    border-radius: 50px;
    position: relative;
    margin-top: -40% !important;
}

.active-wagon:after {
    content: "";
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    width: 25px;
    height: 25px;
    background: #fff;
    border-radius: 35px;
    transition: 0.3s;

}

input:checked+.active-wagon {
    background: #bada55;
}

input:checked+.active-wagon:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
}

.active-wagon:active:after {
    width: 50px;
}
</style>

<script>
import api from '@/api/wagonPark'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            filters: {
                is_active: true,
                wagon_type: []
            },
            wagonTypes: []
        }
    },
    computed: {
        activeWagonLabel() {
            return this.filters.is_active ? ' Активный' : ' Активный'
        },
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
    methods: {
        updateFilterData() {
            this.$emit('updateFilters', this.filters)
        },
    },
    mounted() {
        api.getWagonType()
            .then(response => {
                this.wagonTypes = response.data.wagon_types

            }),
            // const pretoken = JSON.parse(localStorage.getItem("vuex"));
            // const token = pretoken.auth.user.token;
            // fetch("http://10.1.5.65/api/wagon-park/wagon-type/", {
            // fetch("/api/wagon-park/wagon-type/", {

            //     headers: {
            //         "Authorization": `Basic ${token}`
            //     },
            //     method: "GET"
            // })
            //     .then((response) => {
            //         this.wagonTypes = response.data;
            //         if (response.ok) {
            //             return response.json().then(r => {
            //                 this.wagonTypes = r.data;

            //             });
            //         }
            //         else {
            //             console.log("NOT OK");
            //         }
            //     }),
            this.updateFilterData()

    }
    // mounted: function() {
    //     this.updateFilterData()
    // }
}
</script>