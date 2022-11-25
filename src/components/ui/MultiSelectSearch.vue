<template>
    
    <div class="multipleSelection" style="background: #EFEFEF !important">
        <div class="selectBox" 
            >
            <div class='bg'>
                <input class="textarea" style="width: 100%" v-model="searchQuery" @click.stop placeholder="Контрагент">

               
            <br>
         </div>
            <!-- <div class="overSelect"></div> -->
        </div>

        <div id="checkBoxes" v-if="show" style="background-color: #f7f7f7;">
            <label :for="'v'+v.id" v-for="v in filteredVariants" :key="v.id">
                <input type="checkbox" :id="'v'+v.id" @change="change(v)" :checked="checkSelected(v.id)"  /> 
                {{v[variantTitle]}}
            </label>
        </div>
    </div>

</template>

<style>
::-webkit-input-placeholder {
text-align:center;
}
.multipleSelection {
        width: 90% !important;
        position: relative;
        left: 50%;
        transform: translate(-50%,0);
        z-index: 0 !important;
        background: #EFEFEF;

    }

    .selectBox {
        position: relative;
        z-index: 0 !important;

    }

    .selectBox select {
        width: 100%;
        font-weight: bold;
        bottom: 0;
        z-index: 0 !important;
    }

    .overSelect {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0 !important;
    }

    #checkBoxes {
        height: 150px;
        overflow-y: auto;
        z-index: 0 !important;
    }

    #checkBoxes label {
        display: block;
        text-align: left;
        font-size: 11px;
        font-weight: 500;
        z-index: 0 !important;
    }
    #checkBoxes input {
        text-align: left;
        z-index: 0 !important;
    }
</style>

<script>

export default {
name: 'MultiSelectSearch',
props: {
    variantTitle: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Выберите...'
    },
    selected : {
        type: Array,
        default: () => {return []}
    },
    variants: {
        type: [Array, Object],
        required : true
    },

    
},
data(){
    return {

        checked: null,
        searchQuery: '',
    }
},
computed: {
    filteredVariants(){
        if(this.searchQuery.length >0){

            return this.variants.filter(row => {
                return Object.keys(row).some((key) => {
                    return (String(row[this.variantTitle]).toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)                    
                })
            }) 

        }
        return []
    },
    show(){
        return this.filteredVariants.length
    }
 },
methods:{
    checkSelected(id){
        return this.selected.includes(id)
        
    },
    change(v){
        if(this.selected.includes(v.id)){
            this.selected.splice(this.selected.indexOf(v.id), 1)
        }else{
            this.selected.push(v.id)
        }
        this.update()
    },
    update(){
        this.$emit('change', this.selected)
    },
 
}
}
</script>