<template>
  <div>
    <Loader v-if="loader" />
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
        <b-table
          hover
          small
          :items="filteredUsersList"
          :bordered="true"
          :fields="head_table"
          :per-page="perPage"
          :head-variant="'light'"
          :current-page="currentPage"
          :tbody-tr-class="rowClass"
        >
          <template #head(birth_date)>
            День рождения
            <img
              src="../assets/crown.png"
              alt="Корона"
              style="width: 16px; height: 16px; margin-left: 5px"
            />
          </template>
          <!-- Слот для отображения дня рождения с короной -->
          <template #cell(birth_date)="data">
            <span>
              <img
                v-if="data.item.days_until_birthday === 0"
                src="../assets/crown.png"
                alt="Корона"
                style="width: 16px; height: 16px; margin-left: 5px"
              />

              {{ data.item.birth_date }}
              <!-- Отображаем корону, если она нужна (например, для ближайших дней рождения) -->
              <img
                v-if="data.item.days_until_birthday === 0"
                src="../assets/crown.png"
                alt="Корона"
                style="width: 16px; height: 16px; margin-left: 5px"
              />
            </span>
          </template>
        </b-table>
      </div>

      <b-pagination
        v-model="currentPage"
        v-if="totalPages > 1"
        :total-rows="totalRows"
        :per-page="perPage"
        last-number
        style="margin-top: 4%"
      ></b-pagination>
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
      loader: true,
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
  async mounted() {
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

            if (birthDayThisYear < today) {
              birthDayThisYear.setFullYear(today.getFullYear() + 1); // Если день рождения уже прошел в этом году
            }

            const diffInTime = birthDayThisYear - today;
            return {
              ...element,
              days_until_birthday: Math.ceil(diffInTime / (1000 * 3600 * 24)),
              birth_date: element.birth_date
                .split("-")
                .reverse()
                .join(".")
            };
          } else {
            return {
              ...element,
              days_until_birthday: Infinity
            };
          }
        })
        .sort((a, b) => a.days_until_birthday - b.days_until_birthday);

      this.totalRows = this.users.length; // Общее количество строк для пагинации
      this.filteredUsersList = [...this.users]
    } catch (err) {
      this.loader = false;
    }
  },

  computed: {
  
    totalPages() {
      return Math.ceil(this.totalRows / this.perPage);
    },
  },
 
  methods: {
    updateTableStaff(search)  {
            const query = search.toLowerCase();
            this.filteredUsersList = this.users.filter(user =>
                user.last_name.toLowerCase().includes(query) ||
                user.first_name.toLowerCase().includes(query)
             
            );
            this.totalRows = this.filteredUsersList.length;
        },
    rowClass(item) {
      if (!item) return ""; 
      if (item.days_until_birthday === 0) {
        return "table-warning"; 
      } else if (item.days_until_birthday <= 7) {
        return "table-success"; 
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

</style>
