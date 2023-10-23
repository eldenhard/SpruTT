<template>
    <div>
        <Loader :loader="loader" />
        <h1 class="main">{{ typeDocument }}</h1>
        <div class="filter_block">
            <label for="name_dog">Наименование <br>
                <input type="text" class="textarea" v-model="name_document"
                    @keyup.enter="getData(typeDocument, name_document)">
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

export default {
    props: ['typeDocument'],
    components: { Loader },
    data() {
        return {
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
                name: this.name_document
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
</style>