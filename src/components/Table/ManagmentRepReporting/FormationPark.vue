<template>
    <div style="overflow: auto;">
        <table border="1">
            <thead>
                <tr>
                    <th class="widthFirst"></th>
                    <th style="font-weight: bold !important;">Подвижной состав, ед</th>
                    <template v-for="(data, key) in dataFormation">
                        <th :key="data.id">{{ key }}</th>
                <tr>
                    <th colspan=2>{{ key | GetNameMounth }}</th>
                </tr>
                <tr>
                    <th>Ввод</th>
                    <th>Вывод</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">1</th>
                    <th class="blue_line">Собственный парк</th>
                    <template v-for="data in dataFormation">
                        <th class="blue_line" :key="data.id" >{{ data.own?.total }}</th>
                <tr>
                    <th class="blue_line">{{ data.own?.total_in }}</th>
                    <th class="blue_line">{{ data.own?.total_out }}</th>
                </tr>
                </template>

                </tr>
                <tr>
                    <th class="number widthFirst">2</th>
                    <th> Полувагоны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id" >{{ data.own?.pv?.on_date }}</th>
                <tr>
                    <th>{{ data.own?.pv?.in }}</th>
                    <th>{{ data.own?.pv?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">3</th>
                    <th>Цистерны</th>
                    <template  v-for="data in dataFormation" >
                        <th :key="data.id" >{{ data.own?.cs?.on_date }}</th>
                    <tr>
                    <th>{{ data.own?.cs?.in }}</th>
                    <th>{{ data.own?.cs?.out }}</th>
                </tr>
                </template>
                   
                </tr>
                <tr>
                    <th class="number widthFirst"> 4</th>
                    <th style="font-style: italic;">в том числе</th>
                    <template  v-for="data in dataFormation">
                        <th :key="data.id">***</th>
                <tr>
                    <th>***</th>
                    <th>***</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">5</th>
                    <th>Парк в лизинге</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.lease?.total }}</th>
                <tr>
                    <th>{{ data?.lease?.total_in }}</th>
                    <th>{{ data?.lease?.total_out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst"> 6</th>
                    <th>Полувагоны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.lease?.pv?.on_date }}</th>
                <tr>
                    <th>{{ data?.lease?.pv?.in }}</th>
                    <th>{{ data?.lease?.pv?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst"> 7</th>
                    <th> Цистерны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.lease?.cs?.on_date }}</th>
                <tr>
                    <th>{{ data?.lease?.cs?.in }}</th>
                    <th>{{ data?.lease?.cs?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">8</th>
                    <th>Арендованный парк</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.rent?.total }}</th>
                <tr>
                    <th>{{ data?.rent?.total_in }}</th>
                    <th>{{ data?.rent?.total_out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">9</th>
                    <th>Полувагоны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.rent?.pv?.on_date }}</th>
                <tr>
                    <th>{{ data?.rent?.pv?.in }}</th>
                    <th>{{ data?.rent?.pv?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">10</th>
                    <th>Цистерны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.rent?.cs?.on_date }}</th>
                <tr>
                    <th>{{ data?.rent?.cs?.in }}</th>
                    <th>{{ data?.rent?.cs?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">11</th>
                    <th class="blue_line">Привлеченный парк</th>
                    <template v-for="data in dataFormation">
                        <th class="blue_line" :key="data.id">{{ data?.attracted?.total }}</th>
                <tr>
                    <th class="blue_line">{{ data?.attracted?.total_in }}</th>
                    <th class="blue_line">{{ data?.attracted?.total_out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">12</th>
                    <th>Полувагоны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.attracted?.pv?.on_date }}</th>
                <tr>
                    <th>{{ data?.attracted?.pv?.in }}</th>
                    <th>{{ data?.attracted?.pv?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">13</th>
                    <th>Цистерны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.attracted?.cs?.on_date }}</th>
                <tr>
                    <th>{{ data?.attracted?.cs?.in }}</th>
                    <th>{{ data?.attracted?.cs?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">14</th>
                    <th style="font-weight: bold !important;">Всего ПС</th>
                    <template v-for="data in dataFormation">
                        <th  :key="data.id">{{ data?.total?.total }}</th>
                <tr>
                    <th >{{ data?.total?.total_in }}</th>
                    <th >{{ data?.total?.total_out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">15</th>
                    <th>Полувагоны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.total?.pv?.on_date }}</th>
                <tr>
                    <th>{{ data?.total?.pv?.in }}</th>
                    <th>{{ data?.total?.pv?.out }}</th>
                </tr>
                </template>
                </tr>
                <tr>
                    <th class="number widthFirst">16</th>
                    <th>Цистерны</th>
                    <template v-for="data in dataFormation">
                        <th :key="data.id">{{ data?.total?.cs?.on_date }}</th>
                <tr>
                    <th>{{ data?.total?.cs?.in }}</th>
                    <th>{{ data?.total?.cs?.out }}</th>
                </tr>
                </template>

                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formation_park_data: true,
            index_font_size: '1%',
            dataFormation: {
    "2023-01-01": {
        "own": {
            "pv": {
                "on_date": 13755,
                "in": 429,
                "out": 336
            },
            "cs": {
                "on_date": 623,
                "in": 263,
                "out": 675
            },
            "total": 14378,
            "total_in": 692,
            "total_out": 1011
        },
        "lease": {
            "pv": {
                "on_date": 0,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 157,
                "in": 0,
                "out": 0
            },
            "total": 157,
            "total_in": 0,
            "total_out": 0
        },
        "rent": {
            "pv": {
                "on_date": 3424,
                "in": 4,
                "out": 298
            },
            "cs": {
                "on_date": 13102,
                "in": 64,
                "out": 1
            },
            "total": 16526,
            "total_in": 68,
            "total_out": 299
        },
        "attracted": {
            "pv": {
                "on_date": -1548,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -9016,
                "in": 444,
                "out": 641
            },
            "total": -10564,
            "total_in": 444,
            "total_out": 641
        },
        "total": {
            "pv": {
                "on_date": 15631,
                "in": 433,
                "out": 634
            },
            "cs": {
                "on_date": 4866,
                "in": 771,
                "out": 1317
            },
            "total": 20497,
            "total_in": 1204,
            "total_out": 1951
        }
    },
    "2023-02-01": {
        "own": {
            "pv": {
                "on_date": 13848,
                "in": 3193,
                "out": 1504
            },
            "cs": {
                "on_date": 210,
                "in": 182,
                "out": 395
            },
            "total": 14058,
            "total_in": 3375,
            "total_out": 1899
        },
        "lease": {
            "pv": {
                "on_date": 0,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 157,
                "in": 0,
                "out": 0
            },
            "total": 157,
            "total_in": 0,
            "total_out": 0
        },
        "rent": {
            "pv": {
                "on_date": 3130,
                "in": 120,
                "out": 1284
            },
            "cs": {
                "on_date": 13165,
                "in": 12,
                "out": 1
            },
            "total": 16295,
            "total_in": 132,
            "total_out": 1285
        },
        "attracted": {
            "pv": {
                "on_date": -1548,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -9213,
                "in": 180,
                "out": 393
            },
            "total": -10761,
            "total_in": 180,
            "total_out": 393
        },
        "total": {
            "pv": {
                "on_date": 15430,
                "in": 3313,
                "out": 2788
            },
            "cs": {
                "on_date": 4319,
                "in": 374,
                "out": 789
            },
            "total": 19749,
            "total_in": 3687,
            "total_out": 3577
        }
    },
    "2023-03-01": {
        "own": {
            "pv": {
                "on_date": 15537,
                "in": 2768,
                "out": 373
            },
            "cs": {
                "on_date": -4,
                "in": 1370,
                "out": 257
            },
            "total": 15533,
            "total_in": 4138,
            "total_out": 630
        },
        "lease": {
            "pv": {
                "on_date": 0,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 157,
                "in": 0,
                "out": 0
            },
            "total": 157,
            "total_in": 0,
            "total_out": 0
        },
        "rent": {
            "pv": {
                "on_date": 1966,
                "in": 477,
                "out": 0
            },
            "cs": {
                "on_date": 13176,
                "in": 0,
                "out": 1
            },
            "total": 15142,
            "total_in": 477,
            "total_out": 1
        },
        "attracted": {
            "pv": {
                "on_date": -1548,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -9428,
                "in": 374,
                "out": 231
            },
            "total": -10976,
            "total_in": 374,
            "total_out": 231
        },
        "total": {
            "pv": {
                "on_date": 15955,
                "in": 3245,
                "out": 373
            },
            "cs": {
                "on_date": 3901,
                "in": 1744,
                "out": 489
            },
            "total": 19856,
            "total_in": 4989,
            "total_out": 862
        }
    },
    "2023-04-01": {
        "own": {
            "pv": {
                "on_date": 17932,
                "in": 578,
                "out": 86
            },
            "cs": {
                "on_date": 1106,
                "in": 257,
                "out": 210
            },
            "total": 19038,
            "total_in": 835,
            "total_out": 296
        },
        "lease": {
            "pv": {
                "on_date": 0,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 157,
                "in": 0,
                "out": 0
            },
            "total": 157,
            "total_in": 0,
            "total_out": 0
        },
        "rent": {
            "pv": {
                "on_date": 2443,
                "in": 203,
                "out": 0
            },
            "cs": {
                "on_date": 13175,
                "in": 0,
                "out": 4
            },
            "total": 15618,
            "total_in": 203,
            "total_out": 4
        },
        "attracted": {
            "pv": {
                "on_date": -1548,
                "in": 12,
                "out": 0
            },
            "cs": {
                "on_date": -9287,
                "in": 435,
                "out": 206
            },
            "total": -10835,
            "total_in": 447,
            "total_out": 206
        },
        "total": {
            "pv": {
                "on_date": 18827,
                "in": 793,
                "out": 86
            },
            "cs": {
                "on_date": 5151,
                "in": 692,
                "out": 420
            },
            "total": 23978,
            "total_in": 1485,
            "total_out": 506
        }
    },
    "2023-05-01": {
        "own": {
            "pv": {
                "on_date": 18424,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 1152,
                "in": 45,
                "out": 141
            },
            "total": 19576,
            "total_in": 45,
            "total_out": 189
        },
        "lease": {
            "pv": {
                "on_date": 0,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 157,
                "in": 0,
                "out": 0
            },
            "total": 157,
            "total_in": 0,
            "total_out": 0
        },
        "rent": {
            "pv": {
                "on_date": 2646,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 13171,
                "in": 0,
                "out": 14
            },
            "total": 15817,
            "total_in": 0,
            "total_out": 14
        },
        "attracted": {
            "pv": {
                "on_date": -1535,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -9057,
                "in": 120,
                "out": 119
            },
            "total": -10592,
            "total_in": 120,
            "total_out": 119
        },
        "total": {
            "pv": {
                "on_date": 19535,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 5423,
                "in": 165,
                "out": 274
            },
            "total": 24958,
            "total_in": 165,
            "total_out": 322
        }
    }
}      }
    },
    filters: {
        GetNameMounth(value){
            let date = new Date(value)
            let monthName = date.toLocaleString('default', { month: 'long' }).slice(0,3)
            let getYear = date.getFullYear()
            return `${monthName}. ${getYear}`
        }
    }
}
</script>

<style scoped>
tr:nth-child(1) {
    background: rgb(255, 255, 255);
}

.number {
    background: #B6DF89;
    color: #41766F;
    width: calc(v-bind('index_font_size') * 5)
}

.blue_line {
    background: #DAEEF3;
}

th {
    font-weight: 400 !important;
}

.widthFirst {
    width: calc(v-bind('index_font_size') * 8)
}
</style>