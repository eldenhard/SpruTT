<template>
    <div>
  <div id="id01" class="modal" v-if="showAuthForm" style="display: block;">
    <div class="modal-content animate" style=" width: 40%;">
      <div class="container">
        <label for="uname"><b>Email</b></label>
        <input type="text" required placeholder="i.ivanov@tehtrans.com" v-model="email">

        <label for="psw"><b>Пароль</b></label>
        <input type="password" required placeholder="Введите пароль" v-model="password">

        <button @click="submitEntry()">Войти</button>
      </div>
    </div>
    
  </div><Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"/>
</div>
</template>


<script>
import axios from "axios";
import {mapState} from "vuex";
import {actionTypes} from '@/store/modules/auth'
import Notifications from "@/components/notifications/Notifications.vue";
export default {
    name: "Authorization",
    data() {
        return {
            email: "",
            password: "",
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',
            showAuthForm: true
        };
    },
    methods: {
        submitEntry: function () {

            this.$store.dispatch(actionTypes.login, {
                email: this.email,
                password: this.password
            }).then((user) => {
                if(this.$store.state.auth.isLoggedIn){
                    this.showNotify = true
                    this.notifyHead = 'Здравствуйте'
                    this.notifyMessage = 'Вы успешно авторизированы'
                    this.notifyClass = 'wrapper-success'
                }
            }).catch((e) => {
                this.showNotify = true
              this.notifyHead = 'Ошибка авторизации'
              this.notifyMessage = 'Пожалуйста, проверьте ваши введенные данные'
              this.notifyClass = 'wrapper-error'
            })

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
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            authStatus: state => state.auth.isLoggedIn
        }),
        // authStatus: function(){
        //     if(this.user.token) return true
        //     return false
        // }
    },
    watch: {
      showNotify: function(v){
        if(v){
          setTimeout(() => {
            this.showNotify = false
          }, 15000)
        }
      },
    authStatus: function(newVal, oldVal){
        if(oldVal === false && newVal === true){
            setTimeout(() => {
                this.showAuthForm = false
            }, 1500) 
        }
      }
    },
    components: { Notifications },
    mounted(){
        if(this.authStatus) this.showAuthForm = false
    }
}
    </script>





<style>





input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
button {
    background-color: #4CAF50;
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
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
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
    animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
    from {-webkit-transform: scale(0)}
    to {-webkit-transform: scale(1)}
}

@keyframes animatezoom {
    from {transform: scale(0)}
    to {transform: scale(1)}
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
</style>
