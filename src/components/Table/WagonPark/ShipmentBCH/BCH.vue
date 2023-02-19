<template>
  <div>
      <div class="form-group" style="width: 40vw !important; position: relative; left: 50%; transform: translate(-50%, 0);">
        <label for="fileField" class="attachment">
            <div class="btn-file__actions">
              <div class="btn-file__actions__item text-center">
                <div class="btn-file__actions__item--shadow">
                  <b-icon-cloud-plus /><div class="visible-xs-block"></div>
                  {{ changeText }}
                </div>
              </div>
            </div>
          <b-form-file v-model="file" type="file" id="fileField" class="mt-3" plain></b-form-file>
        </label>
      </div>
      <button id="btnfile" class='button' style="height: 40px; width: 40vw !important; position: relative; left: 50%; transform: translate(-50%, 0);">Преобразовать файл</button>
    </div>
  <!-- <div style="display: flex; justify-content: space-between">
    <b-form-file v-model="file" name="123" class="mt-3" plain></b-form-file>
    <button @click="SendFile()" class="button Accept">ОТПРАВИТЬ</button>
  </div> -->
</template>

<style scoped>


.btn-file__actions {
  margin: 0;
  padding: 0;
}
.btn-file__actions__item {
  padding: 35px;
  font-size: 1.5em;
  color: #d3e0e9;
  cursor: pointer;
  text-decoration: none;
  border-top: 3px dashed #d3e0e9;
  border-left: 3px dashed #d3e0e9;
  border-bottom: 3px dashed #d3e0e9;
}
.btn-file__actions__item:first-child {
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
}
.btn-file__actions__item:last-child {
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
  border-right: 3px dashed #d3e0e9;
}
.btn-file__actions__item:hover,
.btn-file__actions__item:focus {
  color: #636b6f;
  background-color: rgba(211, 224, 233, 0.1);
}
.btn-file__actions__item:hover--shadow,
.btn-file__actions__item:focus--shadow {
  box-shadow: #d3e0e9 0 0 60px 15px;
}
.btn-file__actions__item--shadow {
  display: inline-block;
  position: relative;
  z-index: 1;
}
.btn-file__actions__item--shadow::before {
  content: " ";
  box-shadow: #fff 0 0 60px 40px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100vw;
  z-index: -1;
}
.form-group label.attachment {
  width: 100%;
}
.form-group label.attachment .btn-create > a,
.form-group label.attachment .btn-create > div {
  margin-top: 5px;
}
.form-group label.attachment input[type='file'] {
  display: none;
}

</style>
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
  computed:{
    changeText(){
      if(this.file == null){
        return 'Выберите файл'
      } else {
        let styleList = document.querySelector('.btn-file__actions__item')
        styleList.style.borderColor = 'black'
        styleList.style.color = 'darkgrey'
        return 'Выбранный файл' + ' ' +  this.file.name
      }
    }
  },
  watch: {
    file(){
      if(this.file == null){
        document.getElementById('btnfile').className = 'inActive'
      } else {
        document.getElementById('btnfile').className = 'Accept'

      }
    }
  },

  methods: {
    SendFile() {
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;

      // отпавить файл и получить в формате xlsx
      console.log(this.file);
      let formData = new FormData();
      formData.append("file", this.file);
      // fetch('http://10.1.5.20/api/wagon-park/shipment-list/make-file/', {

      //   headers: {
      //     Authorization: `Basic ${token}`,
      //   },
      //   body: formData,
      //   method: "POST",
      // })
      //   .then(resp => resp.blob())
      //   .then(blob => {
      //     let URL = window.URL || window.webkitURL,
      //       downloadUrl = URL.createObjectURL(blob),
      //       a = document.createElement('a');
      //     a.href = downloadUrl;
      //     a.target = '_blank';
      //     a.download = token
      //     document.body.appendChild(a);
      //     a.click();
      //     a.parentNode.removeChild(a);
      //     setTimeout(() => { URL.revokeObjectURL(downloadUrl) }, 100);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      api
        .postShipmentList(formData)
        .then(res => {

          let json = JSON.stringify(res)
          let buffer = Buffer.from(JSON.parse(json).data)
          console.log(buffer)
          let uint8Array = new Uint8Array([buffer])
          let link = document.createElement('a');
          link.download = 'hell1o.xlsx';

          let blob = new Blob([uint8Array], { type: 'text/application' });

          link.href = URL.createObjectURL(blob);

          link.click();

          URL.revokeObjectURL(link.href);

          // console.log(data)
          // let json = JSON.stringify(data)
          // let buffer = Buffer.from(JSON.parse(json).data)
          // console.log(buffer)
          // let link = document.createElement('a');
          // link.download = 'hello.xlsx';

          // let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });

          // link.href = URL.createObjectURL(blob);

          // link.click();

          // URL.revokeObjectURL(link.href);


        })
    },

  },

};
</script>