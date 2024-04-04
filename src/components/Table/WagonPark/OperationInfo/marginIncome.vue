<template>
    <section>
        <div class="filter_b">

            <label for="">
                Дата <br>
                <input type="month" v-model="date_begin_create" class="textarea" style="background: white;width: 20vw ">
            </label>
            <br>
            <button class="Accept button" style="width: 20vw; margin-top: 4%;" @click="getBPData">Запросить</button>
        </div>
        <br>
        <table>

        </table>
        <div style="overflow: auto; width: 100%">
            <table>
                <thead>
                    <tr class="TableHeader">
                        <td rowspan="2">Клиент</td>
                        <td rowspan="2">Отправление</td>
                        <td rowspan="2">Груз</td>
                        <td rowspan="2">Назначение</td>
                        <td colspan="5">Объем</td>
                        <td colspan="5">Выручка (без штрафов)</td>
                        <td colspan="5">МД (без штрафов)</td>
                        <td colspan="2">Стат нагрузка</td>
                        <td colspan="2">Оборот</td>
                        <td colspan="2">Штрафы</td>
                        <td colspan="6">Доходность</td>
                    </tr>
                    <tr class="TableHeader">
                        <td>БП</td>
                        <td>Б</td>
                        <td>Факт</td>
                        <td>Откл. БП</td>
                        <td>Откл. Б</td>

                        <td>БП</td>
                        <td>Б</td>
                        <td>Факт</td>
                        <td>Откл. БП</td>
                        <td>Откл. Б</td>

                        <td>БП</td>
                        <td>Б</td>
                        <td>Факт</td>
                        <td>Откл. БП</td>
                        <td>Откл. Б</td>

                        <td>План</td>
                        <td>Факт</td>

                        <td>План</td>
                        <td>Факт</td>

                        <td>План</td>
                        <td>Факт</td>

                        <td>План(без штр)</td>
                        <td>План(со штр)</td>
                        <td>Факт(без штр)</td>
                        <td>Факт(со штр)</td>
                        <td>+/-(без штр)</td>
                        <td>+/-(со штр)</td>

                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in businessPlanData">
                        <tr :key="index">
                            <!-- Основные данные -->
                            <td>{{ item.client }}</td>
                            <td></td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.destination }}</td>
                            <td>{{ item.volume | format }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{ item.revenue_wo_nds | format }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{ item.md_wo_penalties | format }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <!-- Итерация по ключам и значениям внутри объекта station -->
                        <template v-for="(value, key) in item.station_group">
                            <template v-if="key !== 'revenue'">
                                <template v-for="(stationValue, stationKey) in value">
                                    <tr v-if="stationKey !== 'revenue'" :key="stationKey" class="Total_blue">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{{ stationKey }}</td> <!-- наименование вложенной станции-->
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{{ stationValue.revenue | format }}</td>
                                    </tr>
                                </template>
                            </template>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
    </section>
</template>


<script>
import api from '@/api/directory';
import apiWagon from "@/api/wagonPark";
export default {
    data() {
        return {
            date_begin_create: "",
            businessPlanData: "",
            margin_income: {
                "ТАТНЕФТЬ-ТРАНС, ООО": {
                    "Биклянь": {
                        "revenue": 23701547.16676,
                        "Бензин моторный (автомобильный) неэтилированный": {
                            "revenue": 5389583.640999999,
                            "Биклянь": {
                                "revenue": 5389583.640999999,
                                "Бугульма": {
                                    "revenue": 500868.652
                                },
                                "Зеленый дол": {
                                    "revenue": 424504.74
                                },
                                "Быково": {
                                    "revenue": 1222159.9200000002
                                },
                                "Ногинск": {
                                    "revenue": 568439.064
                                },
                                "Бронка": {
                                    "revenue": 535853.1240000001
                                },
                                "Матвеев курган": {
                                    "revenue": 179938.19999999998
                                },
                                "Пашковская": {
                                    "revenue": 543262.914
                                },
                                "Титаровка": {
                                    "revenue": 184209.21
                                },
                                "Нижний Бестях": {
                                    "revenue": 1230347.817
                                }
                            }
                        },
                        "Газойль": {
                            "revenue": 6560512.298679998,
                            "Биклянь": {
                                "revenue": 6560512.298679998,
                                "Тихоново": {
                                    "revenue": 1154889.9679999999
                                },
                                "Лужская (эксп.)": {
                                    "revenue": 5405622.33068
                                }
                            }
                        },
                        "Дистилляты газового конденсата": {
                            "revenue": 7382353.93508,
                            "Биклянь": {
                                "revenue": 7382353.93508,
                                "Вышестеблиевская (налив) (эксп.)": {
                                    "revenue": 5702801.409080001
                                },
                                "Лужская (эксп.)": {
                                    "revenue": 1679552.5259999998
                                }
                            }
                        },
                        "Масла минеральные, светлые, не поименованные в алфавите": {
                            "revenue": 1184601.057,
                            "Биклянь": {
                                "revenue": 1184601.057,
                                "Обнинское": {
                                    "revenue": 1034441.457
                                },
                                "Фрязино": {
                                    "revenue": 150159.6
                                }
                            }
                        },
                        "Топливо дизельное с температурой вспышки ниже 61С (в закрытом тигле)": {
                            "revenue": 3184496.2350000003,
                            "Биклянь": {
                                "revenue": 3184496.2350000003,
                                "Кузнечевский": {
                                    "revenue": 495489.918
                                },
                                "Нижневартовск I": {
                                    "revenue": 860785.871
                                },
                                "Ангелинская": {
                                    "revenue": 179282.268
                                },
                                "Посевная": {
                                    "revenue": 366744
                                },
                                "Белово": {
                                    "revenue": 158933.173
                                },
                                "Черкасов камень": {
                                    "revenue": 384121.68000000005
                                },
                                "Лена": {
                                    "revenue": 739139.3250000001
                                }
                            }
                        }
                    },
                    "revenue": 24023001.452760004,
                    "Соболеково": {
                        "revenue": 321454.28599999996,
                        "Топливо дизельное с температурой вспышки ниже 61С (в закрытом тигле)": {
                            "revenue": 321454.28599999996,
                            "Соболеково": {
                                "revenue": 321454.28599999996,
                                "Бугульма": {
                                    "revenue": 57307.565
                                },
                                "Войновка": {
                                    "revenue": 264146.72099999996
                                }
                            }
                        }
                    }
                },
                "ВЕКТОР-ДВИЖЕНИЯ, ООО": {},
                "Энергоресурсы": {},
                "РЕСУРС ТРАНС, ООО": {
                    "Похвистнево": {
                        "revenue": 113665.59999999999,
                        "Бензин моторный (автомобильный) неэтилированный": {
                            "revenue": 113665.59999999999,
                            "Похвистнево": {
                                "revenue": 113665.59999999999,
                                "Кашира-пассажирская": {
                                    "revenue": 113665.59999999999
                                }
                            }
                        }
                    },
                    "revenue": 185353.31000000003,
                    "Амур": {
                        "revenue": 143375.42,
                        "Топливо дизельное с температурой вспышки выше 61С (в закрытом тигле)": {
                            "revenue": 71687.70999999999,
                            "Амур": {
                                "revenue": 143375.42,
                                "Амур": {
                                    "revenue": 71687.70999999999
                                }
                            }
                        }
                    }
                },
                "Рус-ОйлЭкс": {},
                "ПАО \"Газпром Нефть\"": {
                    "Петропавловск": {
                        "revenue": 382288.50821,
                        "Топливо дизельное с температурой вспышки выше 61С (в закрытом тигле)": {
                            "revenue": 382288.50821,
                            "Петропавловск": {
                                "revenue": 382288.50821,
                                "Худжанд": {
                                    "revenue": 124405.64536000001
                                },
                                "Душанбе II": {
                                    "revenue": 162854.73342
                                },
                                "Карабалта": {
                                    "revenue": 95028.12943
                                }
                            }
                        }
                    },
                    "revenue": 518451.16011000006,
                    "Шопоково": {
                        "revenue": 136162.65190000003,
                        "Топливо дизельное с температурой вспышки выше 61С (в закрытом тигле)": {
                            "revenue": 136162.65190000003,
                            "Шопоково": {
                                "revenue": 136162.65190000003,
                                "Кант": {
                                    "revenue": 136162.65190000003
                                }
                            }
                        }
                    }
                },
                "НХТК": {
                    "Нягань": {
                        "revenue": 199490.95593,
                        "Бензин стабильный газовый (газолин)": {
                            "revenue": 199490.95593,
                            "Нягань": {
                                "revenue": 199490.95593,
                                "Буденновск": {
                                    "revenue": 199490.95593
                                }
                            }
                        }
                    },
                    "revenue": 3171340.9959299997,
                    "Каучук": {
                        "revenue": 252812.69999999998,
                        "Пироконденсат нефтяной": {
                            "revenue": 170670.3,
                            "Каучук": {
                                "revenue": 170670.3,
                                "Кола (эксп.)": {
                                    "revenue": 170670.3
                                }
                            }
                        }
                    },
                    "Тобольск": {
                        "revenue": 2801179.7399999998,
                        "Бензин стабильный газовый (газолин)": {
                            "revenue": 1988103.7199999997,
                            "Тобольск": {
                                "revenue": 1988103.7199999997,
                                "Копылово": {
                                    "revenue": 1988103.7199999997
                                }
                            }
                        },
                        "Пироконденсат нефтяной": {
                            "revenue": 813076.02,
                            "Тобольск": {
                                "revenue": 813076.02,
                                "Ишаново": {
                                    "revenue": 231673
                                },
                                "Каучук": {
                                    "revenue": 82142.4
                                },
                                "Обнорская": {
                                    "revenue": 244489.62
                                },
                                "Черкасов камень": {
                                    "revenue": 254771
                                }
                            }
                        }
                    }
                },
                "РУСТЭК": {
                    "Осенцы": {
                        "revenue": 234577.51679999998,
                        "Топливо дизельное с температурой вспышки выше 61С (в закрытом тигле)": {
                            "revenue": 120058.81599999999,
                            "Осенцы": {
                                "revenue": 120058.81599999999,
                                "Починок": {
                                    "revenue": 120058.81599999999
                                }
                            }
                        },
                        "Топливо нефтяное": {
                            "revenue": 114518.7008,
                            "Осенцы": {
                                "revenue": 114518.7008,
                                "Высоцк (эксп.)": {
                                    "revenue": 114518.7008
                                }
                            }
                        }
                    },
                    "revenue": 234577.51679999998
                },
                "Рейл Сервис": {
                    "Похвистнево": {
                        "revenue": 743944.8,
                        "Нефть сырая": {
                            "revenue": 743944.8,
                            "Похвистнево": {
                                "revenue": 743944.8,
                                "Биклянь": {
                                    "revenue": 743944.8
                                }
                            }
                        }
                    },
                    "revenue": 1370142.4,
                    "Бузулук": {
                        "revenue": 626197.6000000001,
                        "Нефть сырая": {
                            "revenue": 626197.6000000001,
                            "Бузулук": {
                                "revenue": 626197.6000000001,
                                "Биклянь": {
                                    "revenue": 626197.6000000001
                                }
                            }
                        }
                    }
                },
                "ООО \"Томская Топливная Компания\"": {
                    "Анжерская": {
                        "revenue": 903447.5,
                        "Мазут топочный": {
                            "revenue": 903447.5,
                            "Анжерская": {
                                "revenue": 903447.5,
                                "Владивосток": {
                                    "revenue": 903447.5
                                }
                            }
                        }
                    },
                    "revenue": 903447.5
                },
                "Грифон": {},
                "ННК-Транс": {
                    "Хабаровск I": {
                        "revenue": 1496041.7629999998,
                        "Топливо дизельное с температурой вспышки выше 61С (в закрытом тигле)": {
                            "revenue": 121276.28600000001,
                            "Хабаровск I": {
                                "revenue": 121276.28600000001,
                                "Первая речка": {
                                    "revenue": 121276.28600000001
                                }
                            }
                        },
                        "Топливо нефтяное": {
                            "revenue": 30934.408,
                            "Хабаровск I": {
                                "revenue": 30934.408,
                                "Первая речка": {
                                    "revenue": 30934.408
                                }
                            }
                        },
                        "Мазут топочный": {
                            "revenue": 1343831.069,
                            "Хабаровск I": {
                                "revenue": 1343831.069,
                                "Первая речка": {
                                    "revenue": 1100164.7999999998
                                },
                                "Блюхер": {
                                    "revenue": 243666.26899999997
                                }
                            }
                        }
                    },
                    "revenue": 1496041.7629999998
                },
                "РТС-ТРАНС, ООО": {
                    "Никель": {
                        "revenue": 156002.84634,
                        "Бензин моторный (автомобильный) неэтилированный": {
                            "revenue": 156002.84634,
                            "Никель": {
                                "revenue": 156002.84634,
                                "Ханака": {
                                    "revenue": 156002.84634
                                }
                            }
                        }
                    },
                    "revenue": 156002.84634
                },
                "ГАЗПРОМТРАНС, ООО": {
                    "Сургут": {
                        "revenue": 289477.9827,
                        "Конденсат газовый (конденсат из природного газа)": {
                            "revenue": 289477.9827,
                            "Сургут": {
                                "revenue": 289477.9827,
                                "Биклянь": {
                                    "revenue": 289477.9827
                                }
                            }
                        }
                    },
                    "revenue": 570736.20953,
                    "Окунайский (рзд)": {
                        "revenue": 147124.33805,
                        "Конденсат газовый (конденсат из природного газа)": {
                            "revenue": 147124.33805,
                            "Окунайский (рзд)": {
                                "revenue": 147124.33805,
                                "Ванино (эксп.)": {
                                    "revenue": 147124.33805
                                }
                            }
                        }
                    },
                    "Аллагуват": {
                        "revenue": 134133.88878,
                        "Дистилляты газового конденсата": {
                            "revenue": 134133.88878,
                            "Аллагуват": {
                                "revenue": 134133.88878,
                                "Туапсе-сортировочная (эксп.)": {
                                    "revenue": 134133.88878
                                }
                            }
                        }
                    }
                },
                "ГК ТИТАН, АО": {
                    "Комбинатская": {
                        "revenue": 1254656,
                        "Эфир метилтретбутиловый (МТБЭ)": {
                            "revenue": 1254656,
                            "Комбинатская": {
                                "revenue": 1254656,
                                "Новая еловка": {
                                    "revenue": 501280
                                },
                                "Нижневартовск I": {
                                    "revenue": 501072
                                },
                                "Яничкино": {
                                    "revenue": 252304
                                }
                            }
                        }
                    },
                    "revenue": 1254656
                }
            }
        }
    },

    filters: {
        format(value) {
            if (value != "" && !!value) {
                if (Number.isFinite(value)) {
                    let TwoSignNum = value?.toFixed(0)
                    return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                } else {
                    return 0;
                }

            }
            return value

        },
    },

    methods: {
        async getBPData() {
            this.$emit('stateLoader', true);
            try {
                let response = await api.getBusinessPlan(this.date_begin_create + '-01');
                let preData = response.data.data.sort((a, b) => (a.client > b.client) ? 1 : -1);

                // Создаем объект для мемоизации запросов
                let memo = {};

                for (let item of preData) {
                    if (Object.keys(this.margin_income).includes(item.client)) {
                        for (let client in this.margin_income) {
                            for (let station_departure in this.margin_income[client]) {
                                for (let cargo in this.margin_income[client][station_departure]) {
                                    for (let station_group in this.margin_income[client][station_departure][cargo]) {
                                        if (station_group == item.destination) {
                                            item.station_group = this.margin_income[client][station_departure][cargo];
                                        } else if (station_group !== item.destination && item.destination === 'Станции РФ (Запад)' && station_group !== 'revenue') {
                                            // Проверяем, есть ли значение для station_group в memo
                                            if (!memo[station_group]) {
                                                // Если нет, то отправляем запрос и сохраняем результат в memo
                                                console.log(await this.getRoadForStation(station_group, memo), 'Проверяю дороги');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                this.$toast.success('Успешно\nДанные маржинальной доходности получены', { timeout: 2000 });
                this.businessPlanData = preData;
            } catch (error) {
                this.$toast.error(`Ошибка получения данных\n${error.response}`, { timeout: 2000 });
            } finally {
                this.$emit('stateLoader', false);
            }
        },
        // Получаем название дороги по названию станции
        async getRoadForStation(val, memo = {}) {
            if (memo[val]) {
                return memo[val];
            }

            try {
                let response = await apiWagon.getCurrentStation(val);
                let roadName = response.data.data.filter((item) => item.name === val)[0].road.name.slice(0, -6);
                let directory = JSON.parse(localStorage.getItem('road'));

                // Преобразование ключа roadName и всех ключей в объекте directory к нижнему регистру
                let lowerCaseRoadName = roadName.toLowerCase();
                let lowerCaseDirectory = Object.keys(directory).reduce((acc, key) => {
                    acc[key.toLowerCase()] = directory[key];
                    return acc;
                }, {});

                memo[val] = roadName;

                // Находим значение в lowerCaseDirectory по ключу lowerCaseRoadName
                let roadValue = lowerCaseDirectory[lowerCaseRoadName];

                return roadValue;

            } catch (error) {
                console.error('Error fetching station data:', error);
                return null;
            }
        },
    }
}
</script>

<style scoped>
td {
    white-space: nowrap;
    padding: 2px 10px !important;
}

.filter_b {
    width: 20vw;
}
</style>