<template>
  <div style="display: flex; justify-content: space-between">
    <b-form-file v-model="file" name="123" class="mt-3" plain></b-form-file>
    <button @click="SendFile()" class="button Accept">ОТПРАВИТЬ</button>
  </div>
</template>


<script>
import api from "@/api/wagonPark";
import { saveAs } from 'file-saver';
import { Buffer } from 'buffer';
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    SendFile() {
      // отпавить файл и получить в формате xlsx
      console.log(this.file);
      let formData = new FormData();
      formData.append("file", this.file);
      api
        .postShipmentList(formData)
       .then(data => {
        // console.log( Buffer.from([response.data]).toString())
        // let data = window.atob(response.data);
        // console.log(data)

        // var FileSaver = require('file-saver');

        // var file = new File([data], 'filename.pdf', {type: "text/plain;charset=utf-8"});
        // FileSaver.saveAs(file);




        let json = JSON.stringify(data)
        console.log(json)
        let buffer = Buffer.from(JSON.parse(json).data)
        console.log(buffer)
        let uint8Array = new Uint8Array([buffer]);
        let info =  new TextDecoder().decode(uint8Array);
 
        let blob = new File(info, 'filename.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        let FileSaver = require('file-saver');
        FileSaver.saveAs(blob)

        // let blob = new File([c], 'filename.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        // var FileSaver = require('file-saver');

        // FileSaver.saveAs(blob)

       })
    },
  },
};
</script>