<template>
    <b-modal :id="what_is_ref" hide-footer :title="title_modal">

        <modal_change v-if="what_is_ref == 'change_user'" :info="info" @getData='getData'/>
        <modal_created v-if="what_is_ref == 'add_user'" />
        <modal_delete v-if="what_is_ref == 'delete_user'" :info="info" @getData='getData'/>
        <modal_watchVue v-if="what_is_ref == 'Просмотр сотрудника'" :info="info" />
    </b-modal>
</template>


<script>
import { mapState } from 'vuex'
import modal_change from './modal/modal_change.vue'
import modal_created from './modal/modal_created.vue'
import modal_delete from './modal/modal_delete.vue'
import modal_watchVue from './modal/modal_watch.vue'
export default {
    components: { modal_change, modal_created, modal_delete, modal_watchVue },
    props: ['what_is_ref', 'title_modal', 'info'],
    data() {
        return {
 
        }
    },
    methods:{
        getData(){
            this.$emit('getData')
        }
    }

}
</script>