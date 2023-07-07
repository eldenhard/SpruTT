<template>
    <div>
        <Loader :loader="loader" />

        <p>Форма 4.24. "Простои в ремонте"</p>
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

        </div>

        <template v-for="item, index in data1">
            <div @click="OpenChildren($event, item)" ref="FuckingData" :key="item.id"
                style="cursor: pointer; font-weight: bold;">
                {{ typeof item == 'number' ? Translate(index) + " " + FilterValue(item?.toFixed(2)) : Translate(index)}}
            </div>
            <hr>
        </template>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>


<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
export default {
    components: { Periods, Notifications, Loader },
    data() {
        return {
            data1: "",
            date_begin: "",
            date_end: "",
            loader: false,
            wag_type: "",
            wagon_belong: "",
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
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
                case 'downtime':
                    return 'Простой'
                    break
                case val:
                    return val
                    break
            }
        },
        FilterValue(val) {
            return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        },
        OpenChildren(eventDiv = null, val) {
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
                if(Array.isArray(val)){
                    let div = document.createElement('div')
                    let arr = []
                    for(let i in val){
                        arr.push(val[i])
                    }
                    let sum = arr.reduce((acc , item) => acc + item, 0)
                    let result = sum / arr.length
                    div.innerHTML = `${result.toFixed(2)}`
                    div.style = 'margin-left: 8% !important; font-weight: 500; color: grey; '
                    try {
                        eventDiv.target.append(div)
                        let hr = document.createElement('hr')
                        eventDiv.target.append(hr)
                    } catch {
                        eventDiv.append(div)
                        let hr = document.createElement('hr')
                        eventDiv.append(hr)
                    }
                }
                for (let i in val) {
                    let div = document.createElement('div')
                    if(Array.isArray(val)){
                        this.Translate(i)
                        continue
                    }
                    if (typeof val[i] == 'number') {
                        // typeof item == 'number'
                        let name = this.Translate(i)
                        let value = this.FilterValue(val[i].toFixed(2))
                        div.innerHTML = `${name}: ${value}`
                        div.style = 'margin-left: 8% !important; font-weight: 500; color: grey; '
                    }
                    else {
                        div.innerHTML = `${this.Translate(i)}`
                        div.style = 'margin-left: 8% !important; font-weight: 500; color: darkblue'

                    }
                    div.addEventListener('click', () => {

                        event.stopPropagation()
                        this.OpenChildren(div, val[i])
                    })
                    try {
                        eventDiv.target.append(div)
                        let hr = document.createElement('hr')
                        eventDiv.target.append(hr)
                    } catch {
                        eventDiv.append(div)
                        let hr = document.createElement('hr')
                        eventDiv.append(hr)
                    }
                }
            }
        },
        Actioned() {
            if (this.wag_type == ""  || this.date_begin == "" || this.date_end == "") {
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
                    .getUO424(this.date_begin, this.date_end, this.wag_type)
                    .then((response) => {
                        this.loader = false;
                        this.data1 = response.data;
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