<template>
  <div>
    <Loader :loader="loader"></Loader>
    <div
      style="
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        height: 50vh;
        max-height: ;
        transform: translate(-50%, 0);
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="margin: 0"
      >
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th style="width: 70px !important">Название</th>
            <th style="width: 70px !important">Дата создания</th>
            <th style="width: 70px !important">Дата изменения</th>
            <th style="width: 70px !important">Файл</th>
            <th style="width: 70px !important">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bdr in BDRreport" :key="bdr.id">
            <td>
              {{ bdr.name }}
            </td>
            <td>
              {{ new Date(bdr.created_at).toLocaleString() }}
            </td>
            <td>
              {{ new Date(bdr.updated_at).toLocaleString() }}
            </td>
            <td>
              <a target="_blank" :href="bdr.file" v-if="bdr.file"
                ><img src="@/assets/excel.png" alt="" width="20px !important"
              /></a>
            </td>
            <td>
              <button
                style="
                  height: 100%;
                  vertical-align: middle;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
                class="Accept"
                @click="openCurrentReport(bdr.id)"
              >
                Редактировать
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    ></Notifications>
  </div>
</template>

<script>
import Loader from "@/components/loader/loader.vue";
import api from "@/api/report";
import { mapState } from "vuex";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  components: { Loader, Notifications },
  data() {
    return {
      loader: false,
      BDRreport: "",
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  mounted() {
    this.loader = true;
    api.getBDRreport().then((response) => {
      this.BDRreport = response.data.data;
      this.loader = false;
      this.notifyHead = "Успешно";
      this.notifyMessage = "Отчеты загружены";
      this.notifyClass = "wrapper-success";
      this.showNotify = true;
      setTimeout(this.closeNotification, 1500);
    });
  },
  methods: {
    OpenCreateBDRreport() {
      this.loader = true;
      api.getBDRreport().then((response) => {
        this.BDRreport = response.data.data;
        this.loader = false;
        this.notifyHead = "Успешно";
        this.notifyMessage = "Отчеты загружены";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
      });
    },
    closeNotification() {
      this.showNotify = false;
    },
  },
};
</script>