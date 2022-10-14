<template>
    <div id="tableMain">
        <!-- <input v-model="name" @input="getName" @keyup.enter="limits(param)" type="number" placeholder="Количество"> -->

                    <table border="1" id="info-table">
                    <tr>
                        <th  v-for="post in posts" :key="post.title">{{post.id}}</th>
                    </tr>
                    <tr>
                        <td  v-for="post in posts" :key="post.body">{{post.body}}</td>
                    </tr>
                    </table>
    </div>
</template>


<script>

    export default{
        name: 'WagonTable',
        data(){
            return{
                posts: [],
                name: ''
            }
        },
        methods:{
          limits: async function(let1=''){
                  let ans = ('https://jsonplaceholder.typicode.com/comments?' + `_limit=${let1}`)
                  let res = await fetch(ans)
                  const posts = await res.json()
                  this.posts = posts
              }
       },

}


</script>

<style>

#tableMain{

    overflow: auto;

}
tr,th,td{
    height: 20px !important;
    width: 30px !important;
}
#table tr,th,td{
    height: 20px !important;
    width: 30px !important;
}
.form-control{
    width: 300px;
}
</style>
