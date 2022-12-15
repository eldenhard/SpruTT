<template>
  <div>
    <div class="userField9-description">
      <p class="userField9-description-text">Ваши телеграммы</p>
    </div>
    <hr style="width: 100% !important; margin: 0; padding: 0" />
    <br />
    <div
      style="width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        margin-bottom: 3%;
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="table-layout: fixed"
      >
        <thead class="thead-light">
          <tr>
            <th style="width: 100px !important">№ договора</th>
            <th style="width: 100px !important">Код груза</th>
            <th style="width: 100px !important">Тип вагона</th>
            <th style="width: 100px !important">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="em in telegrams" :key="em.post">
            <td>
              {{ em.last_name }} {{ em.first_name }}
              {{ em.middle_name }}
            </td>
            <td>{{ em.post }}</td>
            <td>{{ em.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>

<script>
</script>