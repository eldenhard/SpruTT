<template>
    <div>
        <section  style="display:block" id="loaderAbandon" v-if="loaderDislocation">
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

<div class="filterDislocation" >
    <div style="display: flex; flex-direction: column">
        <label for="input_filter_dislocation" class="all-label">Полигон</label>
        <select class="input_filter_dislocation" id="input_filter_dislocation" style="cursor: pointer;"
        v-model="filter_dislocation.polygon"
        @change="updateFilterDataDislocation"
        >
            <option value="">Все полигоны</option>
            <option value="Анжерская">Анжерская</option>
            <option value="Аренда РТС">Аренда РТС</option>
            <option value="Аренда Рутгерс">Аренда Рутгерс</option>
            <option value="Аренда (склад) Энергоресурсы">Аренда (склад) Энергоресурсы</option>
            <option value="Аренда СМС">Аренда СМС</option>
            <option value="Аренда Софит">Аренда Софит</option>
            <option value="Аренда Стелла (Промгипсовая)">Аренда Стелла (Промгипсовая)</option>
            <option value="Аренда ТрансОйл">Аренда ТрансОйл</option>
            <option value="Багахангай">Багахангай</option>
            <option value="Бензин (Девон)">Бензин (Девон)</option>
            <option value="Биклянь">Биклянь</option>
            <option value="Биклянь (Техн ТНТ)">Биклянь (Техн ТНТ)</option>
            <option value="Бузулук">Бузулук</option>
            <option value="Бузулук (Роста Терминал)">Бузулук (Роста Терминал)</option>
            <option value="Вагоны едут на вывод из аренды">Вагоны едут на вывод из аренды</option>
            <option value="Вагоны на резку">Вагоны на резку</option>
            <option value="Вератек">Вератек</option> 
            <option value="В работе Газпромтранс">В работе Газпромтранс</option>
            <option value="ГПТ по договору ТЭО">ГПТ по договору ТЭО</option>
            <option value="Дельта Трейд">Дельта Трейд</option>
            <option value="ЕвроХим">ЕвроХим</option>
            <option value="Загородняя (Тайга)">Загородняя (Тайга)</option>
            <option value="Китой-Комбинатская">Китой-Комбинатская</option>
            <option value="Комбинатская (КОКС)">Комбинатская (КОКС)</option>
            <option value="Комбинатская (СЕРА)">Комбинатская (СЕРА)</option>
            <option value="Копылово (ГарантОйл)">Копылово (ГарантОйл)</option>
            <option value="Копылово (НХТК)">Копылово (НХТК)</option>
            <option value="Круглое Поле (ВСТ)">Круглое Поле (ВСТ)</option>
            <option value="Круглое поле (ПВ)">Круглое поле (ПВ)</option>
            <option value="Курбакинская">Курбакинская</option>
            <option value="Мечел-Транс ЦС">Мечел-Транс ЦС</option>
            <option value="НАЦИО">НАЦИО</option>
            <option value="Новоотрадная">Новоотрадная</option> 
            <option value="Обнинское">Обнинское</option>
            <option value="Оперативный контроль">Оперативный контроль</option>
            <option value="Петропавловск">Петропавловск</option>
            <option value="Планируем прием в аренду">Планируем прием в аренду</option>
            <option value="Покровск-Приволжский">Покровск-Приволжский</option>
            <option value="Попутки ПВ">Попутки ПВ</option>
            <option value="Разрез ТТ">Разрез ТТ</option>
            <option value="Соболеково (ННБ)">Соболеково (ННБ)</option>
            <option value="Соболеково (НХТК)">Соболеково (НХТК)</option>
            <option value="Тобольск (НХТК)">Тобольск (НХТК)</option>
            <option value="ТонжЛогистик">ТонжЛогистик</option>
            <option value="Хабаровск-1">Хабаровск-1</option>
            <option value="Химичесие цс">Химичесие цс</option>
            <option value="ЦС по мелким клиентам">ЦС по мелким клиентам</option>
            <option value="Энергоресурсы">Энергоресурсы</option>
            <option value="Яничкино">Яничкино</option>
        </select>
    </div>
    <div style="display: flex; flex-direction: column">
        <label for="amoutRecordsDislocation" class="all-label">Кол-во записей</label>
            <select name="" id="amoutRecordsDislocation"
            v-model="filter_dislocation.page_size"
            @change="updateFilterDataDislocation"
            >  
                <option value="" selected>100</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="250">250</option>
                <option value="500">500</option>
            </select>

</div>

 

</div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import api from '@/api/wagonPark'
export default {
    name: 'FilterDislocation',
    data() {
        return {
            filter_dislocation:{
                polygon: '',
                page_size: ''
            },
            wagonFilterDislocation: '',
            loaderDislocation: false,
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
    
    methods: {
        updateFilterDataDislocation(){
            this.$emit('updateFilterDataDislocation', this.filter_dislocation)
        }
    },
}
</script>

<style>
.input_filter_dislocation{
    width: 100% !important;
    height: 30px;
}
.filterDislocation {
    width: 100% !important;
    flex-direction: row;
    display: flex !important;
    justify-content: space-around;
    background: #e0e0e0;
    box-shadow:  20px 20px 60px #cecece,
             -20px -20px 60px #f2f2f2;
             position: relative;
             left: 50%;
             transform: translate(-50%,0);
             margin: 1% 0;
}
</style>