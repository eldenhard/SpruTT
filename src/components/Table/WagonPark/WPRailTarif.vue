<template>
  <div class="railtarif" style="display: flex">
    <div class="railtarif__route">
      <input type="date" class="textarea railtarif__route__date" />
      <br>
      <div class="railtarif__routeCheck">
        <div>
            <input type="checkbox" id="cargo" class="railtarif__route__checkbox" v-model="checkedCargo"/>
            <label for="cargo">&nbsp;Груженый</label>
        </div>
        <div>
            <input type="checkbox" id="world" class="railtarif__route__checkbox" v-model="checkedInternational"/>
            <label for="world">&nbsp;Международный</label>

        </div>
      </div>
   
    </div>
    <div class="railtarif__price">2</div>
  </div>
</template>



<style scoped>
.railtarif {
  display: flex;
  height: 60vh;
  border: 1px solid v-bind(borderColor);
}
.railtarif__route {
  width: 30%;
  border-right: 1px solid v-bind(borderColor);
  display: block;
}
.railtarif__routeCheck {
    display: flex;
    justify-content: space-around;
    margin-top: 2%;
}
.railtarif__route__date {
  background: #fff;
  height: 25px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 2%;
}

.railtarif__price {
  width: 70%;
  display: block;
}
</style>

<script>
export default {
  name: "railtarif",
  data() {
    return {
      borderColor: "#DFDFDF",
      checkedCargo: "",
      checkedInternational: "",

    };
  },
};
</script>