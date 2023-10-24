<template>
  <div>
    <div class="inputcontainer">
      <input
        :name="nameInp"
        v-model="data"
        :type="typeInp"
        :id="idElement"
        @keyup.enter="$emit('changeData', {[nameInp]: $event.target.value, 'id': idRow, 'loader': idLoader, 'idElement' : idElement})"
        @change="$emit('changeDate', {[nameInp]: $event.target.value, 'id': idRow, 'loader': idLoader, 'idElement' : idElement})"
      />
      <div class="icon-container" :id="idLoader" v-show="Visible" >
        <i class="loader"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   data(){
    return{
        data: this.valueDataInp
    }
   },
  props: {
    nameInp: {
        type: String,
        default: "",
    },
    idLoader: {
        type: String,
        default: "",
    },
    idRow: {
        type:  Number
    },
    Visible: {
        type: Boolean,
        default: false,
    },
    valueDataInp: {
        default: ''
    },
    typeInp: {
        type: String,
        default: "",
    },

    idElement: {
      type: String
    }
  },

};
</script>

<style  scoped>
.inputcontainer {
  position: relative;
}

input {
  width: 100%;
  box-sizing: border-box;
}
.mini {
  height: 40px;
}
.icon-container {
  position: absolute;
  right: 10px;
  top: calc(50% - 10px);
}
.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #333 #333 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}
.successStatus {
  background: rgba(42, 190, 67, 0.4);
  color: black;
}
.errorStatus {
  background: lightcoral;
  color: black;
}
</style>