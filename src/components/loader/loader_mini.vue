<template>
    <div class="loader-container" v-if="loader">
      <span class="loader"></span>
      <span class="loader-text amount">Синхронизация данных</span>
    </div>
  </template>
  
  <script>
  export default {
    props: ['loader']
  }
  </script>
  
  <style scoped>
  .loader-container {
    position: sticky;
    z-index: 123;
    top: 1vh !important;
    margin-left: auto !important;
    margin-right: 2%;
    left: 90%;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end; 
  }
  
  .loader {
    width: 18px;
    height: 18px;
    border: 2px dotted #9b9b9b;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 2s linear infinite;
  }
  
  .loader-text {
    margin-left: 8px; /* Расстояние между лоадером и текстом */
    font-size: 12px;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>