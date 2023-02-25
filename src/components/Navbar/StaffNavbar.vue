<template>
  <div id="navbarMain">
    <b-card no-body>
      <b-tabs pills card vertical nav-wrapper-class="w-100" style="
            background: white;
            height: 100vh !important;
            text-align: center !important;
            justify-content: center !important;
          ">
        <b-container class="bv-example-row">
          <b-tab title="Сотрудники" active @click="newTab('Сотрудники')"> </b-tab>

        </b-container>
      </b-tabs>
    </b-card>
  </div>
</template>
  
<script>


export default {
  name: 'StaffNavbar',
  props: ['tabs', 'counter'],
  data: function () {
    return {
      inner_counter: this.counter
    }
  },
  methods: {
    newTab(tabname) {
      this.tabs.push({ 'name': tabname, 'id': Date.now() })

      localStorage.setItem('tabs', JSON.stringify([...this.tabs]))
    }
  }

}

</script>
<style> #navbarMain {
   background: #CECECE;
   display: block;
   height: 120px;
 }

 .navbarList li>a {
   display: block;
   text-decoration: none;
 }

 .navbarul {
   padding-top: 8px;
   /* margin-left: 10%; */
 }

 ul.navbarul li {
   display: inline-block;
 }

 .navbarList {
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

 .navbarList:hover {
   border: 1px solid #9D9D9D;
 }

 .image {
   width: 40px;
   margin-top: 5px;
 }
</style> 