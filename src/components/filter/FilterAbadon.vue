<template>
    <div>
        <section  style="display:block" id="loaderAbandon" v-if="loaderAbandon">
<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
 <path fill="#C04945" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#ECECEC" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="-360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#3D70A8" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>
  
</section>  

<div class="filterAbadon">
    <div style="display:flex; flex-direction:column;">
    <label for="input_filter_abadon" class="all-label">Тип вагона</label>
    <select class="input_filter_abadon" id="input_filter_abadon" style="cursor: pointer;"
     v-model="filter_abadon.wagon__wagon_type"
    @change="updateFilterDataAbadon"
    >
<option value="">Все вагоны</option>
        <option
            v-for="wagonFilter in wagonFilterAbadon"
            :key="wagonFilter.name"
            :value="wagonFilter.name">
            {{wagonFilter.name}}
        </option>
    </select>
</div>
<!-- <div style="display:flex; flex-direction:column;">
    <label for="amoutRecords" class="all-label">Кол-во записей</label>
<select name="" id="amoutRecords"
v-model="filter_abadon.page_size"
@change="updateFilterDataAbadon"
>  
    <option value="" selected>100</option>
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="250">250</option>
    <option value="500">500</option>
</select>
    </div> -->
 

</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/wagonPark'

export default {
    name: 'FilterAbadon',
    data() {
        return {
            filter_abadon:{
                wagon__wagon_type: '',
                page_size: ''
            },
            wagonFilterAbadon: '',
            loaderAbandon: false,
            all_object: ''
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
    mounted(){
        this.loaderAbandon = true
        api.getWagonsThrowTypes()
        .then((response) => {
            this.wagonFilterAbadon = response.data.data
            this.loaderAbandon = false
        })

},
    methods: {
        updateFilterDataAbadon(){
            this.$emit('updateFilterDataAbadon', this.filter_abadon)
        }
    },
    
  

}
</script>


<style>
.input_filter_abadon {
    width: 100% !important;
    height: 30px;
    background:transparent !important;
}
.filterAbadon {
    width: 100% !important;
    display: flex;
    justify-content: space-around;
    /* border-radius: 50px; */
    background: #EFEFEF  !important;
box-shadow:  20px 20px 60px #cecece,
             -20px -20px 60px #f2f2f2;
             position: relative;
             left: 50%;
             transform: translate(-50%,0);
             margin: 1% 0;
}
</style>