<template>
    <div>
        <b-modal id="bv-modal-contract-modal" ref="annex-modal" hide-footer size="lg">
    <template #modal-title>
     Редактирование приложения к договору № {{ contract }}
    </template>

<form id="FormAnnex">
  <table class="table table-sm table-bordered">
  <thead>
    <tr>
      <th>Номер договора</th>
      <th>Тип приложения</th>
      <th>Номер приложения</th>
      <th>Дата</th>
      <th>Примечание</th>
      <th>Скан-копия</th>
    </tr>
  </thead>
  <tbody>
    <tr >
      <th style="padding: 0"><input type="text" name="contract" v-model="contract" style="width:100% !important; text-align: center;" readonly></th>
      <td style="padding: 0"><input type="text" name="doc_type"  style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="text" name="number"   style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="date" name="created_at"   style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="text" name="comment"    style="width:100% !important; text-align: center;"></td>
      <td><input type="file" name="scan"></td>
    </tr>
   
  </tbody>
</table>

  <div style="display: flex; justify-content: space-around; margin-top: 7%;">
    <button  type="submit" style="width: 15%" class="button Accept">Создать</button><br>
    <button style="width: 15%" class="button Delete"  block variant="danger">Закрыть</button>
  </div>
</form>



  </b-modal>
    </div>
</template>

<script>
export default{
  name: 'EditAnnexe',
  props: ['contract', 'obj']
}
</script>