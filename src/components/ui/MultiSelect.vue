<template>
    
        <div class="multipleSelection">
            <div class="selectBox" 
                @click="show=!show">
                <select style="font-weight: 300 !important;">
                    <option">Сотрудник</option>
                </select>
                <div class="overSelect"></div>
            </div>
  
            <div id="checkBoxes" v-if="show">
                <label :for="'v'+v.id" v-for="v in variants" :key="v.id">
                    <input type="checkbox" :id="'v'+v.id" @change="change(v)" :checked="checkSelected(v.id)"/> 
                    {{v.first_name}} {{v.last_name}}
                </label>
            </div>
            {{responsible_person}}
        </div>

</template>

<style>
.multipleSelection {
            width: 90% !important;
            position: relative;
            left: 50%;
            transform: translate(-50%,0);
            z-index: 0 !important;
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
    name: 'MultiSelect',
    props: {
        selected : {
            type: Array
        },
        variants: {
            type: [Array, Object],
            required : true
        },

        
    },
    data(){
        return {
            show: false,
            checked: null,
            responsible_person: "",
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