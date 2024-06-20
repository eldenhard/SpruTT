<template>
    <section class="search_bloc">
        <div class="long_search">
            <input type="text" placeholder="Введите номера вагонов..." v-model="search" @input="IputProcessing(search)">
            <button class="Request" @click="getRequestToServerData(search)">
                <span v-if="isSearch">Найти</span>
                <b-icon v-if="!isSearch" icon="three-dots" animation="cylon" font-scale="3"></b-icon>
            </button>
        </div>

    </section>
</template>

<script>
import api from "@/api/directory";
export default {

    data(){
        return{
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
            let obj = {wagons: search.replace(/[^.\d]+/g,"").replace(/(\d{8})(?=\d)/g, '$1,')}
            let today = new Date().toISOString().slice(0, 10)
            try{
                let response = await api.getAllInsuranceWagons(obj)
                let response2 = await api.getOwnWagonsCompare(today)
                // console.log(response, response2)
                this.$emit('getInsuredWagons', response)
                this.$emit('getOwnWagonsCompare', response2)
                this.isSearch = true
            }
            catch (err){
                console.log(err)
                this.isSearch = true
            }
        }
    }
}
</script>

<style scoped>


.long_search {
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
    width: 15%;
    height: 80%;
    position: absolute;
    top: 4px;
    right: 5px;
    
    border-radius: 8px;
}
</style>