<template>
  <div>
    <Loader :loader="loader" />
    <div class="workspace" v-if="state === ''">
      <HeaderUIElement
        :placeholder_value="'Поиск сотрудника...'"
        @updateApplication="updateTableStaff"
        >Дни рождения сотрудников</HeaderUIElement
      >

      <div
        class="content"
        style="
          height: 60vh;
          overflow: auto;
          display: flex;
          flex-direction: column;
        "
      >
        <table class="custom-table">
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Отдел</th>
              <th>День рождения <img
                  src="../assets/crown.png"
                  alt="Корона"
                  style="width: 16px; height: 16px; margin-left: 5px"
                /></th>
              <th>Дней до дня рождения</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in paginatedUsers"
              :key="user.id"
              :class="rowClass(user)"
            >
              <td :class="textClass(user)">
                <img
                  v-if="user.days_until_birthday === 0"
                  src="../assets/crown.png"
                  alt="Корона"
                  style="width: 16px; height: 16px; "
                />
                {{ user.last_name }}
                <img
                  v-if="user.days_until_birthday === 0"
                  src="../assets/crown.png"
                  alt="Корона"
                  style="width: 16px; height: 16px; "
                />
              </td>
              <td :class="textClass(user)">{{ user.first_name }}</td>
              <td :class="textClass(user)">{{ user.middle_name }}</td>
              <td :class="textClass(user)">{{ user.post }}</td>
              <td :class="textClass(user)">
               
                {{ formatBirthDate(user.birth_date) }}
              </td>
              <td :class="textClass(user)">
                {{ user.days_until_birthday }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <nav
        v-if="totalPages > 1"
        aria-label="Pagination"
        style="display: flex; justify-content: center; align-items: center"
      >
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
            @click="changePage(currentPage - 1)"
          >
            <a class="page-link" href="#">
              <b-icon icon="caret-left-fill"></b-icon
            ></a>
          </li>

          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            <a class="page-link" href="#">{{ page }}</a>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
            @click="changePage(currentPage + 1)"
          >
            <a class="page-link" href="#">
              <b-icon icon="caret-right-fill"></b-icon
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import HeaderUIElement from "../ui/HeaderUIElement.vue";
import api from "@/api/staff";
import Loader from "@/components/loader/loader.vue";

export default {
  components: { HeaderUIElement, Loader },
  data() {
    return {
      state: "",
      users: [],
      loader: false,
      filteredUsersList: [],
      head_table: [
        { key: "last_name", label: "Фамилия" },
        { key: "first_name", label: "Имя" },
        { key: "middle_name", label: "Отчество" },
        { key: "post", label: "Отдел" },
        { key: "birth_date", label: "День рождения" },
        { key: "days_until_birthday", label: "Дней до дня рождения" },
      ],
      perPage: 20, // Количество записей на странице
      currentPage: 1, // Текущая страница
      totalRows: 0, // Общее количество строк
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalRows / this.perPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredUsersList.slice(start, end);
    },
  },
  async mounted() {
    this.loader = true;
  try {
    const staff = await api.getAllStaff({ page_size: 500 });
    const today = new Date(); // Текущая дата

    this.users = staff.data.data
      .map((element) => {
        if (element.birth_date) {
          const birthDate = new Date(element.birth_date);
          const birthDayThisYear = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
          );

          // Устанавливаем days_until_birthday в 0, если день рождения сегодня
          if (birthDayThisYear.toDateString() === today.toDateString()) {
            return {
              ...element,
              days_until_birthday: 0,
              birth_date: birthDate,
            };
          }

          // Если день рождения уже прошел в этом году
          if (birthDayThisYear < today) {
            birthDayThisYear.setFullYear(today.getFullYear() + 1);
          }

          const diffInTime = birthDayThisYear - today;
          return {
            ...element,
            days_until_birthday: Math.ceil(diffInTime / (1000 * 3600 * 24)),
            birth_date: birthDate,
          };
        } else {
          return {
            ...element,
            days_until_birthday: Infinity,
          };
        }
      })
      .sort((a, b) => a.days_until_birthday - b.days_until_birthday);

    this.totalRows = this.users.length; // Общее количество строк для пагинации
    this.filteredUsersList = [...this.users];
  } catch (err) {
    this.loader = false;
  } finally{
    this.loader = false;
  }
},
  methods: {
    updateTableStaff(search) {
      const query = search.toLowerCase();
      this.filteredUsersList = this.users.filter(
        (user) =>
          user.last_name.toLowerCase().includes(query) ||
          user.first_name.toLowerCase().includes(query)
      );
      this.totalRows = this.filteredUsersList.length;
      this.currentPage = 1; // Сбрасываем на первую страницу после фильтрации
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    rowClass(item) {
      if (!item) return "";
      if (item.days_until_birthday === 0) {
        return "custom-success";
      }
      return "";
    },
    textClass(item) {
      return item.days_until_birthday > 0 && item.days_until_birthday <= 5
        ? "custom-danger"
        : "";
    },
    formatBirthDate(date) {
      if (!date) return "";
      const options = { day: "numeric", month: "long" };
      return new Intl.DateTimeFormat("ru-RU", options).format(date);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/style.scss";
</style>
