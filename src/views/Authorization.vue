<template>
  <div>
    <div id="id01" class="modal" v-if="showAuthForm">
      <div
        class="modal-content animate"
        style="width: 60% !important; margin: 0 !important"
      >
        <div class="container">
          <label for="uname"><b>Email</b></label>
          <input
            type="text"
            placeholder="i.ivanov@tehtrans.com"
            v-model="email"
            v-on:keyup="handleInputOnKeyup"
            style="border-bottom: 1px solid grey !important"
          />

          <label for="psw"><b>Пароль</b></label>
          <input
            type="text"
            placeholder="Введите пароль"
            v-model.trim="password"
            style="border-bottom: 1px solid grey !important"
          />

          <button @click="submitEntry()">Войти</button>
        </div>
      </div>
    </div>

 

    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    />
  </div>
</template>


<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/auth";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  name: "Authorization",
  data() {
    return {
      email: "",
      password: "",
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      showAuthForm: true,
      CheckLocalStorage: localStorage.getItem('accessToken'),

    };
  },
  methods: {
    submitEntry: function () {
      if (this.email.length > 0) {
        this.$store
          .dispatch(actionTypes.login, {
            email: this.email,
            password: this.password,
          })
          .then((user) => {
            if (this.$store.state.auth.isLoggedIn) {
              this.showNotify = true;
              this.notifyHead = "Здравствуйте";
              this.notifyMessage = "Вы успешно авторизированы";
              this.notifyClass = "wrapper-success";
              this.showAuthForm = false
              // location.reload();
              // document.location.href = '/'


              // document.location.href = '/'
            }
          })
          .catch((error) => {
            this.showNotify = true;
            this.notifyHead = "Ошибка авторизации";
            this.notifyMessage = error.response.data;
            this.notifyClass = "wrapper-error";
          });
      } else {
        this.showNotify = true;
        this.notifyHead = "Ошибка авторизации";
        this.notifyMessage = "Введите Email";
        this.notifyClass = "wrapper-error";
      }

      //const api = "http://10.1.5.65/api/personal/login/";
      // axios
      //     .post(api, {
      //     email: this.email,
      //     password: this.password,
      // })
      //     .then(resp => {
      //         console.log('in then');
      //     let user = resp.data;
      //     console.log(user);
      //     if (user.token) {

      //         this.$store.commit("setUser", user);
      //         this.showNotify = true
      //         this.notifyHead = 'Здравствуйте'
      //         this.notifyMessage = 'Вы успешно авторизированы'
      //         this.notifyClass = 'wrapper-success'
      //     }
      // })
      // .catch(err => {
      //     console.log('in catch');
      //   this.showNotify = true
      //   this.notifyHead = 'Ошибка авторизации'
      //   this.notifyMessage = 'Пожалуйста, проверьте ваши введенные данные'
      //   this.notifyClass = 'wrapper-error'
      // })
      return false;
    },
    handleInputOnKeyup() {
      this.email = this.email.toLowerCase();
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      authStatus: (state) => state.auth.isLoggedIn,
    }),

    // authStatus: function(){
    //     if(this.user.token) return true
    //     return false
    // }
  },
  watch: {
    CheckLocalStorage(){
      if(this.CheckLocalStorage === ""){
        this.showAuthForm = true
      } else {
        this.showAuthForm = false

      }
    },
    showNotify: function (v) {
      if (v) {
        setTimeout(() => {
          this.showNotify = false;
        }, 3000);
      }
    },
    authStatus: function (newVal, oldVal) {
      if (oldVal === false && newVal === true) {
        setTimeout(() => {
          this.showAuthForm = false;
        }, 1500);
      }
    },
  },
  components: { Notifications },
  mounted() {
    if (this.authStatus) this.showAuthForm = false;
 
  },
};
</script>





<style scoped>
.mainModalProgressBar {
  background: rgb(85, 85, 85, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 99999999999999999999999999999999 !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 40%;
}

.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }

  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }

  .cancelbtn {
    width: 100%;
  }
}

@media screen and (max-width: 550px) {
  .modal-content .modal {
    width: 90% !important;
  }
}
</style>
