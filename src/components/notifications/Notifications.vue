<template>
<div v-if="show" :class="blockClass" id="notifications">
  <div class="notifications-main">
      <div class="subject">
      <h5>{{header}}</h5>
      <p v-html="formatMessage"></p>
      </div>
  </div>
</div>
</template>

<script>
export default{
    name: 'Notifications',
    props: {
      show: {
        type: Boolean,
        required: false,
        default: false
      },
      header: {
        type: String,
        default: 'Здравствуйте',
        required: false
      },
      message: {
        // type: String,
        default: 'Вы успешно авторизированы',
        required: false
      },
      blockClass: {
        type: String,
        required: false,
        default: 'wrapper-success'
      }
    },
    data(){
      return {

      }
    },
    computed:{
      formatMessage(){
        if(Array.isArray(this.message)){
          let mess = JSON.parse(JSON.stringify(this.message))
          return mess.join('<br>')
        }
        return this.message
      }
    },
  
}
</script>

<style>

.wrapper-success {
    position: fixed;
    top: 1%;
    left: 3%;
    z-index: 9999999999999 !important;

  }
  .wrapper-success .notifications-main {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 5px solid #4CAF50 !important;
    border-radius: 3px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    z-index: 999999;
  }
  .wrapper-success .notifications-main .subject {
    margin-right: 10px;
  }
  .wrapper-success .notifications-main .subject p {
    color: #909092;
  }  

  .wrapper-error {
    position: fixed;
    top: 1%;
    left: 3%;
    z-index: 9999999999999 !important;
  }
  .wrapper-error .notifications-main {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 5px solid #fb1500 !important;
    border-radius: 3px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .wrapper-error .notifications-main .subject {
    margin-right: 10px;
  }
  .wrapper-error .notifications-main .subject p {
    color: #909092;
  }  
  @media screen and (max-width:550px) {
      .wrapper-error {
         width: 70%; 
         position: relative;
         left: 50%;
         transform: translate(-50%,0);
         margin: 0 !important;

      }
      .wrapper-success {
         width: 70%; 
         position: relative;
         left: 50%;
         transform: translate(-50%,0);
         margin: 0 !important;
      }
  } 


</style>