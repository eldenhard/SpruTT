<template>
  <div v-if="modal_notifications" class="modal_notifications">
    <div class="header">
      <h5>Уведомления {{ currentData.length }}</h5>
      <select name="" id="" style="width: 30%; height: auto;" v-model="filtered_notif">
        <option value= "all" >Все</option>
        <option value="success" >Успешно</option>
        <option value="in_work" >В работе</option>
        <option value="in_queue" >В очереди</option>
        <option value="error" >Ошибка</option>

      </select>
      <input type="text" style="border: 1px solid #cfcfcf !important;" v-model="search" placeholder="поиск">
      <i style="float: right" @click="$emit('close')">
        <img src="@/assets/cross.png" alt="" />
      </i>
    </div>
    <br>
    <hr />
 
    <div >
      <div v-for="item in currentData" :key="item.id">
        <div class="content" >
            <hr>
        <p>{{ item.id }}</p>
        <p style="font-weight: bold">{{ item.name }}</p>
        <p>{{ item.created_at | created }}</p>
        <p
          class="color_status"
          :class="{
            error_status: item.status == 'error',
            success: item.status == 'success',
            in_work: item.status == 'in_work',
            in_queue: item.status == 'in_queue',
          }"
        >
          {{ item.status | status }}
        </p>
        <p class="add_inf" @click="All_information(item.id)">Подробнее &#9660;</p>
        </div>

        <div class="full_information" :id="item.id"    v-if="dop_inform">
           <span v-html="item.info.replace(/(\r\n|\n|\r)/g,'<br>')"> </span>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>
// import api from '@/api/report'
export default {
  props: {
    modal_notifications: false,
    data: '',
  },
  data() {
    return {
      classObject: {
        error: false,
        success: false,
        in_work: false,
        in_queue: false,
      },
      dop_inform: true,
      filtered_notif: 'all',
      search: '',

    };
  },

  computed: {
    currentData(){
      if(this.filtered_notif == 'all'){
        if(this.search == ''){
          return this.data 
        } return this.data.filter(item => item.info.includes(this.search))
      }  return this.data.filter(item => item.status == this.filtered_notif && item.info.includes(this.search))

    }
  },
  methods: {
    has_Status_Computed(value) {
      switch (value) {
        case "in_queue":
          return (this.classObject.in_queue = true);
        case "error":
          return (this.classObject.error = true);
        case "success":
          return (this.classObject.success = true);
        case "in_work":
          return (this.classObject.in_work = true);
      }
    },
    All_information(item) {
        let docum = document.getElementById(item)
        return  docum.style.display == 'none' ?  docum.style.display = 'block' :  docum.style.display = 'none'

    },
  },
  filters: {
    status(value) {
      switch (value) {
        case "in_queue":
          return "В очереди";
          break;
        case "error":
          return "Ошибка";
          break;
        case "success":
          return "Успешно";
          break;
        case "in_work":
          return "В работе";
          break;
      }
    },
    created(value) {
      let time = new Date(value);
      // return `${time.getDate()} ${time.toLocaleString('default', { month: 'long' })} ${time.getFullYear()} ${time}`
      return time.toLocaleString();
    },
    red_inf(value){
        let data = value
     return   data.replace(/(\r\n|\n|\r)/g,'\n\n')
    }
  },
};
</script>

<style scoped>
.full_information {
    padding-left: 1%;
    color: black;
    background: rgb(238, 238, 238);
}
.add_inf {
  cursor: pointer;
}
.error_status {
  color: red;
}
.success {
  color: green;
}
.in_work {
  color: orange;
}
.in_queue {
  color: blue;
}
.color_status {
  font-weight: 500;
}
.modal_notifications {
  position: absolute;
  top: 2%;
  right: 1%;
  background: rgba(238, 238, 238, 0.5);
  z-index: 999999999;
  width: 35%;
  /* height: auto; */
  min-height: 20vh;
  max-height: 45vh;
  overflow: auto;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  transform: translateX(-150%);
  animation: ani 1s forwards;
}

@keyframes ani {
  0% {
    transform: translateX(150%);
  }

  100% {
    transform: translateY(0);
  }
}
.header > h5 {
  color: rgb(202, 202, 202);
}

i {
  cursor: pointer;
}
hr {
  margin: 0;
  padding: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 2% 3% 0 2%;
  /* position: fixed; */
  /* background: white; */
}
.content {
  display: flex;
  justify-content: space-between;
  padding: 2% 3% 0 2%;
  border-bottom: 1px solid #cfcfcf;
  vertical-align: middle;
  color: #5c5c5c;
}
.circle {
  width: 10px;
  height: 10px;
  background: red;
}
</style>

