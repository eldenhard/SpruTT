<template>
    <div>

        <Loader :loader="loader" />
        <div class="air_block">
            <div class="air_block_header">
                <h5>Просмотр данных</h5>

            </div>


            <div class="table-content">

                <label for="tenant">Клиент
                    <br />
                    <input type="text" class="textarea mini" v-model="filter_arendaData.client"  @click="filter_arendaData.client = ''"/>
                </label>


                <div class="textarea" style="height: auto; width: 100%; margin-top: 2%" v-show="ten_visible">
                    <ul id="root_tenant">
                        <li v-for="item in filter_client" :key="item.id" @click="chechClient(item.client)">
                            <span>{{ item.client }}</span>
                            <hr />
                        </li>
                    </ul>
                </div>

                <div class="textarea" style="height: auto; width: 100%; margin-top: 2%" v-show="cargo_search_visible">
                    <ul id="root_tenant">
                        <li v-for="item in filter_cargo" :key="item.id" @click="checkCargo(item.name, item.code6)">
                            <span>{{ item.name }}</span>
                            <hr />
                        </li>
                    </ul>
                </div>

                <button class="button Accept mini" @click="getStandardData()">
                    Запросить
                </button>
            </div>
            <p class="amount" style="padding-top: 2%; display: flex; justify-content: space-between;" v-show="visible">
                <span> Всего записей: {{ total_objects }} </span>
            </p>
            <div style="max-width: 100%; overflow: auto; margin-bottom: 5%">
                <table border="1" v-show="visible">
                    <thead>
                        <th>№</th>
                        <th>Номер дог.</th>
                        <!-- <th>Номер прил.</th> -->
                        <th>Дата</th>
                        <th>Дата оконч.</th>
                        <th>Клиент</th>

                    </thead>

                    <!-- { "id": 295, "agreement_number": null, "on_date": null, "end_date": null, "client": "", "distance_min":
                    null, "distance_max": null, "stavka": 1487, "stavka_pre": 2722, "base": null, "cargo": null,
                    "departure_station": null, "destination_station": null, "responsible": null } -->
                    <tbody>
                        <template v-for="(item, index) in data">
                            <tr :id="item.id">
                                <td @click="open_modal(item.id)" class="delete">{{ index + 1 }}</td>
                                <td>
                                    <div class="inputcontainer">
                                        <input :id="`agreement_number` + item.id" v-model="item.agreement_number"
                                            v-on:keyup.enter="
                                                submitData(
                                                    item.agreement_number,
                                                    item.id,
                                                    'agreement_number',
                                                    'agreementload'
                                                )
                                                " />
                                        <div class="icon-container" :id="`agreementload` + item.id" style="display: none">
                                            <i class="loader"></i>
                                        </div>
                                    </div>
                                </td>




                                <!-- ДАТА -->
                                <td>
                                    <div class="inputcontainer">
                                        <input type="date" :id="`on_date` + item.id" v-model="item.on_date"
                                            v-on:keyup.enter="
                                                submitData(item.on_date, item.id, 'on_date', 'on_date_load')
                                                " />
                                        <div class="icon-container" :id="`on_date_load` + item.id" style="display: none">
                                            <i class="loader"></i>
                                        </div>
                                    </div>
                                </td>
                                <!-- ДАТА ОКОНЧАНИЯ -->
                                <td>
                                    <div class="inputcontainer">
                                        <input type="date" :id="`end_date` + item.id" v-model="item.end_date"
                                            v-on:keyup.enter="
                                                submitData(item.end_date, item.id, 'end_date', 'end_date_load')
                                                " />
                                        <div class="icon-container" :id="`end_date_load` + item.id" style="display: none">
                                            <i class="loader"></i>
                                        </div>
                                    </div>
                                </td>
                                <!-- КЛИЕНТ -->
                                <td>
                                    <div class="inputcontainer">
                                        <input :id="`client` + item.id" v-model="item.client" v-on:keyup.enter="
                                            submitData(item.client, item.id, 'client', 'client_load')
                                            " />
                                        <div class="icon-container" :id="`client_load` + item.id" style="display: none">
                                            <i class="loader"></i>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                            <!-- ПРИЛОЖЕНИЯ -->

                            <tr>
                                <td colspan="13">
                                    <details colspan="13">
                                        <summary
                                            style="background: lightgrey; color: black; text-align: center !important;">
                                            Приложений {{ item.attachments.length }} шт.
                                        </summary>

                            <tr v-for="att in item.attachments" :key="att.id">
                                <!-- <td>Приложение {{ att.agreement_number }}</td> -->
                                <details>
                                    <summary style="width: 70vw;  text-align: center !important;">
                                        Приложение {{ att.agreement_number }} <span
                                            v-if="att.attachments[0]?.on_date">от</span>
                                        {{ att.attachments[0]?.on_date?.split('-').reverse().join('.') }}
                                    </summary>
                            <tr>
                                <!-- <th>Дейст</th> -->
                                <th>Дата оконч.</th>

                                <th >Станция отпр.</th>
                                <th >Дорога отпр.</th>
                                <th >Станция назн.</th>
                                <th >Дорога назн.</th>
                                <th >Груз</th>
                                <th >Ставка</th>
                                <th >Более/Менее</th>
                                <th >Грузоподъем т</th>
                                <th >НДС</th>
                                <th >Ставка НДС, %</th>
                                <th >Коэффициент</th>
                                <th >Груз наимен</th>
                                <th >Мн. станций отправки</th>
                                <th >Расстояние</th>
                                
                                <th >Станция следующей погрузки</th>
                                <th >Станции исключения назначения</th>
                                <th >Страна</th>
                                <th >Вагоны</th>
                                <th> Оборот, руб/сут</th>
                                <th> Тип отправки</th>
                                <th >Ответственный</th>
                            </tr>
                            <template v-for="childr in att.attachments">
                                <tr :key="childr.id" colspan="13">

                                    <!-- <td @click="open_modal(childr.id)" class="delete">Удалить</td> -->

                                    <td style="padding: 0 5px;">
                                        <!-- {{ childr.end_date }} -->
                                        <div class="inputcontainer">
                                            <input :id="`end_date` + childr.id" type="date" v-model="childr.end_date"
                                                v-on:keyup.enter="
                                                    submitData(childr.end_date, childr.id, 'end_date', 'end_date_load')
                                                    " />
                                            <div class="icon-container" :id="`end_date_load` + childr.id"
                                                style="display: none">
                                                <i class="loader"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td  style="padding: 0 5px;" >
                                        {{ childr.departure_station_name }}
                                        <!-- <div class="inputcontainer" >
                                            <input :id="`departure_station` + childr.id" type="text"
                                                v-model="childr.departure_station_name" v-on:keyup.enter="
                                                    submitData(childr.departure_station_name, childr.id, 'departure_station', 'departure_station_load', $event)
                                                    " />
                                            <div class="icon-container" :id="`departure_station_load` + childr.id"
                                                style="display: none">
                                                <i class="loader"></i>
                                            </div>
                                        </div> -->
                                    </td>
                                    <td  style="padding: 0 5px;">{{ translateCountry(childr.departure_road_id) }}</td>
                                    <!-- <td  style="padding: 0 5px;">
                                    <div class="inputcontainer">
                                        <input :id="`departure_road_id` + childr.id" type="text"
                                            v-model="childr.departure_road_id_name" v-on:keyup.enter="
                                                submitData(childr.departure_road_id_name, childr.id, 'departure_road_id', 'departure_road_id_load', $event)
                                                " />
                                        <div class="icon-container" :id="`departure_road_id_load` + childr.id"
                                            style="display: none">
                                            <i class="loader"></i>
                                        </div>
                                    </div>
                                </td> -->
                                    <td  style="padding: 0 5px;">
                                        {{ childr.destination_station_name }}
                                        <!-- <div class="inputcontainer">
                                            <input :id="`destination_station` + childr.id" type="text"
                                                v-model="childr.destination_station_name" v-on:keyup.enter="
                                                    submitData(childr.destination_station_name, childr.id, 'destination_station', 'destination_station_load', $event)
                                                    " />
                                            <div class="icon-container" :id="`destination_station_load` + childr.id"
                                                style="display: none">
                                                <i class="loader"></i>
                                            </div>
                                        </div> -->
                                    </td>
                                    <td  style="padding: 0 5px;">
                                        {{ childr.destination_road_id }}
                                        <!-- <div class="inputcontainer">
                                            <input :id="`destination_road_id` + childr.id" type="text"
                                                v-model="childr.destination_road_id_name" v-on:keyup.enter="
                                                    submitData(childr.destination_road_id_name, childr.id, 'destination_road_id', 'destination_road_id_load', $event)
                                                    " />
                                            <div class="icon-container" :id="`destination_road_id_load` + childr.id"
                                                style="display: none">
                                                <i class="loader"></i>
                                            </div>
                                        </div> -->
                                    </td>
                                    <td  style="padding: 0 5px;">
                                        {{ childr?.cargo_var }}
                                        <!-- <div class="inputcontainer">
                                        <input :id="`cargo_name` + childr.id" type="text" v-model="childr.cargo_name"
                                            v-on:keyup.enter="
                                                submitData(childr.cargo_name, childr.id, 'cargo_name', 'cargo_load')" />
                                        <div class="icon-container" :id="`cargo_load` + childr.id" style="display: none">
                                            <i class="loader"></i>
                                        </div>
                                    </div> -->
                                    </td>
                                    <td  style="padding: 0 5px;">
                                        {{ childr.stavka }}
                                        <!-- <div class="inputcontainer">
                                            <input :id="`stavka` + childr.id" type="text" v-model="childr.stavka"
                                                v-on:keyup.enter="
                                                    submitData(childr.stavka, childr.id, 'stavka', 'stavka_load')
                                                    " />
                                            <div class="icon-container" :id="`stavka_load` + childr.id"
                                                style="display: none">
                                                <i class="loader"></i>
                                            </div>
                                        </div> -->
                                    </td>

                                    <td  style="padding: 0 5px;">{{ childr.capacity_compare == 'less' ? 'Менее' : 'Более' }}</td>
                                    <td  style="padding: 0 5px;">{{ childr.capacity_value }} </td>
                                    <td  style="padding: 0 5px;">
                                        {{ childr.nds }}
                                        <!-- <div class="inputcontainer">
                                            <input :id="`nds` + childr.id" type="text" v-model="childr.nds"
                                                v-on:keyup.enter="
                                                    submitData(childr.nds, childr.id, 'nds', 'nds_load')
                                                    " />
                                            <div class="icon-container" :id="`nds_load` + childr.id" style="display: none">
                                                <i class="loader"></i>
                                            </div>
                                        </div> -->
                                    </td>
                                    <td  style="padding: 0 5px;">{{ childr.stavka_nds }}</td>
                                    <td  style="padding: 0 5px;">
                                        {{ childr.k }}
                                        <!-- <div class="inputcontainer">
                                            <input :id="`k` + childr.id" type="text" v-model="childr.k" v-on:keyup.enter="
                                                submitData(childr.k, childr.id, 'k', 'k_load')
                                                " />
                                            <div class="icon-container" :id="`k_load` + childr.id" style="display: none">
                                                <i class="loader"></i>
                                            </div>
                                        </div> -->
                                    </td>
                                    <td  style="padding: 0 5px;">{{ childr?.cargos_list ?? "" }}</td> <!--Груз наимен-->
                                    <td  style="padding: 0 5px;">{{ childr?.departure_stations ? childr?.departure_stations.join(",") : "" }}</td>
                                    <!-- Мн. станций отправки-->
                                    <td  style="padding: 0 5px;">{{ childr?.distance }}</td> <!-- Расстояние-->
                                    <td  style="padding: 0 5px;">{{ childr?.next_loading_stations ? childr.next_loading_stations.join(",") : "" }}
                                    </td>
                                    <!-- Станция следующей погрузки-->
                                    <td  style="padding: 0 5px;">{{ childr?.exclude_next_loading_stations ?
                                        childr.exclude_next_loading_stations.join(",") : "" }}</td>
                                    <!-- Станции исключения следующей погрузки-->
                                    <td  style="padding: 0 5px;">{{ childr?.country_to_name }}</td> <!-- Страна-->
                                    <td  style="padding: 0 5px;">{{ childr?.wagons_list ? childr.wagons_list.join(",") : "" }}</td> <!-- Вагоны-->
                                    <td  style="padding: 0 5px;">{{ childr?.turnover }}</td>
                                    <td  style="padding: 0 5px;">{{ isType(childr?.shipment_type) }}</td>
                                    <td  style="padding: 0 5px;">{{ childr.responsible_name }}</td>
                                </tr>
                            </template>
                            </details>
                            </tr>
                            </details>
                            </td>
                            </tr>


                        </template>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import { mapState } from "vuex";
