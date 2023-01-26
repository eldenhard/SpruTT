<template>
    <div class="autocomplite_component">
        <div class="controller">

        <input type="text" class="textarea" @input="onInput" :value="value" :placeholder="placeholder">
        </div>
        <br>
        <label class="label" :class="myClass">{{ label }}</label>
        <div class="variants" v-if="filtered && showVariants" style="max-height: 50px; overflow: auto;">
            <div v-for="v in filtered" :key="v[variantKey]" class="variant" @click="selectVariant(v)">
              <span style="cursor: pointer;">{{ v[variantTitle] }}</span>  
            </div>
        </div>
       
    </div>
</template>
<style scoped>
.label {
  position: absolute;
  transform: translate(-8.8rem, -5.8rem);
  font-size: 1rem;
  padding: 0 5px;
  background-color: #ffffff !important;
  color: #757575;
}
.textarea {
  position: relative;
  border-radius: 0.4rem;
  background-color: #ffffff;
  border: #bdc3c7 0.1rem solid !important;
  width: 20rem;
  height: 3rem;
  padding: 0rem 1rem;
  font-size: 1.4rem;
  font-size: 15px;
}
::placeholder{
    color: red !important;
}
.error_label {
    color: red;
}
</style>
<script>
export default {
    name: 'AutocompleteInput',
    props: {
        variants: {
            type: Array,
            required: true,
        },
        value: {
            default: ''
        },
        label: {
            type: String,
            default: '',
        },
        variantKey: {
            type: String,
            default: 'id'
        },
        variantTitle: {
            type: String,
            default: 'id'
        },
        placeholder: {
            type: String,
            default: ''
        },
        needFull: {
            type: Boolean,
            default: false
        },
        myClass: {
        type: String,
         default: {},
       }
    },
    data() {
        return {
            showVariants: true,
            selected: null,
            searchQuery: '',
            filtered: []
        }
    },
    computed: {

    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value)
            this.searchQuery = e.target.value
            this.filter()
            if (this.searchQuery.length == 0) this.showVariants = false
        },
        selectVariant(variant) {
            this.selected = variant
            this.$emit('input', variant[this.variantTitle])
            //if(this.needFull){sendFullObject()}
            this.showVariants = false
        },
        sendFullObject(){
            
                this.$emit('selected', this.selected)
        },
        filter() {
            console.log('filter runs')
            const filtered = this.variants.filter(row => {
                return Object.keys(row).some((key) => {
                    return (String(row[this.variantTitle]).toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)
                })
            })
            this.filtered = filtered

            this.showVariants = true
        },
    },
    watch:{
        value(newValue){
            if(this.needFull){
                const variantObject = this.variants.filter(s => s[this.variantTitle] == newValue)
                if(variantObject){
                    this.selected = variantObject[0]
                    this.sendFullObject()
                    }else{
                        this.selected = {}
                    }
                
            }
        }
    }
}
</script>
