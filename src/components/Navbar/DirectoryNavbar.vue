<template>

    <div>
        <div id="navbarMain">
            <ul class="navbarul">
                <li class="navbarList">
                    <div @click="newTab('Вагоны')">
                        <img src="@/assets/wagon.png" class="image">
                    </div>
                    <b-dropdown  text="Вагоны" >
                        <b-dropdown-item @click="newTab('Вагоны-таблица')">Вагоны 1</b-dropdown-item>
                    </b-dropdown>
                </li>
  
                <li class="navbarList">
                    <div @click="newTab('Договора')">
                        <img src="@/assets/report.png" class="image">
                    </div>
                    <b-dropdown  text="Договора" >
                        <b-dropdown-item @click="newTab('Договора')">Договор 1</b-dropdown-item>
                    </b-dropdown>
                </li>
            </ul>
        </div>



    </div>
  
  
  
  
  </template>
  
  <script>
    export default {
        name: 'DirectoryNavbar'
    
    }
    
  
  </script>

  <style>
    select{
    width: 100%;
    box-sizing: border-box;
  }
#navbarMain{
    background: #CECECE;
    display: block;
    height: 120px;
  }
.navbarList li > a {
    display: block;
    text-decoration: none;
  }
.navbarul{
      padding-top: 8px;
      /* margin-left: 10%; */
  }
ul.navbarul li{
      display: inline-block;
  }
.navbarList{
  display: block;
  margin-left: 2px;
  list-style: none;
  text-align: center;
  padding: 7px 10px;
  border: 1px solid #ECECEC;
  background: #ECECEC;
  cursor: pointer;
  height: 100px;
  min-width: 150px;
  }
.navbarList:hover{
      border: 1px solid #9D9D9D;
  }
.image{
      width: 40px;
      margin-top: 5px;
  }  
  </style>