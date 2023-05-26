<template>
    <div>
      <pre>

        <!-- {{ object }} -->
      </pre>
      <Loader :loader="loader" />
      <Periods @Action="Actioned" @data="getCurrentData">
        <label for="">
          Тип вагона
          <br />
          <select name="" id="" v-model="wag_type">
            <option value="Полувагон">Полувагон</option>
            <option value="Цистерна">Цистерна</option>
          </select>
        </label>
      </Periods>
      <br />
  
      <!-- <pre>{{ normalized }}</pre> -->
      <p>Форма 4.6. "Справка о выполнении перевозок вагоно-цистернами"</p>
      <div style="overflow: auto;">
        <table class="tbl_search" >
          <thead>
            <th>Парк</th>
            <th>Станция погрузки</th>
            <th style="width: 200px">Клиент</th>
            <th style="width: 200px">Станция выгрузки</th>
            <th style="width: 200px">Продукт</th>
            <th style="width: 200px">Погрузка, тн</th>
            <th style="width: 200px">Ставка, руб/тн без НДС</th>

            <th style="width: 200px">Выручка, руб, без НДС</th>

          </thead>
     <template  v-for="obj in objects">
        <template v-for="{ park, attr0 } in obj.data">
          <template v-for="({ road, attr1, TOTAL_ROAD }, iAtrr1) in attr0">
              <template v-for="({ client, attr3, total }, iAttr2) in attr1">
                <tr v-for="(attr3Item, iAttr3) in attr3">
                  <td >{{ park }}</td>
                  <td :rowspan="attr3.length +1 "  v-if="!iAttr3">{{ road }}</td>
                  <td :rowspan="attr3.length"  v-if="!iAttr3">{{ client }}</td>
                  <td>{{ attr3Item.road }}</td>
                  <table>
                    <tr v-for="item in attr3Item.cargo" :key="item.id">
                      <td style="width: 200px">{{ item.name }}</td>
                      <td style="width: 200px">{{ item?.cargo?.toFixed(2) }}</td>
                      <td style="width: 200px">{{ item.loads | format }}</td>
                      <td style="width: 200px">
                        {{ item?.revenue?.toFixed(2) | format }}
                      </td>
                    </tr>
                  </table>
                  <tr class="total">
                  <td></td>
                  <td colspan="2">Итого {{ client }}:</td>
                  <td></td>
                  <td>{{ total?.cargo.toFixed(2) | format }}</td>
                  <td>{{ total?.amount | format }}</td>
                  <td>{{ total?.revenue.toFixed(2) | format }}</td>
                </tr>
                  </tr>
                </template>
                <tr class="total_2">
                <td></td>
                <td colspan="3">Итого {{ road }}:</td>
                <td></td>
                <td>{{ TOTAL_ROAD?.cargo.toFixed(2) | format }}</td>
                <td>{{ TOTAL_ROAD?.amount | format }}</td>
                <td>{{ TOTAL_ROAD?.revenue.toFixed(2) | format }}</td>
              </tr>
              </template>
           
        </template>
     </template>
     
          <!-- <template v-for="obj in objects">
            <template v-for="{ road, attr1, TOTAL_ROAD } in obj.data">
              <template v-for="({ client, attr3, total }, iAttr1) in attr1">
                <tr v-for="(attr3Item, iAttr3) in attr3">
                  <td :rowspan="rowspan(attr1)" v-if="!iAttr1 && !iAttr3">СОбственный парк</td>
                  <td :rowspan="rowspan(attr1)" v-if="!iAttr1 && !iAttr3">
                    {{ road }}
                  </td>
                  <td :rowspan="attr3.length" v-if="!iAttr3">{{ client }}</td>
                  <td>{{ attr3Item.road }}</td>
                  <table>
                    <tr v-for="item in attr3Item.cargo" :key="item.id">
                      <td style="width: 250px">{{ item.name }}</td>
                      <td style="width: 200px">{{ item?.cargo?.toFixed(2) }}</td>
                      <td style="width: 200px">{{ item.loads | format }}</td>
                      <td style="width: 200px">
                        {{ item?.revenue?.toFixed(2) | format }}
                      </td>
                    </tr>
                  </table>
                </tr>
                <tr class="total">
                  <td></td>
                  <td colspan="2">Итого {{ client }}:</td>
                  <td></td>
                  <td>{{ total?.cargo.toFixed(2) | format }}</td>
                  <td>{{ total?.amount | format }}</td>
                  <td>{{ total?.revenue.toFixed(2) | format }}</td>
                </tr>
              </template>
              <tr class="total_2">
                <td></td>
                <td colspan="3">Итого {{ road }}:</td>
                <td></td>
                <td>{{ TOTAL_ROAD?.cargo.toFixed(2) | format }}</td>
                <td>{{ TOTAL_ROAD?.amount | format }}</td>
                <td>{{ TOTAL_ROAD?.revenue.toFixed(2) | format }}</td>
              </tr>
            </template>
          </template>
          <tr
            v-for="obj in objects"
            :key="obj.id"
            style="border: 1px solid black"
            class="all_total"
          > <td></td>
            <td colspan="3">Всего погрузки</td>
           
            <td>{{ obj.total?.cargo.toFixed(2) | format }}</td>
            <td>{{ obj.total?.amount | format }}</td>
            <td>{{ obj.total?.revenue.toFixed(2) | format }}</td>
          </tr> -->
        </table>
      </div>
    </div>
  </template>
  
  
  <script>
  import api from "@/api/reportUO";
  import Periods from "./Periods.vue";
  import Loader from "@/components/loader/loader.vue";
  export default {
    components: { Periods, Loader },
    data() {
      return {
        normalized: [],
        loader: false,
        date_begin: "",
        date_end: "",
        wag_type: "Полувагон",
  
            objects:
          [
        {
          "data": [
            {
              "park": 'Собственный',
              'attr0': [
                {
                "road": "Белорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "НЕМосковская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 55,
                "revenue": 55555,
                "cargo": 50000
              }
              },
              {
                "road": "НЕБелорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 31,
                "revenue": 79818000,
                "cargo": 2124
              }
              },
              {
                "road": "Белорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "НЕМосковская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 31,
                "revenue": 79818000,
                "cargo": 2124
              }
              },
              {
                "road": "НЕБелорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        },
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }, {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }, {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 31,
                "revenue": 79818000,
                "cargo": 2124
              }
              }
            ]
    
            },
            {
              "park": 'Арендный',
              'attr0': [
                {
                "road": "Белорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "НЕМосковская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 31,
                "revenue": 79818000,
                "cargo": 2124
              }
              },
              {
                "road": "НЕБелорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 31,
                "revenue": 79818000,
                "cargo": 2124
              }
              },
              {
                "road": "Белорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "НЕМосковская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 31,
                "revenue": 79818000,
                "cargo": 2124
              }
              },
              {
                "road": "НЕБелорусская ж. д.",
                "attr1": [
                {
                  "client": "РУСНЕРУДТРЕЙД, ООО",
                  "attr3": [
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        },
                        {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }, {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }, {
                          "name": "Щебень гранитный не поименованный в 123",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 5х20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo": 341
                        }
                      ]
                    },
                    {
                      "road": "Московская ж. д.",
                      "cargo": [
                        {
                          "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
                          "loads": 26,
                          "revenue": 76214000,
                          "cargo:": 1783
                        },
                        {
                          "name": "Щебень гранитный фракции 12321 24gх20",
                          "loads": 5,
                          "revenue": 3604000,
                          "cargo:": 341
                        }
                      ]
                    }
                  ],
                  "total": {
                    "amount": 31,
                    "revenue": 79818000,
                    "cargo": 2124
                  }
                }
              ],
              "TOTAL_ROAD": {
                "amount": 31,
                "revenue": 79818000,
                "cargo": 2124
              }
              }
            ]
            }
                ],
                'total': {
                  cargo: 'ALL_TOTAL',
                  amount: 'ALL_TOTALA',
                  wo_nds: 'ALL_TOTALWO'
                }
              }],
        // objects2: "",
