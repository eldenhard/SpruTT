<template>
    <div>
        <div class="form"  id="element-to-convert" ref="form_1">
            <div class="header_description">
                <h5>Генеральному директору <br> ООО "Транспортные Технологии" <br> Тертычному С.Н.</h5>
                <div class="input_block">
                    <label for="">
                        <input type="text" ><br>
                        (Должность)
                    </label>
                    <label for="">
                        <input type="text" ><br>
                        (Наименование подразделения)
                    </label>
                    <label for="">
                        <input type="text" ><br>
                        (ФИО)
                    </label>
                </div>
            </div>
            <div class="text">
                <h4 align="center">Заявление</h4>
                <div class="text_text">
    
                    <p>Прошу Вас предоставить основной ежегодный оплачиваемый отпуск с "<input type="text">"<input type="text"> <input type="text"> г. по 
                    "<input type="text">"<input type="text"> <input type="text"> г. на <input type="text"> календарных дней.</p>
                </div>
            </div>
            <div class="date_block">
                <label for="">
                    <input type="text"><br>
                    (Подпись)
                </label>
                <p align="right">"<input type="text">"<input type="text"> <input type="text"> г.</p>
            </div>
            <div class="visa">
                <p>Визы:</p>
                <p>Руководитель структурного подразделения: <input type="text">/<input type="text">/</p>
            </div>
        </div>
        <b-button variant="success" @click="exportToPDF" style="margin-top: 2%; width: 20%;">Скачать <b-icon icon="file-pdf" style="width: 20px;"/></b-button>

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
          filename: "Заявление на отпуск.pdf",
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