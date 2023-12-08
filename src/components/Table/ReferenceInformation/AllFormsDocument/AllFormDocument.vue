<template>
    <div>
        <Loader :loader="loader" />
        <h1 class="main">{{ typeDocument }}</h1>
        <div class="filter_block">
            <label for="name_dog" style="width:30%">Номер договора <br>
                <div class="inputcontainer">
                    <!-- <label for="">Номер договора<br></label> -->

                    <input class="changeRow textarea" v-model="dog_search" placeholder="введите наименование документа"
                        style=" width: 100%; border-bottom: 1px solid rgb(0, 0, 0); padding: 5px;" />

                    <div class="icon-container" v-if="loaderInputDep">
                        <i class="loader"></i>
                    </div>
                </div>
                <div class="dataDeparture" v-if="warning">
                    <ul>
                        <li v-for="dog in dog_num_search" :key="dog.id" @click="checkThisDog(dog.name)">
                            {{ dog.name }}
                        </li>
                    </ul>
                </div>
                <!-- <input type="text" class="textarea" v-model="name_document"
                    @keyup.enter="getData(typeDocument, name_document)"> -->
            </label>
            <label for=""><br>
                <button class="textarea Accept" style="background: #1C842D"
                    @click="getData(typeDocument)">Запросить</button>
            </label>
        </div>
        <div style="max-height: 45vh; overflow: auto;">
            <table style="margin-top: 2%;">
                <thead>
                    <tr style="position: sticky; top: 0; margin-top: -1%; background: rgb(216, 216, 216);">
                        <th>Имя</th>
                        <th>Категория</th>
                        <th>Дата создания</th>
                        <th>Дата обновления</th>
                        <th>Актуальность</th>
                        <th>Срок</th>
                        <th>Файл</th>
                    </tr>
                </thead>
                <tr v-if="documents.length == 0">
                    <td colspan="7">
                        <h2>Данных нет</h2>
                    </td>
                </tr>
                <tbody>
                    <tr v-for="document in documents" :key="document.id">
                        <td>{{ document.name }}</td>
                        <td>{{ TranslateCategory(document.category) }}</td>
                        <td>{{ document.created_at.split('-').reverse("").join(".") }}</td>
                        <td>{{ document.updated_at.split('-').reverse("").join(".") }}</td>
                        <td>{{ document.sign == true ? 'Актуальный' : 'Неактуальный' }}</td>
                        <td>{{ document.expiration_date.split('-').reverse("").join(".") }}</td>
                        <td>
                            <a :href="document.file" style="display: block;">
                                <img src="../../../../assets/word.png" alt="word_file" width="25">
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import api from "@/api/directory";
import Loader from '@/components/loader/loader.vue'
import debounce from "lodash.debounce";
export default {
    props: ['typeDocument'],
    components: { Loader },
    data() {
        return {
            dog_search: "",
            loaderInputDep: false,
            warning: false,
            dog_num_search: "",
            debouncedWatch: "",
            loader: false,
            documents: [],
            name_document: "",
            allCategory: {
                typical: 'Типовые формы документов',
                constituent: 'Учредительные документы',
                regulatory: 'Локально нормативные акты',
                decrees: 'Приказы и распоряжения',
                other: 'Прочее',
            }
        }
    },
    mounted() {
        // this.stations = getItem("station");
        document.body.addEventListener('click', () => this.warning = false);

    },
    beforeDestroy() {
        document.body.removeEventListener('click', () => this.warning = false);
    },
    beforeUnmount() {
        this.debouncedWatch.cancel();
    },
    created() {

        this.debouncedWatch = debounce((newValue, oldValue) => {
            if (this.dog_search.length > 1) {
                this.loaderInputDep = true
                let type
                for (let key in this.allCategory) {
                    if (this.allCategory[key] === this.typeDocument) {
                        type = key
                    }

                }
                api.getCurrentDocument(type, this.dog_search)
                    .then((response) => {
                        this.dog_num_search = response.data.data;
                        this.loaderInputDep = false
                        this.warning = true;
                    }).catch(error => {
                        this.loaderInputDep = false
                        console.log(error.response)
                    })
            }
        }, 300)
    },
    watch: {
        dog_search(...args) {

            this.debouncedWatch(...args);

        },
    },
    methods: {
        getData(val) {
            let type;
            switch (val) {
                case 'Типовые формы документов':
                    type = 'typical';
                    break;
                case 'Учредительные документы':
                    type = 'constituent';
                    break;
                case 'Локально нормативные акты':
                    type = 'regulatory';
                    break;
                case 'Приказы и распоряжения':
                    type = 'decrees';
                    break;
            }

            this.loader = true;
            let numberDog = {
                name: this.dog_search
            }
            api.getDocuments(type, numberDog)
                .then(response => {
                    this.documents = response.data.data;
                    this.loader = false;
                })
                .catch((error) => {
                    this.loader = false;
                    console.error(error);
                });
        },
        checkThisDog(value) {
            this.warning = false
            this.dog_search = value
            this.$nextTick(() => {
                this.warning = false
            })
        },
        TranslateCategory(type) {
            return this.allCategory[type]
        },
    }
}
</script>


<style scoped>
.filter_block {
    display: flex;
    justify-content: space-between;
}

.inputcontainer {
    position: relative;

}

.dataDeparture {
    width: 100%;
    overflow: auto;
    border: 1px solid grey;

    background: rgb(245, 245, 245);

}

.changeRow {
    width: 100%;
    /* border: none; */
    /* outline: none; */
    background: white;
}

.icon-container {
    position: absolute;
    right: 15px;
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
    border-color: #646464 #646464 transparent transparent;
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
</style>