export default {
    components: { Loader, Notifications },
    data() {
        return {
            cache: new Map(),
            watchAnnex: true,
            cargo_search_visible: false,
            cargo: "",
            visible: true,
            loader: false,
            selected_record: '',
            loader: false,
            data: "",
            interval: 1,
            pagination: "",
            total_pages: "",
            total_objects: 0,

            pageNumber: 1,

            ten_visible: false,
            filter_arendaData: {
                page_size: "100",
                client: "",
                cargo: "",
                wagon_type: "Полувагон"
            },
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },
    mounted() {
        document.body.addEventListener("click", this.CloseWindow);

    },


    computed: {
        ...mapState({
            uid: (state) => state.auth.uid,
            user: (state) => state.users.users,
            cargo_code: (state) => state.cargo_code.cargo_code,
            countryRoad: (state) => state.road.roadAsCountries

        }),
      

        filter_client() {
            if (this.filter_arendaData.client.length > 1) {
                this.ten_visible = true;
            }
            return this.filter_arendaData.client.length > 1
                ? this.$store.state.client.name_client.filter((item) =>
                    item.client
                        .toLowerCase()
                        .includes(this.filter_arendaData.client.toLowerCase())
                )
                : "";
        },
        filter_cargo() {
            if (this.cargo.length > 1) {
                this.cargo_search_visible = true;
            }
            return this.cargo.length > 1
                ? this.cargo_code.filter((item) =>
                    item.name
                        .toLowerCase()
                        .includes(this.cargo.toLowerCase())
                )
                : "";
        },
    },
    methods: {
        isType(val){
            let type_by_db = [
                        {wagon: "ВО"},
                        {group_3_5: "ГР 3-5"},
                        {group_6_20: "ГР 6-20"},
                        {group_2: "ГР 2"},
                        {group_gt_20: "ГР > 20"},
                        {msho: "МШО"},
                    ];
       for(let type of type_by_db){
           if(type.hasOwnProperty(val)){
               return type[val]
           }
           return null
       }
        },
        translateCountry(id) {
            if(this.countryRoad.length > 10){
                return id
            } 
            return id
        },
        deleteRow(index) {
            this.data.splice(index, 1);
        },
        IdToName(val) {
            let value = this.user.filter(item => item.id == val)
            return value[0]?.last_name

        },
        Truefalse(btn) {
            if (btn == this.pageNumber) {
                return true;
            }
            if (btn == 1) {
                return true;
            }
            if (btn == this.total_pages) {
                return true;
            }
            if (btn > this.pageNumber && btn < this.pageNumber + this.interval) {
                return true;
            }
            if (btn < this.pageNumber && btn > this.pageNumber - this.interval) {
                return true;
            }

            return false;
        },
        getPagination(pg_size, pg_number) {
            this.loader = true;

            api
                .getAllTarifDataPagination(this.filter_arendaData, pg_size, pg_number)
                .then((response) => {
                    this.loader = false;
                    this.data = response.data.data;
                    console.log(this.data);
                    this.pageNumber = response.data.page_number;
                })

                .catch((error) => {
                    this.loader = false;
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = error.response.data;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2000);
                    console.log(error);
                });
        },
        getCargoNameByCode(value) {
            event.preventDefault()
            this.loader = true
            apiStations.getCargoCodeSearch(value)
                .then(response => {
                    this.loader = false
                    this.notifyHead = "Успешно";
                    this.notifyMessage = response.data.data[0].name;
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 5000);
                }).catch((error) => {
                    this.loader = false
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = 'Груза с таким кодом не найден';
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2000);
                })
        },
        getStationNameByCode(value) {
            event.preventDefault()
            this.loader = true
            if (typeof value == 'number') {
                apiStations.getCurrentStationByCode(value)
                    .then(response => {
                        this.loader = false
                        this.notifyHead = "Успешно";
                        this.notifyMessage = response?.data.data[0]?.road?.name;
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 3000);
                    }).catch((error) => {
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = 'Железная дорога не найдена';
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 2000);
                        console.error(error)
                    })
            }
            else {
                console.log('1')
                apiStations.getCurrentStation(value)
                    .then(response => {
                        let all_res = response.data.data.filter(station_name => value.toLowerCase() === station_name.name.toLowerCase())
                        this.loader = false
                        this.notifyHead = "Успешно";
                        this.notifyMessage = all_res[0]?.road.name;
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 3000);

                    }).catch((error) => {
                        this.loader = false
                        console.error(error)
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = 'Железная дорога не найдена';
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 2000);
                        console.error(error)
                    })
            }
        },

        async WatchInformationData(value) {
            if (this.cache.has(value)) {
                return this.cache.get(value);
            } else {
                try {
                    let response = await apiStations.getCurrentStationByCode(value);
                    const result = response.data.data[0].name;
                    this.cache.set(value, result); // Сохраняем результат в кеше
                    return result;
                } catch (error) {
                    console.error(error);
                    this.loader = false
                    return null;
                }
            }
        },
        //   Получение данных в таблицу
        async getStandardData() {
            this.loader = true;
            this.data = [];

            try {
                const response = await api.getTarifData(this.filter_arendaData);
                this.pageNumber = response.data.page_number;
                this.pagination = response.data.links;
                this.total_pages = response.data.total_pages;
                this.total_objects = response.data.total_objects;
                this.data = response.data.data;

                function groupAttachments(attachments) {
                    const groupedAttachments = {};

                    attachments.forEach((attachment) => {
                        const agreementNumber = attachment.agreement_number;

                        if (!groupedAttachments[agreementNumber]) {
                            groupedAttachments[agreementNumber] = [];
                        }

                        groupedAttachments[agreementNumber].push(attachment);
                    });

                    return Object.keys(groupedAttachments).map((key) => ({
                        agreement_number: key,
                        attachments: groupedAttachments[key],
                    }));
                }
                this.loader = false
                // Обрабатываем каждый элемент данных
                const promises = this.data.map(async (item) => {
                    item.attachments = groupAttachments(item.attachments);
                    if (item) {
                        await Promise.all(item.attachments.flatMap(value => value.attachments || []))
                            .then(async (codes) => {
                                for (const code of codes) {
                                    if (code?.departure_station_id !== null) {
                                        code.departure_station_id = code.departure_station_id;
                                    }
                                    if (code?.destination_station_id !== null) {
                                        code.destination_station_id = code.destination_station_id;
                                    }
                                }
                            });
                    }
                    return item;
                });


            } catch (error) {
                this.loader = false;
                this.notifyHead = "Ошибка";
                this.notifyMessage = error.response;
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 2000);
            }
        },





        chechClient(item) {
            this.filter_arendaData.client = item;
            this.ten_visible = false;
        },
        checkCargo(item, code6) {
            this.filter_arendaData.cargo = code6
            this.cargo = item;
            this.cargo_search_visible = false
        },
        CloseWindow() {
            this.ten_visible = false;
            this.cargo_search_visible = false;
        },
        async submitData(element, id, frst, lst, event) {
            document.getElementById(`${lst}${id}`).style.display = "block";
            let operationBuffer
            if (frst == 'departure_station' || frst == 'destination_station') {
                operationBuffer = element.replace(/ [А-Я]{2}[^ ]*/g, "  ").split("  ")[0];
                try {
                    let result = await apiStations.getCurrentStation(operationBuffer)
                    if (result.data.data.length == 0) {
                        document.getElementById(`${lst}${id}`).style.display = "none"
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = 'Станция с таким наименованием не найдена';
                        this.notifyClass = "wrapper-error";
                        wagon_DOM.classList.remove("error");
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 2500);
                        return
                    }
                    let findStation = result.data.data.filter((item) => {
                        return item.name.toLowerCase() === operationBuffer.toLowerCase()
                    })
                    // console.log(findStation)
                    element = findStation[0]?.code
                } catch (error) {
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = error;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3500);
                }

            }
            let name = frst;
            let data = [];
            data.push({ [name]: element, responsible: this.uid });
            console.log(id, data[0], 'i am')
            if(data[0].end_date == ""){
                data[0].end_date = null
            }
            api
                .patchTarifData(id, data[0])
                .then((response) => {
                    document.getElementById(`${lst}${id}`).style.display = "none";
                    let wagon_DOM = document.getElementById(`${frst}${id}`);
                    wagon_DOM.classList.add("success");
                    setTimeout(() => {
                        wagon_DOM.classList.remove("success");
                    }, 1000);
                    // document.getElementById(`${lst}${id}`).value = operationBuffer
                    if (event) {
                        event.target.value = operationBuffer
                    }

                })
                .catch((error) => {
                    document.getElementById(`${lst}${id}`).style.display = "none";
                    let wagon_DOM = document.getElementById(`${frst}${id}`);
                    wagon_DOM.classList.add("error");
                    setTimeout(() => {
                        wagon_DOM.classList.remove("error");
                    }, 1000);
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = error;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3500);
                });
        },


        // open_modal(id) {
        //     console.log(id)
        //     this.selected_record = id
        //     this.$bvModal.show('standard_directory_created')
        // },
        deleteTarifData(id) {
            // console.log(id)
            this.loader = true
            api.deleteTarifData(id)
                .then((response) => {
                    this.loader = false;
                    this.getStandardData()
                    this.$bvModal.hide('standard_directory_created')
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Данные удалены";
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2500);
                })
                .catch((error) => {
                    this.loader = false;
                    this.$bvModal.hide('standard_directory_created')
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Данные не удалены";
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2500);
                    console.log(error);
                });
            // let row = document.getElementById(id);
            // row.parentNode.removeChild(row);
        },
    },
}
</script>

