<template>
<div>
    <div id="tableDislocation" style="width:100%; overflow: auto;">
        <table style="margin-top: -0.1px;">
      <thead>
        <tr>
          <th> Хэш</th>
          <th>Квитанция</th>
          <th>Станция текущей дислокации</th>
          <th>Станция отправления</th>
          <th>Простой на станции дислокации</th>
          <th>Простой от последней операции</th>
          <th>Простой после оформления документов</th>
          <th>Расстояние осталось (от текущей дислокации)</th>
          <th>Расстояние всего (от станции отправления)</th>
          <th>Вагон</th>
          <th>Груз</th>
          <th>Индекс поезда</th>
          <th>Операция</th>
          <th>Груж/порож</th>
          <th>Вес</th>
          <th>Государство текущей дислокации</th>
          <th>Бросание</th>
          <th>Полигон обращения</th>
          <th>Дата и время последней операции</th>
          <th>Расчетная дата прибытия</th>
          <th>Дата прибытия на станцию дислокации</th>
          <th>Дата и время отправления</th>
          <th>Прибытие на станцию назначения</th>
          <th>Дата прибытия на станцию отправления</th>

        </tr>

      </thead>
      <tbody>
        <tr v-for="dislocation in Dislocation" :key="dislocation.id">
            <td>{{dislocation.hash_value}}</td>
            <td>{{dislocation.receipt}}</td>          
            <td>{{dislocation.distance_left_from_current_dislocation}}</td>          
            <td>{{dislocation.distance_all_from_departure_station}}</td>          
            <td>{{dislocation.train_index}}</td>          
            <td>{{dislocation.is_loaded}}</td>          
            <td>{{dislocation.weight}}</td>          
            <td>{{dislocation.current_country}}</td>          
            <td>{{dislocation.polygon}}</td>          
            <td>{{dislocation.last_operation_datetime}}</td>          
            <td>{{dislocation.calc_arrival_date}}</td>          
            <td>{{dislocation.current_station_arrival}}</td>          
            <td>{{dislocation.arrival_date}}</td>          
            <td>{{dislocation.destination_station_arrival}}</td>          
            <td>{{dislocation.departure_station_arrival}}</td>          
            <td>{{dislocation.current_station}}</td>          
            <td>{{dislocation.departure_station}}</td>          
            <td>{{dislocation.destination_station}}</td>          
            <td>{{dislocation.current_station_downtime}}</td>          
            <td>{{dislocation.last_operation_downtime}}</td>          
            <td>{{dislocation.documents_registration_downtime}}</td>          
            <td>{{dislocation.wagon}}</td>          
            <td>{{dislocation.cargo}}</td>          
            <td>{{dislocation.operation}}</td>   
            <td>{{dislocation.drop}}</td>          
       

       </tr>

       
      </tbody>
    </table>              
    </div>


</div>
</template>

<script>
    export default {
    name: 'DislocatoinTable',
    data(){
        return{
            Dislocation:[]
        }
    },
mounted(){
    fetch('http://10.1.5.65/api/wagon-park/dislocations/', {
        headers: {
            'Authorization': 'Basic YS5yZXNoZXRpbG9AdGVodHJhbnMuY29tOlRlaHRyYW5zMjAyMg=='
        },
        method: 'GET'
    })
    .then((response) => {
                if (response.ok){
                    return response.json().then(r=>{
                        this.Dislocation = r.data;
                        console.log(this.Dislocation)
               })
           }
           else{
               console.log('NOT OK')
           }
       })
}
    }
</script>

