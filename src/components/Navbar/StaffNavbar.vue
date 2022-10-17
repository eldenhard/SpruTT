<template>
  <div>
        <div id="navbarMain">
            <ul class="navbarul">
                <li class="navbarList">
                    <div @click="newTab('Сотрудники')">
                        <img src="@/assets/user.png" class="image">
                        <p style="padding-top: 5%; color: grey; font-weight: normal;">Сотрудники</p>
                    </div>
                </li>

            </ul>
        </div>
  </div>
  
  
  
  </template>
  
  <script>


export default {
    name: 'StaffNavbar',
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
 <style> -->

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