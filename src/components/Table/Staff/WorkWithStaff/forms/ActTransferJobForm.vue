<template>
  <div>
    <div class="form" id="element-to-convert" ref="form_1">
      <div class="text_act" style="width: 95%; margin: 4% auto">
        <p align="center" style="font-weight: bold; font-size: 18px">
          Общество с ограниченной ответственностью «Транспортные Технологии»
        </p>
        <br />
        <p align="center">АКТ</p>
        <p align="center" style="font-size: 16px">
          передачи дополнительной работы в порядке исполнения обязанностей в
          период временно отсутствующего работника
        </p>
      </div>
      <div class="f_line">
        <p>р.п. Новоивановское МО</p>
        <p>
          "<input type="text" style="width: 10%" />"<input
            type="text"
            style="width: 30%"
          />
          <input type="text" style="width: 25%" /> года
        </p>
      </div>
      <div class="s_line">
        <p>
          Настоящий акт составлен о том, что в период временного отсутствия по
          причине основного ежегодного оплачиваемого отпуска <br>
        </p>
        <label for="" style="width: 100%; text-align: center; padding: 0;">
            <input type="text" style="width: 100%; height: 10%;"/><br>
            (фио работника)
        </label>

        <p> в связи с необходимостью оперативного решения организационных вопросов
          и в соответствии с достигнутой договоренностью, в период с   </p>
          <div style="display: flex; justify-content: space-between; position: relative;">
            <div style="display: flex; gap: 2px; align-items: baseline;  justify-content: space-evenly;">
                <input type="text" style="width: 15%" />
                <input type="text" style="width: 30%" />
                <input type="text" style="width: 20%" />  <span style="font-size: 12px;">г.</span>
                <span style="font-size: 12px;">
                    по
                </span>
            </div>
           
            <div style="display: flex; gap: 2px; align-items: baseline; justify-content: space-evenly;">
                <input type="text" style="width: 15%" />
                <input type="text" style="width: 30%" />
                <input type="text" style="width: 20%" /><span style="font-size: 12px;">г.</span>
            </div>
            </div>
      
            <p style="display: flex; align-items: baseline;">
                поручить исполнение обязанностей ,&nbsp; <br>
            <label style="flex-grow: 1; display: flex; flex-direction: column;">
                <input type="text" style="width: 100%; margin-bottom: 0;" />
                <span style="font-size: 12px; margin-top: 4px; text-align: center;">
                    (наименование должности отсутствующего должностного лица)                      
                </span>
            </label>
        </p>
        <p style="display: flex; align-items: baseline;">
            работнику,&nbsp;
            <label style="flex-grow: 1; display: flex; flex-direction: column;">
                <input type="text" style="width: 100%; margin-bottom: 0;" />
                <span style="font-size: 12px; margin-top: 4px; text-align: center;">
                    (ФИО и должность работника, временно исполняющего обязанности)
                </span>
            </label>
        </p>
        <p style="display: flex; align-items: baseline;">
            Я,&nbsp;
            <label style="flex-grow: 1; display: flex; flex-direction: column;">
                <input type="text" style="width: 100%; margin-bottom: 0;" />
                <span style="font-size: 12px; margin-top: 4px; text-align: center;">
                (Заполняется вручную! ФИО работника, временно исполняющего обязанности)
                </span>
            </label>
        </p>
        <p>выражаю свое согласие в указанный период исполнять обязанности 
            <label style="flex-grow: 1; display: flex; flex-direction: column;">
                <input type="text" style="width: 100%; margin-bottom: 0;" />
                <span style="font-size: 12px; margin-top: 4px; text-align: center;">
                    (наименование должности отсутствующего должностного лица) 
                </span>
            </label>
        </p>
        <div style="display: flex; gap: 4px; align-items: baseline;">
  <label style="flex-grow: 1; position: relative; display: flex; align-items: baseline;">
    <span style="white-space: nowrap;">"</span>
    <input type="text" style="width: 100%; margin-bottom: 0; display: inline-block;" />
    <span style="white-space: nowrap;">"</span>
  </label>

  <label style="flex-grow: 1;">
    <input type="text" style="width: 100%; margin-bottom: 0;" />
  </label>

  <label style="flex-grow: 1; display: flex; align-items: baseline; white-space: nowrap;">
    <input type="text" style="width: 100%; margin-bottom: 0;" />
    <span style="margin-left: 4px;">г.</span>
  </label>

  <label style="flex-basis: 50%; display: flex; flex-direction: column;">
    <input type="text" style="width: 100%; margin-bottom: 0;" />
    <span style="font-size: 12px; margin-top: 4px; text-align: center;">
      (подпись)
    </span>
  </label>

  <label style="flex-basis: 60%; display: flex; flex-direction: column;">
    <input type="text" style="width: 100%; margin-bottom: 0;" />
    <span style="font-size: 12px; margin-top: 4px; text-align: center;">
      (ФИО)
    </span>
  </label>
</div>



      </div>
      <div class="s_line">
        <p>
          Настоящий акт составлен в двух экземплярах по одному экземпляру для
          каждой стороны. Экземпляр Работодателя хранится в личном деле
          Работника в Отделе по работе с персоналом ООО «Транспортные
          Технологии».
        </p>
      </div>
      <div class="f_line">
        <label for=""
            ><input type="text" style="width: 100%" /><br />
            (фио руководителя)
      </label>
      <label for=""
            ><input type="text" style="width: 100%" /><br />
            (фио исполняющего обязанности)
    </label>
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
      element.style.width = "796px";
      this.$nextTick(() => {
        html2pdf()
          .set({
            margin: 1,
            filename: "Акт передачи дел на период отпуска.pdf", // Adjust extension to .pdf
            image: { type: "jpeg", quality: 1 }, // Maximize image quality
            html2canvas: { scale: 2 }, // Increase scale for better clarity
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(element)
          .save()
          .then(() => {
            // Restore original styles after PDF generation
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