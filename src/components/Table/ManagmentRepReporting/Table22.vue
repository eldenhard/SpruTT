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
       
        <template v-for="item, index in data1">
            <div @click="OpenChildren($event, item)" ref="FuckingData" :key="item.id"
                style="cursor: pointer; font-weight: bold;">
                {{ typeof item == 'number' ? Translate(index) + " " + FilterValue(item?.toFixed(2)) : index }}
                <!-- {{ index }} {{ data1[item] }} -->
                <!-- {{ index == 'amount' || index == 'cost' ? `${index} ${item}` : index }} {{ index.childNodes }} -->
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
                for (let i in val) {
                    let div = document.createElement('div')
                    if (typeof val[i] == 'number') {
                        // typeof item == 'number'
                        let name = this.Translate(i)
                        let value = this.FilterValue(val[i].toFixed(2))
                        div.innerHTML = `${name}: ${value}`
                        div.style = 'margin-left: 8% !important; font-weight: 500; color: grey; '
                    } else {
                        div.innerHTML = `${i}`
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
            if(this.wag_type== "" || this.wagon_belong== "" || this.date_begin== "" || this.date_end == ""){
                this.notifyHead = "Ошибка";
                    this.notifyMessage = 'Заполните все поля';
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2000);
                    return
            }else {
                this.loader = true;
            api
                .getUO422(this.date_begin, this.date_end, this.wag_type, this.wagon_belong)
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