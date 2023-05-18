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
          <td> 
            <template>
                <tr  v-for="(al, index) of data" :key="al.id">
                    <td>{{index}}</td>
                </tr>
            </template>
          </td>
          <td v-for="(al, index) in data" :key="al.id"> 
            <template v-for="(a, index) in al" >
                <td :key="a">
                        {{ index }}
                    </td>
                    <td>{{ a.Данные }}</td>
                </template>
                    
          </td>
        </tr>
       
		
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
                    "Данные": [
                        {
                            "cargo": 123,
                            "amount": 2,
                            "wo_nds": 123,
                            "road": "Дорога 1"
                        }
                    ],
                    "Итого": {
                        "amount": 2,
                        "wo_nds": 123
                    }
                },
                "Клиент_2": {
                    "Данные": [
                        {
                            "cargo": 123,
                            "amount": 2,
                            "wo_nds": 123,
                            "road": "Дорога 1"
                        }
                    ],
                    "Итого": {
                        "amount": 2,
                        "wo_nds": 123
                    }
                },
          
            },
            "Итого Дорога_1": {
                "amount": 123,
                "wo_nds": 100
            },
            "Дорога_2": {
                "Клиент_2113": {
                    "Данные": [
                        {
                            "cargo": 123,
                            "amount": 2,
                            "wo_nds": 123,
                            "road": "Дорога 1"
                        }
                    ],
                    "Итого": {
                        "amount": 2,
                        "wo_nds": 123
                    }
                },
              
            },
            "Итого Дорога_2": {
                "amount": 123,
                "wo_nds": 100
            }
        }
        }
    }
}
</script>


<style scoped>

</style>