//         object: 
//           {
//     "data": {
//         "Арендованный": {
//             "data": {
//                 "Западно-Сибирская ж. д.": {
//                     "data": {
//                         "КОКС": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Концентрат угольный": {
//                                             "amount": 134.5,
//                                             "stavka": 54280.0,
//                                             "revenue": 3650330.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 134.5,
//                                         "stavka": 54280.0,
//                                         "revenue": 3650330.0
//                                     }
//                                 },
//                                 "Московская ж. д.": {
//                                     "data": {
//                                         "Кокс доменный": {
//                                             "amount": 43.4,
//                                             "stavka": 95000.0,
//                                             "revenue": 4123000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 43.4,
//                                         "stavka": 95000.0,
//                                         "revenue": 4123000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 177.9,
//                                 "stavka": 149280.0,
//                                 "revenue": 7773330.0
//                             }
//                         },
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 69.3,
//                                             "stavka": 1.25,
//                                             "revenue": 86.625
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 69.3,
//                                         "stavka": 1.25,
//                                         "revenue": 86.625
//                                     }
//                                 },
//                                 "Одесская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 64.95,
//                                             "stavka": 105000.0,
//                                             "revenue": 6819750.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 64.95,
//                                         "stavka": 105000.0,
//                                         "revenue": 6819750.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 134.25,
//                                 "stavka": 105001.25,
//                                 "revenue": 6819836.625
//                             }
//                         },
//                         "ПРОМУГОЛЬСЕРВИС, ООО": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Г-газовый": {
//                                             "amount": 70.5,
//                                             "stavka": 110000.0,
//                                             "revenue": 7755000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 70.5,
//                                         "stavka": 110000.0,
//                                         "revenue": 7755000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 70.5,
//                                 "stavka": 110000.0,
//                                 "revenue": 7755000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 382.65,
//                         "stavka": 364281.25,
//                         "revenue": 22348166.625
//                     }
//                 },
//                 "Куйбышевская ж. д.": {
//                     "data": {
//                         "ООО \"Татнефть-Транс\"": {
//                             "data": {
//                                 "Одесская ж. д.": {
//                                     "data": {
//                                         "Кокс нефтяной анодный": {
//                                             "amount": 68.5,
//                                             "stavka": 0.0,
//                                             "revenue": 0.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 68.5,
//                                         "stavka": 0.0,
//                                         "revenue": 0.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 68.5,
//                                 "stavka": 0.0,
//                                 "revenue": 0.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 68.5,
//                         "stavka": 0.0,
//                         "revenue": 0.0
//                     }
//                 },
//                 "Октябрьская ж. д.": {
//                     "data": {
//                         "ЧЭМК, АО": {
//                             "data": {
//                                 "Южно-Уральская ж. д.": {
//                                     "data": {
//                                         "Руда марганцевая, не поименованная в алфавите": {
//                                             "amount": 65.0,
//                                             "stavka": 57000.0,
//                                             "revenue": 3705000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 65.0,
//                                         "stavka": 57000.0,
//                                         "revenue": 3705000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 65.0,
//                                 "stavka": 57000.0,
//                                 "revenue": 3705000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 65.0,
//                         "stavka": 57000.0,
//                         "revenue": 3705000.0
//                     }
//                 }
//             },
//             "total": {
//                 "amount": 516.15,
//                 "stavka": 421281.25,
//                 "revenue": 26053166.625
//             }
//         },
//         "Взят в скрытую аренду": {
//             "data": {
//                 "Западно-Сибирская ж. д.": {
//                     "data": {
//                         "КОКС": {
//                             "data": {
//                                 "Московская ж. д.": {
//                                     "data": {
//                                         "Кокс доменный": {
//                                             "amount": 100.8,
//                                             "stavka": 190000.0,
//                                             "revenue": 9576000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 100.8,
//                                         "stavka": 190000.0,
//                                         "revenue": 9576000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 100.8,
//                                 "stavka": 190000.0,
//                                 "revenue": 9576000.0
//                             }
//                         },
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 137.8,
//                                             "stavka": 2.5,
//                                             "revenue": 172.25
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 137.8,
//                                         "stavka": 2.5,
//                                         "revenue": 172.25
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 137.8,
//                                 "stavka": 2.5,
//                                 "revenue": 172.25
//                             }
//                         },
//                         "ПРОМУГОЛЬСЕРВИС, ООО": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Г-газовый": {
//                                             "amount": 208.5,
//                                             "stavka": 330000.0,
//                                             "revenue": 22935000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 208.5,
//                                         "stavka": 330000.0,
//                                         "revenue": 22935000.0
//                                     }
//                                 },
//                                 "Северо-Кавказская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 275.5,
//                                             "stavka": 460000.0,
//                                             "revenue": 31682500.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 275.5,
//                                         "stavka": 460000.0,
//                                         "revenue": 31682500.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 484.0,
//                                 "stavka": 790000.0,
//                                 "revenue": 54617500.0
//                             }
//                         },
//                         "Уголь-Транс": {
//                             "data": {
//                                 "Дальневосточная ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки СС-слабоспекающийся": {
//                                             "amount": 68.8,
//                                             "stavka": 137000.0,
//                                             "revenue": 9425600.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 68.8,
//                                         "stavka": 137000.0,
//                                         "revenue": 9425600.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 68.8,
//                                 "stavka": 137000.0,
//                                 "revenue": 9425600.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 791.4,
//                         "stavka": 1117002.5,
//                         "revenue": 73619272.25
//                     }
//                 },
//                 "Куйбышевская ж. д.": {
//                     "data": {
//                         "ООО \"Татнефть-Транс\"": {
//                             "data": {
//                                 "Одесская ж. д.": {
//                                     "data": {
//                                         "Кокс нефтяной анодный": {
//                                             "amount": 268.8,
//                                             "stavka": 0.0,
//                                             "revenue": 0.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 268.8,
//                                         "stavka": 0.0,
//                                         "revenue": 0.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 268.8,
//                                 "stavka": 0.0,
//                                 "revenue": 0.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 268.8,
//                         "stavka": 0.0,
//                         "revenue": 0.0
//                     }
//                 },
//                 "Октябрьская ж. д.": {
//                     "data": {
//                         "ЧЭМК, АО": {
//                             "data": {
//                                 "Южно-Уральская ж. д.": {
//                                     "data": {
//                                         "Руда марганцевая, не поименованная в алфавите": {
//                                             "amount": 137.0,
//                                             "stavka": 114000.0,
//                                             "revenue": 7809000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 137.0,
//                                         "stavka": 114000.0,
//                                         "revenue": 7809000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 137.0,
//                                 "stavka": 114000.0,
//                                 "revenue": 7809000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 137.0,
//                         "stavka": 114000.0,
//                         "revenue": 7809000.0
//                     }
//                 }
//             },
//             "total": {
//                 "amount": 1197.2,
//                 "stavka": 1231002.5,
//                 "revenue": 81428272.25
//             }
//         },
//         "Слежение": {
//             "data": {
//                 "Белорусская ж. д.": {
//                     "data": {
//                         "ТК РУТ Логистик": {
//                             "data": {
//                                 "Горьковская ж. д.": {
//                                     "data": {
//                                         "Щебень гранитный не поименованный в алфавите": {
//                                             "amount": 68.0,
//                                             "stavka": 66000.0,
//                                             "revenue": 4488000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 68.0,
//                                         "stavka": 66000.0,
//                                         "revenue": 4488000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 68.0,
//                                 "stavka": 66000.0,
//                                 "revenue": 4488000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 68.0,
//                         "stavka": 66000.0,
//                         "revenue": 4488000.0
//                     }
//                 },
//                 "Западно-Сибирская ж. д.": {
//                     "data": {
//                         "КОКС": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Концентрат угольный": {
//                                             "amount": 419.75,
//                                             "stavka": 162840.0,
//                                             "revenue": 11392015.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 419.75,
//                                         "stavka": 162840.0,
//                                         "revenue": 11392015.0
//                                     }
//                                 },
//                                 "Московская ж. д.": {
//                                     "data": {
//                                         "Кокс доменный": {
//                                             "amount": 609.2,
//                                             "stavka": 1140000.0,
//                                             "revenue": 57874000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 609.2,
//                                         "stavka": 1140000.0,
//                                         "revenue": 57874000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 1028.95,
//                                 "stavka": 1302840.0,
//                                 "revenue": 69266015.0
//                             }
//                         },
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 1398.9499999999998,
//                                             "stavka": 25.12,
//                                             "revenue": 1757.6695
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 1398.9499999999998,
//                                         "stavka": 25.12,
//                                         "revenue": 1757.6695
//                                     }
//                                 },
//                                 "Одесская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 137.75,
//                                             "stavka": 210000.0,
//                                             "revenue": 14463750.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 137.75,
//                                         "stavka": 210000.0,
//                                         "revenue": 14463750.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 1536.6999999999998,
//                                 "stavka": 210025.12,
//                                 "revenue": 14465507.6695
//                             }
//                         },
//                         "ПРОМУГОЛЬСЕРВИС, ООО": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Г-газовый": {
//                                             "amount": 3753.5,
//                                             "stavka": 5967600.0,
//                                             "revenue": 414941200.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 3753.5,
//                                         "stavka": 5967600.0,
//                                         "revenue": 414941200.0
//                                     }
//                                 },
//                                 "Северо-Кавказская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 3679.5,
//                                             "stavka": 6114200.0,
//                                             "revenue": 424572900.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 3679.5,
//                                         "stavka": 6114200.0,
//                                         "revenue": 424572900.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 7433.0,
//                                 "stavka": 12081800.0,
//                                 "revenue": 839514100.0
//                             }
//                         },
//                         "СДС-Уголь": {
//                             "data": {
//                                 "Северо-Кавказская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки СС-слабоспекающийся": {
//                                             "amount": 69.8,
//                                             "stavka": 120000.0,
//                                             "revenue": 8376000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 69.8,
//                                         "stavka": 120000.0,
//                                         "revenue": 8376000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 69.8,
//                                 "stavka": 120000.0,
//                                 "revenue": 8376000.0
//                             }
//                         },
//                         "СКС, ООО": {
//                             "data": {
//                                 "Дальневосточная ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 837.4,
//                                             "stavka": 1639000.0,
//                                             "revenue": 114468300.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 837.4,
//                                         "stavka": 1639000.0,
//                                         "revenue": 114468300.0
//                                     }
//                                 },
//                                 "Северо-Кавказская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 138.9,
//                                             "stavka": 220000.0,
//                                             "revenue": 15279000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 138.9,
//                                         "stavka": 220000.0,
//                                         "revenue": 15279000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 976.3,
//                                 "stavka": 1859000.0,
//                                 "revenue": 129747300.0
//                             }
//                         },
//                         "Уголь-Транс": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный, не поименованный в алфавите": {
//                                             "amount": 207.10000000000002,
//                                             "stavka": 324000.0,
//                                             "revenue": 22366800.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 207.10000000000002,
//                                         "stavka": 324000.0,
//                                         "revenue": 22366800.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 207.10000000000002,
//                                 "stavka": 324000.0,
//                                 "revenue": 22366800.0
//                             }
//                         },
//                         "ЦОФ Березовская": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Ж-жирный": {
//                                             "amount": 138.39999999999998,
//                                             "stavka": 37760.0,
//                                             "revenue": 2612992.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 138.39999999999998,
//                                         "stavka": 37760.0,
//                                         "revenue": 2612992.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 138.39999999999998,
//                                 "stavka": 37760.0,
//                                 "revenue": 2612992.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 11390.249999999998,
//                         "stavka": 15935425.120000001,
//                         "revenue": 1086348714.6694999
//                     }
//                 },
//                 "Красноярская ж. д.": {
//                     "data": {
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Дальневосточная ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 627.0,
//                                             "stavka": 1242000.0,
//                                             "revenue": 86526000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 627.0,
//                                         "stavka": 1242000.0,
//                                         "revenue": 86526000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 627.0,
//                                 "stavka": 1242000.0,
//                                 "revenue": 86526000.0
//                             }
//                         },
//                         "ТОО «GLP Operator»": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Пшеница": {
//                                             "amount": 451.4,
//                                             "stavka": 847000.0,
//                                             "revenue": 54619400.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 451.4,
//                                         "stavka": 847000.0,
//                                         "revenue": 54619400.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 451.4,
//                                 "stavka": 847000.0,
//                                 "revenue": 54619400.0
//                             }
//                         },
//                         "УК Разрез Степной": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 68.5,
//                                             "stavka": 30025.0,
//                                             "revenue": 2056712.5
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 68.5,
//                                         "stavka": 30025.0,
//                                         "revenue": 2056712.5
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 68.5,
//                                 "stavka": 30025.0,
//                                 "revenue": 2056712.5
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 1146.9,
//                         "stavka": 2119025.0,
//                         "revenue": 143202112.5
//                     }
//                 },
//                 "Куйбышевская ж. д.": {
//                     "data": {
//                         "ООО \"Татнефть-Транс\"": {
//                             "data": {
//                                 "Одесская ж. д.": {
//                                     "data": {
//                                         "Кокс нефтяной анодный": {
//                                             "amount": 2214.0,
//                                             "stavka": 0.0,
//                                             "revenue": 0.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 2214.0,
//                                         "stavka": 0.0,
//                                         "revenue": 0.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 2214.0,
//                                 "stavka": 0.0,
//                                 "revenue": 0.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 2214.0,
//                         "stavka": 0.0,
//                         "revenue": 0.0
//                     }
//                 },
//                 "Октябрьская ж. д.": {
//                     "data": {
//                         "ЧЭМК, АО": {
//                             "data": {
//                                 "Южно-Уральская ж. д.": {
//                                     "data": {
//                                         "Руда марганцевая, не поименованная в алфавите": {
//                                             "amount": 69.0,
//                                             "stavka": 57000.0,
//                                             "revenue": 3933000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 69.0,
//                                         "stavka": 57000.0,
//                                         "revenue": 3933000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 69.0,
//                                 "stavka": 57000.0,
//                                 "revenue": 3933000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 69.0,
//                         "stavka": 57000.0,
//                         "revenue": 3933000.0
//                     }
//                 },
//                 "Северо-Кавказская ж. д.": {
//                     "data": {
//                         "ДНК": {
//                             "data": {
//                                 "Горьковская ж. д.": {
//                                     "data": {
//                                         "Щебень, не поименованный в алфавите": {
//                                             "amount": 347.5,
//                                             "stavka": 0.0,
//                                             "revenue": 0.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 347.5,
//                                         "stavka": 0.0,
//                                         "revenue": 0.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 347.5,
//                                 "stavka": 0.0,
//                                 "revenue": 0.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 347.5,
//                         "stavka": 0.0,
//                         "revenue": 0.0
//                     }
//                 },
//                 "Южно-Уральская ж. д.": {
//                     "data": {
//                         "РВК, ООО": {
//                             "data": {
//                                 "Куйбышевская ж. д.": {
//                                     "data": {
//                                         "Щебень, не поименованный в алфавите": {
//                                             "amount": 275.29999999999995,
//                                             "stavka": 203244.0,
//                                             "revenue": 13988297.7
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 275.29999999999995,
//                                         "stavka": 203244.0,
//                                         "revenue": 13988297.7
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 275.29999999999995,
//                                 "stavka": 203244.0,
//                                 "revenue": 13988297.7
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 275.29999999999995,
//                         "stavka": 203244.0,
//                         "revenue": 13988297.7
//                     }
//                 }
//             },
//             "total": {
//                 "amount": 15510.949999999997,
//                 "stavka": 18380694.12,
//                 "revenue": 1251960124.8695
//             }
//         },
//         "Собственный": {
//             "data": {
//                 "Западно-Сибирская ж. д.": {
//                     "data": {
//                         "КОКС": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Концентрат угольный": {
//                                             "amount": 69.95,
//                                             "stavka": 27140.0,
//                                             "revenue": 1898443.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 69.95,
//                                         "stavka": 27140.0,
//                                         "revenue": 1898443.0
//                                     }
//                                 },
//                                 "Московская ж. д.": {
//                                     "data": {
//                                         "Кокс доменный": {
//                                             "amount": 48.1,
//                                             "stavka": 95000.0,
//                                             "revenue": 4569500.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 48.1,
//                                         "stavka": 95000.0,
//                                         "revenue": 4569500.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 118.05000000000001,
//                                 "stavka": 122140.0,
//                                 "revenue": 6467943.0
//                             }
//                         },
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 139.9,
//                                             "stavka": 2.5,
//                                             "revenue": 174.875
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 139.9,
//                                         "stavka": 2.5,
//                                         "revenue": 174.875
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 139.9,
//                                 "stavka": 2.5,
//                                 "revenue": 174.875
//                             }
//                         },
//                         "ПРОМУГОЛЬСЕРВИС, ООО": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Г-газовый": {
//                                             "amount": 693.0,
//                                             "stavka": 1100000.0,
//                                             "revenue": 76230000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 693.0,
//                                         "stavka": 1100000.0,
//                                         "revenue": 76230000.0
//                                     }
//                                 },
//                                 "Северо-Кавказская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 486.5,
//                                             "stavka": 805000.0,
//                                             "revenue": 55947500.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 486.5,
//                                         "stavka": 805000.0,
//                                         "revenue": 55947500.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 1179.5,
//                                 "stavka": 1905000.0,
//                                 "revenue": 132177500.0
//                             }
//                         },
//                         "СКС, ООО": {
//                             "data": {
//                                 "Дальневосточная ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 69.7,
//                                             "stavka": 135000.0,
//                                             "revenue": 9409500.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 69.7,
//                                         "stavka": 135000.0,
//                                         "revenue": 9409500.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 69.7,
//                                 "stavka": 135000.0,
//                                 "revenue": 9409500.0
//                             }
//                         },
//                         "Уголь-Транс": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный, не поименованный в алфавите": {
//                                             "amount": 69.5,
//                                             "stavka": 108000.0,
//                                             "revenue": 7506000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 69.5,
//                                         "stavka": 108000.0,
//                                         "revenue": 7506000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 69.5,
//                                 "stavka": 108000.0,
//                                 "revenue": 7506000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 1576.65,
//                         "stavka": 2270142.5,
//                         "revenue": 155561117.875
//                     }
//                 },
//                 "Красноярская ж. д.": {
//                     "data": {
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Дальневосточная ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 70.0,
//                                             "stavka": 138000.0,
//                                             "revenue": 9660000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 70.0,
//                                         "stavka": 138000.0,
//                                         "revenue": 9660000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 70.0,
//                                 "stavka": 138000.0,
//                                 "revenue": 9660000.0
//                             }
//                         },
//                         "ТОО «GLP Operator»": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Пшеница": {
//                                             "amount": 65.0,
//                                             "stavka": 121000.0,
//                                             "revenue": 7865000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 65.0,
//                                         "stavka": 121000.0,
//                                         "revenue": 7865000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 65.0,
//                                 "stavka": 121000.0,
//                                 "revenue": 7865000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 135.0,
//                         "stavka": 259000.0,
//                         "revenue": 17525000.0
//                     }
//                 },
//                 "Куйбышевская ж. д.": {
//                     "data": {
//                         "ООО \"Татнефть-Транс\"": {
//                             "data": {
//                                 "Одесская ж. д.": {
//                                     "data": {
//                                         "Кокс нефтяной анодный": {
//                                             "amount": 472.3,
//                                             "stavka": 0.0,
//                                             "revenue": 0.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 472.3,
//                                         "stavka": 0.0,
//                                         "revenue": 0.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 472.3,
//                                 "stavka": 0.0,
//                                 "revenue": 0.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 472.3,
//                         "stavka": 0.0,
//                         "revenue": 0.0
//                     }
//                 },
//                 "Октябрьская ж. д.": {
//                     "data": {
//                         "ЧЭМК, АО": {
//                             "data": {
//                                 "Южно-Уральская ж. д.": {
//                                     "data": {
//                                         "Руда марганцевая, не поименованная в алфавите": {
//                                             "amount": 134.0,
//                                             "stavka": 114000.0,
//                                             "revenue": 7638000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 134.0,
//                                         "stavka": 114000.0,
//                                         "revenue": 7638000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 134.0,
//                                 "stavka": 114000.0,
//                                 "revenue": 7638000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 134.0,
//                         "stavka": 114000.0,
//                         "revenue": 7638000.0
//                     }
//                 }
//             },
//             "total": {
//                 "amount": 2317.9500000000003,
//                 "stavka": 2643142.5,
//                 "revenue": 180724117.875
//             }
//         },
//         "Чужой": {
//             "data": {
//                 "Западно-Сибирская ж. д.": {
//                     "data": {
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Западно-Сибирская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 139.4,
//                                             "stavka": 2.5,
//                                             "revenue": 174.25
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 139.4,
//                                         "stavka": 2.5,
//                                         "revenue": 174.25
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 139.4,
//                                 "stavka": 2.5,
//                                 "revenue": 174.25
//                             }
//                         },
//                         "ПРОМУГОЛЬСЕРВИС, ООО": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Г-газовый": {
//                                             "amount": 276.5,
//                                             "stavka": 440000.0,
//                                             "revenue": 30415000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 276.5,
//                                         "stavka": 440000.0,
//                                         "revenue": 30415000.0
//                                     }
//                                 },
//                                 "Северо-Кавказская ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 138.5,
//                                             "stavka": 230000.0,
//                                             "revenue": 15927500.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 138.5,
//                                         "stavka": 230000.0,
//                                         "revenue": 15927500.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 415.0,
//                                 "stavka": 670000.0,
//                                 "revenue": 46342500.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 554.4,
//                         "stavka": 670002.5,
//                         "revenue": 46342674.25
//                     }
//                 },
//                 "Красноярская ж. д.": {
//                     "data": {
//                         "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
//                             "data": {
//                                 "Дальневосточная ж. д.": {
//                                     "data": {
//                                         "Уголь каменный марки Д": {
//                                             "amount": 70.0,
//                                             "stavka": 138000.0,
//                                             "revenue": 9660000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 70.0,
//                                         "stavka": 138000.0,
//                                         "revenue": 9660000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 70.0,
//                                 "stavka": 138000.0,
//                                 "revenue": 9660000.0
//                             }
//                         },
//                         "ТОО «GLP Operator»": {
//                             "data": {
//                                 "Казахстанская ж. д.": {
//                                     "data": {
//                                         "Пшеница": {
//                                             "amount": 65.0,
//                                             "stavka": 121000.0,
//                                             "revenue": 7865000.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 65.0,
//                                         "stavka": 121000.0,
//                                         "revenue": 7865000.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 65.0,
//                                 "stavka": 121000.0,
//                                 "revenue": 7865000.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 135.0,
//                         "stavka": 259000.0,
//                         "revenue": 17525000.0
//                     }
//                 },
//                 "Куйбышевская ж. д.": {
//                     "data": {
//                         "ООО \"Татнефть-Транс\"": {
//                             "data": {
//                                 "Одесская ж. д.": {
//                                     "data": {
//                                         "Кокс нефтяной анодный": {
//                                             "amount": 333.25,
//                                             "stavka": 0.0,
//                                             "revenue": 0.0
//                                         }
//                                     },
//                                     "total": {
//                                         "amount": 333.25,
//                                         "stavka": 0.0,
//                                         "revenue": 0.0
//                                     }
//                                 }
//                             },
//                             "total": {
//                                 "amount": 333.25,
//                                 "stavka": 0.0,
//                                 "revenue": 0.0
//                             }
//                         }
//                     },
//                     "total": {
//                         "amount": 333.25,
//                         "stavka": 0.0,
//                         "revenue": 0.0
//                     }
//                 }
//             },
//             "total": {
//                 "amount": 1022.65,
//                 "stavka": 929002.5,
//                 "revenue": 63867674.25
//             }
//         }
//     },
//     "total": {
//         "amount": 20564.9,
//         "stavka": 23605122.87,
//         "revenue": 1604033355.8695
//     }
// }
        
        //   objects2: {
        //     "data": {
        //       "Белорусская ж. д.": {
        //           "data": {
        //               "РУСНЕРУДТРЕЙД, ООО": {
        //                   "data": {
        //                       "Московская ж. д.": {
        //                           "data": {
        //                               "Щебень гранитный не поименованный в алфавите": {
        //                                   "loads": 26,
        //                                   "revenue": 76214000.0,
        //                                   "cargo:": 1783.0
        //                               },
        //                               "Щебень гранитный фракции 5х20": {
        //                                   "loads": 5,
        //                                   "revenue": 0.0,
        //                                   "cargo:": 341.0
        //                               }
        //                           },
        //                           "total": {
        //                               "amount": 0,
        //                               "revenue": 0,
        //                               "cargo": 0
        //                           }
        //                       }
        //                   },
        //                   "total": {
        //                       "amount": 31,
        //                       "revenue": 76214000.0,
        //                       "cargo": 2124.0
        //                   }
        //               },
        //   },
  
        //     }
  
        // },
        // "total": {
        //       "amount": 4304,
        //       "revenue": 28475659670.8505,
        //       "cargo": 295255.06500000006
        //   }
        //   }
      };
    },
    methods: {
      rowspan(attr){
         attr.reduce((acc, item) => 
          acc +  + item.attr1.length + 1, 0)
      },
      // rowspan: (attr0) => attr0.reduce((acc, n) => acc + n.attr1.length + 1, 0),
  
      normalizeObject() {
        const test = Object.keys(this.objects2.data).map((key) => {
          const obj = {
            road: key,
            attr1: Object.keys(this.objects2.data[key].data).map((client) => {
              return {
                client,
                attr3: Object.keys(this.objects2.data[key].data[client].data).map(
                  (road) => {
                    return {
                      road,
                      cargo: Object.keys(
                        this.objects2.data[key].data[client].data[road].data
                      ).map((cargo) => {
                        return {
                          name: cargo,
                          ...this.objects2.data[key].data[client].data[road].data[
                            cargo
                          ],
                          // cargo:  this.objects2.data[key].data[client].data[road].data[cargo]
                        };
                      }),
                    };
                  }
                ),
                total: this.objects2.data[key].data[client].total,
              };
            }),
            TOTAL_ROAD: this.objects2.data[key].total,
          };
          return obj;
        });
  
        this.normalized = [
          {
            data: test,
            total: this.objects2.total,
          },
        ];
      },
      Actioned() {
        this.loader = true;
        api
          .getUO45(this.date_begin, this.date_end, this.wag_type)
          .then((response) => {
            this.loader = false;
            this.objects2 = response.data;
            this.normalizeObject();
          })
          .catch((error) => {
            console.log(error);
            this.loader = false;
          });
      },
      getCurrentData(data) {
        this.date_begin = data.date_begin;
        this.date_end = data.date_end;
      },
    },
    mounted() {
      // this.normalizeObject()
    },
    filters: {
      format(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
      },
    },
  };
  </script>
  <!-- 
  <style lang="scss" scoped>
  tr{
      background : red;
      &:hover {
        background: green;
      } 
    }
  </style> -->
  <style scoped>
  .table_search {
    width: 100%;
  }
  .total {
    background: #fdffd9;
  }
  
  .total_2 {
    background: #ddface;
  }
  
  tr:hover {
    background: rgb(236, 236, 236);
  }
  
  td {
    border: 1px solid black !important;
    color: black !important;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table > tbody > tr > td,
  table > tbody > tr > td.inner > div {
    vertical-align: top;
    border: 1px solid #ddd;
  }
  
  table > tbody > tr > td.inner {
    padding: 0;
    border-right: 0;
  }
  
  table > tbody > tr > td.inner > div {
    padding: 5px;
    border-width: 0 0 1px 0;
  }
  
  table > tbody > tr > td.inner > div:last-child {
    border: 0;
  }
  
  table > tbody > tr > td.inner > table {
    margin-bottom: 0;
  }
  
  table > tbody > tr > td.inner > table td {
    border-width: 0 1px 1px 0;
  }
  
  table > tbody > tr > td.inner > table tr:last-child td {
    border-bottom: 0;
  }
  
  table > tbody > tr > td.inner > div {
    border-right: 0;
  }
  
  thead > th {
    border: 1px solid black;
  }
  
  .total_row {
    background: #ddface;
  }
  
  .total_road {
    background: greenyellow;
  }
  </style>