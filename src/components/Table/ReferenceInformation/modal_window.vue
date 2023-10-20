<template>
    <b-modal :id="what_is_ref" hide-footer :title="title_modal">
        <!-- <div class="row">
            <div class="col-md-3">
                <input type="file" @change="onFileSelectedSee" name="photo" ref="photo" id="uploadImage" />
                <img width="100%" height="90%" id="result" v-show="ImageUser">
            </div>
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="last_name" />
                            <br />
                            <label for="input-filter-staff1" class="label">Фамилия</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff12" name="Pwd" v-model="first_name" />
                            <br />
                            <label for="input-filter-staff12" class="label">Имя</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff13" name="Pwd" v-model="middle_name" />
                            <br />
                            <label for="input-filter-staff13" class="label">Отчество</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff14" name="Pwd" v-model="post" />
                            <br />
                            <label for="input-filter-staff14" class="label">Должность</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff15" name="Pwd" v-model="email"
                                :class="{ error: checkError('email') }" @input="deleteErrorOnline('email')" />
                            <br />
                            <label for="input-filter-staff15" class="label">Почта</label>
                            <p v-if="checkError('email')">
                                {{ formErrorsMess["email"][0] }}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg">
                            <select v-model="groups" class="textarea" id="input-filter-staff16"
                                :class="{ error: checkError('groups') }" @change="deleteErrorOnline('groups')">
                                <option value="">Выберите отдел</option>
                                <option v-for="userGroup in allGroups" :key="userGroup.id" :value="userGroup.id">
                                    {{ userGroup.name }}
                                </option>
                            </select>

                            <br />
                            <label for="input-filter-staff16" class="label">Отдел</label>
                            <p v-if="checkError('groups')">Выберите отдел</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff17" name="Pwd" v-model="phone_corp" />
                            <br />
                            <label for="input-filter-staff17" class="label">Телефон корп</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff18" name="Pwd" v-model="phone_personal" />
                            <br />
                            <label for="input-filter-staff18" class="label">Телефон личный</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff19" name="Pwd" v-model="inner_number" />
                            <br />
                            <label for="input-filter-staff19" class="label">Внутренний номер</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg">
                            <input class="textarea" id="input-filter-staff20" name="Pwd" v-model="schedule" />
                            <br />
                            <label for="input-filter-staff20" class="label">Время работы</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="bg">
                            <select type="text" v-model="manager" class="textarea" style="width: 80%">
                                <option value="">Выберите начальника</option>
                                <option v-for="manager in allManagerStaff" :key="manager.id" :value="manager.id">
                                    {{ manager.first_name }} {{ manager.middle_name }}
                                    {{ manager.last_name }}
                                </option>
                            </select>
                            <br />
                            <label for="input-filter-staff21" class="label" style="margin-left: 10%">Начальник</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-button class="mt-2" variant="success" block @click="addUser()">Добавить
        </b-button>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal()">Закрыть</b-button>
        <span id="big-photo"></span> -->
    </b-modal>
</template>


<script>
export default {
    props: ['what_is_ref', 'title_modal'],
    data() {
        return {
            allManagerStaff: "",
        }
    }, methods: {
        addUser(){

        },
        hideModal(){

        },
        onFileSelectedSee(){

        }
    }
}
</script>