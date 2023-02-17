<template>
  <div style="display: flex; justify-content: space-between">
    <b-form-file v-model="file" name="123" class="mt-3" plain></b-form-file>
    <button @click="SendFile()" class="button Accept">ОТПРАВИТЬ</button>
  </div>
</template>


<script>
import api from "@/api/wagonPark";
import { saveAs } from 'file-saver';
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    SendFile() {
      console.log(this.file);
      let formData = new FormData();
      formData.append("file", this.file);
      api
        .postShipmentList(formData)
       .then(response => {
        let data = window.atob(response.data);
        console.log(data)
        // var FileSaver = require('file-saver');

        // var file = new File([data], 'filename.pdf', {type: "text/plain;charset=utf-8"});
        // FileSaver.saveAs(file);
       })
    },
  },
};
</script>