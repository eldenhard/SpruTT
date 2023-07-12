<template>
    <div>
        <Loader :loader="loader" />

        <p>Форма 4.22. "Сводные расходы на ремонт ПС"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="display: flex; flex-direction: column;">

            <label for="">
                Тип вагона
                <br />
                <select name="" id="" v-model="wag_type">
                    <option value="ПВ">Полувагон</option>
                    <option value="ЦС">Цистерна</option>
                </select>
            </label>
            <label for="">
                Принадлежность
                <br />
                <select name="" id="" v-model="wagon_belong">
                    <option value="Собственный">Собственный</option>
                    <option value="Арендованный">Арендованный</option>
                    <option value="Взят в лизинг">Взят в лизинг</option>
                    <option value="Взят в скрытую арненду">Взят в скрытую арненду</option>
                    <option value="Слежение">Слежение</option>
                    <option value="Чужой">Чужой</option>
                    <option value="Привлеченный">Привлеченный</option>
                    <option value="Собственный, сдан в аренду">Собственный, сдан в аренду</option>
                    <option value="Лизинговый, сдан в аренду">Лизинговый, сдан в аренду</option>
                    <option value="Арендованный, сдан в аренду">Арендованный, сдан в аренду</option>
                </select>
            </label>
        </div>


        <div id="FuckingData1"></div>

        <!-- <template v-for="item, index in data1">
            <div @click="OpenChildren($event, item)" ref="FuckingData" :key="item.id"
                style="cursor: pointer; font-weight: bold;">
                {{ typeof item == 'number' ? Translate(index) + " " + FilterValue(item?.toFixed(2)) : index }}

            </div>
            <hr>
        </template>

        <template v-for="item, index in TOTAL">
            <div style="cursor: pointer; font-weight: bold;" :key="index">
                {{ index + " " + item }}
            </div>
        </template> -->
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>
<style>
tr,
td,
th {
    border: 1px solid black
}
div:hover{
    cursor: pointer;
}
</style>

<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
export default {
    components: { Periods, Notifications, Loader },
    data() {
        return {
            data3123: "",
            date_begin: "",
            date_end: "",
            loader: false,
            wag_type: "",
            wagon_belong: "",
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
            TOTAL: "",
        }
    },
    methods: {
        Translate(val) {
            switch (val) {
                case 'amount':
                    return 'Количество'
                    break
                case 'cost':
                    return 'Сумма'
                    break

                case "":
                    return 'Не определено'
                    break
                case val:
                    return val
                    break

            }
        },
        FilterValue(val) {
            return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        },
        TEST(obj) {
            let arr = []
            for (let i in obj) {

                arr.push([i, obj[i]])
            }

            arr.sort(function (a, b) {
                if (Array.isArray(a[1])) {
                    return 1
                }
                if (Array.isArray(b[1])) {
                    return -1
                }
                if (Array.isArray(a[1]) && Array.isArray(b[1])) {
                    return 0
                }
                if (typeof a[1] < typeof b[1]) {
                    return 1
                }
                if (typeof a[1] > typeof b[1]) {
                    return -1
                }
                return 0;
            });
            return arr
        },
        OpenChildren(eventDiv = null, val) {
            let collapse = "+"
            let val_copy = this.TEST(val)
            let hr = null
            let children = []
            try {
                children = eventDiv.target.childNodes
            }
            catch (error) {
                children = eventDiv.childNodes
            }
            if (children.length > 1) {
                while (children.length != 1) {
                    try {
                        eventDiv.target.removeChild(children[1])
                      
                    }
                    catch {
                        eventDiv.removeChild(children[1])

                    }
                }
            }
            else {
                for (let i in val_copy) {
                    let key = val_copy[i][0]
                    let value = val_copy[i][1]
                    let div = document.createElement('div')
                    if (typeof value == 'number') {
                        hr = null
                        let name = this.Translate(key)
                        let value123 = this.FilterValue(value.toFixed(2))
                        div.innerHTML = `${name}: ${value123}`
                        div.style = 'margin-left: 8% !important; font-weight: 500; color: black; padding: 0; background: #9FD5B7;'
                    }
                    else {
                        hr = document.createElement('hr')
                        div.innerHTML = `${this.Translate(key)} ${collapse}`
                        div.style = 'margin-left: 8% !important; font-weight: 500; color: darkblue; border: 1px solid lightgrey; padding: 1%;'

                    }
                    div.addEventListener('click', () => {

                        event.stopPropagation()
                        this.OpenChildren(div, value)
                    })
                    try {
                        eventDiv.target.append(div)
                        // if(hr != null) eventDiv.target.append(hr)
                    } catch {
                        eventDiv.append(div)
                        // if(hr != null) eventDiv.append(hr)
                    }
                }
            }
        },
        Actioned() {
            if (this.wag_type == "" || this.wagon_belong == "" || this.date_begin == "" || this.date_end == "") {
                this.notifyHead = "Ошибка";
                this.notifyMessage = 'Заполните все поля';
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 2000);
                return
            } else {
                this.loader = true;
                api
                    .getUO422(this.date_begin, this.date_end, this.wag_type, this.wagon_belong)
                    .then((response) => {
                        this.loader = false;
                        this.data3123 = response.data;
                        this.OpenChildren(document.getElementById('FuckingData1'), this.data3123)
                        // let new_val = JSON.parse(JSON.stringify(this.data1))
                        // let amount = new_val.amount
                        // let cost = new_val.cost
                        // delete new_val.amount
                        // delete new_val.cost
                        // this.data1 = new_val
                        // console.log(this.data1)

                        // this.TOTAL = {
                        //     'Количество': this.FilterValue(amount.toFixed(2)),
                        //     'Сумма': this.FilterValue(cost.toFixed(2))
                        // }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
            }

        },
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },

    }
}
</script>