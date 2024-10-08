<template>
    <div style="display: flex; align-items: flex-start;">
        <v-select v-model="add_column_el" :options="sort_cols_elements" label="title" style="width: 100%; "
            placeholder="Добавление столбцов" multiple></v-select>
    </div>
</template>

<script>
import vSelect from "vue-select";
export default {
    components: {
        vSelect
    },
    data() {
        return {
            add_column_el: [],
            all_cols_elements: [
                { title: 'Уведомлено', data: 'is_notified' },
                { title: 'Модель вагона', data: 'wagon_model' },
              
                { title: 'Поставщик', data: 'provider' },
                { title: '№ Договора поставки', data: 'delivery_agr_number' },
                {
                    title: 'Дата разделки', data: 'cutting_date', dateFormat: 'DD.MM.YYYY',
                    correctFormat: true, // Принудительное применение формата
                    allowInvalid: false, // Отклоняет некорректные даты 
                    datePickerConfig: {
                        showWeekNumber: false,
                        i18n: {
                            previousMonth: 'Предыдущий месяц',
                            nextMonth: 'Следующий месяц',
                            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                            weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                        },
                        format: 'DD.MM.YYYY'
                    }
                },
                { title: 'Примечание 1', data: 'note1' },
            
                { title: 'Примечание 1', data: 'note1' },
                { title: 'Собственник (ЭТРАН)', data: 'owner_etran' },
                { title: 'Группа', data: 'group' },

               
                { title: 'Франшиза', data: 'franchise' },
                { title: 'Примечание 2', data: 'note2' },
                { title: 'Финансисты', data: 'pr_33_finansists' },
                { title: 'В управлении компании', data: 'in_company_management' },
                { title: 'Арендатор', data: 'tenant' },
                { title: 'Арендатор (ЭТРАН)', data: 'tenant_etran' },
                {
                    title: 'Дата изменения состояния', data: 'state_change_date', dateFormat: 'DD.MM.YYYY',
                    correctFormat: true, // Принудительное применение формата
                    allowInvalid: false, // Отклоняет некорректные даты 
                    datePickerConfig: {
                        showWeekNumber: false,
                        i18n: {
                            previousMonth: 'Предыдущий месяц',
                            nextMonth: 'Следующий месяц',
                            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                            weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                        },
                        format: 'DD.MM.YYYY'
                    }
                },
                {
                    title: 'Дата последней операции', data: 'last_operation_date', dateFormat: 'DD.MM.YYYY',
                    correctFormat: true, // Принудительное применение формата
                    allowInvalid: false, // Отклоняет некорректные даты 
                    datePickerConfig: {
                        showWeekNumber: false,
                        i18n: {
                            previousMonth: 'Предыдущий месяц',
                            nextMonth: 'Следующий месяц',
                            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                            weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                        },
                        format: 'DD.MM.YYYY'
                    }
                },
                { title: '(Пр1)примечание по парку', data: '(Пр1)примечание по парку' },
                { title: '(Пр7)примечание по парку 2', data: '(Пр7)примечание по парку 2' },
                { title: '(Пр2)примечание диспетчера', data: 'pr2_note_dispatcher' },
            ]
        }
    },
    watch: {
        add_column_el(newVal) {
            this.$emit('add_column_el', newVal)
        }
    },
    computed: {
        sort_cols_elements() {
            return this.all_cols_elements.sort((a, b) => a.title > b.title ? 1 : -1)
        }
    }
}
</script>

<style scoped>
.label_vselect {
    width: 80%;
    color: grey
}

.v-select .vs--multiple .vs--searchable {
    height: 25vh !important;
}

.vs__dropdown-toggle {
    height: 25vh !important;
}
</style>