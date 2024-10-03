<template>
    <section class="search_bloc">
        <div class="long_search">
            <!-- <input type="text" placeholder="Введите номера вагонов..." v-model="search" @input="IputProcessing(search)"> -->
            <b-button variant="success" class="btn btn-success" @click="getRequestToServerData(search)" style="display: flex; align-items: center; justify-content: center;">
                <span v-if="isSearch">Запросить данные по вагонам</span>
                <b-icon v-if="!isSearch" icon="three-dots" animation="cylon" font-scale="3"></b-icon>
            </b-button>
        </div>

    </section>
</template>

<script>
import api from "@/api/directory";
export default {

    data() {
        return {
            isSearch: true,
            search: "",
            intervalResponse: null,
        }
    },
    watch: {
        search() {
            return this.search.length <= 1 ? this.responseSearchData = null : this.responseSearchData
        }
    },
    methods: {
        IputProcessing(val) {
            clearInterval(this.intervalResponse)
            this.intervalResponse = setTimeout(() => {
                this.getRequestToServerData(val)
            }, 500)
        },

        
  

        async getRequestToServerData(search) {
            // if (this.search == "" || this.search.length <= 1) return
            this.isSearch = false
            let obj = { wagons: search }
            let today = new Date().toISOString().slice(0, 10)
            let allData = [];
            try {
                // let response = await api.getAllInsuranceWagons(obj)

                let last_page = 1
                let response = await api.getAllInsuranceWagons(obj, last_page);
                allData.push(...response.data.data)
                while(last_page < response.data.total_pages){
                    last_page +=1
                    let res = await api.getAllInsuranceWagons(obj, last_page);
                    allData.push(...res.data.data)
                }

                let today = new Date().toISOString().slice(0, 10);
                let response2 = await api.getOwnWagonsCompare(today);
                this.$toast.success('Данные по застрахованным вагонам загружены\n Продолжается загрузка незастрахованных вагонов', {
                    timeout: 3000
                })
                allData.forEach(item => {
                    item.agr_date =  item?.agr_date?.split('-').reverse().join('.') || null
                    item.agr_date_end = item?.agr_date_end?.split('-').reverse().join('.')|| null
                    item.build_date =  item?.build_date?.split('-').reverse().join('.')|| null
                    item.last_operation_date = item?.last_operation_date?.split('-').reverse().join('.')|| null
                    item.state_change_date = item?.state_change_date?.split('-').reverse().join('.')|| null
                    item.lifetime = item?.lifetime?.split('-').reverse().join('.')|| null
                    item.insurance_sum = item?.insurance_sum?.toFixed(2) || null
                    item.on_balance_1c = item?.on_balance_1c ? 'Да' : 'Нет'
                })
                
                this.$emit('getInsuredWagons', allData);
                this.$emit('getOwnWagonsCompare', response2)
                this.isSearch = true
            }
            catch (err) {
                console.log(err)
                this.isSearch = true
            }
        }
    }
}
</script>

<style scoped>
/* .long_search {
    position: relative;
    width: 90%;
    margin: 0 auto;
}

.long_search {
    position: relative;
    width: 100%;
    height: 110%;
}

.long_search input {
    width: 100%;
    height: 100%;
    border: 1px solid #007BFF !important;
    border-radius: 10px;
    text-align: left !important;
    padding-left: 2% !important;
} */

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
    
   min-width: 13vw;
   width: auto;
    height:4vh;
    /* position: absolute;
    top: 4px;
    right: 5px; */

    border-radius: 8px;
}
</style>