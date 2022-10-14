<template>
<div v-if="show" :class="blockClass" id="notifications">
  <div class="card">
      <div class="subject">
      <h5>{{header}}</h5>
      <p>{{message}}</p>
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
        type: String,
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
    }
}
</script>

<style>

.wrapper-success {
    margin: 50px;
    position: fixed;
    top: 0;
    z-index: 1060;
  }
  .wrapper-success .card {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 5px solid #4CAF50;
    border-radius: 3px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .wrapper-success .card .subject {
    margin-right: 10px;
  }
  .wrapper-success .card .subject p {
    color: #909092;
  }  

  .wrapper-error {
    margin: 50px;
    position: fixed;
    top: 0;
    z-index: 9999999999999 !important;
  }
  .wrapper-error .card {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 5px solid #fb1500;
    border-radius: 3px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .wrapper-error .card .subject {
    margin-right: 10px;
  }
  .wrapper-error .card .subject p {
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