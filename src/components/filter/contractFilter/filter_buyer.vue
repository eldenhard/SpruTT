<template>
    <div class="filterContract">
        <div style="display:flex; flex-direction:column;">
            <div class='bg'>
                <input class='textarea' id='contract-buyer' name='Pwd' v-model="filter_buyer.number"
                    @change="updateFilterDataBuyer" />
                <br>
                <label for='contract-buyer' class='label'>Номер договора</label>
            </div>
        </div>

    </div>
</template>
    
    

    
<script>
import { mapState } from 'vuex'
export default {
    name: 'FilterBuyer',
    data() {
        return {
            filter_buyer: {
                number: '',
                counterparty__full_name: '',

            },
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            groupsFilterStaff: state => state.auth.groups
        }),
    },
    methods: {
        updateFilterDataBuyer() {
            this.$emit('updateFilterDataBuyer', this.filter_buyer)
        }
    },
}
</script>