<template>
  <div>
    <FilterStaff @updateFiltersStaff="updateFiltersStaff"></FilterStaff>
    <Loader :loader="loader"></Loader>
    <button class="Accept staffButton" @click="allStaff()" style="width: 80% !important; transform: translate(-50%, 0)">
      Запросить всех сотрудников
    </button>
    <br /><br />
    <br /><br />
    <button class="Cancel staffButton" style="width: 50%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin: 0 !important;
      " @click="addStaff()">
      Добавить сотрудника
    </button>
    <br>
    <span id="big-photo" @click="close_photo"></span>

    <div style="
        width: 95%;
        overflow-x: auto;
        height: auto;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        margin-bottom: 3%;
      ">
      <table class="table table-sm table-bordered table-hover" style="table-layout: fixed">
        <thead class="thead-light" style="background: #e9ecef; z-index: 1">
          <!-- <th>Фото</th> -->
          <th style="width: 100px !important">Изменить</th>
          <th style="width: 100px !important">Удалить</th>
          <th style="width: 150px !important">Фамилия</th>
          <th style="width: 150px !important">Имя</th>
          <th style="width: 150px !important">Отчество</th>
          <th style="width: 150px !important">Должность</th>
          <th style="width: 150px !important">Почта</th>
          <th style="width: 150px !important">Отдел</th>
          <th style="width: 150px !important">Телефон корп.</th>
          <th style="width: 150px !important">Телефон личный</th>
          <th style="width: 150px !important">Внутренний номер</th>
          <th style="width: 150px !important">Время работы</th>
          <th style="width: 150px !important">Начальник</th>
        
        </thead>

        <tbody style="max-width: 90% !important">
          <tr v-for="staff in all_staff" :key="staff.id">
            <td>
              <button style="height: 100%; vertical-align: middle;
              font-size: 13px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100px !important
                " class="Request" @click="openChangePage(staff.id)">
                Редактировать
              </button>
            </td>
            <td>
              <button style="
                  height: 100%;
                  font-size: 13px;

                  vertical-align: middle;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                " class="Delete" @click="getCurrentUser(staff.id)">
                Удалить
              </button>
            </td>

            <!-- 
                        <td
                            style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;">
                            <img :src="staff.photo" width="55px !important" class="image"
                                @click="open_photo(`${staff.photo}`)">
                        </td> -->

            <td v-if="staff.last_name" @click="openModalView(staff.id)">
              {{ staff.last_name }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>

            <td v-if="staff.first_name" @click="openModalView(staff.id)">
              {{ staff.first_name }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.first_name" @click="openModalView(staff.id)">
              {{ staff.middle_name }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.post" @click="openModalView(staff.id)">
              {{ staff.post }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.email" @click="openModalView(staff.id)">
              {{ staff.email }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.groups" @click="openModalView(staff.id)">
              {{ getGroupName(staff.groups[0]) }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.phone_corp" @click="openModalView(staff.id)">
              {{ staff.phone_corp }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.phone_personal" @click="openModalView(staff.id)">
              {{ staff.phone_personal }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.inner_number" @click="openModalView(staff.id)">
              {{ staff.inner_number }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.schedule" @click="openModalView(staff.id)">
              {{ staff.schedule }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>


            <td v-if="staff.manager" @click="openModalView(staff.id)">
              {{ getUserById(staff.manager) }}
            </td>
            <td v-else @click="openModalView(staff.id)">—</td>
    

          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модальное окно просмотра сотрдуника -->
    <b-modal ref="view-CurrentUser" hide-footer title="Просмотр сотрудника">
      <div class="row">
        <div class="col-md-3">
          <img :src="current_user_staff.photo" width="100%" height="100%" alt="фото не загружено" />
        </div>

        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="current_user_staff.last_name"
                  disabled />
                <br />
                <label for="input-filter-staff1" class="label">Фамилия</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff12" name="Pwd" v-model="current_user_staff.first_name"
                  disabled />
                <br />
                <label for="input-filter-staff12" class="label">Имя</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff13" name="Pwd" v-model="current_user_staff.middle_name"
                  disabled />
                <br />
                <label for="input-filter-staff13" class="label">Отчество</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff14" name="Pwd" v-model="current_user_staff.post"
                  disabled />
                <br />
                <label for="input-filter-staff14" class="label">Должность</label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff15" name="Pwd" v-model="current_user_staff.email"
                  disabled />
                <br />
                <label for="input-filter-staff15" class="label">Почта</label>
              </div>
            </div>

            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff16" name="Pwd"
                  :value="getGroupName(current_user_staff.groups)" disabled />

                <br />
                <label for="input-filter-staff16" class="label">Отдел</label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff17" name="Pwd" v-model="current_user_staff.phone_corp"
                  disabled />
                <br />
                <label for="input-filter-staff17" class="label">Телефон корп</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff18" name="Pwd" v-model="current_user_staff.phone_personal"
                  disabled />
                <br />
                <label for="input-filter-staff18" class="label">Телефон личный</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff19" name="Pwd" v-model="current_user_staff.inner_number"
                  disabled />
                <br />
                <label for="input-filter-staff19" class="label">Внутренний номер</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff20" name="Pwd" v-model="current_user_staff.schedule"
                  disabled />
                <br />
                <label for="input-filter-staff20" class="label">Время работы</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-button class="mt-3" variant="outline-danger" block @click="closeModalView()">Закрыть</b-button>
    </b-modal>
    <!-- Конец модального окна просмотра -->

    <b-modal ref="delete-user" hide-footer title="Удаление сотрудника">
      <div class="row">
        <div class="col-md-6">
          <div class="bg">
            <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="current_user_staff.last_name" readonly />
            <br />
            <label for="input-filter-staff1" class="label">Фамилия</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="bg">
            <input class="textarea" id="input-filter-staff12" name="Pwd" v-model="current_user_staff.first_name" readonly />
            <br />
            <label for="input-filter-staff12" class="label">Имя</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="bg">
            <input class="textarea" id="input-filter-staff13" name="Pwd" v-model="current_user_staff.middle_name"  readonly/>
            <br />
            <label for="input-filter-staff13" class="label">Отчество</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="bg">
            <input class="textarea" id="input-filter-staff14" name="Pwd" v-model="current_user_staff.post"  readonly/>
            <br />
            <label for="input-filter-staff14" class="label">Должность</label>
          </div>
        </div>
      </div>

      <b-button class="mt-2" variant="success" block @click="deleteCurrentUser(current_user_staff.id)">Удалить
      </b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="closeStaffModalDelete()">Закрыть</b-button>
    </b-modal>

    <b-modal ref="change-user" hide-footer title="Редактирование сотрудника">
      <div class="row">
        <div class="col-md-3" style="position: relative;">
          <button class="Accept" v-if="current_user_staff.photo">Заменить</button>
          <button class="Accept" v-else>Загрузить</button>
          <br>
          <img :src="current_user_staff.photo" id="result" alt="" width="100%" style="margin-top: 5%; height: 45vh;" v-show="ImageUser" />
          <input type="file" @change="onFileSelectedSee" name="photo" ref="photo" style="display: inline-block; position: absolute; top: 0%; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; opacity: 0;" />
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="current_user_staff.last_name" />
                <br />

                <label for="input-filter-staff1" class="label">Фамилия</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff12" name="Pwd" v-model="current_user_staff.first_name" />
                <br />
                <label for="input-filter-staff12" class="label">Имя</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff13" name="Pwd" v-model="current_user_staff.middle_name" />
                <br />
                <label for="input-filter-staff13" class="label">Отчество</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff14" name="Pwd" v-model="current_user_staff.post" />
                <br />
                <label for="input-filter-staff14" class="label">Должность</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff15" name="Pwd" v-model="current_user_staff.email"
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
                <select v-model="current_user_staff.groups" class="textarea" id="input-filter-staff16"
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
                <input class="textarea" id="input-filter-staff17" name="Pwd" v-model="current_user_staff.phone_corp" />
                <br />
                <label for="input-filter-staff17" class="label">Телефон корп</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff18" name="Pwd"
                  v-model="current_user_staff.phone_personal" />
                <br />
                <label for="input-filter-staff18" class="label">Телефон личный</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff19" name="Pwd"
                  v-model="current_user_staff.inner_number" />
                <br />
                <label for="input-filter-staff19" class="label">Внутренний номер</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg">
                <input class="textarea" id="input-filter-staff20" name="Pwd" v-model="current_user_staff.schedule" />
                <br />
                <label for="input-filter-staff20" class="label">Время работы</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="bg">
                <select v-model="current_user_staff.manager" class="textarea" id="input-filter-staff21"
                  style="width: 80%">
                  <option v-for="global in staffGlobal" :key="global.id" :value="global.id">
                    {{ global.first_name }} {{ global.last_name }}
                  </option>
                </select>
                <br />
                <label for="input-filter-staff21" class="label" style="margin-left: 10%">Начальник</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-button class="mt-2" variant="success" block @click="changeStaff(current_user_staff.id)">Редактировать
      </b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModalChange()">Закрыть</b-button>
    </b-modal>


    <b-modal ref="add-user" hide-footer title="Добавление сотрудника">
      <div class="row">
        <div class="col-md-3">
          <input type="file" @change="onFileSelectedSee" name="photo" ref="photo" id="uploadImage" />
          <img width="100%" height="90%" id="result"  v-show="ImageUser">
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
      <span id="big-photo" @click="close_photo"></span>
    </b-modal>

    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/staff";
import FilterStaff from "@/components/filter/FilterStaff.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import { getGroupName } from "@/helpers/getGroupName";
import { getUserById } from "@/helpers/getAllUsers";
import Loader from "@/components/loader/loader.vue";
export default {
  name: "StaffTable",
  components: { FilterStaff, Notifications, Loader },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
      staffGlobal: (state) => state.auth.users,
    }),
  },
  data() {
    return {
      ImageUser: false,
      formErrors: [],
      formErrorsMess: "",

      all_staff: "",

      current_user_staff: "",
      wrapper_staff: false,

      staff_change: false,
      add_staff: false,

      photo: "",
      first_name: "",
      second_name: "",
      last_name: "",
      middle_name: "",
      post: "",
      email: "",
      groups: "",
      phone_corp: "",
      phone_personal: "",
      inner_number: "",
      schedule: "",
      manager: "",
      loader: false,

      filter_staff: {
        groups: [],
        search: "",
      },

      addUserGroups: "",

      allManagerStaff: "",

      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  mounted() {
    this.loader = true;
    api
      .getAllManager()
      .then((response) => {
        this.loader = false;
        this.allManagerStaff = response.data.data;
      })
      .catch((err) => {
        this.loader = false;
        console.log(err);
      });
  },

  methods: {
    openModalView(id) {
      this.loader = true;
      api.currentUser(id).then((response) => {
        this.OpenModalView(id);
        this.current_user_staff = response.data;
        this.loader = false;
      });
    },
    OpenModalView() {
      this.$refs["view-CurrentUser"].show();
    },
    hideModalView() {
      this.$refs["view-CurrentUser"].hide();
    },
    closeModalView() {
      this.$refs["view-CurrentUser"].hide();
    },
    addStaff() {
      this.$refs["add-user"].show();
    },
    hideModal() {
      this.$refs["add-user"].hide();
    },
    toggleModal() {
      this.$refs["add-user"].toggle("#toggle-btn");
    },
    hideModalChange() {
      this.$refs["change-user"].hide();
    },
    toggleModalChange() {
      this.$refs["change-user"].toggle("#toggle-btn");
    },
    hideModalDelete() {
      this.$refs["delete-user"].hide();
    },
    open_photo(photo) {
      document.getElementById("big-photo").innerHTML =
        "<img @click='close_photo()' style='position: fixed; top:8%; z-index:999999999999999999999; left: 50%; transform:translate(-50%,0); cursor: zoom-out' src='" +
        photo +
        "'>";
    },
    close_photo() {
      document.getElementById("big-photo").innerHTML = "";
    },
    deleteErrorOnline(key) {
      const index = this.formErrors.indexOf(key);
      if (index > -1) {
        this.formErrors.splice(index, 1);
      }
      if (key == "email") {
        if (this.email.length == 0) {
          this.formErrors.push("email");
        }
      }
      if (key == "groups") {
        if (this.groups.length == 0) {
          this.formErrors.push("groups");
        }
      }
    },
    getGroupName(id) {
      const group = getGroupName(this.allGroups, id);
      return group[0]?.name;
    },

    getUserById(id) {
      const manager = getUserById(this.staffGlobal, id);
      if (manager[0]) {
        return manager[0]?.last_name + " " + manager[0]?.first_name[0] + ".";
      }
      return "";
    },
    updateFiltersStaff(filter_staff) {
      this.filter_staff = filter_staff;
    },
    allStaff() {
      this.loader = true;
      api
        .getAllStaff(this.filter_staff)
        .then((response) => {
          this.all_staff = response.data.data;
          this.all_staff.forEach((element) => {
            if (element.photo != null) {
              element.photo = element.photo.replace("10.1.5.65", "10.1.5.76");
            }
          });
        this.notifyHead = "Успешно";
        this.notifyMessage = "Пользователь найден";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => this.showNotify = false, 1500)
        this.loader = false;
          // this.all_staff = response.data.data
          // this.filter_staff.groups = [];
          // this.filter_staff.search = "";
        })
        .catch(error => {
          this.notifyHead = "Ошибка";
        this.notifyMessage = "Пользователь не найден";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => this.showNotify = false, 1500)
          this.loader = false;
        });
    },
    closeStaffModalDelete() {
      this.$refs["delete-user"].hide();
    },
    // closeStaffModalChange() {
    //     this.staff_change = false
    // },

    // получение пользователя подлежащего удалению
    getCurrentUser(id) {
      this.loader = true;
      api.currentUser(id).then((response) => {
        this.current_user_staff = response.data;
        this.$refs["delete-user"].show();
        this.loader = false;

      });

      
    },
    // Удаление текущего пользователя
    deleteCurrentUser(id) {
      this.loader = true;
      api.deleteUser(id).then((response) => {
        this.wrapper_staff = false;
        this.showNotify = true;
        this.notifyHead = "Успешно";
        this.notifyMessage = "Пользователь удален";
        this.notifyClass = "wrapper-success";
        this.loader = false;
        setTimeout(this.closeNotification, 1500);
        this.hideModalDelete();
        this.allStaff();
      });
    },
    // Открыть страницу редактирования
    openChangePage(id) {
      this.loader = true;
      // this.staff_change = true
      this.$refs["change-user"].show();
      api.currentUser(id).then((response) => {
        this.loader = false;
        this.current_user_staff = response.data;

        if (this.current_user_staff.groups.length) {
          this.current_user_staff.groups =
            this.current_user_staff.groups[0] + "";
        }
        if (this.current_user_staff.manager) {
          this.current_user_staff.manager =
            this.current_user_staff.manager + "";
        }
      });
    },
    // Подтвердить редактирование
    changeStaff(id) {
      this.loader = true;
      let formData = new FormData();
      formData.append("photo", this.photo);
      formData.append("last_name", this.current_user_staff.last_name),
        formData.append("first_name", this.current_user_staff.first_name),
        formData.append("middle_name", this.current_user_staff.middle_name),
        formData.append("post", this.current_user_staff.post),
        formData.append("email", this.current_user_staff.email),
        formData.append("groups", [this.current_user_staff.groups]),
        formData.append("phone_corp", this.current_user_staff.phone_corp),
        formData.append("phone_personal", this.current_user_staff.phone_personal);
      formData.append("inner_number", this.current_user_staff.inner_number);
      formData.append("schedule", this.current_user_staff.schedule),
        formData.append("manager", this.current_user_staff.manager);
      api.changeUserData(id, formData).then((response) => {
        this.notifyHead = "Успешно";
        this.notifyMessage = "Пользователь изменен";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
        this.allStaff();
        this.loader = false;
        this.hideModalChange();
      }).catch(error => {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Пользователь не изменен";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
        this.loader = false;

      })
    },
    closeNotification() {
      this.showNotify = false;
    },

    onFileSelected(event) {
      this.photo = this.$refs.photo.files[0];
      this.notifyHead = "Успешно";
      this.notifyMessage = "Фото добавлено";
      this.notifyClass = "wrapper-success";
      this.showNotify = true;
      setTimeout(this.closeNotification, 1500);

      // console.log(event);
    },
    // Предпросмотр фото при редактиваронии сотрудника
    onFileSelectedSee(event) {
      this.photo = this.$refs.photo.files[0];
      let target = event.target;
      let fileReader = new FileReader();
      fileReader.onload = function() {
        document.getElementById('result').src = fileReader.result;
      }
      fileReader.readAsDataURL(target.files[0]);
      this.ImageUser = true
      this.notifyHead = "Успешно";
      this.notifyMessage = "Фото добавлено";
      this.notifyClass = "wrapper-success";
      this.showNotify = true;
      setTimeout(this.closeNotification, 1500);
    },
    checkError(key) {
      return this.formErrors.includes(key);
    },
    // ОТКРЫТЬ ОКНО ДОБАВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ

    closeAddUser() {
      this.add_staff = false;
      this.formErrors = [];
      this.formErrorsMess = "";
    },
    // ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
    addUser() {
      event.preventDefault();
      this.loader = true;

      let formData = new FormData();
      formData.append("photo", this.photo);
      formData.append("email", this.email);
      formData.append("groups", [this.groups]);
      formData.append("manager", this.manager);

      formData.append("first_name", this.first_name);
      formData.append("last_name", this.last_name);
      formData.append("middle_name", this.middle_name);
      formData.append("post", this.post);
      formData.append("phone_corp", this.phone_corp);
      formData.append("phone_personal", this.phone_personal);
      formData.append("inner_number", this.inner_number);
      formData.append("schedule", this.schedule);
      api
        .createStuff(formData)
        .then((response) => {
          this.notifyHead = "Успешно";
          this.notifyMessage = "Пользователь добавлен";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          this.hideModal();
          this.allStaff();
          this.loader = false;
        })
        .catch((err) => {
          this.loader = false;
          let error = err.response.data;
          this.formErrors = Object.keys(error);
          this.formErrorsMess = error;
        });
    },
  },
};
</script>


<style>
.input-filter {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  border: none;
  text-decoration: none;
  outline: none;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
}

.modal-content {
  width: 200% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.error {
  border: 1px solid red !important;
  color: black !important;
}

/* th {
    background: #EBEBEB !important;
} */

.staff_table {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);

  text-align: center !important;
  border-bottom: solid 3px #c04945 !important;
  /* padding: 8px !important; */
  /* font-size: small; */
  background-color: #eee !important;
  color: #000000 !important;
  overflow-x: auto;
  padding: 0 !important;
}

.staffButton {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 95% !important;
}

.staff_table>td {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* tr:hover {
    background-color: #eee !important;
    outline: solid 1px #c04945 !important;
    cursor: pointer;
}

.head-staff>th {
    background: #ebebeb;
    border: 1px solid grey;
    align-items: center;
    justify-content: center;
    border-bottom: solid 3px #c04945 !important;
} */

.wrapper_staff {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: rgb(105, 105, 105, 0.7);
  z-index: 1;
}

.modal_staff {
  background: rgb(255, 255, 255);
  position: fixed;
  top: 10%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 50%;
  z-index: 2;
  height: 80%;
}

.modal_staff>p {
  text-align: center;
}

.btn-staff-group {
  display: flex;
  justify-content: space-between;
}

/* td,th {
    padding: 0 !important;
    margin: 0 !important;
} */
</style>