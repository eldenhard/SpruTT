<template>
    <div>
        <p>Форма 4.15. "Анализ доходности по направлениям по сегменту вагоно-цистерн (привлеченный парк)"</p>
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
        <div id="FuckingData15"></div>
    </div>
</template>

<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";

export default {
    components: { Periods,Notifications, Loader },

    data() {
        return {
            wag_type: "",

            data:
            {
                "Собственник 1": {
                    "amount": 250,
                    "cost": 1420775.280000001,
                    "Станция погрузки 1": {
                        "amount": 250,
                        "cost": 1420775.280000001,
                        "Груз 1": {
                            "amount": 250,
                            "cost": 1420775.280000001,
                            "Станция выгрузки 1": {
                                'Кол-во вагонов': 123,
                                'Объем, тн.': 3333333,
                                'МД, руб.': 10_000,
                                "Удельный МД, руб./ тн.": 253,

                            },
                            "Станция выгрузки 2": {
                                'Кол-во вагонов': 123,
                                'Объем, тн.': 3333333,
                                'МД, руб.': 10_000,
                                "Удельный МД, руб./ тн.": 253,
                            }
                        }

                    }

                },

                "Собственник 2": {
                    "amount": 250,
                    "cost": 1420775.280000001,
                    "Станция погрузки 2": {
                        "amount": 250,
                        "cost": 1420775.280000001,
                        "Груз 2": {
                            "amount": 250,
                            "cost": 1420775.280000001,
                            "Станция выгрузки 2": {
                                'Кол-во вагонов': 123,
                                'Объем, тн.': 3333333,
                                'МД, руб.': 10_000,
                                "Удельный МД, руб./ тн.": 253,

                            },
                            "Станция выгрузки 3": {
                                'Кол-во вагонов': 123,
                                'Объем, тн.': 3333333,
                                'МД, руб.': 10_000,
                                "Удельный МД, руб./ тн.": 253,
                            }
                        }

                    }

                },
                "Собственник 3": {
                    "amount": 250,
                    "cost": 1420775.280000001,
                    "Станция погрузки 3": {
                        "amount": 250,
                        "cost": 1420775.280000001,
                        "Груз 3": {
                            "amount": 250,
                            "cost": 1420775.280000001,
                            "Станция выгрузки 3": {
                                'Кол-во вагонов': 123,
                                'Объем, тн.': 3333333,
                                'МД, руб.': 10_000,
                                "Удельный МД, руб./ тн.": 253,

                            },
                            "Станция выгрузки 2": {
                                'Кол-во вагонов': 123,
                                'Объем, тн.': 3333333,
                                'МД, руб.': 10_000,
                                "Удельный МД, руб./ тн.": 253,
                            }
                        }

                    }

                },


                "amount": 349,
                "cost": 4504838.459999999,

            }
        }
    },
    mounted() {
        // this.OpenChildren(document.getElementById('FuckingData15'), this.data)
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
                case "product":
                    return 'Продукт'
                    break
                case "fine":
                    return 'Штраф'
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
                    if (typeof value == 'number' || typeof value == 'string') {
                        hr = null
                        let name = this.Translate(key)
                        let value123 = value
                        if (typeof value == 'number') {
                            value123 = this.FilterValue(value?.toFixed(2))
                        }

                        div.innerHTML = `${name}: ${value123}`
                        div.style = 'margin-left: 8% !important; font-weight: 500; color: black; padding: 0; background: #D2ECDE;'
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
            document.getElementById('FuckingData15').innerHTML = ""

            this.OpenChildren(document.getElementById('FuckingData15'), this.data)

            // if (this.wag_type == "" || this.wagon_belong == "" || this.date_begin == "" || this.date_end == "") {
            //     this.notifyHead = "Ошибка";
            //     this.notifyMessage = 'Заполните все поля';
            //     this.notifyClass = "wrapper-error";
            //     this.showNotify = true;
            //     setTimeout(() => {
            //         this.showNotify = false;
            //     }, 2000);
            //     return
            // } else {
            //     this.loader = true;
            //     api
            //         .getUO422(this.date_begin, this.date_end, this.wag_type, this.wagon_belong)
            //         .then((response) => {
            //             this.loader = false;
            //             this.data3123 = response.data;
            //             this.OpenChildren(document.getElementById('FuckingData11'), this.data3123)

            //         })
            //         .catch((error) => {
            //             console.log(error);
            //             this.loader = false;
            //         });
            // }

        },
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },

    }
}


</script>