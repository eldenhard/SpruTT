<template>
    <div class="autocomplite_component">
        <div class="controller">

            <input type="text" class="textarea" @input="onInput" :value="value" :placeholder="placeholder" style="position: relative;
  border-radius: 0.4rem;
  background-color: white !important;
  border: #C6CBCF 0.1rem solid !important;
  width: 20rem;
  height: 3rem;
  padding: 0rem 1rem;
  font-size: 1.4rem;
  font-size: 15px;
  ">
  <br>
  <label for="" class="label" style="
    position: absolute;
  transform: translate(-9.8rem, -4rem);
  font-size: 1rem;
  padding: 0 5px;
  background-color: white !important;
  color: #757575;
  ">{{ label }}</label>
        </div>
        <div class="variants" v-if="filtered && showVariants">
            <div v-for="v in filtered" :key="v[variantKey]" class="variant" @click="selectVariant(v)">
                {{ v[variantTitle] }}
            </div>
        </div>
    </div>
</template>

<script>
import {debounce} from '@/helpers/debounce'

export default {
    name: 'AutocompleteInput',
    props: {
        variants: {
            type: Array,
            required: true,
        },
        value: {
            type: String,
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
            if(this.searchQuery.length == 0 ) this.showVariants = false
        },
        selectVariant(variant) {
            this.selected = variant
            this.$emit('input', variant[this.variantTitle])
            this.showVariants = false
        },
        filter(){
            console.log('filter runs')
            const filtered = this.variants.filter(row => {
                return Object.keys(row).some((key) => {
                    return (String(row[this.variantTitle]).toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)                    
                })
            })
            this.filtered = filtered

            this.showVariants = true
        },
    }
}
</script>
