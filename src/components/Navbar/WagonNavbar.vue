<template>

    <div>
        <div id="navbarMain">
            <ul class="navbarul">
                <li class="navbarList" style="filter:brightness(0.8)">
                    <div>
                    <!-- <div @click="newTab('Дислокация')"> -->
                        <img src="@/assets/map.png" class="image">
                    </div>
                    <b-dropdown text="Дислокация" style="width: 100%" disabled>
                        <b-dropdown-item @click="newTab('Дислокация-таблица')" >дислокация 1</b-dropdown-item>
                    </b-dropdown>
                </li>
  
                <li class="navbarList" style="filter:brightness(0.8)">
                    <!-- <div @click="newTab('Рейсы')"> -->
                        <div>
                        <img src="@/assets/flight.png" class="image">
                    </div>
                    <b-dropdown text="Рейсы" style="width: 100%" disabled>
                        <b-dropdown-item @click="newTab('Рейсы-таблица')">Рейсы 1</b-dropdown-item>
                    </b-dropdown>
                </li>
  
                <li class="navbarList">
                    <div @click="newTab('Вагоны')">
                        <img src="@/assets/wagon.png" class="image">
                    </div>
                    <b-dropdown  text="Вагоны" style="width: 100%" >
                        <b-dropdown-item @click="newTab('Брошенные вагоны')">БРОС. вагоны</b-dropdown-item>
                        <!-- <b-dropdown-item @click="newTab('Полигоны')">По полигонам</b-dropdown-item> -->
                    </b-dropdown>
                </li>
  
                <li class="navbarList" style="filter:brightness(0.8)">
                    <div>
                    <!-- <div @click="newTab('Отчеты')"> -->
                        <img src="@/assets/report.png" class="image">
                    </div>
                    <b-dropdown text="Отчеты" style="width: 100%" disabled>
                        <b-dropdown-item @click="newTab('Отчеты-таблица')">Отчеты 1</b-dropdown-item>
                        <b-dropdown-item @click="newTab('Брошенные вагоны')">БРОС. вагоны</b-dropdown-item>
                        <b-dropdown-item @click="newTab('Брошенные вагоны')">План факт. по дог.</b-dropdown-item>


                    </b-dropdown>
                </li>
            </ul>
        </div>



    </div>
  
  
  
  
  </template>
  
  <script>
    export default {
        name: 'Navbar',
        props: ['tabs', 'counter'],
        data: function(){
            return{
                inner_counter: this.counter
            }
        },
        methods:{
            newTab(tabname) {
                this.tabs.push({'name': tabname, 'id': Date.now() })
                
                localStorage.setItem('tabs', JSON.stringify([...this.tabs]))
            }
        }
    
    }
    
  
  </script>
  
  
  
  <!-- <div>
      <button class="button Request">Запрос</button>
      <button class="button Accept">Подтверждение</button>
      <button class="button Delete">Удаление</button>
      <button class="button Action">Действие</button>
      <button class="button Cancel">Отмена</button>
      </div> -->
  
  
  
<style scoped>
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
  