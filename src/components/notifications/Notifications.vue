<template>
    <div>
<div class="wrapper-success" id="notifications" style="display:none">
<div class="card">
    <div class="subject">
    <h5>Здравствуйте</h5>
    <p>Вы успешно авторизированы</p>
    </div>
</div>
</div>


    </div>
</template>

<script>
export default{
    name: 'Notifications'
}
</script>

<style>

.wrapper-success {
    margin: 50px;
    position: fixed;
    top: 0;
    z-index: 10;
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
  @media screen and (max-width:550px) {
      .wrapper-success {
         width: 90%; 
         margin-left: 5%;
      }
  } 

</style>