<template>
  <div class="shipment-kind">
    <div class="shipment-kind__header">
      <h4 class="header-text">Род подвижного состава</h4>
      <hr />
    </div>
    <div class="shipment-kind__content">
      <input type="text" id="search" class="textarea" style="width: 100% !important" v-model="search" />
      <br />
    </div>

    <ul id="results" style="cursor: pointer !important">
    </ul>


    <div class="expand-info">
      <input type="number" placeholder="Количество" class="textareaS" v-model="amount"/>
      <select name="" id="" class="textareaS" v-model="belong">
        <option value="" disabled selected>Принадлежность</option>
        <option value="1">Инвентарный парк</option>
        <option value="2">Собственный</option>
        <option value="3">Арендованный</option>
        <option value="7">Привлеченный ОАО "РЖД"</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
export default {
  data() {
    return {
      dop_info: false,
      wagon: "",
      wagon_type: [],
      belong: "",
      search: "",
      search_value: "",
      flame: "",
      amount: ""
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  watch: {
    search() {
      let data = []
      for (let i in this.wagon_type) {
        data.push((this.wagon_type[i].name).trim())
      }
      const result = document.getElementById('results')
      renderList(data, result)
      function filter(val, data) {
        return data.filter(i => i.includes(val))
      };
      function renderList(_data = [], el = this.search) {
        el.innerHTML = '';
        _data.forEach(i => {
          let new_el = document.createElement('li')
          new_el.setAttribute('id', `${i.slice(0, 1) + ((Math.random() * 100).toString()).slice(0, 8)}`)
          new_el.innerHTML = i
          el.appendChild(new_el)
          new_el.addEventListener('click', function() {
            let a = new_el.textContent
            this.search = new_el.textContent;
            this.search_value = a
          })
        })
      }
      renderList(filter(this.search, data), result)
    },
    wagon() {
      this.$emit('wagon', {
        wagon_id: this.wagon,
        wagon_type: this.getWagonById(this.wagon)
      })
    },
    belong(){
      this.$emit('belong', {
        belong : this.belong
      })
    },
    amount(){
      this.$emit('amount', this.amount)
    }
  },
  mounted() {
    api.getWagonType().then((response) => {
      this.wagon_type = response.data.data;
    });
  },
  methods: {
    sort_info() {
      return a.sort(function (a, b) {
        return a - b;
      });
    },
    getWagonById(data) {
      let searchWagon = data
      let wagon = this.wagon_type.find(item => item.id === searchWagon).name
      return wagon
    }
  },
};
</script>
<style scoped>
#results{
  cursor: pointer !important;
}
#results>li:hover{
  color: blue;
}
button {
  background: white;
  color: black;
  border: none;
  outline: none;
  letter-spacing: 1px;
  border-radius: 7px;
  font-weight: 500;
  font-size: 13px;
  font-family: "Montserrat", sans-serif;
  text-align: left;
  height: 25px;
}

button:hover {
  background: white;
}

.expand-info {
  display: flex;
  justify-content: space-around;
  padding: 5% 0 0 5% !important;
}

.content {
  border: 1px solid grey !important;
  min-height: 25vh;
  max-height: 25vh;
  overflow: auto;
}

.textarea {
  background: white;
  border: 1px solid grey !important;
  width: 30%;
}

.textareaS {
  border: 1px solid grey;
  width: 30%;
  border-radius: 5px;
}

.shipment-kind {
  margin-top: 8% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  min-height: 55vh;
  width: 90%;
  border: 2px solid #1e86f5;
  border-radius: 10px;
}

.header-text {
  color: #444b54;
  padding-top: 2%;
  padding-left: 3%;
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
}

.shipment-kind__content {
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #e3e5e7;
  border-radius: 5px;
  margin-bottom: 5%;
}
</style>