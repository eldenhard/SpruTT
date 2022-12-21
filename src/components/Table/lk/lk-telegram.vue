<template>
  <div>
    <Loader :loader="loader"></Loader>
    <div class="userField9-description">
      <p class="userField9-description-text">Ваши телеграммы</p>
    </div>
    <hr style="width: 100% !important; margin: 0; padding: 0" />
    <br />
    <div
      style="width: 100%; overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        margin-bottom: 3%;
        height: 50vh
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="table-layout: fixed"
      >
        <thead class="thead-light">
          <tr>
            <th style="width: 100px !important">№ договора</th>
            <th style="width: 100px !important">Код груза</th>
            <th style="width: 100px !important">Тип вагона</th>
            <th style="width: 100px !important">Номер вагона</th>
            <th style="width: 100px !important">Дата создания</th>
            <th style="width: 100px !important">Файл</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="telegram in telegrams" :key="telegram.id">
            <td>{{ telegram.contract }} </td>
            <td>{{ telegram.cargo_code }}</td>
            <td>{{ telegram.wagon_type }}</td>
            <td>{{ (telegram.wagons).join(' ') }}</td>
            <td>{{new Date(telegram.created_at).toLocaleString()}}</td>
            <td><a download target="_blank" :href="telegram.document" v-if="telegram.document"><img src="@/assets/word.png"
                        alt="" width="20px !important" /></a>
             </td>

          </tr>
       
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>

<script>
import Loader from "@/components/loader/loader.vue";
import api from "@/api/wagonPark";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  name: 'lk-telegram',
  components: {Loader, Notifications},
  data(){
    return {
      loader: false,
      telegrams: ''
    }
  },
  mounted(){
    this.loader = true
    const preid = JSON.parse(localStorage.getItem('vuex'))
    const id = preid.auth.uid
    api.getAllTelegrams(id)
      .then(response => {
        this.telegrams = response.data.data
        this.loader = false
      })
    
  }
}
</script>