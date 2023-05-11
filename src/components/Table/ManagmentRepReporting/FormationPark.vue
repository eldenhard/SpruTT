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
                "on_date": 18352,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 2355,
                "in": 45,
                "out": 141
            },
            "total": 20707,
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
                "on_date": 2589,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 12441,
                "in": 0,
                "out": 14
            },
            "total": 15030,
            "total_in": 0,
            "total_out": 14
        },
        "attracted": {
            "pv": {
                "on_date": -1487,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -8410,
                "in": 120,
                "out": 119
            },
            "total": -9897,
            "total_in": 120,
            "total_out": 119
        },
        "total": {
            "pv": {
                "on_date": 19454,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 6543,
                "in": 165,
                "out": 274
            },
            "total": 25997,
            "total_in": 165,
            "total_out": 322
        }
    },
    "2023-02-01": {
        "own": {
            "pv": {
                "on_date": 18352,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 2355,
                "in": 45,
                "out": 141
            },
            "total": 20707,
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
                "on_date": 2589,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 12441,
                "in": 0,
                "out": 14
            },
            "total": 15030,
            "total_in": 0,
            "total_out": 14
        },
        "attracted": {
            "pv": {
                "on_date": -1487,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -8410,
                "in": 120,
                "out": 119
            },
            "total": -9897,
            "total_in": 120,
            "total_out": 119
        },
        "total": {
            "pv": {
                "on_date": 19454,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 6543,
                "in": 165,
                "out": 274
            },
            "total": 25997,
            "total_in": 165,
            "total_out": 322
        }
    },
    "2023-03-01": {
        "own": {
            "pv": {
                "on_date": 18352,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 2355,
                "in": 45,
                "out": 141
            },
            "total": 20707,
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
                "on_date": 2589,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 12441,
                "in": 0,
                "out": 14
            },
            "total": 15030,
            "total_in": 0,
            "total_out": 14
        },
        "attracted": {
            "pv": {
                "on_date": -1487,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -8410,
                "in": 120,
                "out": 119
            },
            "total": -9897,
            "total_in": 120,
            "total_out": 119
        },
        "total": {
            "pv": {
                "on_date": 19454,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 6543,
                "in": 165,
                "out": 274
            },
            "total": 25997,
            "total_in": 165,
            "total_out": 322
        }
    },
    "2023-04-01": {
        "own": {
            "pv": {
                "on_date": 18352,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 2355,
                "in": 45,
                "out": 141
            },
            "total": 20707,
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
                "on_date": 2589,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 12441,
                "in": 0,
                "out": 14
            },
            "total": 15030,
            "total_in": 0,
            "total_out": 14
        },
        "attracted": {
            "pv": {
                "on_date": -1487,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -8410,
                "in": 120,
                "out": 119
            },
            "total": -9897,
            "total_in": 120,
            "total_out": 119
        },
        "total": {
            "pv": {
                "on_date": 19454,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 6543,
                "in": 165,
                "out": 274
            },
            "total": 25997,
            "total_in": 165,
            "total_out": 322
        }
    },
    "2023-05-01": {
        "own": {
            "pv": {
                "on_date": 18352,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 2355,
                "in": 45,
                "out": 141
            },
            "total": 20707,
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
                "on_date": 2589,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": 12441,
                "in": 0,
                "out": 14
            },
            "total": 15030,
            "total_in": 0,
            "total_out": 14
        },
        "attracted": {
            "pv": {
                "on_date": -1487,
                "in": 0,
                "out": 0
            },
            "cs": {
                "on_date": -8410,
                "in": 120,
                "out": 119
            },
            "total": -9897,
            "total_in": 120,
            "total_out": 119
        },
        "total": {
            "pv": {
                "on_date": 19454,
                "in": 0,
                "out": 48
            },
            "cs": {
                "on_date": 6543,
                "in": 165,
                "out": 274
            },
            "total": 25997,
            "total_in": 165,
            "total_out": 322
        }
    },

    
}
        }
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