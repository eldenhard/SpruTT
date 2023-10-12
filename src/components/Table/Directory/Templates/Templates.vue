<template>
    <div style="margin: 4% 0 0 -15%;"  class="air_block">
        <Loader :loader="loader" />
        <div class="file-details">
            <label for="select_option">Категория <br>
                <select name="" id="select_option" v-model="category">
                    <option value="typical">Типовая форма договоров</option>
                    <option value="constituent">Учредительные документы</option>
                    <option value="regulatory">Нормативные акты</option>
                    <option value="decrees">Приказы</option>
                    <option value="other">Прочее</option>
                </select>
            </label>
            <label for="select_option">Срок <br>
                <input type="date" class="textarea" style="background: white" v-model="expiration_date">
            </label>
        </div>
        <div class="drop-area" :class="{ 'active': isDragging || file }" @dragenter.prevent="onDragEnter"
            @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">

            <div class="icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <header>
                <b-icon-cloud-plus /> <br>
                {{ file ? `Файл: ${file.name}` : 'Перетащите файл в это поле' }}
                <br>
                <sup v-if="file">{{ `Размер файла: ${formatFileSize(file.size)}` }}</sup>
            </header>
            <br>

            <input type="file" ref="fileInput" style="display: none" @change="handleFileInput" />
        </div>

        <div class="file-details">
            <button @click="removeFile" :class="{ 'disabled': !file, 'Delete': file }" class="Accept" :disabled="!file">Удалить
                файл</button>
            <button @click="uploadFile" :class="{ 'disabled': !file, 'Accept': file }" :disabled="!file">Отправить
                файл</button>
        </div>

  


        <div class="table_all_template" style="position: relative; display: flex; flex-direction: column;">

            <label for="select_option" style="margin-left: auto; justify-content: flex-end;">Категория <br>
                <select name="" id="select_option" v-model="category_get">
                    <option value="typical">Типовая форма договоров</option>
                    <option value="constituent">Учредительные документы</option>
                    <option value="regulatory">Нормативные акты</option>
                    <option value="decrees">Приказы</option>
                    <option value="other">Прочее</option>
                </select>
            </label>
            <button class="Accept" style="height: 45px; width: 28.5%; margin-top: 1%; margin-left: auto;" @click="getDocuments()">Запросить</button>

            <table style="margin-top: 2%;" >
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Категория</th>
                        <th>Дата создания</th>
                        <th>Дата обновления</th>
                        <th>Актуальность</th>
                        <th>Срок</th>
                        <th>Файл</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="document in documents" :key="document.id">
                        <td>{{ document.name }}</td>
                        <td>{{ document.category }}</td>
                        <td>{{ document.created_at }}</td>
                        <td>{{ document.updated_at }}</td>
                        <td>{{ document.sign }}</td>
                        <td>{{ document.expiration_date }}</td>
                        <td>{{ document.file }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
    </div>
</template>
  

<script>
import api from "@/api/directory";
import Loader from '@/components/loader/loader.vue'
import Notifications from "@/components/notifications/Notifications.vue";
export default {
    components: { Notifications, Loader },
    data() {
        return {
            expiration_date: "",
            category: "typical",
            category_get: "typical",
            isDragging: false,
            file: null,
            // errorFormatFile: "",
            loader: false,
            showNotify: false,
            documents: "",
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        };
    },
    watch: {
        file() {
            if (this.file) {
                document.querySelector('header').style = 'color: darkgrey'
            }
            let formatExcel = (this.file.name).split('.')
            // return formatExcel[1] !== 'xls' ? this.errorFormatFile = true : this.errorFormatFile = false
        }

    },
    methods: {
        onDragEnter() {
            this.isDragging = true;
        },
        onDragOver() {
            this.isDragging = true;
        },
        onDragLeave() {
            this.isDragging = false;
        },
        onDrop(event) {
            this.isDragging = false;
            this.file = event.dataTransfer.files[0];
        },
        chooseFile() {
            this.$refs.fileInput.click();
        },
        handleFileInput(event) {
            this.file = event.target.files[0];
        },
        removeFile() {
            this.file = null;
        },
        getDocuments(){
            this.loader = true
            api.getDocuments(this.category_get)
            .then(response => {
                console.log(response.data)
                this.documents = response.data.data
                this.loader = false
            }).catch((error) => {
                this.loader = false
                console.error(error)
            })
        },
        uploadFile() {
            // Здесь можно добавить логику для отправки файла на сервер
            if (this.file) {
                let formData = new FormData();
                formData.append("file", this.file);
                formData.append("category", this.category);
                formData.append("expiration_date", this.expiration_date);
                formData.append("sign", true);
                formData.append('name', this.file.name.split('.')[0])

                this.loader = true
                api.postDocuments(formData)
                    .then(response => {
                        this.loader = false
                        console.log(response)
                        // let link = document.createElement('a')
                        // link.href = response.data
                        // link.click()
                        this.file = null;
                    }).catch(error => {
                        this.loader = false
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = "Ошибка, файл не загружен, повторите попытку позже";
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => this.showNotify = false, 1500)
                    })

            }
        },
        formatFileSize(size) {
            if (size === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(size) / Math.log(k));
            return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
    },
};
</script>
  
<style lang="scss" scoped>
.air_block {
  width: 60vw;
  height: max(50vh, auto);
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  padding: 2%;
  transform: translate(-50%, 0);
}
.table_all_template {
    margin-top: 10%;
}

.errorFormatFile {
    color: rgb(209, 1, 1) !important;
    font-size: 14px;
}

.drop-area {
    border: 3px dashed #616161;
    height: 150px;
    width: 40vw;
    margin-left: 20%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s ease-in-out;
    position: relative;
}

.drop-area:hover {
    border: 3px dashed #000000;
}

.drop-area.active {
    border: 2px solid #2ecc71;
    transition: 0.5s ease-in;
    color: black
        /* Зеленая обводка при перетаскивании */
}

.disabled {
    background: lightgrey;
}

.disabled {
    background: lightgrey;

}

sup {
    color: grey;
    font-weight: 500;
}

.drop-area.success {
    border-color: #2ecc71;
    /* Зеленая обводка при успешной загрузке */
}

.icon {
    font-size: 36px;
}

header {
    margin-top: 10px;
    font-size: 22px;
    font-weight: 600;
    color: lightgray
}

.file-details {
    width: 40vw;
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
    margin-left: 20%;

    button {
        width: 25%
    }
}

.Delete {
    border-radius: 5px;
}
</style>