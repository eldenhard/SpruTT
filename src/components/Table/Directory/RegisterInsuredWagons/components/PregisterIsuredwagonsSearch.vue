<template>
    <section class="search_bloc">
        <div class="long_search">
            <input type="text" placeholder="Поиск..." v-model="search" @input="IputProcessing(search)">
            <button class="Request" @click="InputTable(search)">
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
            if (this.search == "" || this.search.length <= 1) return
            this.isSearch = false
            let obj = {wagon_number: search}
            debugger
            try{
                let response = await api.getAllInsuranceWagons(obj)
                console.log(response)
                this.isSearch = true
            }
            catch{
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
</style>