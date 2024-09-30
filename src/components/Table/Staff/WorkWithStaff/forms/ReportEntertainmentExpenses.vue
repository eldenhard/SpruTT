<template>
  <div>
    <div class="form" id="element-to-convert" ref="form_1">
      <div class="text_report" style="width: 95%; margin: 4% auto">
        <img src="../assets/logo_tt.png" alt="" />
        <div class="header_report">
          <h5>Приложение 5</h5>
          <p>
            к Положению «О направлении работников <br />
            ООО «Транспортные Технологии» в служебные <br />
            командировки <br />
            <br />
            «УТВЕРЖДАЮ»
            <br />
            Генеральный директор <br />
            Тертычный С.Н <br />
            <label for="" style="width: 40%; text-align: center">
              <input type="text" /><br />
              (Дата)
            </label>
          </p>
        </div>
      </div>
      <div class="f_line_report">
        <p>
          ОТЧЕТ <br />
          по представительским расходам
        </p>
        <div style="display: flex; width: 40%; margin: -2% auto 0">
          <label style="flex-basis: 60%; display: flex; flex-direction: column">
            <input type="text" style="width: 100%; margin-bottom: 0" />
            <span style="font-size: 12px; margin-top: 4px; text-align: center">
              (№ договора)
            </span>
          </label>
          <span>от</span>
          <label style="flex-basis: 60%; display: flex; flex-direction: column">
            <input type="text" style="width: 100%; margin-bottom: 0" />
            <span style="font-size: 12px; margin-top: 4px; text-align: center">
              (Дата)
            </span>
          </label>
        </div>
        <div class="description_report">
          <p>
            В целях поддержания взаимовыгодного сотрудничества проведен
            официальный прием представителей ООО «Транспортные Технологии»
          </p>
          <b>Участники переговоров:</b> <br />
          <p style="display: flex; align-items: baseline">
            <label style="flex-grow: 1; display: flex; flex-direction: column">
              <input type="text" style="width: 100%; margin-bottom: 0" />
              <span
                style="font-size: 12px; margin-top: 4px; text-align: center"
              >
                (Должность представителя )
              </span>
            </label>
            &nbsp; ООО «Транспортные Технологии» &nbsp;
            <label style="flex-grow: 1; display: flex; flex-direction: column">
              <input type="text" style="width: 100%; margin-bottom: 0" />
              <span
                style="font-size: 12px; margin-top: 4px; text-align: center"
              >
                (фио )
              </span>
            </label>
          </p>
          <label
            style="
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              margin-top: -4%;
            "
          >
            <input type="text" style="width: 100%; margin-bottom: 0" />
            <span style="font-size: 12px; margin-top: 4px; text-align: center">
              (Должность представителя компании ФИО)
            </span>
          </label>
          <b>Цель переговоров:</b>
          <label style="flex-grow: 1; display: flex; flex-direction: column">
            <input
              type="text"
              style="width: 100%; margin-bottom: 0"
              placeholder="Указывается цель, например: «Согласование коммерческих требований пригодности вагонов под погрузку» "
            />
            <span style="font-size: 12px; margin-top: 4px; text-align: center">
              (Цель переговоров)
            </span>
          </label>
          <b> Дата и место встречи:</b>&nbsp;

          <label style="flex-grow: 1; display: flex; flex-direction: column">
            <input type="text" style="width: 100%; margin-bottom: 0" />
            <span style="font-size: 12px; margin-top: 4px; text-align: center">
              (Дата и место встречи)
            </span>
          </label>
          <b>Программа встречи:</b>
          <textarea
            name=""
            id=""
            style="width: 100%"
            placeholder="УКАЗЫВАЕТСЯ ПРОГРАММА МЕРОПРИЯТИЯ, например: «Переговоры, в ходе переговоров официальный ужин представителей компаний"
            ref="textarea1"
            @change="createList($event.target.value)"
          ></textarea>
          <b>Результаты мероприятия:</b>
          <textarea
            name=""
            id=""
            style="width: 100%"
            placeholder="УКАЗЫВАЕТСЯ РЕЗУЛЬТАТ ВСТРЕЧИ, например: «достигнута договоренность»"
          ></textarea>

          <b>Представительские расходы:</b>
          <textarea
            name=""
            id=""
            style="width: 100%"
            placeholder="Описание расходов"
          ></textarea>
        </div>
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
    createList(text) {
      const textareaEl = this.$refs.textarea1;
      textareaEl.value = text
        .split("\n")
        .map((n, i) => {
          const line = i + 1;
          return `${line}. ${n.replace(RegExp(`^${line}\\. `), "")}`;
        })
        .join("\n");
    },
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
          filename: "Отчет по представительским расходам.pdf",
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