<style scoped>
.success {
    transition: 0.5s ease-in-out;
    background: rgba(42, 190, 67, 0.4);
    color: black;
}

.error {
    transition: 0.5 ease-in-out;
    background: lightcoral;
    color: black;
}
.inputcontainer {
    position: relative;
}

.icon-container {
    position: absolute;
    right: 10px;
    top: calc(50% - 10px);
}

.loader {
    position: relative;
    height: 20px;
    width: 20px;
    display: inline-block;
    animation: around 5.4s infinite;
}

@keyframes around {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loader::after,
.loader::before {
    content: "";
    background: white;
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-color: #333 #333 transparent transparent;
    border-style: solid;
    border-radius: 20px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    animation: around 0.7s ease-in-out infinite;
}

.loader::after {
    animation: around 0.7s ease-in-out 0.1s infinite;
    background: transparent;
}
.table-content {
    margin-top: 4%;
    display: flex;
    justify-content: space-between;
    gap: 5%;
    flex-wrap: wrap;
    border: 1px solid lightgrey;
    padding: 1%;
}

.table-content label {
    color: #929292;
}

.table-content button {
    height: 40px;
    width: 20%;
    margin-top: 1%;
    float: right !important;
    margin-left: auto;
}

.air_block {
    width: 100%;
    margin-top: 6%;
    height: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    padding: 1%;
    transform: translate(-50%, 0);
}

.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}

.filter_block {
    display: flex;
    justify-content: space-between;
}

.Accept {
    height: 40px;
    width: 20%
}

input {
    width: 100%;
}</style>