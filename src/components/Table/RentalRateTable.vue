<template>
  <div>
    <div class="rent_person">
      <label for="tenant"
        >Арендатор
        <br />
        <input type="text" id="tenant" class="textarea" />
      </label>
      <label for="landlord"
        >Арендодатель
        <br />
        <input type="text" id="landlord" class="textarea" />
      </label>      
      <label for="">
        <br>
        <button class="button textarea" @click="sendData()">Отправить данные</button>
      </label>

    </div>
    <div class="rent_information_lenght">
       <p class="amount">Всего: {{ wagon_len }}</p>
       <p class="amount">Всего: {{ stavka_len }}</p>
       <p class="amount">Всего: {{ start_date_len }}</p>
       <p class="amount">Всего: {{ end_date_len }}</p>
       <p class="amount">Всего: {{ days_amount_len }}</p>
    </div>
    <div class="rent_information">
      <textarea name="" id="" cols="10" rows="10" v-model="wagon"></textarea>
   
      <textarea name="" id="" cols="10" rows="10" v-model="stavka"> </textarea>

      <textarea name="" id="" cols="10" rows="10" v-model="start_date"> </textarea>

      <textarea name="" id="" cols="10" rows="10" v-model="end_date"> </textarea>

      <textarea name="" id="" cols="10" rows="10" v-model="days_amount"> </textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "rental-rate",
  data() {
    return {
      wagon: "",
      stavka: '',
      start_date:"",
      end_date: "",
      days_amount: "",

      wagon_arr: [],
      stavka_arr: [],
      start_date_arr: [],
      end_date_arr: [],
      days_amount_arr: [],


      wagon_len: "0",
      stavka_len: "0",
      start_date_len: "0",
      end_date_len: "0",
      days_amount_len: "0",
    };
  },
  watch: {
    wagon() {
        // console.log(this.wagon[this.wagon.length - 1])
        let wagon_array = this.wagon.split("\n")
        this.wagon_arr =  wagon_array.filter(item=> item !== "");
        this.wagon_len = this.wagon_arr.length;        
    },
    stavka(){

        let stavka_arr = this.stavka.split("\n")
        this.stavka_arr =  stavka_arr.filter(item=> item !== "");
        this.stavka_len = this.stavka_arr.length;  
    },
    start_date(){
        let start_date_arr = this.start_date.split("\n")
        this.start_date_arr =  start_date_arr.filter(item=> item !== "");
        this.start_date_len = this.start_date_arr.length;  
    },
    end_date(){
        let end_date_arr = this.end_date.split("\n")
        this.end_date_arr =  end_date_arr.filter(item=> item !== "");
        this.end_date_len = this.end_date_arr.length;  
    },
    days_amount(){
        let days_amount_arr = this.days_amount.split("\n")
        this.days_amount_arr =  days_amount_arr.filter(item=> item !== "");
        this.days_amount_len = this.days_amount_arr.length;  
    },
  },
  methods: {
    sendData(){
        let wagon = []
        this.wagon_arr.forEach((item)=> {
            wagon.push({
                'wagon': item
            })
        })
        let stavka = []
        this.stavka_arr.forEach((item) => {
            stavka.push({
                'stavka': item
            })
        })
        let all_array = wagon.map((item, index) => ({...item, ...stavka[index]}))
        console.log(all_array)
    }
  }
};
</script>

<style scoped>
.button {
    float: right;
    background: #18842A !important;
}
.rent_person {
  display: flex;
  justify-content: space-between;
}
.rent_information {
  display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.rent_information_lenght {
    display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 7%;
}
</style>