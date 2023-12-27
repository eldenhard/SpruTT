<template>
    <div>
        <table>
            <tr class="tr_delete_cols">
                <td>
                    <button class="mini">Удалить столб</button>
                </td>
                <td>
                    <button class="mini">Удалить столб</button>
                </td>
                <td>
                    <button class="mini">Удалить столб</button>
                </td>
                <td>
                    <button class="mini">Удалить столб</button>
                </td>
                <td>
                    <button class="mini">Удалить столб</button>
                </td>
                <td>
                    <button class="mini">Удалить столб</button>
                </td>
                <td>
                    <button class="mini">Удалить столб</button>
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td>
                    <input type="text" placeholder="Ввод № акта">
                </td>
                <td>
                    <input type="text" placeholder="Ввод даты акта">
                </td>
                <td>
                    <input type="text" placeholder="Ввод № вагонов">
                </td>
                <td>
                    <input type="text" placeholder="Ввод № накладной">
                </td>
                <td>
                    <input type="text" placeholder="Ввод суммы без НДС">
                </td>
                <td>
                    <input type="text" placeholder="Ввод суммы НДС">
                </td>
                <td>
                    <input type="text" placeholder="Ввод суммы с НДС">
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
class LoadActs {
    constructor() {
        this.number = null
        this.on_date = null
        this.wagon = null
        this.invoice_number = null
        this.total_wo_nds = null
        this.nds = null
        this.total = null
    }
}
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.mini {
    height: 20px;
    color: black;
    border: 1px solid white;
}

.mini:hover {
    height: 20px;
    color: black;
    background: lightgrey;
}

.tr_delete_cols,
.tr_delete_cols>td {
    border: none;
}
table:nth-child(2){
    margin-top: 10px;
}
</style>