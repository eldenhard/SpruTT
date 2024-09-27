<template>
  <div>
    <div class="form" id="element-to-convert" ref="form_1" >
      <div class="text_act" style="width: 95%; margin: 4% auto;">
        <p align="center" style="font-weight: bold; font-size: 18px;">
          Общество с ограниченной ответственностью «Транспортные Технологии»
        </p>
        <br />
        <p align="center">АКТ</p>
        <p align="center" style="font-size: 16px;">
          передачи дополнительной работы в порядке исполнения обязанностей в
          период временно отсутствующего работника
        </p>
      </div>
      <div class="f_line">
       
            <p>р.п. Новоивановское МО</p>
      
       
            <p>"<input type="text" style="width: 10%">"<input type="text" style="width: 30%">  <input type="text" style="width: 25%"> года</p>
      
      </div>
    </div>
    <div class="navigation">
      <span class="back" @click="$emit('clearForm', true)"
        ><b-icon icon="chevron-left"></b-icon> Вернуться назад</span
      >
      <b-button
        variant="success"
        @click="exportToPDF"
        style="margin-top: 2%; width: 20%"
        >Скачать <b-icon icon="file-pdf" style="width: 20px"
      /></b-button>
    </div>
  </div>
</template>

  
  <script>
import html2pdf from "html2pdf.js";

export default {
  methods: {
    exportToPDF() {
      // Сохраняем исходные стили
      const element = document.getElementById("element-to-convert");
      const originalStyles = element.style.cssText;

      // Изменяем стили для экспорта в PDF
      element.style.height = "auto";
      element.style.boxShadow = "none";

      // Экспортируем в PDF
      this.$nextTick(() => {
        html2pdf(element, {
          margin: 1,
          filename: "Акт передачи дел на период отпуска.pdf",
        }).then(() => {
          // Возвращаем исходные стили после экспорта
          element.style.cssText = originalStyles;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/style_form.scss";
</style>