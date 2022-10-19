<template>
    <div>
        <button class="Accept" @click="ThrowWagons()">Запросить вагоны</button>
        <button>Я просто кнопка</button>
    {{throwWagons}}
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="broc in throwWagons" :key="broc.id">
            <td>{{broc.id}}</td>

            </tr>
        </tbody>
    </table>

    </div>
</template>


<script>
import api from '@/api/wagonPark'
export default {
    name: 'Abandon',
    data(){
        return{
            throwWagons: ''
        }
    },
    methods: {
        ThrowWagons(){
            api.getWagonsThrow()
            .then((response) => {
                this.throwWagons = response.data.data
            })
        }
    }
}
</script>

