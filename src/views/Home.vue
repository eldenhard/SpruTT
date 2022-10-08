<template>
<div id="home">
   
  <DirectoryNavbar></DirectoryNavbar>  
  <br>
  <SideBarHome></SideBarHome>
    </div>

    <!-- <div>
 <p>Текст запроса</p> {{ info }}
</div> -->


</template>



<script>
import DirectoryNavbar from '../components/Navbar/DirectoryNavbar.vue';
import SideBarHome from '../components/Navbar/SideBarHome.vue';
export default{
    name: 'Home',
    components: {DirectoryNavbar,SideBarHome}
    // data(){
    //     return{
    //         info: []
    //     }
        }
//         mounted(){ 
//         axios
//       .get('https://jsonplaceholder.typicode.com/posts')
//       .then(response => (this.info = response));
//   }
    
  

</script>

