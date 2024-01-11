<template>
    
    <div>
        <Loader :loader="loader" />

            <div class="creat_block">


                <div class="img_block">
       
                    <img :src="imagePreview" v-show="showPreview" :data-image="info?.photo" />
                </div>
                <div class="data_block">
                    <div class="creat_block__first">
                        <label for="last_name">Фамилия <br>
                            <input type="text" name="" id="" v-model="info.last_name">
                        </label>
                        <label for="first_name">Имя <br>
                            <input type="text" name="" id="" v-model="info.first_name">
                        </label>
                        <label for="middle_name">Отчетство <br>
                            <input type="text" name="" id="" v-model="info.middle_name">
                        </label>
                    </div>
                    <div class="creat_block__first">
                        <label for="">Тел. внутрен <br>
                            <input type="text" name="phone_corp" id="" v-model="info.phone_corp">
                        </label>
                        <label for="">Тел. личный <br>
                            <input type="text" name="phone_personal" id="" v-model="info.phone_personal">
                        </label>
                        <label for="">Почта<br>
                            <input type="email" name="email" id="" v-model="info.email" required>
                        </label>
                    </div>
                    <div class="creat_block__first">
                        <label for="">Должность<br>
                            <input type="text" name="post" id="" v-model="info.post">
                        </label>
                        <label for="">Отдел <br>
                            <select v-model="info.groups">
                                <option v-for="userGroup in allGroups" :key="userGroup.id" :value="userGroup.id">
                                    {{ userGroup.name }}
                                </option>
                            </select>
                        </label>
                        <label for="">Начальник<br>
                            <select type="text" name="manager" v-model="info.manager">
                                <option v-for="manager in allManagerStaff" :key="manager.id" :value="manager.id">
                                    {{ manager.last_name }} {{ manager.first_name }}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="creat_block__first">
                        <label for="">Время работы <br>
                            <input type="text" name="schedule" id="" v-model="info.schedule">
                        </label>
                        <label for="">Внутр. номер<br>
                            <input type="text" name="inner_number" id="" v-model="info.inner_number">
                        </label>
                      
                    </div>
                </div>

            </div>
        <loader_miniVue :loader="miniloader" />
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
    </div>
</template>

<script>

import api from "@/api/staff";
import { mapState } from 'vuex'
import loader_miniVue from '../../../loader/loader_mini.vue';
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";

export default {
    components: { loader_miniVue, Notifications, Loader },
    props: ['info'],
    data() {
        return {
            loader: false,
            allManagerStaff: [],
            miniloader: false,
            showPreview: true,
            imagePreview: '',
            loader: false,
            file: "",
            // Уведомления
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }

    },
    mounted() {
        this.imagePreview = this.info['photo']
        this.miniloader = true;
        api
            .getAllManager()
            .then((response) => {
                this.miniloader = false;
                this.allManagerStaff = response.data.data;
            })
            .catch((err) => {
                this.miniloader = false;
                console.log(err);
            });
    },

    computed: {
        ...mapState({
            allGroups: (state) => state.auth.groups,
        })
    },

}
</script>

<style  scoped>
@charset "UTF-8";
select,
input {
  width: 100%;
  /* Задаем 100% ширины для инпутов и селектов */
  height: 2rem;
  /* Задаем высоту, которая вам подходит */
  margin: 0;
  background: white;
  max-width: 10vw;
  border-radius: 5px;
}

input[type=email] {
  outline: none;
  border: none;
}

.creat_block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 50vh;
}

.img_block {
  background: #e6e6e6;
  height: 100%;
  flex: 3 0 auto;
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  max-height: 100%;
  justify-content: center;
}
.img_block label {
  margin-left: 25%;
}
.img_block img {
  max-width: 100%;
  max-height: 80%;
  object-fit: cover;
}

.data_block {
  background: lightgray;
  height: 100%;
  flex: 2 0 auto;
}

.creat_block__first {
  display: flex;
  justify-content: center;
  gap: 2%;
  margin-top: 2%;
}
</style>