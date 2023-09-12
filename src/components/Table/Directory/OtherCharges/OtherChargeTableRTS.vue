<template>
  <table>
    <thead>
      <tr class="table-secondary" style="background: #e1e1e2">
        <th></th>
        <th>Вагон</th>
        <th>Дата подачи вагона</th>
        <th>Дата уборки вагона</th>
        <th>Услуга</th>
        <!-- <th>c</th>
        <th>Комплекс работ и услуг по ком. осмотру и подг. ваг.</th>
        <th>Услуги по подаче и уборке вагонов</th> -->
        <th>Цена</th>
        <th>НДС</th>
      </tr>
    </thead>
    <tbody>
        <slot></slot>
    </tbody>
  </table>
</template>