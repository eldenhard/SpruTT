<template>
    <div>
  <!-- <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button> -->

  <b-modal id="bv-modal-example" hide-footer size="md">
    <template #modal-title>
     Добавление договора
    </template>
    <div class="d-block text-center">
      <div  style="display: flex; justify-content: space-between;">
        <label for="">Номер договора <br>
          <input type="text" class="textarea">
        </label>
        <label for=""> Вид договора<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Предмет договора <br>
          <input type="text" class="textarea">
        </label>
      </div>

      <div  style="display: flex; justify-content: space-between;">
        <label for="">Статус ТТ по договору <br>
          <input type="text" class="textarea">
        </label>
        <label for="">Дата заключения<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Отдел инициатора <br>
          <input type="text" class="textarea">
        </label>
      </div>
      <div  style="display: flex; justify-content: space-between;">
        <label for=""> Статус ТТ по договору <br>
          <input type="text" class="textarea">
        </label>
        <label for="">Дата заключения<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Сумма договора <br>
          <input type="text" class="textarea">
        </label>
      </div>
<div  style="display: flex; justify-content: space-between;">
        <label for="">Срок действия договора <br>
          <input type="text" class="textarea">
        </label>
        <label for="">Пролонгация<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Статус <br>
          <input type="text" class="textarea">
        </label>
      </div>

<div  style="display: flex; justify-content: space-between;">
        <label for="">Скан-копия <br>
          <input type="text" class="textarea">
        </label>
        <label for="">Категория<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Примечание <br>
          <input type="text" class="textarea">
        </label>
      </div>
<div  style="display: flex; justify-content: space-between;">
        <label for="">Рабочее наименование <br>
          <input type="text" class="textarea">
        </label>
        <label for="">Краткое наименование<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Полное наименование <br>
          <input type="text" class="textarea">
        </label>
      </div>
<div  style="display: flex; justify-content: space-between;">
        <label for="">ЕЛС <br>
          <input type="text" class="textarea">
        </label>
        <label for="">ОГРН/ЕГРПОУ/БИН<br>
          <input type="text" class="textarea">
        </label>
        <label for="">ИНН/РНН <br>
          <input type="text" class="textarea">
        </label>
      </div>
<div  style="display: flex; justify-content: space-between;">
        <label for="">КПП/№ Св-ва НДС <br>
          <input type="text" class="textarea">
        </label>
        <label for="">Юридический адрес<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Дата создания <br>
          <input type="text" class="textarea">
        </label>
      </div>
<div  style="display: flex; justify-content: space-between;">
        <label for="">Руководитель <br>
          <input type="text" class="textarea">
        </label>
        <label for="">Телефон<br>
          <input type="text" class="textarea">
        </label>
        <label for="">Группа <br>
          <input type="text" class="textarea">
        </label>
      </div>
</div>
    <b-button class="mt-3" variant="danger"  block @click="$bvModal.hide('bv-modal-example')" style="width:10%; float:right">Закрыть</b-button>
  </b-modal>
</div>
</template>
<style scoped>
.textarea{
  background: white;
  height: 25px;
  width: 300px;
}
label{
  color:grey;
  font-size: 1.1rem;
  float: left;
  text-align: left;
}
</style>
<script>
export default{
    props: ['modal']
}
</script>