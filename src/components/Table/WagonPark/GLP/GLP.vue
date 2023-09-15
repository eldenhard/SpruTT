<template>
    <div>
        <Loader :loader="loader" />
        <p class="explanation" style="margin-left: 20%;" :class="{ 'errorFormatFile': errorFormatFile }"> * Загружаемый файл
            должен быть в формате <strong>xls</strong></p>

        <div class="drop-area" :class="{ 'active': isDragging || file }" @dragenter.prevent="onDragEnter"
            @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">

            <div class="icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <header>
                <b-icon-cloud-plus /> <br>
                {{ file ? `Файл: ${file.name}` : 'Перетащите файл в это поле' }}
            </header>
            <sup v-if="file">{{ `Размер файла: ${formatFileSize(file.size)}` }}</sup>
            <input type="file" ref="fileInput" style="display: none" @change="handleFileInput" />
        </div>
        <div class="file-details">

            <button @click="removeFile" :class="{ 'disabled': !file, 'Delete': file }" :disabled="!file">Удалить
                файл</button>
            <button @click="uploadFile" :class="{ 'disabled': !file || errorFormatFile, 'Accept': file }"
                :disabled="!file || errorFormatFile">Отправить файл</button>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>
  

<script>
import api from "@/api/wagonPark";
import Loader from '@/components/loader/loader.vue'
import Notifications from "@/components/notifications/Notifications.vue";
export default {
    components: { Notifications, Loader },
    data() {
        return {
            isDragging: false,
            file: null,
            errorFormatFile: "",
            loader: false,
            showNotify: false,

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
            return formatExcel[1] !== 'xls' ? this.errorFormatFile = true : this.errorFormatFile = false
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
        uploadFile() {

            // Здесь можно добавить логику для отправки файла на сервер
            if (this.file) {
                let formData = new FormData();
                formData.append("file", this.file);
                this.loader = true
                api.postFileGLP(formData)
                    .then(response => {
                        this.loader = false
                        let link = document.createElement('a')
                        link.href = response.data
                        link.click()
                        // this.file = null;
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