<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">
            <div class="air_block_header" >
          <h5>План погрузки</h5>
          <hr />
        </div>
           
                <div class="date_block">
                    <div class="ToGOBlock">
                        <label for="">Начало периода <br>
                                <input type="month" v-model="begin" placeholder="Наименование станции "/>
                        </label>

                        <label for="">Конец периода <br>
                                <input type="month" v-model="end" placeholder="Наименование станции " />
                        </label>
                    </div>
                
                </div>
            <button @click="dowloadData()" class="Accept" style="width: 20vw; margin-top: 4%; margin-left: auto;">Запросить</button>
        </div>
        {{ objLoading }}
    </div>
</template>

<script>
import api from "@/api/directory";
import Loader from '@/components/loader/loader.vue';
export default {
    components: {Loader},
    data() {
        return {
            loader: false,
            begin: "",
            end: "",
            // month_begin: "",
            // year_begin: "",
            // month_end: "",
            // year_end: "",
            objLoading: {
                "Уголь-Транс": {
                    "2023": {
                        "1": {
                            "weight": 621,
                            "wagons_amount": 9,
                            "fact_weight": 1939.8,
                            "fact_wagons": 28,
                            "tone_per_wagon": [
                                69.01666666666667,
                                69.01666666666667,
                                69.01666666666667,
                                70.60000000000001,
                                69.08333333333333,
                                69.08333333333333,
                                69.08333333333333,
                                69.08333333333333,
                                69.08333333333333
                            ],
                            "complete_weight": -1318.8,
                            "complete_weight_rel": [
                                3,
                                3,
                                3,
                                4.09,
                                3,
                                3,
                                3,
                                3,
                                3
                            ],
                            "complete_wagons": -19,
                            "complete_wagons_rel": [
                                3,
                                3,
                                3,
                                4,
                                3,
                                3,
                                3,
                                3,
                                3
                            ]
                        },
                        "2": {
                            "weight": 897,
                            "wagons_amount": 13,
                            "fact_weight": 8245.300000000001,
                            "fact_wagons": 118,
                            "tone_per_wagon": [
                                0,
                                0,
                                69.575,
                                69.3,
                                0,
                                69.89642857142857,
                                69.89642857142857,
                                69.89642857142857,
                                69.89642857142857,
                                69.89642857142857,
                                69.89642857142857,
                                69.89642857142857,
                                69.89642857142857
                            ],
                            "complete_weight": -7348.300000000001,
                            "complete_weight_rel": [
                                0,
                                0,
                                4.03,
                                2.01,
                                0,
                                14.18,
                                14.18,
                                14.18,
                                14.18,
                                14.18,
                                14.18,
                                14.18,
                                14.18
                            ],
                            "complete_wagons": -105,
                            "complete_wagons_rel": [
                                0,
                                0,
                                4,
                                2,
                                0,
                                14,
                                14,
                                14,
                                14,
                                14,
                                14,
                                14,
                                14
                            ]
                        },
                        "weight": 1518,
                        "wagons_amount": 22,
                        "fact_weight": 10185.099999999999,
                        "fact_wagons": 146,
                        "tone_per_wagon": [
                            69.01666666666667,
                            69.01666666666667,
                            69.01666666666667,
                            70.60000000000001,
                            69.08333333333333,
                            69.08333333333333,
                            69.08333333333333,
                            69.08333333333333,
                            69.08333333333333,
                            0,
                            0,
                            69.575,
                            69.3,
                            0,
                            69.89642857142857,
                            69.89642857142857,
                            69.89642857142857,
                            69.89642857142857,
                            69.89642857142857,
                            69.89642857142857,
                            69.89642857142857,
                            69.89642857142857
                        ],
                        "complete_weight": -8667.1,
                        "complete_weight_rel": [
                            3,
                            3,
                            3,
                            4.09,
                            3,
                            3,
                            3,
                            3,
                            3,
                            0,
                            0,
                            4.03,
                            2.01,
                            0,
                            14.18,
                            14.18,
                            14.18,
                            14.18,
                            14.18,
                            14.18,
                            14.18,
                            14.18
                        ],
                        "complete_wagons": -124,
                        "complete_wagons_rel": [
                            3,
                            3,
                            3,
                            4,
                            3,
                            3,
                            3,
                            3,
                            3,
                            0,
                            0,
                            4,
                            2,
                            0,
                            14,
                            14,
                            14,
                            14,
                            14,
                            14,
                            14,
                            14
                        ]
                    },
                    "weight": 1518,
                    "wagons_amount": 22,
                    "fact_weight": 10185.099999999999,
                    "fact_wagons": 146,
                    "tone_per_wagon": [
                        69.01666666666667,
                        69.01666666666667,
                        69.01666666666667,
                        70.60000000000001,
                        69.08333333333333,
                        69.08333333333333,
                        69.08333333333333,
                        69.08333333333333,
                        69.08333333333333,
                        0,
                        0,
                        69.575,
                        69.3,
                        0,
                        69.89642857142857,
                        69.89642857142857,
                        69.89642857142857,
                        69.89642857142857,
                        69.89642857142857,
                        69.89642857142857,
                        69.89642857142857,
                        69.89642857142857
                    ],
                    "complete_weight": -8667.1,
                    "complete_weight_rel": [
                        3,
                        3,
                        3,
                        4.09,
                        3,
                        3,
                        3,
                        3,
                        3,
                        0,
                        0,
                        4.03,
                        2.01,
                        0,
                        14.18,
                        14.18,
                        14.18,
                        14.18,
                        14.18,
                        14.18,
                        14.18,
                        14.18
                    ],
                    "complete_wagons": -124,
                    "complete_wagons_rel": [
                        3,
                        3,
                        3,
                        4,
                        3,
                        3,
                        3,
                        3,
                        3,
                        0,
                        0,
                        4,
                        2,
                        0,
                        14,
                        14,
                        14,
                        14,
                        14,
                        14,
                        14,
                        14
                    ]
                },
                "weight": 1484000,
                "wagons_amount": 23354,
                "fact_weight": 111632.38500000001,
                "fact_wagons": 1722,
                "tone_per_wagon": [
                    69.01666666666667,
                    69.01666666666667,
                    69.01666666666667,
                    64.67942857142857,
                    0,
                    0,
                    56,
                    62.94745714285716,
                    0,
                    56.85,
                    0,
                    61.279965517241386,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    65.10672727272726,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    70.60000000000001,
                    69.29594594594595,
                    0,
                    65.39889873417721,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    70.25657894736838,
                    70.25657894736838,
                    0,
                    0,
                    0,
                    0,
                    70.25657894736838,
                    69.08333333333333,
                    69.08333333333333,
                    69.08333333333333,
                    69.08333333333333,
                    69.08333333333333,
                    59.135463414634145,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    60.3005,
                    54.52909090909091,
                    54.52909090909091,
                    0,
                    0,
                    0,
                    57.12447058823528,
                    0,
                    0,
                    0,
                    54.49615384615384,
                    54.49615384615384,
                    60.81766666666667,
                    61.12,
                    61.12,
                    59.45,
                    0,
                    65.93333333333334,
                    68.52499999999999,
                    0,
                    69.92500000000001,
                    0,
                    0,
                    0,
                    0,
                    0,
                    40.099999999999994,
                    40.099999999999994,
                    0,
                    0,
                    69.575,
                    0,
                    0,
                    0,
                    0,
                    69.35,
                    0,
                    69.36666666666667,
                    0,
                    0,
                    69.3,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    69.87692307692306,
                    69.87692307692306,
                    70.9,
                    68.39999999999999,
                    0,
                    0,
                    69.140625,
                    69.140625,
                    69.140625,
                    69.89642857142857,
                    69.89642857142857,
                    69.89642857142857,
                    69.89642857142857,
                    69.89642857142857,
                    69.89642857142857,
                    69.89642857142857,
                    69.89642857142857,
                    62.591,
                    0,
                    0,
                    0,
                    0,
                    68.85,
                    0,
                    0,
                    69.9,
                    0,
                    69.74166666666663,
                    0,
                    63.675477272727285,
                    64.36164285714287,
                    64.36164285714287,
                    0,
                    62.608076923076915,
                    0,
                    65.32683018867922,
                    65.29548514851483,
                    65.32683018867922,
                    0,
                    0,
                    0,
                    64.1113,
                    61.61566666666667,
                    65.4198947368421,
                    65.44647142857143,
                    66.498,
                    0,
                    0,
                    0
                ],
                "complete_weight": 1372367.614999999,
                "complete_weight_rel": [
                    3,
                    3,
                    3,
                    13.12,
                    0,
                    0,
                    0.93,
                    2.16,
                    0,
                    0.03,
                    0,
                    0.03,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    4.09,
                    3.72,
                    0,
                    0.06,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1.65,
                    2.58,
                    0,
                    0,
                    0,
                    0,
                    0.43,
                    3,
                    3,
                    3,
                    3,
                    3,
                    1.62,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0.22,
                    0.01,
                    0.17,
                    0,
                    0,
                    0,
                    2.79,
                    0,
                    0,
                    0,
                    25.76,
                    0.4,
                    0.05,
                    6.62,
                    6.62,
                    0.06,
                    0,
                    0.04,
                    0.85,
                    0,
                    0.03,
                    0,
                    0,
                    0,
                    0,
                    0,
                    2.32,
                    2.32,
                    0,
                    0,
                    4.03,
                    0,
                    0,
                    0,
                    0,
                    2.01,
                    0,
                    0.01,
                    0,
                    0,
                    2.01,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0.26,
                    0.26,
                    5.14,
                    0.06,
                    0,
                    0,
                    16.03,
                    16.03,
                    16.03,
                    14.18,
                    14.18,
                    14.18,
                    14.18,
                    14.18,
                    14.18,
                    14.18,
                    14.18,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0.06,
                    100,
                    0,
                    100,
                    0,
                    24.26,
                    0,
                    40.6,
                    0.18,
                    0.18,
                    0,
                    0.01,
                    0,
                    0.69,
                    1.32,
                    3.46,
                    0,
                    0,
                    0,
                    0.02,
                    0.07,
                    0.5,
                    0.73,
                    0.1,
                    0,
                    0,
                    0
                ],
                "complete_wagons": 21632,
                "complete_wagons_rel": [
                    3,
                    3,
                    3,
                    14,
                    0,
                    0,
                    1,
                    2,
                    0,
                    0.03,
                    0,
                    0.03,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    4,
                    3.7,
                    0,
                    0.06,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1.62,
                    2.53,
                    0,
                    0,
                    0,
                    0,
                    0.42,
                    3,
                    3,
                    3,
                    3,
                    3,
                    1.64,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0.22,
                    0.01,
                    0.16,
                    0,
                    0,
                    0,
                    2.83,
                    0,
                    0,
                    0,
                    26,
                    0.42,
                    0.04,
                    6.5,
                    6.5,
                    0.05,
                    0,
                    0.04,
                    0.86,
                    0,
                    0.03,
                    0,
                    0,
                    0,
                    0,
                    0,
                    4,
                    4,
                    0,
                    0,
                    4,
                    0,
                    0,
                    0,
                    0,
                    2,
                    0,
                    0.01,
                    0,
                    0,
                    2,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0.26,
                    0.26,
                    5,
                    0.06,
                    0,
                    0,
                    16,
                    16,
                    16,
                    14,
                    14,
                    14,
                    14,
                    14,
                    14,
                    14,
                    14,
                    0.01,
                    0,
                    0,
                    0,
                    0,
                    0.06,
                    0,
                    0,
                    3,
                    0,
                    24,
                    0,
                    44,
                    0.17,
                    0.17,
                    0,
                    0.01,
                    0,
                    0.66,
                    1.26,
                    3.31,
                    0,
                    0,
                    0,
                    0.02,
                    0.07,
                    0.47,
                    0.7,
                    0.09,
                    0,
                    0,
                    0
                ],
                "ТАТНЕФТЬ-ТРАНС, ООО": {
                    "2023": {
                        "1": {
                            "weight": 340109,
                            "wagons_amount": 5516,
                            "fact_weight": 17586.823,
                            "fact_wagons": 279,
                            "tone_per_wagon": [
                                64.67942857142857,
                                62.94745714285716,
                                61.279965517241386,
                                65.39889873417721
                            ],
                            "complete_weight": 322522.177,
                            "complete_weight_rel": [
                                13.12,
                                2.16,
                                0.03,
                                0.06
                            ],
                            "complete_wagons": 5237,
                            "complete_wagons_rel": [
                                14,
                                2,
                                0.03,
                                0.06
                            ]
                        },
                        "2": {
                            "weight": 330069,
                            "wagons_amount": 5232,
                            "fact_weight": 3893.4410000000003,
                            "fact_wagons": 61,
                            "tone_per_wagon": [
                                65.10672727272726,
                                62.591,
                                63.675477272727285
                            ],
                            "complete_weight": 326175.559,
                            "complete_weight_rel": [
                                0,
                                0,
                                40.6
                            ],
                            "complete_wagons": 5171,
                            "complete_wagons_rel": [
                                0,
                                0.01,
                                44
                            ]
                        },
                        "weight": 670178,
                        "wagons_amount": 10748,
                        "fact_weight": 21480.264,
                        "fact_wagons": 340,
                        "tone_per_wagon": [
                            64.67942857142857,
                            62.94745714285716,
                            61.279965517241386,
                            65.10672727272726,
                            65.39889873417721,
                            62.591,
                            63.675477272727285
                        ],
                        "complete_weight": 648697.736,
                        "complete_weight_rel": [
                            13.12,
                            2.16,
                            0.03,
                            0,
                            0.06,
                            0,
                            40.6
                        ],
                        "complete_wagons": 10408,
                        "complete_wagons_rel": [
                            14,
                            2,
                            0.03,
                            0,
                            0.06,
                            0.01,
                            44
                        ]
                    },
                    "weight": 670178,
                    "wagons_amount": 10748,
                    "fact_weight": 21480.264,
                    "fact_wagons": 340,
                    "tone_per_wagon": [
                        64.67942857142857,
                        62.94745714285716,
                        61.279965517241386,
                        65.10672727272726,
                        65.39889873417721,
                        62.591,
                        63.675477272727285
                    ],
                    "complete_weight": 648697.736,
                    "complete_weight_rel": [
                        13.12,
                        2.16,
                        0.03,
                        0,
                        0.06,
                        0,
                        40.6
                    ],
                    "complete_wagons": 10408,
                    "complete_wagons_rel": [
                        14,
                        2,
                        0.03,
                        0,
                        0.06,
                        0.01,
                        44
                    ]
                },
                "ДублТранс": {
                    "2023": {
                        "1": {
                            "weight": 690,
                            "wagons_amount": 10,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 690,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 10,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 2070,
                            "wagons_amount": 30,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 2070,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 30,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 2760,
                        "wagons_amount": 40,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 2760,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 40,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 2760,
                    "wagons_amount": 40,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 2760,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 40,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "УК Южный Альянс": {
                    "2023": {
                        "1": {
                            "weight": 5520,
                            "wagons_amount": 80,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0
                            ],
                            "complete_weight": 5520,
                            "complete_weight_rel": [
                                0,
                                0
                            ],
                            "complete_wagons": 80,
                            "complete_wagons_rel": [
                                0,
                                0
                            ]
                        },
                        "2": {
                            "weight": 4416,
                            "wagons_amount": 64,
                            "fact_weight": 1027.4999999999998,
                            "fact_wagons": 15,
                            "tone_per_wagon": [
                                68.52499999999999,
                                68.39999999999999
                            ],
                            "complete_weight": 3388.5000000000005,
                            "complete_weight_rel": [
                                0.85,
                                0.06
                            ],
                            "complete_wagons": 49,
                            "complete_wagons_rel": [
                                0.86,
                                0.06
                            ]
                        },
                        "weight": 9936,
                        "wagons_amount": 144,
                        "fact_weight": 1027.4999999999998,
                        "fact_wagons": 15,
                        "tone_per_wagon": [
                            0,
                            68.52499999999999,
                            68.39999999999999,
                            0
                        ],
                        "complete_weight": 8908.5,
                        "complete_weight_rel": [
                            0,
                            0.85,
                            0.06,
                            0
                        ],
                        "complete_wagons": 129,
                        "complete_wagons_rel": [
                            0,
                            0.86,
                            0.06,
                            0
                        ]
                    },
                    "weight": 9936,
                    "wagons_amount": 144,
                    "fact_weight": 1027.4999999999998,
                    "fact_wagons": 15,
                    "tone_per_wagon": [
                        0,
                        68.52499999999999,
                        68.39999999999999,
                        0
                    ],
                    "complete_weight": 8908.5,
                    "complete_weight_rel": [
                        0,
                        0.85,
                        0.06,
                        0
                    ],
                    "complete_wagons": 129,
                    "complete_wagons_rel": [
                        0,
                        0.86,
                        0.06,
                        0
                    ]
                },
                "РЕСУРС ТРАНС, ООО": {
                    "2023": {
                        "1": {
                            "weight": 5060,
                            "wagons_amount": 86,
                            "fact_weight": 4961.9580000000005,
                            "fact_wagons": 84,
                            "tone_per_wagon": [
                                56,
                                56.85,
                                59.135463414634145
                            ],
                            "complete_weight": 98.04199999999992,
                            "complete_weight_rel": [
                                0.93,
                                0.03,
                                1.62
                            ],
                            "complete_wagons": 2,
                            "complete_wagons_rel": [
                                1,
                                0.03,
                                1.64
                            ]
                        },
                        "2": {
                            "weight": 1378,
                            "wagons_amount": 23,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_weight": 1378,
                            "complete_weight_rel": [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_wagons": 23,
                            "complete_wagons_rel": [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0
                            ]
                        },
                        "weight": 6438,
                        "wagons_amount": 109,
                        "fact_weight": 4961.9580000000005,
                        "fact_wagons": 84,
                        "tone_per_wagon": [
                            56,
                            56.85,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            59.135463414634145
                        ],
                        "complete_weight": 1476.042,
                        "complete_weight_rel": [
                            0.93,
                            0.03,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1.62
                        ],
                        "complete_wagons": 25,
                        "complete_wagons_rel": [
                            1,
                            0.03,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1.64
                        ]
                    },
                    "weight": 6438,
                    "wagons_amount": 109,
                    "fact_weight": 4961.9580000000005,
                    "fact_wagons": 84,
                    "tone_per_wagon": [
                        56,
                        56.85,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        59.135463414634145
                    ],
                    "complete_weight": 1476.042,
                    "complete_weight_rel": [
                        0.93,
                        0.03,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1.62
                    ],
                    "complete_wagons": 25,
                    "complete_wagons_rel": [
                        1,
                        0.03,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1.64
                    ]
                },
                "Энергоресурсы": {
                    "2023": {
                        "1": {
                            "weight": 180,
                            "wagons_amount": 3,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 180,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 3,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 3500,
                            "wagons_amount": 58,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0
                            ],
                            "complete_weight": 3500,
                            "complete_weight_rel": [
                                0,
                                0
                            ],
                            "complete_wagons": 58,
                            "complete_wagons_rel": [
                                0,
                                0
                            ]
                        },
                        "weight": 3680,
                        "wagons_amount": 61,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0,
                            0
                        ],
                        "complete_weight": 3680,
                        "complete_weight_rel": [
                            0,
                            0,
                            0
                        ],
                        "complete_wagons": 61,
                        "complete_wagons_rel": [
                            0,
                            0,
                            0
                        ]
                    },
                    "weight": 3680,
                    "wagons_amount": 61,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0,
                        0
                    ],
                    "complete_weight": 3680,
                    "complete_weight_rel": [
                        0,
                        0,
                        0
                    ],
                    "complete_wagons": 61,
                    "complete_wagons_rel": [
                        0,
                        0,
                        0
                    ]
                },
                "АУРА": {
                    "2023": {
                        "1": {
                            "weight": 350,
                            "wagons_amount": 6,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0
                            ],
                            "complete_weight": 350,
                            "complete_weight_rel": [
                                0,
                                0
                            ],
                            "complete_wagons": 6,
                            "complete_wagons_rel": [
                                0,
                                0
                            ]
                        },
                        "weight": 350,
                        "wagons_amount": 6,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 350,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 6,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 350,
                    "wagons_amount": 6,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 350,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 6,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "ПАО \"Газпром Нефть\"": {
                    "2023": {
                        "2": {
                            "weight": 25000,
                            "wagons_amount": 416,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 25000,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 416,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 25000,
                        "wagons_amount": 416,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 25000,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 416,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 25000,
                    "wagons_amount": 416,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 25000,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 416,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ВЕКТОР-ДВИЖЕНИЯ, ООО": {
                    "2023": {
                        "2": {
                            "weight": 130,
                            "wagons_amount": 2,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 130,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 2,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 130,
                        "wagons_amount": 2,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 130,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 2,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 130,
                    "wagons_amount": 2,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 130,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 2,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ООО \"ЗСТК\"": {
                    "2023": {
                        "2": {
                            "weight": 160,
                            "wagons_amount": 3,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 160,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 3,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 160,
                        "wagons_amount": 3,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 160,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 3,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 160,
                    "wagons_amount": 3,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 160,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 3,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
                    "2023": {
                        "1": {
                            "weight": 30843,
                            "wagons_amount": 447,
                            "fact_weight": 18582.44999999999,
                            "fact_wagons": 265,
                            "tone_per_wagon": [
                                0,
                                69.29594594594595,
                                0,
                                70.25657894736838,
                                70.25657894736838,
                                70.25657894736838
                            ],
                            "complete_weight": 12260.550000000008,
                            "complete_weight_rel": [
                                0,
                                3.72,
                                0,
                                1.65,
                                2.58,
                                0.43
                            ],
                            "complete_wagons": 182,
                            "complete_wagons_rel": [
                                0,
                                3.7,
                                0,
                                1.62,
                                2.53,
                                0.42
                            ]
                        },
                        "2": {
                            "weight": 18423,
                            "wagons_amount": 267,
                            "fact_weight": 3387.6,
                            "fact_wagons": 49,
                            "tone_per_wagon": [
                                0,
                                0,
                                0,
                                69.140625,
                                69.140625,
                                69.140625,
                                68.85
                            ],
                            "complete_weight": 15035.4,
                            "complete_weight_rel": [
                                0,
                                0,
                                0,
                                16.03,
                                16.03,
                                16.03,
                                0.06
                            ],
                            "complete_wagons": 218,
                            "complete_wagons_rel": [
                                0,
                                0,
                                0,
                                16,
                                16,
                                16,
                                0.06
                            ]
                        },
                        "weight": 49266,
                        "wagons_amount": 714,
                        "fact_weight": 21970.04999999999,
                        "fact_wagons": 314,
                        "tone_per_wagon": [
                            0,
                            69.29594594594595,
                            0,
                            70.25657894736838,
                            70.25657894736838,
                            70.25657894736838,
                            0,
                            0,
                            0,
                            69.140625,
                            69.140625,
                            69.140625,
                            68.85
                        ],
                        "complete_weight": 27295.95000000001,
                        "complete_weight_rel": [
                            0,
                            3.72,
                            0,
                            1.65,
                            2.58,
                            0.43,
                            0,
                            0,
                            0,
                            16.03,
                            16.03,
                            16.03,
                            0.06
                        ],
                        "complete_wagons": 400,
                        "complete_wagons_rel": [
                            0,
                            3.7,
                            0,
                            1.62,
                            2.53,
                            0.42,
                            0,
                            0,
                            0,
                            16,
                            16,
                            16,
                            0.06
                        ]
                    },
                    "weight": 49266,
                    "wagons_amount": 714,
                    "fact_weight": 21970.04999999999,
                    "fact_wagons": 314,
                    "tone_per_wagon": [
                        0,
                        69.29594594594595,
                        0,
                        70.25657894736838,
                        70.25657894736838,
                        70.25657894736838,
                        0,
                        0,
                        0,
                        69.140625,
                        69.140625,
                        69.140625,
                        68.85
                    ],
                    "complete_weight": 27295.95000000001,
                    "complete_weight_rel": [
                        0,
                        3.72,
                        0,
                        1.65,
                        2.58,
                        0.43,
                        0,
                        0,
                        0,
                        16.03,
                        16.03,
                        16.03,
                        0.06
                    ],
                    "complete_wagons": 400,
                    "complete_wagons_rel": [
                        0,
                        3.7,
                        0,
                        1.62,
                        2.53,
                        0.42,
                        0,
                        0,
                        0,
                        16,
                        16,
                        16,
                        0.06
                    ]
                },
                "ДЛСГРУПП, ООО": {
                    "2023": {
                        "1": {
                            "weight": 1310,
                            "wagons_amount": 22,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 1310,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 22,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 1794,
                            "wagons_amount": 26,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 1794,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 26,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 3104,
                        "wagons_amount": 48,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 3104,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 48,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 3104,
                    "wagons_amount": 48,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 3104,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 48,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "ПУТ": {
                    "2023": {
                        "1": {
                            "weight": 138,
                            "wagons_amount": 2,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 138,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 2,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 138,
                        "wagons_amount": 2,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 138,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 2,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 138,
                    "wagons_amount": 2,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 138,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 2,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ЕВРОСИБ СПБ-ТС, АО": {
                    "2023": {
                        "1": {
                            "weight": 483,
                            "wagons_amount": 7,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 483,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 7,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 69,
                            "wagons_amount": 1,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 69,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 1,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 552,
                        "wagons_amount": 8,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 552,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 8,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 552,
                    "wagons_amount": 8,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 552,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 8,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "СИБТРЕЙД, ООО": {
                    "2023": {
                        "1": {
                            "weight": 9400,
                            "wagons_amount": 140,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 9400,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 140,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 9400,
                            "wagons_amount": 140,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 9400,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 140,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 18800,
                        "wagons_amount": 280,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 18800,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 280,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 18800,
                    "wagons_amount": 280,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 18800,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 280,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "РВК, ООО": {
                    "2023": {
                        "1": {
                            "weight": 14697,
                            "wagons_amount": 213,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0
                            ],
                            "complete_weight": 14697,
                            "complete_weight_rel": [
                                0,
                                0
                            ],
                            "complete_wagons": 213,
                            "complete_wagons_rel": [
                                0,
                                0
                            ]
                        },
                        "2": {
                            "weight": 10350,
                            "wagons_amount": 150,
                            "fact_weight": 1816.7999999999997,
                            "fact_wagons": 26,
                            "tone_per_wagon": [
                                69.87692307692306,
                                69.87692307692306,
                                0
                            ],
                            "complete_weight": 8533.2,
                            "complete_weight_rel": [
                                0.26,
                                0.26,
                                0
                            ],
                            "complete_wagons": 124,
                            "complete_wagons_rel": [
                                0.26,
                                0.26,
                                0
                            ]
                        },
                        "weight": 25047,
                        "wagons_amount": 363,
                        "fact_weight": 1816.7999999999997,
                        "fact_wagons": 26,
                        "tone_per_wagon": [
                            0,
                            0,
                            69.87692307692306,
                            69.87692307692306,
                            0
                        ],
                        "complete_weight": 23230.199999999997,
                        "complete_weight_rel": [
                            0,
                            0,
                            0.26,
                            0.26,
                            0
                        ],
                        "complete_wagons": 337,
                        "complete_wagons_rel": [
                            0,
                            0,
                            0.26,
                            0.26,
                            0
                        ]
                    },
                    "weight": 25047,
                    "wagons_amount": 363,
                    "fact_weight": 1816.7999999999997,
                    "fact_wagons": 26,
                    "tone_per_wagon": [
                        0,
                        0,
                        69.87692307692306,
                        69.87692307692306,
                        0
                    ],
                    "complete_weight": 23230.199999999997,
                    "complete_weight_rel": [
                        0,
                        0,
                        0.26,
                        0.26,
                        0
                    ],
                    "complete_wagons": 337,
                    "complete_wagons_rel": [
                        0,
                        0,
                        0.26,
                        0.26,
                        0
                    ]
                },
                "НОВАЯ ГОРНАЯ УК, ООО": {
                    "2023": {
                        "1": {
                            "weight": 23460,
                            "wagons_amount": 340,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 23460,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 340,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 37503,
                            "wagons_amount": 543,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_weight": 37503,
                            "complete_weight_rel": [
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_wagons": 543,
                            "complete_wagons_rel": [
                                0,
                                0,
                                0,
                                0
                            ]
                        },
                        "weight": 60963,
                        "wagons_amount": 883,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "complete_weight": 60963,
                        "complete_weight_rel": [
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "complete_wagons": 883,
                        "complete_wagons_rel": [
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    "weight": 60963,
                    "wagons_amount": 883,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "complete_weight": 60963,
                    "complete_weight_rel": [
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "complete_wagons": 883,
                    "complete_wagons_rel": [
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                "МТК, ООО": {
                    "2023": {
                        "1": {
                            "weight": 8970,
                            "wagons_amount": 130,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 8970,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 130,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 9400,
                            "wagons_amount": 130,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 9400,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 130,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 18370,
                        "wagons_amount": 260,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 18370,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 260,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 18370,
                    "wagons_amount": 260,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 18370,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 260,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "Мечел-Транс": {
                    "2023": {
                        "1": {
                            "weight": 15663,
                            "wagons_amount": 227,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0
                            ],
                            "complete_weight": 15663,
                            "complete_weight_rel": [
                                0,
                                0
                            ],
                            "complete_wagons": 227,
                            "complete_wagons_rel": [
                                0,
                                0
                            ]
                        },
                        "2": {
                            "weight": 42637,
                            "wagons_amount": 617,
                            "fact_weight": 139.85000000000002,
                            "fact_wagons": 2,
                            "tone_per_wagon": [
                                69.92500000000001,
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_weight": 42497.15,
                            "complete_weight_rel": [
                                0.03,
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_wagons": 615,
                            "complete_wagons_rel": [
                                0.03,
                                0,
                                0,
                                0,
                                0,
                                0
                            ]
                        },
                        "weight": 58300,
                        "wagons_amount": 844,
                        "fact_weight": 139.85000000000002,
                        "fact_wagons": 2,
                        "tone_per_wagon": [
                            0,
                            0,
                            69.92500000000001,
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "complete_weight": 58160.15,
                        "complete_weight_rel": [
                            0,
                            0,
                            0.03,
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "complete_wagons": 842,
                        "complete_wagons_rel": [
                            0,
                            0,
                            0.03,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    "weight": 58300,
                    "wagons_amount": 844,
                    "fact_weight": 139.85000000000002,
                    "fact_wagons": 2,
                    "tone_per_wagon": [
                        0,
                        0,
                        69.92500000000001,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "complete_weight": 58160.15,
                    "complete_weight_rel": [
                        0,
                        0,
                        0.03,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "complete_wagons": 842,
                    "complete_wagons_rel": [
                        0,
                        0,
                        0.03,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                "ПРОМУГОЛЬСЕРВИС, ООО": {
                    "2023": {
                        "1": {
                            "weight": 19753,
                            "wagons_amount": 282,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 19753,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 282,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 19753,
                            "wagons_amount": 282,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 19753,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 282,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 39506,
                        "wagons_amount": 564,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 39506,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 564,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 39506,
                    "wagons_amount": 564,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 39506,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 564,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "СДС-Уголь": {
                    "2023": {
                        "1": {
                            "weight": 15900,
                            "wagons_amount": 230,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 15900,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 230,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 15900,
                            "wagons_amount": 230,
                            "fact_weight": 208.10000000000002,
                            "fact_wagons": 3,
                            "tone_per_wagon": [
                                69.36666666666667
                            ],
                            "complete_weight": 15691.9,
                            "complete_weight_rel": [
                                0.01
                            ],
                            "complete_wagons": 227,
                            "complete_wagons_rel": [
                                0.01
                            ]
                        },
                        "weight": 31800,
                        "wagons_amount": 460,
                        "fact_weight": 208.10000000000002,
                        "fact_wagons": 3,
                        "tone_per_wagon": [
                            0,
                            69.36666666666667
                        ],
                        "complete_weight": 31591.9,
                        "complete_weight_rel": [
                            0,
                            0.01
                        ],
                        "complete_wagons": 457,
                        "complete_wagons_rel": [
                            0,
                            0.01
                        ]
                    },
                    "weight": 31800,
                    "wagons_amount": 460,
                    "fact_weight": 208.10000000000002,
                    "fact_wagons": 3,
                    "tone_per_wagon": [
                        0,
                        69.36666666666667
                    ],
                    "complete_weight": 31591.9,
                    "complete_weight_rel": [
                        0,
                        0.01
                    ],
                    "complete_wagons": 457,
                    "complete_wagons_rel": [
                        0,
                        0.01
                    ]
                },
                "Карбо-трейд": {
                    "2023": {
                        "1": {
                            "weight": 5069,
                            "wagons_amount": 74,
                            "fact_weight": 1673.7999999999993,
                            "fact_wagons": 24,
                            "tone_per_wagon": [
                                0,
                                69.74166666666663
                            ],
                            "complete_weight": 3395.2000000000007,
                            "complete_weight_rel": [
                                0,
                                24.26
                            ],
                            "complete_wagons": 50,
                            "complete_wagons_rel": [
                                0,
                                24
                            ]
                        },
                        "weight": 5069,
                        "wagons_amount": 74,
                        "fact_weight": 1673.7999999999993,
                        "fact_wagons": 24,
                        "tone_per_wagon": [
                            0,
                            69.74166666666663
                        ],
                        "complete_weight": 3395.2000000000007,
                        "complete_weight_rel": [
                            0,
                            24.26
                        ],
                        "complete_wagons": 50,
                        "complete_wagons_rel": [
                            0,
                            24
                        ]
                    },
                    "weight": 5069,
                    "wagons_amount": 74,
                    "fact_weight": 1673.7999999999993,
                    "fact_wagons": 24,
                    "tone_per_wagon": [
                        0,
                        69.74166666666663
                    ],
                    "complete_weight": 3395.2000000000007,
                    "complete_weight_rel": [
                        0,
                        24.26
                    ],
                    "complete_wagons": 50,
                    "complete_wagons_rel": [
                        0,
                        24
                    ]
                },
                "ППО": {
                    "2023": {
                        "2": {
                            "weight": 99232,
                            "wagons_amount": 1438,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0
                            ],
                            "complete_weight": 99232,
                            "complete_weight_rel": [
                                0,
                                0
                            ],
                            "complete_wagons": 1438,
                            "complete_wagons_rel": [
                                0,
                                0
                            ]
                        },
                        "weight": 99232,
                        "wagons_amount": 1438,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 99232,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 1438,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 99232,
                    "wagons_amount": 1438,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 99232,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 1438,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "ООО \"СОКАР РУС\"": {
                    "2023": {
                        "1": {
                            "weight": 2920,
                            "wagons_amount": 45,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_weight": 2920,
                            "complete_weight_rel": [
                                0,
                                0,
                                0,
                                0
                            ],
                            "complete_wagons": 45,
                            "complete_wagons_rel": [
                                0,
                                0,
                                0,
                                0
                            ]
                        },
                        "2": {
                            "weight": 3445,
                            "wagons_amount": 53,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0,
                                0
                            ],
                            "complete_weight": 3445,
                            "complete_weight_rel": [
                                0,
                                0,
                                0
                            ],
                            "complete_wagons": 53,
                            "complete_wagons_rel": [
                                0,
                                0,
                                0
                            ]
                        },
                        "weight": 6365,
                        "wagons_amount": 98,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "complete_weight": 6365,
                        "complete_weight_rel": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "complete_wagons": 98,
                        "complete_wagons_rel": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    "weight": 6365,
                    "wagons_amount": 98,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "complete_weight": 6365,
                    "complete_weight_rel": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "complete_wagons": 98,
                    "complete_wagons_rel": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                "ООО \"ПРОМЖДСЕРВИС\"": {
                    "2023": {
                        "2": {
                            "weight": 650,
                            "wagons_amount": 10,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 650,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 10,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 650,
                        "wagons_amount": 10,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 650,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 10,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 650,
                    "wagons_amount": 10,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 650,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 10,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ТОО \"CITITRANS\"": {
                    "2023": {
                        "2": {
                            "weight": 1400,
                            "wagons_amount": 23,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 1400,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 23,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 1400,
                        "wagons_amount": 23,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 1400,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 23,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 1400,
                    "wagons_amount": 23,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 1400,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 23,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ООО Татнефтехим": {
                    "2023": {
                        "2": {
                            "weight": 545,
                            "wagons_amount": 9,
                            "fact_weight": 120.601,
                            "fact_wagons": 2,
                            "tone_per_wagon": [
                                60.3005
                            ],
                            "complete_weight": 424.399,
                            "complete_weight_rel": [
                                0.22
                            ],
                            "complete_wagons": 7,
                            "complete_wagons_rel": [
                                0.22
                            ]
                        },
                        "weight": 545,
                        "wagons_amount": 9,
                        "fact_weight": 120.601,
                        "fact_wagons": 2,
                        "tone_per_wagon": [
                            60.3005
                        ],
                        "complete_weight": 424.399,
                        "complete_weight_rel": [
                            0.22
                        ],
                        "complete_wagons": 7,
                        "complete_wagons_rel": [
                            0.22
                        ]
                    },
                    "weight": 545,
                    "wagons_amount": 9,
                    "fact_weight": 120.601,
                    "fact_wagons": 2,
                    "tone_per_wagon": [
                        60.3005
                    ],
                    "complete_weight": 424.399,
                    "complete_weight_rel": [
                        0.22
                    ],
                    "complete_wagons": 7,
                    "complete_wagons_rel": [
                        0.22
                    ]
                },
                "НХТК": {
                    "2023": {
                        "1": {
                            "weight": 46535,
                            "wagons_amount": 886,
                            "fact_weight": 11162.479999999998,
                            "fact_wagons": 194,
                            "tone_per_wagon": [
                                57.12447058823528,
                                54.49615384615384,
                                54.49615384615384,
                                60.81766666666667,
                                61.12,
                                61.12,
                                59.45
                            ],
                            "complete_weight": 35372.52000000001,
                            "complete_weight_rel": [
                                2.79,
                                25.76,
                                0.4,
                                0.05,
                                6.62,
                                6.62,
                                0.06
                            ],
                            "complete_wagons": 692,
                            "complete_wagons_rel": [
                                2.83,
                                26,
                                0.42,
                                0.04,
                                6.5,
                                6.5,
                                0.05
                            ]
                        },
                        "2": {
                            "weight": 43500,
                            "wagons_amount": 839,
                            "fact_weight": 1199.64,
                            "fact_wagons": 22,
                            "tone_per_wagon": [
                                54.52909090909091,
                                54.52909090909091
                            ],
                            "complete_weight": 42300.36,
                            "complete_weight_rel": [
                                0.01,
                                0.17
                            ],
                            "complete_wagons": 817,
                            "complete_wagons_rel": [
                                0.01,
                                0.16
                            ]
                        },
                        "weight": 90035,
                        "wagons_amount": 1725,
                        "fact_weight": 12362.119999999999,
                        "fact_wagons": 216,
                        "tone_per_wagon": [
                            54.52909090909091,
                            54.52909090909091,
                            57.12447058823528,
                            54.49615384615384,
                            54.49615384615384,
                            60.81766666666667,
                            61.12,
                            61.12,
                            59.45
                        ],
                        "complete_weight": 77672.88,
                        "complete_weight_rel": [
                            0.01,
                            0.17,
                            2.79,
                            25.76,
                            0.4,
                            0.05,
                            6.62,
                            6.62,
                            0.06
                        ],
                        "complete_wagons": 1509,
                        "complete_wagons_rel": [
                            0.01,
                            0.16,
                            2.83,
                            26,
                            0.42,
                            0.04,
                            6.5,
                            6.5,
                            0.05
                        ]
                    },
                    "weight": 90035,
                    "wagons_amount": 1725,
                    "fact_weight": 12362.119999999999,
                    "fact_wagons": 216,
                    "tone_per_wagon": [
                        54.52909090909091,
                        54.52909090909091,
                        57.12447058823528,
                        54.49615384615384,
                        54.49615384615384,
                        60.81766666666667,
                        61.12,
                        61.12,
                        59.45
                    ],
                    "complete_weight": 77672.88,
                    "complete_weight_rel": [
                        0.01,
                        0.17,
                        2.79,
                        25.76,
                        0.4,
                        0.05,
                        6.62,
                        6.62,
                        0.06
                    ],
                    "complete_wagons": 1509,
                    "complete_wagons_rel": [
                        0.01,
                        0.16,
                        2.83,
                        26,
                        0.42,
                        0.04,
                        6.5,
                        6.5,
                        0.05
                    ]
                },
                "СТС, ООО": {
                    "2023": {
                        "2": {
                            "weight": 500,
                            "wagons_amount": 8,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 500,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 8,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 500,
                        "wagons_amount": 8,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 500,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 8,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 500,
                    "wagons_amount": 8,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 500,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 8,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ТОО \"Авион Норд\"": {
                    "2023": {
                        "1": {
                            "weight": 195,
                            "wagons_amount": 3,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 195,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 3,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 195,
                        "wagons_amount": 3,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 195,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 3,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 195,
                    "wagons_amount": 3,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 195,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 3,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "БЦК": {
                    "2023": {
                        "2": {
                            "weight": 5175,
                            "wagons_amount": 75,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 5175,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 75,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 5175,
                        "wagons_amount": 75,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 5175,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 75,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 5175,
                    "wagons_amount": 75,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 5175,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 75,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "Газпром Нефть, ПАО": {
                    "2023": {
                        "2": {
                            "weight": 10847,
                            "wagons_amount": 164,
                            "fact_weight": 197.8,
                            "fact_wagons": 3,
                            "tone_per_wagon": [
                                65.93333333333334,
                                0
                            ],
                            "complete_weight": 10649.2,
                            "complete_weight_rel": [
                                0.04,
                                0
                            ],
                            "complete_wagons": 161,
                            "complete_wagons_rel": [
                                0.04,
                                0
                            ]
                        },
                        "weight": 10847,
                        "wagons_amount": 164,
                        "fact_weight": 197.8,
                        "fact_wagons": 3,
                        "tone_per_wagon": [
                            65.93333333333334,
                            0
                        ],
                        "complete_weight": 10649.2,
                        "complete_weight_rel": [
                            0.04,
                            0
                        ],
                        "complete_wagons": 161,
                        "complete_wagons_rel": [
                            0.04,
                            0
                        ]
                    },
                    "weight": 10847,
                    "wagons_amount": 164,
                    "fact_weight": 197.8,
                    "fact_wagons": 3,
                    "tone_per_wagon": [
                        65.93333333333334,
                        0
                    ],
                    "complete_weight": 10649.2,
                    "complete_weight_rel": [
                        0.04,
                        0
                    ],
                    "complete_wagons": 161,
                    "complete_wagons_rel": [
                        0.04,
                        0
                    ]
                },
                "ТрансКом ТОО": {
                    "2023": {
                        "2": {
                            "weight": 10400,
                            "wagons_amount": 150,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 10400,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 150,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 10400,
                        "wagons_amount": 150,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 10400,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 150,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 10400,
                    "wagons_amount": 150,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 10400,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 150,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "КОКС": {
                    "2023": {
                        "2": {
                            "weight": 207,
                            "wagons_amount": 3,
                            "fact_weight": 459.49999999999994,
                            "fact_wagons": 10,
                            "tone_per_wagon": [
                                40.099999999999994,
                                40.099999999999994,
                                69.35
                            ],
                            "complete_weight": -252.49999999999994,
                            "complete_weight_rel": [
                                2.32,
                                2.32,
                                2.01
                            ],
                            "complete_wagons": -7,
                            "complete_wagons_rel": [
                                4,
                                4,
                                2
                            ]
                        },
                        "weight": 207,
                        "wagons_amount": 3,
                        "fact_weight": 459.49999999999994,
                        "fact_wagons": 10,
                        "tone_per_wagon": [
                            40.099999999999994,
                            40.099999999999994,
                            69.35
                        ],
                        "complete_weight": -252.49999999999994,
                        "complete_weight_rel": [
                            2.32,
                            2.32,
                            2.01
                        ],
                        "complete_wagons": -7,
                        "complete_wagons_rel": [
                            4,
                            4,
                            2
                        ]
                    },
                    "weight": 207,
                    "wagons_amount": 3,
                    "fact_weight": 459.49999999999994,
                    "fact_wagons": 10,
                    "tone_per_wagon": [
                        40.099999999999994,
                        40.099999999999994,
                        69.35
                    ],
                    "complete_weight": -252.49999999999994,
                    "complete_weight_rel": [
                        2.32,
                        2.32,
                        2.01
                    ],
                    "complete_wagons": -7,
                    "complete_wagons_rel": [
                        4,
                        4,
                        2
                    ]
                },
                "Шахта Грамотеинская": {
                    "2023": {
                        "2": {
                            "weight": 4623,
                            "wagons_amount": 67,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 4623,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 67,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 4623,
                        "wagons_amount": 67,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 4623,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 67,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 4623,
                    "wagons_amount": 67,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 4623,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 67,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ЧЭМК, АО": {
                    "2023": {
                        "2": {
                            "weight": 69,
                            "wagons_amount": 1,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 69,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 1,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 69,
                        "wagons_amount": 1,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 69,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 1,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 69,
                    "wagons_amount": 1,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 69,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 1,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ФЛК, ООО": {
                    "2023": {
                        "2": {
                            "weight": 414,
                            "wagons_amount": 6,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 414,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 6,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 414,
                        "wagons_amount": 6,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 414,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 6,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 414,
                    "wagons_amount": 6,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 414,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 6,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "УК Разрез Степной": {
                    "2023": {
                        "1": {
                            "weight": 0,
                            "wagons_amount": 1,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 0,
                            "complete_weight_rel": [
                                100
                            ],
                            "complete_wagons": 1,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 69,
                            "wagons_amount": 1,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 69,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 1,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 69,
                        "wagons_amount": 2,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 69,
                        "complete_weight_rel": [
                            0,
                            100
                        ],
                        "complete_wagons": 2,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 69,
                    "wagons_amount": 2,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 69,
                    "complete_weight_rel": [
                        0,
                        100
                    ],
                    "complete_wagons": 2,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "СКС, ООО": {
                    "2023": {
                        "2": {
                            "weight": 3450,
                            "wagons_amount": 50,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 3450,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 50,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 3450,
                        "wagons_amount": 50,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0
                        ],
                        "complete_weight": 3450,
                        "complete_weight_rel": [
                            0
                        ],
                        "complete_wagons": 50,
                        "complete_wagons_rel": [
                            0
                        ]
                    },
                    "weight": 3450,
                    "wagons_amount": 50,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0
                    ],
                    "complete_weight": 3450,
                    "complete_weight_rel": [
                        0
                    ],
                    "complete_wagons": 50,
                    "complete_wagons_rel": [
                        0
                    ]
                },
                "ТОО «Тенгри Транс»": {
                    "2023": {
                        "1": {
                            "weight": 20700,
                            "wagons_amount": 300,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 20700,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 300,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 69,
                            "wagons_amount": 1,
                            "fact_weight": 354.5,
                            "fact_wagons": 5,
                            "tone_per_wagon": [
                                70.9
                            ],
                            "complete_weight": -285.5,
                            "complete_weight_rel": [
                                5.14
                            ],
                            "complete_wagons": -4,
                            "complete_wagons_rel": [
                                5
                            ]
                        },
                        "weight": 20769,
                        "wagons_amount": 301,
                        "fact_weight": 354.5,
                        "fact_wagons": 5,
                        "tone_per_wagon": [
                            70.9,
                            0
                        ],
                        "complete_weight": 20414.5,
                        "complete_weight_rel": [
                            5.14,
                            0
                        ],
                        "complete_wagons": 296,
                        "complete_wagons_rel": [
                            5,
                            0
                        ]
                    },
                    "weight": 20769,
                    "wagons_amount": 301,
                    "fact_weight": 354.5,
                    "fact_wagons": 5,
                    "tone_per_wagon": [
                        70.9,
                        0
                    ],
                    "complete_weight": 20414.5,
                    "complete_weight_rel": [
                        5.14,
                        0
                    ],
                    "complete_wagons": 296,
                    "complete_wagons_rel": [
                        5,
                        0
                    ]
                },
                "Т-СЕРВИС ЛОГИСТИКС, ООО": {
                    "2023": {
                        "1": {
                            "weight": 0,
                            "wagons_amount": 1,
                            "fact_weight": 209.70000000000002,
                            "fact_wagons": 3,
                            "tone_per_wagon": [
                                69.9
                            ],
                            "complete_weight": -209.70000000000002,
                            "complete_weight_rel": [
                                100
                            ],
                            "complete_wagons": -2,
                            "complete_wagons_rel": [
                                3
                            ]
                        },
                        "weight": 0,
                        "wagons_amount": 1,
                        "fact_weight": 209.70000000000002,
                        "fact_wagons": 3,
                        "tone_per_wagon": [
                            69.9
                        ],
                        "complete_weight": -209.70000000000002,
                        "complete_weight_rel": [
                            100
                        ],
                        "complete_wagons": -2,
                        "complete_wagons_rel": [
                            3
                        ]
                    },
                    "weight": 0,
                    "wagons_amount": 1,
                    "fact_weight": 209.70000000000002,
                    "fact_wagons": 3,
                    "tone_per_wagon": [
                        69.9
                    ],
                    "complete_weight": -209.70000000000002,
                    "complete_weight_rel": [
                        100
                    ],
                    "complete_wagons": -2,
                    "complete_wagons_rel": [
                        3
                    ]
                },
                "РУСТЭК": {
                    "2023": {
                        "2": {
                            "weight": 16350,
                            "wagons_amount": 272,
                            "fact_weight": 1802.1260000000002,
                            "fact_wagons": 28,
                            "tone_per_wagon": [
                                64.36164285714287,
                                64.36164285714287,
                                0,
                                0,
                                0
                            ],
                            "complete_weight": 14547.874,
                            "complete_weight_rel": [
                                0.18,
                                0.18,
                                0,
                                0,
                                0
                            ],
                            "complete_wagons": 244,
                            "complete_wagons_rel": [
                                0.17,
                                0.17,
                                0,
                                0,
                                0
                            ]
                        },
                        "weight": 16350,
                        "wagons_amount": 272,
                        "fact_weight": 1802.1260000000002,
                        "fact_wagons": 28,
                        "tone_per_wagon": [
                            64.36164285714287,
                            64.36164285714287,
                            0,
                            0,
                            0
                        ],
                        "complete_weight": 14547.874,
                        "complete_weight_rel": [
                            0.18,
                            0.18,
                            0,
                            0,
                            0
                        ],
                        "complete_wagons": 244,
                        "complete_wagons_rel": [
                            0.17,
                            0.17,
                            0,
                            0,
                            0
                        ]
                    },
                    "weight": 16350,
                    "wagons_amount": 272,
                    "fact_weight": 1802.1260000000002,
                    "fact_wagons": 28,
                    "tone_per_wagon": [
                        64.36164285714287,
                        64.36164285714287,
                        0,
                        0,
                        0
                    ],
                    "complete_weight": 14547.874,
                    "complete_weight_rel": [
                        0.18,
                        0.18,
                        0,
                        0,
                        0
                    ],
                    "complete_wagons": 244,
                    "complete_wagons_rel": [
                        0.17,
                        0.17,
                        0,
                        0,
                        0
                    ]
                },
                "Рейл Сервис": {
                    "2023": {
                        "1": {
                            "weight": 5000,
                            "wagons_amount": 80,
                            "fact_weight": 369.694,
                            "fact_wagons": 6,
                            "tone_per_wagon": [
                                61.61566666666667
                            ],
                            "complete_weight": 4630.306,
                            "complete_weight_rel": [
                                0.07
                            ],
                            "complete_wagons": 74,
                            "complete_wagons_rel": [
                                0.07
                            ]
                        },
                        "2": {
                            "weight": 7500,
                            "wagons_amount": 120,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 7500,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 120,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 12500,
                        "wagons_amount": 200,
                        "fact_weight": 369.694,
                        "fact_wagons": 6,
                        "tone_per_wagon": [
                            0,
                            61.61566666666667
                        ],
                        "complete_weight": 12130.306,
                        "complete_weight_rel": [
                            0,
                            0.07
                        ],
                        "complete_wagons": 194,
                        "complete_wagons_rel": [
                            0,
                            0.07
                        ]
                    },
                    "weight": 12500,
                    "wagons_amount": 200,
                    "fact_weight": 369.694,
                    "fact_wagons": 6,
                    "tone_per_wagon": [
                        0,
                        61.61566666666667
                    ],
                    "complete_weight": 12130.306,
                    "complete_weight_rel": [
                        0,
                        0.07
                    ],
                    "complete_wagons": 194,
                    "complete_wagons_rel": [
                        0,
                        0.07
                    ]
                },
                "ННК-Транс": {
                    "2023": {
                        "1": {
                            "weight": 66000,
                            "wagons_amount": 1050,
                            "fact_weight": 1282.2259999999999,
                            "fact_wagons": 20,
                            "tone_per_wagon": [
                                64.1113
                            ],
                            "complete_weight": 64717.774,
                            "complete_weight_rel": [
                                0.02
                            ],
                            "complete_wagons": 1030,
                            "complete_wagons_rel": [
                                0.02
                            ]
                        },
                        "2": {
                            "weight": 66000,
                            "wagons_amount": 1050,
                            "fact_weight": 813.9049999999999,
                            "fact_wagons": 13,
                            "tone_per_wagon": [
                                62.608076923076915
                            ],
                            "complete_weight": 65186.095,
                            "complete_weight_rel": [
                                0.01
                            ],
                            "complete_wagons": 1037,
                            "complete_wagons_rel": [
                                0.01
                            ]
                        },
                        "weight": 132000,
                        "wagons_amount": 2100,
                        "fact_weight": 2096.131,
                        "fact_wagons": 33,
                        "tone_per_wagon": [
                            62.608076923076915,
                            64.1113
                        ],
                        "complete_weight": 129903.869,
                        "complete_weight_rel": [
                            0.01,
                            0.02
                        ],
                        "complete_wagons": 2067,
                        "complete_wagons_rel": [
                            0.01,
                            0.02
                        ]
                    },
                    "weight": 132000,
                    "wagons_amount": 2100,
                    "fact_weight": 2096.131,
                    "fact_wagons": 33,
                    "tone_per_wagon": [
                        62.608076923076915,
                        64.1113
                    ],
                    "complete_weight": 129903.869,
                    "complete_weight_rel": [
                        0.01,
                        0.02
                    ],
                    "complete_wagons": 2067,
                    "complete_wagons_rel": [
                        0.01,
                        0.02
                    ]
                },
                "Грифон": {
                    "2023": {
                        "1": {
                            "weight": 770,
                            "wagons_amount": 14,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 770,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 14,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "2": {
                            "weight": 770,
                            "wagons_amount": 14,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0
                            ],
                            "complete_weight": 770,
                            "complete_weight_rel": [
                                0
                            ],
                            "complete_wagons": 14,
                            "complete_wagons_rel": [
                                0
                            ]
                        },
                        "weight": 1540,
                        "wagons_amount": 28,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 1540,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 28,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 1540,
                    "wagons_amount": 28,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 1540,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 28,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                },
                "ООО \"Томская Топливная Компания\"": {
                    "2023": {
                        "1": {
                            "weight": 18300,
                            "wagons_amount": 292,
                            "fact_weight": 9752.659,
                            "fact_wagons": 149,
                            "tone_per_wagon": [
                                65.4198947368421,
                                65.44647142857143,
                                66.498
                            ],
                            "complete_weight": 8547.341,
                            "complete_weight_rel": [
                                0.5,
                                0.73,
                                0.1
                            ],
                            "complete_wagons": 143,
                            "complete_wagons_rel": [
                                0.47,
                                0.7,
                                0.09
                            ]
                        },
                        "2": {
                            "weight": 17000,
                            "wagons_amount": 272,
                            "fact_weight": 20444.131999999994,
                            "fact_wagons": 313,
                            "tone_per_wagon": [
                                65.32683018867922,
                                65.29548514851483,
                                65.32683018867922
                            ],
                            "complete_weight": -3444.1319999999932,
                            "complete_weight_rel": [
                                0.69,
                                1.32,
                                3.46
                            ],
                            "complete_wagons": -41,
                            "complete_wagons_rel": [
                                0.66,
                                1.26,
                                3.31
                            ]
                        },
                        "weight": 35300,
                        "wagons_amount": 564,
                        "fact_weight": 30196.790999999994,
                        "fact_wagons": 462,
                        "tone_per_wagon": [
                            65.32683018867922,
                            65.29548514851483,
                            65.32683018867922,
                            65.4198947368421,
                            65.44647142857143,
                            66.498
                        ],
                        "complete_weight": 5103.209000000008,
                        "complete_weight_rel": [
                            0.69,
                            1.32,
                            3.46,
                            0.5,
                            0.73,
                            0.1
                        ],
                        "complete_wagons": 102,
                        "complete_wagons_rel": [
                            0.66,
                            1.26,
                            3.31,
                            0.47,
                            0.7,
                            0.09
                        ]
                    },
                    "weight": 35300,
                    "wagons_amount": 564,
                    "fact_weight": 30196.790999999994,
                    "fact_wagons": 462,
                    "tone_per_wagon": [
                        65.32683018867922,
                        65.29548514851483,
                        65.32683018867922,
                        65.4198947368421,
                        65.44647142857143,
                        66.498
                    ],
                    "complete_weight": 5103.209000000008,
                    "complete_weight_rel": [
                        0.69,
                        1.32,
                        3.46,
                        0.5,
                        0.73,
                        0.1
                    ],
                    "complete_wagons": 102,
                    "complete_wagons_rel": [
                        0.66,
                        1.26,
                        3.31,
                        0.47,
                        0.7,
                        0.09
                    ]
                },
                "Еврохим": {
                    "2023": {
                        "1": {
                            "weight": 300,
                            "wagons_amount": 5,
                            "fact_weight": 0,
                            "fact_wagons": 0,
                            "tone_per_wagon": [
                                0,
                                0
                            ],
                            "complete_weight": 300,
                            "complete_weight_rel": [
                                0,
                                0
                            ],
                            "complete_wagons": 5,
                            "complete_wagons_rel": [
                                0,
                                0
                            ]
                        },
                        "weight": 300,
                        "wagons_amount": 5,
                        "fact_weight": 0,
                        "fact_wagons": 0,
                        "tone_per_wagon": [
                            0,
                            0
                        ],
                        "complete_weight": 300,
                        "complete_weight_rel": [
                            0,
                            0
                        ],
                        "complete_wagons": 5,
                        "complete_wagons_rel": [
                            0,
                            0
                        ]
                    },
                    "weight": 300,
                    "wagons_amount": 5,
                    "fact_weight": 0,
                    "fact_wagons": 0,
                    "tone_per_wagon": [
                        0,
                        0
                    ],
                    "complete_weight": 300,
                    "complete_weight_rel": [
                        0,
                        0
                    ],
                    "complete_wagons": 5,
                    "complete_wagons_rel": [
                        0,
                        0
                    ]
                }
            }
        }
    },
    methods: {

        dowloadData() {
            let data = [1, 2023, 2, 2023]
            console.log(this.begin, this.end)
            // api.LoadingPlanAndFact(data)
            //     .then(response => {
            //         console.log(response.data)
            //     })
        }
    }
}
</script>

<style scoped>
label {
    font-weight: 700;
    color: #444444;

}
.air_block_header> h5 {
  padding: 1% 0 0 0%;
  color: rgb(202, 202, 202);
}
    .air_block {
        width: 65%;
        padding: 2%;
        height: auto;
        min-height: 40vh;
        border-radius: 15px;
        background: #ffffff;
        box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .WatchAllArenda {
    color: #929292;
    padding: 1%;
    font-size: 25px;
    cursor: pointer;
    outline: none;
}

.WatchAllArenda:hover {
    outline: none;
    text-decoration: none;
}
.ToGOBlock {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    gap: 5%
}

.ToGOBlock input,
select {
    height: 50px;
    border-radius: 5px;
    width: 20vw;
    padding-left: 2%;
    border: 1px solid rgb(175, 175, 175) !important;
    margin-top: 2%;

}

</style>