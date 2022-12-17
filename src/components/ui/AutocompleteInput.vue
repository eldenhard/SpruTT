<template>
    <div class="autocomplite_component">
        <div class="controller">
            <label for="">{{ label }}</label>
            <input type="text" class="textarea" @input="onInput" :value="value">
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
