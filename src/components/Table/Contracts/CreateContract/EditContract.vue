<template>
    <div>
        <!-- {
    "id": 3536,
   
    "number": "qwe",
    "company_status": "qwe",
    "created_at": "qwe",
    "department": "qwe",
    "contract_type": "qwe",
    "contract_object": "qwe",
    "fiat_amount": 123,
    "expiration_date": "qwe",
    "prolongation": true,
    "is_active": true,
    "scan": "http://10.1.5.20/media/documents/contracts/Untitled_z6UIIgv.jpg",
    "category": "economic",
    "comment": "qwe",
    "counterparty": 6007,
    "responsible": 206
} -->

        <b-modal id="bv-modal-editContract" ref="example" size="md" hide-footer style="position: relative;">
            <template #modal-title>
                Редактирование договора № {{ contract }}
            </template>
            <form id="EditContract">
                <div>
                    <table class="table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Номер договора</th>
                                <th>Статус ТТ по договору</th>
                                <th>Дата заключения</th>
                                <th>Отдел инициатора</th>
                                <th>Вид договора</th>
                                <th>Предмет договора</th>
                                <th>Сумма договора</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" v-model="contract_data.number"></td>
                                <td><input type="text" v-model="contract_data.company_status"></td>
                                <td><input type="text" v-model="contract_data.created_at"></td>
                                <td><input type="text" v-model="contract_data.department"></td>
                                <td><input type="text" v-model="contract_data.contract_type"></td>
                                <td><input type="text" v-model="contract_data.contract_object"></td>
                                <td><input type="text" v-model="contract_data.fiat_amount"></td>

                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Срок действия</th>
                                <th>Пролонгация</th>
                                <th>Статус</th>
                                <th>Скан-копия</th>
                                <th>Категория</th>
                                <th>Примечание</th>
                                <th>Контрагент</th>
                                <th>Ответственный</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" v-model="contract_data.expiration_date"></td>
                                <td>
                                    <select name="prolongation" id="" v-model="contract_data.prolongation">
                                        <option value="true">Да</option>
                                        <option value="false">Нет</option>
                                    </select>
                                    </td>
                                <td>
                                    <select name="is_active" id="" v-model="contract_data.is_active">
                                        <option value="true">Активен</option>
                                        <option value="false">Неактивен</option>
                                    </select></td>
                                <td><input type="text"></td>
                                <td><input type="text" v-model="contract_data.category"></td>
                                <td><input type="text" v-model="contract_data.comment"></td>
                                <td><input type="text" v-model="contract_data.counterparty"></td>
                                <td><input type="text" v-model="contract_data.responsible"></td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </form>
        </b-modal>
    </div>
</template>
<style scoped>
.modal-lg {
    max-width: 80% !important;
}
input,select{
    width: 100% !important;
}
select{
    height: 100%
}
</style>

<script>
export default {
    name: 'editContract',
    props: ['contract', 'contract_data']
}
</script>