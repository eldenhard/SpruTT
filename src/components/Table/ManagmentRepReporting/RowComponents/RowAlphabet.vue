<template>
   <template>
    <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>

   </template>
        
        
   
</template>

<script>

export default {
    props: ['lengthRow'],
    data() {
        return {
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        }
    },
    computed:{
        getTh(){
            return this.alphabet.slice(0, this.lengthRow)
        }
    }
}
</script>