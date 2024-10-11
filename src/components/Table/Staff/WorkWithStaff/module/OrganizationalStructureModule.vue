<script>
export default {
  name: "OrgStructure",
  props: {
    employees: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      orgStructure: null, // Структура всей компании
      selectedDepartment: null, // Выбранный отдел
    };
  },

  watch: {
    employees(){
      this.orgStructure = this.buildCompanyStructure();
    }
  },
  computed: {
    // Вычисляемое свойство для отделов
    departments() {
      return this.orgStructure ? this.orgStructure.subordinates : [];
    },
    directSubordinates() {
      return this.employees.filter(emp => {
        return emp.manager === 108 && emp.subordinates && emp.subordinates.length === 0; // 108 - ID гендиректора
      });
    },
  },
  methods: {
    findCEO() {
      return this.employees.find((emp) => emp.id === 108); // ID Тертычного
    },

    buildOrgTree(managerId) {
      const subordinates = this.employees.filter(
        (emp) => emp.manager === managerId
      );

      // Создаем массив подчиненных с их подчиненными
      return subordinates.map((sub) => ({
        ...sub,
        subordinates: this.buildOrgTree(sub.id), // Рекурсивный вызов для получения подчиненных
      }));
    },

    buildCompanyStructure() {
      const ceo = this.findCEO();
      if (!ceo) return null;

      // Строим оргструктуру с подчинёнными
      return {
        ...ceo,
        subordinates: this.buildOrgTree(ceo.id),
      };
    },

    // Выбор отдела
    selectDepartment(department) {
      this.selectedDepartment = department;
    },

    // Получение сотрудников для отдела
    employeesOfDepartment(departmentId) {
      return this.employees.filter(
        (emp) =>
          emp.manager === departmentId && emp.departmentId === departmentId
      );
    },

    // Возврат к начальному состоянию
    goBack() {
      this.selectedDepartment = null;
    },
  },
};
</script>

<template>
  <div>
    <div class="company_structure" v-if="orgStructure">
    <!-- Если нет выбранного отдела, отображаем все отделы -->
    <div v-if="!selectedDepartment ">
      <h4>Организационная структура ООО "Транспортные Технологии"</h4>
      <p class="manager">Генеральный директор: {{ findCEO().last_name }} {{ findCEO().first_name }}</p>
      <div class="company_structure_content">
        <template  v-for="department in departments">
        <div
          v-if="department.subordinates.length > 0"
          :key="department.id"
          @click="selectDepartment(department)"
          class="list_item"
        >
          <p class="header">{{ department.department }}</p>
          <p class="description">
            Начальник: {{ department.first_name }} {{ department.last_name }}
          </p>
        </div>
      </template>
      </div>
<hr/>
      <!-- Прямое подчинение -->
      <p class="text">Сотрудники на прямую подчиняющиеся Ген.директору</p>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Должность</th>
          </tr>
        </thead>
        <tbody>
          <template  v-for="emp in departments">
            <tr :key="emp.id" v-if="emp.subordinates.length === 0">
              <td>{{ emp.last_name }} </td>
              <td>{{ emp.first_name }}</td>
              <td>{{ emp.middle_name }}</td>
              <td>{{ emp.post }}</td>
          </tr>
          </template>
         
        </tbody>
      </table>
    </div>

    <!-- Если выбран отдел, отображаем начальника и либо подразделения, либо сотрудников -->
    <div v-else>
      <h4>{{ selectedDepartment.department }}</h4>
      <p class="description">
        Начальник: {{ selectedDepartment.first_name }}
        {{ selectedDepartment.last_name }}
      </p>

      <!-- Если есть подотделы -->
      <div
        v-if="
          selectedDepartment.subordinates &&
          selectedDepartment.subordinates.length &&
          selectedDepartment.subordinates.some(
            (sub) => sub.subordinates.length > 0
          )
        "
        
      >
        <div class="company_structure_content">
          <div
            v-for="sub in selectedDepartment.subordinates"
            :key="sub.id"
            @click="selectDepartment(sub)"
            class="list_item"
          >
          <p class="header">{{ sub.department }}</p>
          <p class="description">
            Начальник:{{ sub.first_name }} {{ sub.last_name }}
          </p>
          </div>
        </div>
      </div>

      <!-- Если нет подотделов или все подотделы имеют subordinates равные 0 -->
      <div v-else>
        <p class="text">Сотрудники отдела</p >
        <div class="employee_block">
          <table class="custom-table">
            <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Должность</th>
          </tr>
        </thead>
            <tbody>
              <tr v-for="sub in selectedDepartment.subordinates" :key="sub.id">
              <td>{{ sub.last_name }} </td>
              <td>{{ sub.first_name }}</td>
              <td>{{ sub?.middle_name }}</td>
              <td>{{ sub?.post }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Кнопка назад -->
      <button  @click="goBack" class="backList">
        <b-icon icon="chevron-left" scale="1" ></b-icon> Вернуться назад
          </button>
    </div>
  </div>
  <div v-else class="loading">
      <p>Загрузка организационной структуры...</p>
    </div>
  </div>

</template>
  

<style lang="scss" scoped>
@import "../style/style_org_structure.scss";
@import "../style/style.scss";
</style>

  <!-- Детальные комментарии
selectedDepartment в data:

Добавляем состояние selectedDepartment, которое контролирует, выбран ли отдел. Если отдел выбран, отображаем сотрудников этого отдела или подотделы.
Отображение отделов:

На первом экране отображаем список всех отделов, кликая на которые пользователь выбирает конкретный отдел и переходит внутрь него.
Отображение сотрудников и подотделов:

Если в отделе есть подотделы (подчиненные менеджеры), мы выводим их как список, по которому можно кликнуть для дальнейшей навигации.
Если подотделов нет, выводим список сотрудников отдела.
Рекурсивное построение структуры:

В функции buildCompanyStructure строится дерево подчиненных менеджеров, начиная с Тертычного.
Возврат к списку отделов:

Если пользователь хочет вернуться к общему списку отделов, можно нажать кнопку "Назад", что вернет пользователя на первый экран.
Шаг 4: Важные моменты
Гибкость дерева: Мы отображаем организацию в виде дерева, и каждый блок можно раскрыть или вернуться назад.
Деление по отделам: У каждого отдела есть начальник, и если в отделе нет подотделов, мы показываем сотрудников.
Рекурсия: Используем рекурсивный подход для отображения вложенных отделов.
Таким образом, мы получаем гибкий и наглядный интерфейс для отображения организационной структуры компании, где пользователь может исследовать отделы и сотрудников. -->