<template>
  <div>
    <table class="tcont countLines" border="1">
            <thead>
            <tr>
                <th></th>
                <th>Дорога погрузки</th>
                <th>Клиент</th>
                <th>Дорога выгрузки</th>
                <th>Груз</th>
                <th>Кол-во погрузок</th>
                <th>Выручка,руб. без НДС</th>
            </tr>
        </thead>
	<tbody>
		<tr>
          <td></td>
          <!-- Дорога погрузки -->
          <!-- <td>  -->
                <tr  v-for="(al, index) in data" :key="al.id">
                    <td >{{index}}
                        <td>
                            <tr v-for="(r, index) in al" :key="r.id">
                                {{ index }}
                            </tr>
                        </td> 
                    </td>
                </tr>
        </tr>
          <!-- </td> -->

        <!-- Клиент
          <td>
            <template v-for="a in data" >
                <tr v-for="(r, index) in a" :key="r.id">
                    <td>{{ index }}</td>
                </tr>
            </template>   
          </td>
         Дорога выгрузки -->
          <!-- <td>
            <template v-for="a in data" >
                <tr v-for="(r) in a" :key="r.id">
                    <td>{{ r.Данные.road }}</td>
                </tr>
            </template>   
          </td> -->
           <!-- Груз -->
           <!-- <td>
            <template v-for="a in data" >
                <tr v-for="(r) in a" :key="r.id">
                    <td>{{ r.Данные.cargo }}</td>
                </tr>
            </template>   
          </td> -->
          <!-- Кол-во -->
          <!-- <td>
            <template v-for="a in data" >
                <tr v-for="(r) in a" :key="r.id">
                    <td>{{ r.Данные.amount }}</td>
                </tr>
            </template>   
          </td> -->
          <!-- Кол-во -->
          <!-- <td>
            <template v-for="a in data" >
                <tr v-for="(r) in a" :key="r.id">
                    <td>{{ r.Данные.wo_nds }}</td>
                </tr>
            </template>   
          </td> --> 
   
  
       
		
	</tbody>
</table>
  </div>
</template>


<script>
export default{
    data(){
        return{
        data:     {
            "Дорога_1": {
                "Клиент_1": {
                    "Данные": 
                        {
                            "cargo": 123,
                            "amount": 2,
                            "wo_nds": 123,
                            "road": "Дорога 1"
                        }
                    ,
                    "Итого": [{
                        "amount": 2,
                        "wo_nds": 123
                    }]
                },
                "Клиент_2": {
                    "Данные": 
                        {
                            "cargo": 123,
                            "amount": 2,
                            "wo_nds": 123,
                            "road": "Дорога 12"
                        }
                    ,
                    "Итого": [{
                        "amount": 2,
                        "wo_nds": 123
                    }]
                },
          
            },
            // "Итого Дорога_1": {
            //     "amount23": 123,
            //     "wo_nds234": 100
            // },
            "Дорога_2": {
                "Клиент_2113": {
                    "Данные": 
                        {
                            "cargo": 123,
                            "amount": 2,
                            "wo_nds": 123,
                            "road": "Дорога 11"
                        }
                    ,
                    "Итого": {
                        "amount": 2,
                        "wo_nds": 123
                    }
                },
              
            },
            "Дорога_3": {
                "Клиент_4": {
                    "Данные": 
                        {
                            "cargo": 123,
                            "amount": 2,
                            "wo_nds": 123,
                            "road": "Дорога 13"
                        }
                    ,
                    "Итого": {
                        "amount": 2,
                        "wo_nds": 123
                    }
                },
              
            },
            // "Итого Дорога_2": {
            //     "amount": 123,
            //     "wo_nds": 100
            // }
        }
        }
    }
}
</script>


<style scoped>

</style>