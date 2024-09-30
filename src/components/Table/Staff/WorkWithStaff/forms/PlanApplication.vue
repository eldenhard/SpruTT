<template>
  <div>
    <div class="form" id="element-to-convert" ref="form_1">
        <div style="width: 95% !important; margin: 1% auto 0 !important;">

            <table >
              <tr>
                <td></td>
                <td></td>
                <td colspan="4" style="font-weight: bold">
                  Приложение 2. План-заявка на командировку работников
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style="text-align: left !important; padding-left: 5px !important">
                  Утверждаю
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td
                  colspan="2"
                  style="text-align: left !important; padding-left: 5px !important"
                >
                  Генеральный директор
                </td>
                <td>Тертычный С.Н.</td>
              </tr>

              <tr>
                <td colspan="6" style="font-weight: bold">
                  ПЛАН-ЗАЯВКА НА КОМАНДИРОВКУ РАБОТНИКОВ ООО "ТРАНСПОРТНЫЕ ТЕХНОЛОГИИ"
                </td>
              </tr>

              <tr>
                <td
                  colspan="6"
                  style="
                    text-align: left !important;
                    padding-left: 10px !important;
                    background: #bfbfbf;
                  "
                >
                  <span style="font-weight: bold">1. Служебное задание</span> ( служит
                  основанием для оформления приказа )
                </td>
              </tr>

              <tr>
                <td
                  style="text-align: left !important; padding-left: 10px !important"
                >
                  Дата заявки
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="text" style="height: 100%;"/></td>
              </tr>
              <tr>
                <td
                  style="text-align: left !important; padding-left: 10px !important"
                >
                  ФИО работника полностью
                </td>
                <td></td>
                <td colspan="4"><input type="text" /></td>
              </tr>
              <tr>
                <td
                  style="
                    text-align: left !important;
                    padding-left: 10px !important;
                    white-space: nowrap;
                  "
                >
                  Командировать работника <br />
                  ООО "Транспортные Технологии" в
                </td>
                <td>Страна</td>
                <td colspan="4"><input type="text" /></td>
              </tr>
              <tr>
                <td></td>
                <td>Город</td>
                <td colspan="4"><input type="text" /></td>
              </tr>
              <tr>
                <td></td>
                <td>Организация</td>
                <td colspan="4"><input type="text" /></td>
              </tr>
              <tr>
                <td
                  style="
                    text-align: left !important;
                    padding-left: 10px !important;
                    font-weight: bold;
                  "
                >
                  Цель командировки
                </td>
                <td></td>
                <td colspan="4"><input type="text" /></td>
              </tr>

              <tr>
                <td style="
                    text-align: left !important;
                    padding-left: 10px !important;
                    font-weight: bold;
                  ">Срок служебной командировки</td>
                <td></td>
                <td>c</td>
                <td><input type="text" /></td>
                <td>по</td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td style="
                    text-align: left !important;
                    padding-left: 10px !important;
                    font-weight: bold;
                  ">Время командировки</td>
                <td></td>
                <td>c</td>
                <td><input type="text" /></td>
                <td>по</td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style="
                    text-align: left !important;
                    padding-left: 10px !important;
                    font-weight: bold;
                  ">Всего дней</td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                  <td
                  colspan="6"
                  style="
                    text-align: left !important;
                    padding-left: 10px !important;
                    background: #bfbfbf;
                  "
                >
                  <span style="font-weight: bold">2. Планируемые расходы</span>
                </td>
              </tr>


              <tr>
                <td class="border_super head" >Наименование расхода</td>
                <td class="border_super head">Класс обслуживания <br> (для билетов)</td>
                <td class="border_super head">Тариф в сутки(для проживания), руб.</td>
                <td class="border_super head">Примечания</td>
                <td class="border_super head">Норма суточных в валюте</td>
                <td class="border_super head">Сумма расхода</td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding: 0 10px 0 0 !important;">Роуминг</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding-right: 10px !important;">Билеты</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding-right: 10px !important;">Проживание</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding-right: 10px !important;">Трансфер</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding-right: 10px !important;">Прочие расходы</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding-right: 10px !important;">Суточные по РФ</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding-right: 10px !important;">Суточные заграницей</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td class="border_super" style="text-align: right !important; padding-right: 10px !important;">Особые отметки</td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>

                
                <td></td>
                <td></td>
                <td class="border_super head" colspan="3" style="text-align: right !important;">Всего расходов в рублях</td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="border_super head" colspan="3" style="text-align: right !important;">Всего расходов в иностранной валюте</td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="border_super head" colspan="3" style="text-align: right !important;">Необходимость заказа такси в аэропорту/на вокзал</td>
                <td class="border_super"><input type="text"></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="border_super head" colspan="3" style="text-align: right !important;">Необходимость заказа такси из аэропорта/с вокзала</td>
                <td class="border_super"><input type="text"></td>
              </tr>

              <tr>
                <td style="text-align: left !important;">Подпись работника</td>
                <td></td>
                <td></td>
                <td colspan="2">  
                    <label style="flex-basis: 60%; display: flex; flex-direction: column">
                        <input type="text" style="width: 100%; margin-bottom: 0; border: none; border-bottom: 1px solid #000;" />
                        <span style="font-size: 12px; text-align: center">
                        (подпись)
                        </span>
                    </label>
                </td>
                <td>
                    <label style="flex-basis: 60%; display: flex; flex-direction: column">
                        <input type="text" style="width: 100%; margin-bottom: 0" />
                        <span style="font-size: 12px; text-align: center">
                        (Расшифровка)
                        </span>
                </label>
                </td>
              </tr>
              <tr>
                <td style="text-align: left !important;">Согласование</td>
                <td></td>
                <td></td>
                <td colspan="2">  
                    <label style="flex-basis: 60%; display: flex; flex-direction: column">
                        <input type="text" style="width: 100%; margin-bottom: 0; border: none; border-bottom: 1px solid #000;" />
                        <span style="font-size: 12px; text-align: center">
                        (подпись)
                        </span>
                    </label>
                </td>
                <td>
                    <label style="flex-basis: 60%; display: flex; flex-direction: column">
                        <input type="text" style="width: 100%; margin-bottom: 0" placeholder="Непосред. рук-ль"/>
                        <span style="font-size: 12px; text-align: center">
                        (Расшифровка)
                        </span>
                </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2">  
                    <label style="flex-basis: 60%; display: flex; flex-direction: column">
                        <input type="text" style="width: 100%; margin-bottom: 0; border: none; border-bottom: 1px solid #000;" />
                        <span style="font-size: 12px; text-align: center">
                        (подпись)
                        </span>
                    </label>
                </td>
                <td>Финансовая служба</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2">  
                    <label style="flex-basis: 60%; display: flex; flex-direction: column">
                        <input type="text" style="width: 100%; margin-bottom: 0; border: none; border-bottom: 1px solid #000;" />
                        <span style="font-size: 12px; text-align: center">
                        (подпись)
                        </span>
                    </label>
                </td>
                <td>Отдел по работе с персоналом</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2">  
                    <label style="flex-basis: 60%; display: flex; flex-direction: column">
                        <input type="text" style="width: 100%; margin-bottom: 0; border: none; border-bottom: 1px solid #000;" />
                        <span style="font-size: 12px; text-align: center">
                        (подпись)
                        </span>
                    </label>
                </td>
                <td>АХО</td>
              </tr>

            </table>
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
      element.style.width = "796px";

      document.querySelectorAll("textarea").forEach((textarea) => {
        textarea.style.border = "none";
      });
      // Экспортируем в PDF
      this.$nextTick(() => {
        html2pdf()
          .set({
            margin: 1,
            filename: "План заявка.pdf", // Adjust extension to .pdf
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
td{
    font-size: 12px !important;
}
.table{
    width: 50%;
}
</style>