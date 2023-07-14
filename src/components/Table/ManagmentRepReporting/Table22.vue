<template>
    <div>
        <Loader :loader="loader" />

        <p>Форма 4.22. "Сводные расходы на ремонт ПС"</p>
        <div style="display: flex; justify-content: space-between;" class="filter_block">

            <div style="display: flex; flex-direction: column;">

                <label for="" style="color: gray;">
                    Тип вагона
                    <br />
                    <input type="checkbox" id="john" value="ПВ" v-model="wag_type">
                    <label for="john" style="color: black;">&nbsp;Полувагон</label>
                    <br>
                    <input type="checkbox" id="mike" value="ЦС" v-model="wag_type">
                    <label for="mike" style="color: black;">&nbsp;Цистерна</label>
                </label>


            </div>
            <div style="display: flex; ">
                <div style="display: flex;  flex-direction: column;">
                    <label for="" style="color: gray; margin-left: -15%;">
                        Принадлежность
                        <br />

                        <input type="checkbox" value="Собственный" id="Собственный" v-model="wagon_belong">
                        <label for="Собственный" style="color: black;">&nbsp;Собственный</label>
                        <br>
                        <input type="checkbox" value="Арендованный" id="Арендованный" v-model="wagon_belong">
                        <label for="Арендованный" style="color: black;">&nbsp;Арендованный</label>
                        <br>
                        <input type="checkbox" value="Взят в лизинг" id="Взят в лизинг" v-model="wagon_belong">
                        <label for="Взят в лизинг" style="color: black;">&nbsp;Взят в лизинг</label>
                        <br>
                        <input type="checkbox" value="Взят в скрытую арненду" id="Взят в скрытую арненду"
                            v-model="wagon_belong">
                        <label for="Взят в скрытую арненду" style="color: black;">&nbsp;Взят в скрытую арненду</label>
                        <br>


                        <input type="checkbox" value="Слежение" id="Слежение" v-model="wagon_belong">
                        <label for="Слежение" style="color: black;">&nbsp;Слежение</label>
                        <br>
                     
                    </label>
                </div>
                <div></div>
                <div  style="display: flex;  flex-direction: column;">
                    <label for="" style="color: gray;">
                        Принадлежность
                        <br />
                        <input type="checkbox" value="Привлеченный" id="Привлеченный" v-model="wagon_belong">
                        <label for="Привлеченный" style="color: black;">&nbsp;Привлеченный</label>
                        <br>
                        <input type="checkbox" value="Собственный, сдан в аренду" id="Собственный, сдан в аренду"
                            v-model="wagon_belong">
                        <label for="Собственный, сдан в аренду" style="color: black;">&nbsp;Собственный, сдан в
                            аренду</label>
                        <br>


                        <input type="checkbox" value="Лизинговый, сдан в аренду" id="Лизинговый, сдан в аренду"
                            v-model="wagon_belong">
                        <label for="Лизинговый, сдан в аренду" style="color: black;">&nbsp;Лизинговый, сдан в аренду</label>
                        <br>
                        <input type="checkbox" value="Арендованный, сдан в аренду" id="Арендованный, сдан в аренду"
                            v-model="wagon_belong">
                        <label for="Арендованный, сдан в аренду" style="color: black;">&nbsp;Арендованный, сдан в
                            аренду</label>
                        <br>
                        <input type="checkbox" value="Чужой" id="Чужой" v-model="wagon_belong">
                        <label for="Чужой" style="color: black;">&nbsp;Чужой</label>
                        <br>

                    </label>
                </div>


            </div>
            <Periods @Action="Actioned" @data="getCurrentData" />
        </div>


        <h4 class="NoData" v-show="NoData">По заданным параметрам нет данных</h4>

        <div id="FuckingData1"></div>

        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>
<style>
.filter_block {
    display: flex;
    justify-content: space-between;
    padding: 2%;
    border: 1px solid lightgrey
}

.NoData {
    text-align: center;
    margin-top: 15%;
}

#FuckingData1 {
    margin-top: 1%;

}

tr,
td,
th {
    border: 1px solid black
}

div:hover {
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
            NoData: false,
            data3123: "",
            date_begin: "",
            date_end: "",
            loader: false,
            wag_type: [],
            wagon_belong: [],
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
            this.NoData = false
            document.getElementById('FuckingData1').innerHTML = ""
            if (this.wag_type.length == 0  || this.wagon_belong.length == 0 || this.date_begin == "" || this.date_end == "") {
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
                    .getUO422(this.date_begin, this.date_end,  this.wag_type.join(','), this.wagon_belong.toString())
                    .then((response) => {
                        this.loader = false;
                        this.data3123 = response.data;
                        this.OpenChildren(document.getElementById('FuckingData1'), this.data3123)
                        if(Object.keys(this.data3123).length == 0){
                            this.NoData = true
                        }
     
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