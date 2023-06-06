<template>
    <div>
      <pre>

      <!-- <pre>{{ normalized }}</pre>  -->
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
          <template v-for="obj in normalized">
              <template v-for="{park, attr1} in obj.data">
                <template v-for="{ client, attr3 } in attr1">
                  <template v-for="{ road, station } in attr3">
                    <template v-for="{ name_station, cargo } in station">
                        <template v-for="item in cargo">
                           <tr>
                            <td>{{ park }}</td>
                            <td></td>
                           </tr>
                        </template>
                    </template>
                  </template>
                </template>
              </template>
          </template>
     <!-- <template  v-for="obj in normalized">
        <template v-for="{ park, attr1 } in obj.data">
          <template v-for="({ client, attr3, TOTAL_ROAD }, iAtrr1) in attr1">
              <template v-for="({ road, station, total }, iAttr2) in attr3">
                <tr v-for="(attr3Item, iAttr3) in attr3">
                  <td>{{ park }}</td>
                  <td :rowspan="attr3.length +1 "  v-if="!iAttr3">{{ client }}</td>
                  <td :rowspan="attr3.length"  v-if="!iAttr3">{{ road }}</td>
                  <table>
                    <tr v-for="item in attr3Item.station" :key="item.id">
                     <td style="width: 200px">{{ item.name_station }}</td> 
                     <template  v-for="cargo in item.cargo" >
                      
                        <td style="width: 200px">{{ cargo.cargo_name }}</td> 
                        <td style="width: 200px">{{ cargo.amount.toFixed(2) | format }}</td> 
                        <td style="width: 200px">{{ cargo.stavka.toFixed(2) | format }}</td> 
                        <td style="width: 200px">{{ cargo.revenue.toFixed(2) | format }}</td> 
                      
                     

                      </template>
              
                    </tr>
                  </table>
                  <tr class="total">
                  <td></td>
                  <td colspan="2">Итого {{ road }}:</td>
                  <td></td>
                  <td>{{ TOTAL_ROAD }}</td>
                  <td>{{ total?.cargo.toFixed(2) | format }}</td>
                  <td>{{ total?.amount | format }}</td>
                  <td>{{ total?.revenue.toFixed(2) | format }}</td>
                </tr>
                  </tr>
                </template>
                <tr class="total_2">
                <td></td>
                <td colspan="3">Итого {{ client }}:</td>
                <td></td>
                <td>{{ TOTAL_ROAD?.cargo.toFixed(2) | format }}</td>
                <td>{{ TOTAL_ROAD?.amount | format }}</td>
                <td>{{ TOTAL_ROAD?.revenue.toFixed(2) | format }}</td>
              </tr>
              </template>
           
        </template>
     </template> -->
     
  
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
        normalized: [
  {
    "data": [
      {
        "park": "Арендованный",
        "attr1": [
          {
            "client": "Белорусская ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень гранитный не поименованный в алфавите",
                        "amount": 473.8,
                        "stavka": 6032.845974396861,
                        "revenue": 408333.31
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 473.8,
              "stavka": 6032.845974396861,
              "revenue": 408333.31
            }
          },
          {
            "client": "Восточно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "Мечел-Транс",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат железорудный (гематит, магнетит)",
                        "amount": 484.65,
                        "stavka": 3466.8098897372124,
                        "revenue": 240000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 484.65,
              "stavka": 3466.8098897372124,
              "revenue": 240000
            }
          },
          {
            "client": "Дальневосточная ж. д.",
            "attr3": [
              {
                "road": "ППО",
                "station": [
                  {
                    "name_station": "Восточно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Глинозем",
                        "amount": 2730.6599999999994,
                        "stavka": 67524.84140949187,
                        "revenue": 4600000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 2730.6599999999994,
              "stavka": 67524.84140949187,
              "revenue": 4600000
            }
          },
          {
            "client": "Донецкая ж. д.",
            "attr3": [
              {
                "road": "ФЕРРУМ ТРЕЙД",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень гранитный не поименованный в алфавите",
                        "amount": 481.3,
                        "stavka": 2621.5747024535804,
                        "revenue": 180000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 481.3,
              "stavka": 2621.5747024535804,
              "revenue": 180000
            }
          },
          {
            "client": "Забайкальская ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Горьковская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 135.85000000000002,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень бутовый (бут)",
                        "amount": 622.3,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 542.25,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 268.85,
                        "stavka": 4106.5039070940265,
                        "revenue": 276000
                      }
                    ]
                  },
                  {
                    "name_station": "Октябрьская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень бутовый (бут)",
                        "amount": 538.3,
                        "stavka": 3045.9288054458607,
                        "revenue": 207000
                      }
                    ]
                  },
                  {
                    "name_station": "Свердловская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 200,
                        "stavka": 3105.001553277415,
                        "revenue": 207000
                      }
                    ]
                  },
                  {
                    "name_station": "Северная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 473.65000000000003,
                        "stavka": 4079.5774925491805,
                        "revenue": 276000
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 806.45,
                        "stavka": 6521.250798611493,
                        "revenue": 437500
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 3587.6500000000005,
              "stavka": 20858.262556977974,
              "revenue": 1403500
            }
          },
          {
            "client": "Западно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "Газпром Нефть, ПАО",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сера",
                        "amount": 727.1199999999999,
                        "stavka": 13946.695754471071,
                        "revenue": 921519
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Интерлогистикс",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Т-тощий",
                        "amount": 281.2,
                        "stavka": 8726.835605454438,
                        "revenue": 614046
                      }
                    ]
                  }
                ]
              },
              {
                "road": "КТС, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 4518.549999999999,
                        "stavka": 105648.93485532522,
                        "revenue": 7469000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Мечел-Транс",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 3013.55,
                        "stavka": 13838.406103293544,
                        "revenue": 966080
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 634.3000000000001,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 209.25,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 767.65,
                        "stavka": 0.08962039528948668,
                        "revenue": 6.25
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 422.04999999999995,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НОВАЯ ГОРНАЯ УК, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Промпродукт угольный",
                        "amount": 1258.5,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ПГК, АО",
                "station": [
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки СС-слабоспекающийся",
                        "amount": 136.5,
                        "stavka": 2901.1378273937316,
                        "revenue": 198000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "СКС, ООО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 855.6999999999999,
                        "stavka": 13702.502114257477,
                        "revenue": 964000
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 415.70000000000005,
                        "stavka": 0.04031729708660568,
                        "revenue": 2.8
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 987.3000000000001,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 1485.2999999999997,
                        "stavka": 25616.56745073373,
                        "revenue": 1805000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Уголь-Транс",
                "station": [
                  {
                    "name_station": "Казахстанская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки СС-слабоспекающийся",
                        "amount": 1114.3500000000001,
                        "stavka": 3128.3008578559893,
                        "revenue": 216000
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 68.95,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 16895.969999999998,
              "stavka": 187509.51050647764,
              "revenue": 13153654.05
            }
          },
          {
            "client": "Казахстанская ж. д.",
            "attr3": [
              {
                "road": "БЦК",
                "station": [
                  {
                    "name_station": "Белорусская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень, щебень, отсев гипсовый и гипсоангидритовый",
                        "amount": 271.5,
                        "stavka": 37.794117647058826,
                        "revenue": 2570
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Майкубен-Вест ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 69,
                        "stavka": 1449.2753623188405,
                        "revenue": 100000
                      }
                    ]
                  },
                  {
                    "name_station": "Кыргызская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 70,
                        "stavka": 1642.857142857143,
                        "revenue": 115000
                      }
                    ]
                  },
                  {
                    "name_station": "Свердловская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 138,
                        "stavka": 2608.695652173913,
                        "revenue": 180000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ТрансКом ТОО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат железорудный (гематит, магнетит)",
                        "amount": 1464.5,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Окатыши железорудные",
                        "amount": 2864.5,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 4877.5,
              "stavka": 5738.622274996955,
              "revenue": 397570
            }
          },
          {
            "client": "Красноярская ж. д.",
            "attr3": [
              {
                "road": "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 350.95,
                        "stavka": 0.09269809915748306,
                        "revenue": 6.5
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 139.05,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ЧЭМК, АО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Руда марганцевая, не поименованная в алфавите",
                        "amount": 427.95,
                        "stavka": 5540.211533420058,
                        "revenue": 395200
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 917.95,
              "stavka": 5540.304231519215,
              "revenue": 395206.5
            }
          },
          {
            "client": "Куйбышевская ж. д.",
            "attr3": [
              {
                "road": "ООО \"Татнефть-Транс\"",
                "station": [
                  {
                    "name_station": "Забайкальская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сера",
                        "amount": 743.399,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 1882.4,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 3277.6000000000004,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Приволжская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 272.15,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Сера",
                        "amount": 68.22,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 801.3,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "РУСНЕРУДТРЕЙД, ООО",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Отсев гранитный или каменный",
                        "amount": 67.1,
                        "stavka": 875.5588673621461,
                        "revenue": 58750
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ФЕРРУМ ТРЕЙД",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Отсев гранитный или каменный",
                        "amount": 1341.1999999999998,
                        "stavka": 2588.791239035323,
                        "revenue": 174999.99
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 8453.369,
              "stavka": 3464.350106397469,
              "revenue": 233749.99
            }
          },
          {
            "client": "Октябрьская ж. д.",
            "attr3": [
              {
                "road": "ЧЭМК, АО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Руда марганцевая, не поименованная в алфавите",
                        "amount": 689,
                        "stavka": 7435.476799415418,
                        "revenue": 513000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 689,
              "stavka": 7435.476799415418,
              "revenue": 513000
            }
          },
          {
            "client": "Свердловская ж. д.",
            "attr3": [
              {
                "road": "СтройТехно-Урал, ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 619.5999999999999,
                        "stavka": 1521.2949974532257,
                        "revenue": 104208
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 619.5999999999999,
              "stavka": 1521.2949974532257,
              "revenue": 104208
            }
          },
          {
            "client": "Северная ж. д.",
            "attr3": [
              {
                "road": "ПГК, АО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Известь негашеная",
                        "amount": 310,
                        "stavka": 5968.884721687506,
                        "revenue": 370000
                      }
                    ]
                  },
                  {
                    "name_station": "Северная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Порошок минеральный",
                        "amount": 178.8,
                        "stavka": 1878.737493071964,
                        "revenue": 110000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 488.8,
              "stavka": 7847.62221475947,
              "revenue": 480000
            }
          },
          {
            "client": "Северо-Кавказская ж. д.",
            "attr3": [
              {
                "road": "ДНК",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 1245.3999999999999,
                        "stavka": 10146.861604164567,
                        "revenue": 702221.1000000001
                      }
                    ]
                  },
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 413.79999999999995,
                        "stavka": 1487.8455019433122,
                        "revenue": 102509.1
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 1659.1999999999998,
              "stavka": 11634.707106107879,
              "revenue": 804730.2000000001
            }
          },
          {
            "client": "Узбекские ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 268.9,
                        "stavka": 3471.036464866055,
                        "revenue": 233333.32
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 268.9,
              "stavka": 3471.036464866055,
              "revenue": 233333.32
            }
          },
          {
            "client": "Южно-Уральская ж. д.",
            "attr3": [
              {
                "road": "АО \"УРАЛЬСКАЯ СТАЛЬ\"",
                "station": [
                  {
                    "name_station": "Горьковская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Заготовка стальная, не поименованная в алфавите",
                        "amount": 256.70000000000005,
                        "stavka": 3656.674855618477,
                        "revenue": 233811.2
                      }
                    ]
                  },
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Чугун передельный рядовой",
                        "amount": 656.45,
                        "stavka": 19742.316166361958,
                        "revenue": 1441774.2400000002
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Чугун передельный рядовой",
                        "amount": 3730.7000000000007,
                        "stavka": 78462.74006802865,
                        "revenue": 5533130.950000001
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сталь листовая, не поименованная в алфавите",
                        "amount": 200.85000000000002,
                        "stavka": 2687.824537175506,
                        "revenue": 179940
                      }
                    ]
                  },
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сталь листовая, не поименованная в алфавите",
                        "amount": 731.5,
                        "stavka": 7852.509541701983,
                        "revenue": 521972
                      }
                    ]
                  }
                ]
              },
              {
                "road": "РВК, ООО",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 203.3,
                        "stavka": 1265.919910789448,
                        "revenue": 85787.1
                      }
                    ]
                  }
                ]
              },
              {
                "road": "СтройТехно-Урал, ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 339.29999999999995,
                        "stavka": 2569.9890360914587,
                        "revenue": 174159
                      }
                    ]
                  }
                ]
              },
              {
                "road": "УГПХ, ООО",
                "station": [
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 206,
                        "stavka": 3377.878354471106,
                        "revenue": 231944.25
                      }
                    ]
                  }
                ]
              },
              {
                "road": "УК Южный Альянс",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Глина, не поименованная в алфавите",
                        "amount": 68,
                        "stavka": 838.2352941176471,
                        "revenue": 57000
                      },
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 67.7,
                        "stavka": 987.1617429837519,
                        "revenue": 66830.85
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 6460.500000000001,
              "stavka": 121441.24950733998,
              "revenue": 8526349.590000002
            }
          }
        ],
        "TOTAL_ROAD": {
          "amount": 49088.84900000001,
          "stavka": 456108.50874239096,
          "revenue": 31673634.96000001
        }
      },
      {
        "park": "Взят в лизинг",
        "attr1": [
          {
            "client": "Белорусская ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Горьковская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень гранитный не поименованный в алфавите",
                        "amount": 67.4,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень гранитный не поименованный в алфавите",
                        "amount": 202.8,
                        "stavka": 2588.9396195843606,
                        "revenue": 174999.99
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 270.20000000000005,
              "stavka": 2588.9396195843606,
              "revenue": 174999.99
            }
          },
          {
            "client": "Восточно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "Мечел-Транс",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат железорудный (гематит, магнетит)",
                        "amount": 208.7,
                        "stavka": 1382.808877214713,
                        "revenue": 96000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 208.7,
              "stavka": 1382.808877214713,
              "revenue": 96000
            }
          },
          {
            "client": "Дальневосточная ж. д.",
            "attr3": [
              {
                "road": "ППО",
                "station": [
                  {
                    "name_station": "Восточно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Глинозем",
                        "amount": 1971.631,
                        "stavka": 49096.043178198815,
                        "revenue": 3335000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 1971.631,
              "stavka": 49096.043178198815,
              "revenue": 3335000
            }
          },
          {
            "client": "Донецкая ж. д.",
            "attr3": [
              {
                "road": "ФЕРРУМ ТРЕЙД",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень гранитный не поименованный в алфавите",
                        "amount": 341.59999999999997,
                        "stavka": 3517.929138957288,
                        "revenue": 240000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 341.59999999999997,
              "stavka": 3517.929138957288,
              "revenue": 240000
            }
          },
          {
            "client": "Забайкальская ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень бутовый (бут)",
                        "amount": 67.2,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 67.8,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 404.25,
                        "stavka": 5123.332570536142,
                        "revenue": 345000
                      }
                    ]
                  },
                  {
                    "name_station": "Октябрьская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень бутовый (бут)",
                        "amount": 333.75,
                        "stavka": 2081.77094790116,
                        "revenue": 138000
                      }
                    ]
                  },
                  {
                    "name_station": "Северная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 199.20000000000002,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 200.15,
                        "stavka": 2810.445097426117,
                        "revenue": 187500
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 1272.3500000000001,
              "stavka": 10015.54861586342,
              "revenue": 670500
            }
          },
          {
            "client": "Западно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "Газпром Нефть, ПАО",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сера",
                        "amount": 465.44,
                        "stavka": 8765.70545920013,
                        "revenue": 582519
                      }
                    ]
                  }
                ]
              },
              {
                "road": "КТС, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 4281.7,
                        "stavka": 100588.19544043181,
                        "revenue": 6944000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Мечел-Транс",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 2475.9,
                        "stavka": 4617.647927398217,
                        "revenue": 320000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 209.70000000000002,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 70,
                        "stavka": 1971.4285714285713,
                        "revenue": 138000
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 209.85,
                        "stavka": 0.01789549033643522,
                        "revenue": 1.25
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НОВАЯ ГОРНАЯ УК, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Промпродукт угольный",
                        "amount": 2753.8,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ПГК, АО",
                "station": [
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки СС-слабоспекающийся",
                        "amount": 138,
                        "stavka": 2869.5652173913045,
                        "revenue": 198000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "СКС, ООО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 477.40000000000003,
                        "stavka": 11930.781468484194,
                        "revenue": 810000
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 279.1,
                        "stavka": 0.06017216642754662,
                        "revenue": 4.199999999999999
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 623.8,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 1110.8500000000001,
                        "stavka": 15818.630796539219,
                        "revenue": 1102000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Уголь-Транс",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки СС-слабоспекающийся",
                        "amount": 65.2,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Уголь каменный марки Т-тощий",
                        "amount": 204.70000000000002,
                        "stavka": 2094.80122324159,
                        "revenue": 137000
                      }
                    ]
                  },
                  {
                    "name_station": "Казахстанская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки СС-слабоспекающийся",
                        "amount": 1164.6999999999998,
                        "stavka": 4666.4261455065225,
                        "revenue": 324000
                      },
                      {
                        "cargo_name": "Уголь каменный марки Т-тощий",
                        "amount": 135.3,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 69.5,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 68.9,
                        "stavka": 1669.0856313497823,
                        "revenue": 115000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 14803.839999999998,
              "stavka": 154992.34594862812,
              "revenue": 10670524.45
            }
          },
          {
            "client": "Казахстанская ж. д.",
            "attr3": [
              {
                "road": "БЦК",
                "station": [
                  {
                    "name_station": "Белорусская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень, щебень, отсев гипсовый и гипсоангидритовый",
                        "amount": 67,
                        "stavka": 19.17910447761194,
                        "revenue": 1285
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Майкубен-Вест ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 69,
                        "stavka": 1449.2753623188405,
                        "revenue": 100000
                      }
                    ]
                  },
                  {
                    "name_station": "Свердловская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 139,
                        "stavka": 2590.0621118012423,
                        "revenue": 180000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ТрансКом ТОО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат железорудный (гематит, магнетит)",
                        "amount": 1387,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Окатыши железорудные",
                        "amount": 1529.5,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 3191.5,
              "stavka": 4058.5165785976947,
              "revenue": 281285
            }
          },
          {
            "client": "Красноярская ж. д.",
            "attr3": [
              {
                "road": "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 68.55,
                        "stavka": 0.018964259664478483,
                        "revenue": 1.3
                      }
                    ]
                  }
                ]
              },
              {
                "road": "УК Разрез Степной",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 69,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ЧЭМК, АО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Руда марганцевая, не поименованная в алфавите",
                        "amount": 204.5,
                        "stavka": 2818.9211828109937,
                        "revenue": 192000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 342.05,
              "stavka": 2818.9401470706584,
              "revenue": 192001.3
            }
          },
          {
            "client": "Куйбышевская ж. д.",
            "attr3": [
              {
                "road": "ООО \"Татнефть-Транс\"",
                "station": [
                  {
                    "name_station": "Забайкальская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сера",
                        "amount": 744.402,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 868.1000000000001,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 2800.2,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Приволжская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 203.7,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 395.1,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ФЕРРУМ ТРЕЙД",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Отсев гранитный или каменный",
                        "amount": 1351.8,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Щебень гранитный не поименованный в алфавите",
                        "amount": 67.5,
                        "stavka": 864.1974814814815,
                        "revenue": 58333.33
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 6430.802000000001,
              "stavka": 864.1974814814815,
              "revenue": 58333.33
            }
          },
          {
            "client": "Октябрьская ж. д.",
            "attr3": [
              {
                "road": "ЧЭМК, АО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Руда марганцевая, не поименованная в алфавите",
                        "amount": 750,
                        "stavka": 9201.124195497598,
                        "revenue": 627000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 750,
              "stavka": 9201.124195497598,
              "revenue": 627000
            }
          },
          {
            "client": "Свердловская ж. д.",
            "attr3": [
              {
                "road": "СтройТехно-Урал, ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 830.2,
                        "stavka": 3001.1420267055364,
                        "revenue": 208540
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 830.2,
              "stavka": 3001.1420267055364,
              "revenue": 208540
            }
          },
          {
            "client": "Северная ж. д.",
            "attr3": [
              {
                "road": "ПГК, АО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Известь негашеная",
                        "amount": 62.4,
                        "stavka": 1185.897435897436,
                        "revenue": 74000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 62.4,
              "stavka": 1185.897435897436,
              "revenue": 74000
            }
          },
          {
            "client": "Северо-Кавказская ж. д.",
            "attr3": [
              {
                "road": "ДНК",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 1032.1,
                        "stavka": 8030.200869994722,
                        "revenue": 551745.1500000001
                      }
                    ]
                  },
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 344,
                        "stavka": 742.8195652173913,
                        "revenue": 51254.55
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 1376.1,
              "stavka": 8773.020435212113,
              "revenue": 602999.7000000002
            }
          },
          {
            "client": "Узбекские ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 67.5,
                        "stavka": 864.1974814814815,
                        "revenue": 58333.33
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 67.5,
              "stavka": 864.1974814814815,
              "revenue": 58333.33
            }
          },
          {
            "client": "Южно-Уральская ж. д.",
            "attr3": [
              {
                "road": "АО \"УРАЛЬСКАЯ СТАЛЬ\"",
                "station": [
                  {
                    "name_station": "Горьковская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Заготовка стальная, не поименованная в алфавите",
                        "amount": 189.45,
                        "stavka": 2786.0992447359904,
                        "revenue": 175358.40000000002
                      }
                    ]
                  },
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Чугун передельный рядовой",
                        "amount": 202.64999999999998,
                        "stavka": 6192.735341592297,
                        "revenue": 417897.36
                      }
                    ]
                  },
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сталь листовая, не поименованная в алфавите",
                        "amount": 66.5,
                        "stavka": 895.3984962406015,
                        "revenue": 59544
                      }
                    ]
                  },
                  {
                    "name_station": "Свердловская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сталь листовая, не поименованная в алфавите",
                        "amount": 133.2,
                        "stavka": 1739.8484140685825,
                        "revenue": 115915
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Чугун передельный рядовой",
                        "amount": 963.55,
                        "stavka": 20033.121077835836,
                        "revenue": 1378728.4
                      }
                    ]
                  },
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сталь листовая, не поименованная в алфавите",
                        "amount": 670.8,
                        "stavka": 7166.157457061481,
                        "revenue": 480279
                      }
                    ]
                  }
                ]
              },
              {
                "road": "РВК, ООО",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 672.5500000000002,
                        "stavka": 4250.868333679643,
                        "revenue": 285877.5
                      }
                    ]
                  }
                ]
              },
              {
                "road": "СтройТехно-Урал, ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 342,
                        "stavka": 849.9707174231332,
                        "revenue": 58053
                      }
                    ]
                  },
                  {
                    "name_station": "Свердловская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 67.5,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "УГПХ, ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 201.89999999999998,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Приволжская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 132.85000000000002,
                        "stavka": 2184.573877337497,
                        "revenue": 144922.75
                      }
                    ]
                  }
                ]
              },
              {
                "road": "УК Южный Альянс",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Глина, не поименованная в алфавите",
                        "amount": 68.65,
                        "stavka": 830.298616168973,
                        "revenue": 57000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 3711.6,
              "stavka": 46929.07157614404,
              "revenue": 3173575.41
            }
          }
        ],
        "TOTAL_ROAD": {
          "amount": 35630.47300000001,
          "stavka": 299289.7227365346,
          "revenue": 20463092.509999994
        }
      },
      {
        "park": "Взят в скрытую аренду",
        "attr1": [
          {
            "client": "Западно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "КТС, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 139.05,
                        "stavka": 3221.913047076226,
                        "revenue": 224000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 139.05,
              "stavka": 3221.913047076226,
              "revenue": 224000
            }
          }
        ],
        "TOTAL_ROAD": {
          "amount": 139.05,
          "stavka": 3221.913047076226,
          "revenue": 224000
        }
      },
      {
        "park": "Слежение",
        "attr1": [
          {
            "client": "Белорусская ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень гранитный не поименованный в алфавите",
                        "amount": 135.3,
                        "stavka": 1724.5710803015406,
                        "revenue": 116666.66
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 135.3,
              "stavka": 1724.5710803015406,
              "revenue": 116666.66
            }
          },
          {
            "client": "Забайкальская ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Октябрьская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень бутовый (бут)",
                        "amount": 136,
                        "stavka": 1012.4724871606749,
                        "revenue": 69000
                      }
                    ]
                  },
                  {
                    "name_station": "Северная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 67.75,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 203.75,
              "stavka": 1012.4724871606749,
              "revenue": 69000
            }
          },
          {
            "client": "Западно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "Газпром Нефть, ПАО",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сера",
                        "amount": 66.36,
                        "stavka": 1223.221820373719,
                        "revenue": 81173
                      }
                    ]
                  }
                ]
              },
              {
                "road": "КТС, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 278.04999999999995,
                        "stavka": 6445.116225092512,
                        "revenue": 448000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 208.25,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 208.45,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НОВАЯ ГОРНАЯ УК, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Промпродукт угольный",
                        "amount": 139,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "СКС, ООО",
                "station": [
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 69.7,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 208.25,
                        "stavka": 1603.4359341445956,
                        "revenue": 112000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Уголь-Транс",
                "station": [
                  {
                    "name_station": "Казахстанская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки СС-слабоспекающийся",
                        "amount": 69,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 69.3,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 1316.36,
              "stavka": 9271.773979610827,
              "revenue": 641173
            }
          },
          {
            "client": "Красноярская ж. д.",
            "attr3": [
              {
                "road": "ЧЭМК, АО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Руда марганцевая, не поименованная в алфавите",
                        "amount": 70,
                        "stavka": 914.2857142857143,
                        "revenue": 64000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 70,
              "stavka": 914.2857142857143,
              "revenue": 64000
            }
          },
          {
            "client": "Куйбышевская ж. д.",
            "attr3": [
              {
                "road": "ООО \"Татнефть-Транс\"",
                "station": [
                  {
                    "name_station": "Забайкальская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сера",
                        "amount": 202.654,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 465.15,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 202.55,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 132.25,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 1002.604,
              "stavka": 0,
              "revenue": 0
            }
          },
          {
            "client": "Северо-Кавказская ж. д.",
            "attr3": [
              {
                "road": "ДНК",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 68.3,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 552,
                        "stavka": 740.6726878612717,
                        "revenue": 51254.55
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 620.3,
              "stavka": 740.6726878612717,
              "revenue": 51254.55
            }
          },
          {
            "client": "Южно-Уральская ж. д.",
            "attr3": [
              {
                "road": "УК Южный Альянс",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Глина, не поименованная в алфавите",
                        "amount": 206.75,
                        "stavka": 828.4883720930233,
                        "revenue": 57000
                      },
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 68.1,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 274.85,
              "stavka": 828.4883720930233,
              "revenue": 57000
            }
          }
        ],
        "TOTAL_ROAD": {
          "amount": 3623.164,
          "stavka": 14492.26432131305,
          "revenue": 999094.2100000001
        }
      },
      {
        "park": "Собственный",
        "attr1": [
          {
            "client": "Восточно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "Мечел-Транс",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат железорудный (гематит, магнетит)",
                        "amount": 138.85,
                        "stavka": 694.6454413892909,
                        "revenue": 48000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 138.85,
              "stavka": 694.6454413892909,
              "revenue": 48000
            }
          },
          {
            "client": "Дальневосточная ж. д.",
            "attr3": [
              {
                "road": "ППО",
                "station": [
                  {
                    "name_station": "Восточно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Глинозем",
                        "amount": 68.839,
                        "stavka": 1670.564650851988,
                        "revenue": 115000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 68.839,
              "stavka": 1670.564650851988,
              "revenue": 115000
            }
          },
          {
            "client": "Забайкальская ж. д.",
            "attr3": [
              {
                "road": "ТК РУТ Логистик",
                "station": [
                  {
                    "name_station": "Октябрьская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Камень бутовый (бут)",
                        "amount": 69.1,
                        "stavka": 998.5528219971058,
                        "revenue": 69000
                      }
                    ]
                  },
                  {
                    "name_station": "Северная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 135.25,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 68.6,
                        "stavka": 911.0787172011662,
                        "revenue": 62500
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 272.95,
              "stavka": 1909.631539198272,
              "revenue": 131500
            }
          },
          {
            "client": "Западно-Сибирская ж. д.",
            "attr3": [
              {
                "road": "КТС, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 279.45,
                        "stavka": 6412.603359485813,
                        "revenue": 448000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Мечел-Транс",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат угольный",
                        "amount": 139,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                "station": [
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 70,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "НОВАЯ ГОРНАЯ УК, ООО",
                "station": [
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Промпродукт угольный",
                        "amount": 555.5,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "СКС, ООО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 139.4,
                        "stavka": 1936.8723098995695,
                        "revenue": 135000
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 209.10000000000002,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 69.7,
                        "stavka": 1578.1922525107602,
                        "revenue": 110000
                      }
                    ]
                  }
                ]
              },
              {
                "road": "Уголь-Транс",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Т-тощий",
                        "amount": 69.9,
                        "stavka": 1959.942775393419,
                        "revenue": 137000
                      }
                    ]
                  },
                  {
                    "name_station": "Казахстанская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки СС-слабоспекающийся",
                        "amount": 208.70000000000002,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 1740.7500000000005,
              "stavka": 11887.610697289561,
              "revenue": 830000
            }
          },
          {
            "client": "Казахстанская ж. д.",
            "attr3": [
              {
                "road": "ТрансКом ТОО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Концентрат железорудный (гематит, магнетит)",
                        "amount": 209.5,
                        "stavka": 0,
                        "revenue": 0
                      },
                      {
                        "cargo_name": "Окатыши железорудные",
                        "amount": 279.5,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 489,
              "stavka": 0,
              "revenue": 0
            }
          },
          {
            "client": "Красноярская ж. д.",
            "attr3": [
              {
                "road": "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                "station": [
                  {
                    "name_station": "Дальневосточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Уголь каменный марки Д",
                        "amount": 69.5,
                        "stavka": 0.018705035971223024,
                        "revenue": 1.3
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 69.5,
              "stavka": 0.018705035971223024,
              "revenue": 1.3
            }
          },
          {
            "client": "Куйбышевская ж. д.",
            "attr3": [
              {
                "road": "ООО \"Татнефть-Транс\"",
                "station": [
                  {
                    "name_station": "Забайкальская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Сера",
                        "amount": 68.22,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 66.75,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Одесская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 265.05,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  },
                  {
                    "name_station": "Юго-Восточная ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Кокс нефтяной анодный",
                        "amount": 134.75,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              },
              {
                "road": "ФЕРРУМ ТРЕЙД",
                "station": [
                  {
                    "name_station": "Московская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Отсев гранитный или каменный",
                        "amount": 339.4,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 874.17,
              "stavka": 0,
              "revenue": 0
            }
          },
          {
            "client": "Октябрьская ж. д.",
            "attr3": [
              {
                "road": "ЧЭМК, АО",
                "station": [
                  {
                    "name_station": "Южно-Уральская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Руда марганцевая, не поименованная в алфавите",
                        "amount": 348,
                        "stavka": 4095.031055900621,
                        "revenue": 285000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 348,
              "stavka": 4095.031055900621,
              "revenue": 285000
            }
          },
          {
            "client": "Свердловская ж. д.",
            "attr3": [
              {
                "road": "СтройТехно-Урал, ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 68.35,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 68.35,
              "stavka": 0,
              "revenue": 0
            }
          },
          {
            "client": "Северная ж. д.",
            "attr3": [
              {
                "road": "ПГК, АО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Известь негашеная",
                        "amount": 65.2,
                        "stavka": 1134.9693251533743,
                        "revenue": 74000
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 65.2,
              "stavka": 1134.9693251533743,
              "revenue": 74000
            }
          },
          {
            "client": "Северо-Кавказская ж. д.",
            "attr3": [
              {
                "road": "ДНК",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 69.2,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 69.2,
              "stavka": 0,
              "revenue": 0
            }
          },
          {
            "client": "Южно-Уральская ж. д.",
            "attr3": [
              {
                "road": "АО \"УРАЛЬСКАЯ СТАЛЬ\"",
                "station": [
                  {
                    "name_station": "Горьковская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Заготовка стальная, не поименованная в алфавите",
                        "amount": 68.2,
                        "stavka": 857.0791788856305,
                        "revenue": 58452.8
                      }
                    ]
                  },
                  {
                    "name_station": "Северо-Кавказская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Чугун передельный рядовой",
                        "amount": 138.15,
                        "stavka": 2851.4141469395454,
                        "revenue": 196961.2
                      }
                    ]
                  }
                ]
              },
              {
                "road": "РВК, ООО",
                "station": [
                  {
                    "name_station": "Западно-Сибирская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 67.4,
                        "stavka": 424.2685459940653,
                        "revenue": 28595.7
                      }
                    ]
                  }
                ]
              },
              {
                "road": "СтройТехно-Урал, ООО",
                "station": [
                  {
                    "name_station": "Куйбышевская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 67.8,
                        "stavka": 856.2389380530974,
                        "revenue": 58053
                      }
                    ]
                  }
                ]
              },
              {
                "road": "УГПХ, ООО",
                "station": [
                  {
                    "name_station": "Приволжская ж. д.",
                    "cargo": [
                      {
                        "cargo_name": "Щебень, не поименованный в алфавите",
                        "amount": 68.5,
                        "stavka": 0,
                        "revenue": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "total": {
              "amount": 410.05,
              "stavka": 4989.000809872338,
              "revenue": 342062.7
            }
          }
        ],
        "TOTAL_ROAD": {
          "amount": 4614.8589999999995,
          "stavka": 26381.472224691417,
          "revenue": 1825564
        }
      }
    ],
    "total": {
      "amount": 93096.395,
      "stavka": 799493.8810720065,
      "revenue": 55185385.679999985
    }
  }
],
        loader: false,
        date_begin: "",
        date_end: "",
        wag_type: "Полувагон",
  
        //     objects:
        //   [
        // {
        //   "data": [
        //     {
        //       "park": 'Собственный',
        //       'attr0': [
        //         {
        //         "road": "Белорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "НЕМосковская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 55,
        //         "revenue": 55555,
        //         "cargo": 50000
        //       }
        //       },
        //       {
        //         "road": "НЕБелорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 31,
        //         "revenue": 79818000,
        //         "cargo": 2124
        //       }
        //       },
        //       {
        //         "road": "Белорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "НЕМосковская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 31,
        //         "revenue": 79818000,
        //         "cargo": 2124
        //       }
        //       },
        //       {
        //         "road": "НЕБелорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 },
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }, {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }, {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 31,
        //         "revenue": 79818000,
        //         "cargo": 2124
        //       }
        //       }
        //     ]
    
        //     },
        //     {
        //       "park": 'Арендный',
        //       'attr0': [
        //         {
        //         "road": "Белорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "НЕМосковская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 31,
        //         "revenue": 79818000,
        //         "cargo": 2124
        //       }
        //       },
        //       {
        //         "road": "НЕБелорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 31,
        //         "revenue": 79818000,
        //         "cargo": 2124
        //       }
        //       },
        //       {
        //         "road": "Белорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "НЕМосковская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 31,
        //         "revenue": 79818000,
        //         "cargo": 2124
        //       }
        //       },
        //       {
        //         "road": "НЕБелорусская ж. д.",
        //         "attr1": [
        //         {
        //           "client": "РУСНЕРУДТРЕЙД, ООО",
        //           "attr3": [
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 },
        //                 {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }, {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }, {
        //                   "name": "Щебень гранитный не поименованный в 123",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 5х20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo": 341
        //                 }
        //               ]
        //             },
        //             {
        //               "road": "Московская ж. д.",
        //               "cargo": [
        //                 {
        //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
        //                   "loads": 26,
        //                   "revenue": 76214000,
        //                   "cargo:": 1783
        //                 },
        //                 {
        //                   "name": "Щебень гранитный фракции 12321 24gх20",
        //                   "loads": 5,
        //                   "revenue": 3604000,
        //                   "cargo:": 341
        //                 }
        //               ]
        //             }
        //           ],
        //           "total": {
        //             "amount": 31,
        //             "revenue": 79818000,
        //             "cargo": 2124
        //           }
        //         }
        //       ],
        //       "TOTAL_ROAD": {
        //         "amount": 31,
        //         "revenue": 79818000,
        //         "cargo": 2124
        //       }
        //       }
        //     ]
        //     }
        //         ],
        //         'total': {
        //           cargo: 'ALL_TOTAL',
        //           amount: 'ALL_TOTALA',
        //           wo_nds: 'ALL_TOTALWO'
        //         }
        //       }],
        objects2: "",

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
            park: key,
            attr1: Object.keys(this.objects2.data[key].data).map((client) => {
              return {
                client,
                attr3: Object.keys(this.objects2.data[key].data[client].data).map(
                  (road) => {
                    return {
                      road,
                      station: Object.keys(
                        this.objects2.data[key].data[client].data[road].data
                      ).map((station) => {
                        return {
                          name_station: station,
                          cargo: Object.keys(
                            this.objects2.data[key].data[client].data[road].data[station].data
                          ).map((cargo) => {
                            return{
                              cargo_name: cargo,
                              ...this.objects2.data[key].data[client].data[road].data[station].data[cargo]
                            }
                          })
                          // ...this.objects2.data[key].data[client].data[road].data[station].data,
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
          .getUO46(this.date_begin, this.date_end, this.wag_type)
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