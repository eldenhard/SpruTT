<template>
  <div>
    <!-- <div style="display: flex; justify-content: space-between;">
  <pre>{{ obj }}</pre>
  <pre>{{ norm }}</pre>
</div> -->

    <!-- {{ object }} -->

    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData">
      <label for="">
        Тип вагона
        <br />
        <select name="" id="" v-model="wag_type" style="width: 100%">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    </Periods>
    <br />

    <p>Форма 4.6. "Справка о выполнении перевозок вагоно-цистернами"</p>
    <!-- <div :id="'TableReport6'+id_page" ></div> -->
    <div class="block-table">


<!-- <table>
        <tbody>
          <template v-for="(valueClient, client) in dataReport6">
            <tr :key="valueClient.id">
              <td v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">{{ client }}</td>
              <template v-for="road in getNextKey(dataReport6[client])">
            <tr :key="road.id">
              <td >{{ road }}</td>

              <template v-for="clientRoad in getNextKey(dataReport6[client][road])">
                        <tr :key="clientRoad.id">
                         <td>{{ clientRoad }}</td>
                          <template v-for="clientRoadRoad in getNextKey(dataReport6[client][road][clientRoad])">
                              <tr :key="clientRoadRoad.id">
                                <td >{{ clientRoadRoad }}</td>
                                <template  v-for="cargo in getNextKey(dataReport6[client][road][clientRoad][clientRoadRoad])">
                                    <tr :key="cargo.id">
                                      <td >{{ cargo }}</td>
                                      <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad][cargo]['weight']?.toFixed(2) }}</td>
                                      <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad][cargo]['stavka_per_ton']?.toFixed(2) }}</td>
                                      <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad][cargo]['revenue']?.toFixed(2) }}</td>
                                    </tr>  
                                </template>
                              </tr>
                              <tr style="background: #FDFFD9;">
                                <td>ИТОГО {{ clientRoadRoad }}</td>
                                <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad]['weight']?.toFixed(2) }}</td>
                                <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad]['stavka_per_ton']?.toFixed(2) }}</td>
                                <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad]['revenue']?.toFixed(2) }}</td>

                              </tr>
                          </template>
                        </tr>
                        <tr style="background: #49b677;">
                          <td>ИТОГО{{ clientRoad }}</td>
                          <td>{{ dataReport6[client][road][clientRoad]['weight']?.toFixed(2) }}</td>
                          <td>{{ dataReport6[client][road][clientRoad]['stavka_per_ton']?.toFixed(2) }}</td>
                          <td>{{ dataReport6[client][road][clientRoad]['revenue']?.toFixed(2) }}</td>
                        </tr>
                    </template>
            </tr>
            <tr style="background: rgb(61, 152, 194);">
              <td>ИТОГО3 {{ road }}</td>
              <td>{{ dataReport6[client][road]['weight']?.toFixed(2) }}</td>
              <td>{{ dataReport6[client][road]['stavka_per_ton']?.toFixed(2) }}</td>
              <td>{{ dataReport6[client][road]['revenue']?.toFixed(2) }}</td>
            </tr>
          </template>
          </tr>
          </template>
        </tbody>
      </table>  -->

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
      id_page: new Date(),

      normalized: [],
      norm: [],
      objects2: "",

      loader: false,
      date_begin: "",
      date_end: "",
      wag_type: "Полувагон",

      dataReport6: {
        "Мечел-Транс": {
          "weight": 16827.125000000007,
          "stavka_per_ton": 254880.26188736327,
          "revenue": 17728502.950000003,
          "РЖД": {
            "weight": 16827.125000000007,
            "stavka_per_ton": 254880.26188736327,
            "revenue": 17728502.950000003,
            "А": {
              "weight": 12153.075,
              "stavka_per_ton": 181532.63524162848,
              "revenue": 12684253.350000001,
              "РЖД": {
                "weight": 11948.580000000002,
                "stavka_per_ton": 178073.52021176845,
                "revenue": 12448439.350000001,
                "Концентрат угольный": {
                  "weight": 10710.199999999999,
                  "stavka_per_ton": 167848.3454488653,
                  "revenue": 11749600
                },
                "Уголь каменный марки Т-тощий": {
                  "weight": 420.2,
                  "stavka_per_ton": 1302.2972242134908,
                  "revenue": 91200
                },
                "Заготовка для переката качественная": {
                  "weight": 336.20000000000005,
                  "stavka_per_ton": 3049.8261350044313,
                  "revenue": 205050.05999999997
                },
                "Катанка стальная": {
                  "weight": 67.9,
                  "stavka_per_ton": 763.1081001472753,
                  "revenue": 51815.04
                },
                "Блюмсы": {
                  "weight": 63.45,
                  "stavka_per_ton": 665.8723404255319,
                  "revenue": 42249.6
                },
                "Прокат черных металлов, не поименованный в алфавите": {
                  "weight": 201.43,
                  "stavka_per_ton": 3083.213054265268,
                  "revenue": 207004.65
                },
                "Концентрат железорудный (гематит, магнетит)": {
                  "weight": 149.2,
                  "stavka_per_ton": 1360.8579088471852,
                  "revenue": 101520
                }
              },
              "КЗХ": {
                "weight": 136.825,
                "stavka_per_ton": 2338.766278566999,
                "revenue": 160000,
                "Прокат черных металлов, не поименованный в алфавите": {
                  "weight": 136.825,
                  "stavka_per_ton": 2338.766278566999,
                  "revenue": 160000
                }
              },
              "УЗ": {
                "weight": 67.67,
                "stavka_per_ton": 1120.3487512930396,
                "revenue": 75814,
                "Прокат черных металлов, не поименованный в алфавите": {
                  "weight": 67.67,
                  "stavka_per_ton": 1120.3487512930396,
                  "revenue": 75814
                }
              }
            },
            "С": {
              "weight": 4604.450000000001,
              "stavka_per_ton": 72255.67262274635,
              "revenue": 4968249.6,
              "РЖД": {
                "weight": 4604.450000000001,
                "stavka_per_ton": 72255.67262274635,
                "revenue": 4968249.6,
                "Концентрат угольный": {
                  "weight": 4406.250000000001,
                  "stavka_per_ton": 70684.45520370564,
                  "revenue": 4864000
                },
                "Концентрат железорудный (гематит, магнетит)": {
                  "weight": 69.8,
                  "stavka_per_ton": 673.352435530086,
                  "revenue": 47000
                },
                "Блюмсы": {
                  "weight": 63.3,
                  "stavka_per_ton": 667.4502369668246,
                  "revenue": 42249.6
                },
                "Уголь каменный марки Т-тощий": {
                  "weight": 65.1,
                  "stavka_per_ton": 230.41474654377882,
                  "revenue": 15000
                }
              }
            },
            "СЛ": {
              "weight": 69.6,
              "stavka_per_ton": 1091.9540229885058,
              "revenue": 76000,
              "РЖД": {
                "weight": 69.6,
                "stavka_per_ton": 1091.9540229885058,
                "revenue": 76000,
                "Концентрат угольный": {
                  "weight": 69.6,
                  "stavka_per_ton": 1091.9540229885058,
                  "revenue": 76000
                }
              }
            }
          }
        },
        "weight": 308407.24899999815,
        "stavka_per_ton": 9695650.208264066,
        "revenue": 547016568.9180003,
        "НОВАЯ ГОРНАЯ УК, ООО": {
          "weight": 23706.700000000008,
          "stavka_per_ton": 606586.0258826679,
          "revenue": 42050000,
          "РЖД": {
            "weight": 23706.700000000008,
            "stavka_per_ton": 606586.0258826679,
            "revenue": 42050000,
            "А": {
              "weight": 16207.400000000003,
              "stavka_per_ton": 413821.3000305221,
              "revenue": 28793000,
              "КЗХ": {
                "weight": 15725.550000000003,
                "stavka_per_ton": 398058.43461628514,
                "revenue": 27708000,
                "Антрацит": {
                  "weight": 15725.550000000003,
                  "stavka_per_ton": 398058.43461628514,
                  "revenue": 27708000
                }
              },
              "РЖД": {
                "weight": 481.84999999999997,
                "stavka_per_ton": 15762.86541423697,
                "revenue": 1085000,
                "Концентрат угольный": {
                  "weight": 343.59999999999997,
                  "stavka_per_ton": 11278.235532888822,
                  "revenue": 775000
                },
                "Антрацит": {
                  "weight": 138.25,
                  "stavka_per_ton": 4484.629881348146,
                  "revenue": 310000
                }
              }
            },
            "С": {
              "weight": 7361.149999999998,
              "stavka_per_ton": 189261.28343018983,
              "revenue": 13015000,
              "КЗХ": {
                "weight": 7222.3499999999985,
                "stavka_per_ton": 184794.41536619945,
                "revenue": 12705000,
                "Антрацит": {
                  "weight": 7222.3499999999985,
                  "stavka_per_ton": 184794.41536619945,
                  "revenue": 12705000
                }
              },
              "РЖД": {
                "weight": 138.8,
                "stavka_per_ton": 4466.868063990367,
                "revenue": 310000,
                "Концентрат угольный": {
                  "weight": 138.8,
                  "stavka_per_ton": 4466.868063990367,
                  "revenue": 310000
                }
              }
            },
            "СЛ": {
              "weight": 138.15,
              "stavka_per_ton": 3503.4424219560497,
              "revenue": 242000,
              "КЗХ": {
                "weight": 138.15,
                "stavka_per_ton": 3503.4424219560497,
                "revenue": 242000,
                "Антрацит": {
                  "weight": 138.15,
                  "stavka_per_ton": 3503.4424219560497,
                  "revenue": 242000
                }
              }
            }
          }
        },
        "Т-СЕРВИС ЛОГИСТИКС, ООО": {
          "weight": 3450.496000000002,
          "stavka_per_ton": 109928.80607876985,
          "revenue": 7585000,
          "КЗХ": {
            "weight": 1720.6960000000001,
            "stavka_per_ton": 63132.522017998235,
            "revenue": 4345000,
            "А": {
              "weight": 1106.6480000000001,
              "stavka_per_ton": 40922.97035141034,
              "revenue": 2830000,
              "РЖД": {
                "weight": 1106.6480000000001,
                "stavka_per_ton": 40922.97035141034,
                "revenue": 2830000,
                "Ферросплавы, не поименованные в алфавите": {
                  "weight": 899.648,
                  "stavka_per_ton": 31937.463105033523,
                  "revenue": 2210000
                },
                "Уголь каменный марки Д": {
                  "weight": 207,
                  "stavka_per_ton": 8985.507246376812,
                  "revenue": 620000
                }
              }
            },
            "С": {
              "weight": 614.0479999999999,
              "stavka_per_ton": 22209.551666587886,
              "revenue": 1515000,
              "РЖД": {
                "weight": 614.0479999999999,
                "stavka_per_ton": 22209.551666587886,
                "revenue": 1515000,
                "Ферросплавы, не поименованные в алфавите": {
                  "weight": 549.0479999999999,
                  "stavka_per_ton": 19824.936281972503,
                  "revenue": 1360000
                },
                "Уголь каменный марки Д": {
                  "weight": 65,
                  "stavka_per_ton": 2384.6153846153848,
                  "revenue": 155000
                }
              }
            }
          },
          "РЖД": {
            "weight": 1729.8000000000006,
            "stavka_per_ton": 46796.28406077163,
            "revenue": 3240000,
            "С": {
              "weight": 1225.6000000000001,
              "stavka_per_ton": 33660.552212489565,
              "revenue": 2295000,
              "РЖД": {
                "weight": 1225.6000000000001,
                "stavka_per_ton": 33660.552212489565,
                "revenue": 2295000,
                "Концентрат угольный": {
                  "weight": 1225.6000000000001,
                  "stavka_per_ton": 33660.552212489565,
                  "revenue": 2295000
                }
              }
            },
            "А": {
              "weight": 504.20000000000005,
              "stavka_per_ton": 13135.731848282066,
              "revenue": 945000,
              "РЖД": {
                "weight": 504.20000000000005,
                "stavka_per_ton": 13135.731848282066,
                "revenue": 945000,
                "Концентрат угольный": {
                  "weight": 504.20000000000005,
                  "stavka_per_ton": 13135.731848282066,
                  "revenue": 945000
                }
              }
            }
          }
        },
        "Уголь-Транс": {
          "weight": 28717.75000000002,
          "stavka_per_ton": 630867.6902647014,
          "revenue": 43882000,
          "РЖД": {
            "weight": 28717.75000000002,
            "stavka_per_ton": 630867.6902647014,
            "revenue": 43882000,
            "А": {
              "weight": 19324.4,
              "stavka_per_ton": 425032.9687953508,
              "revenue": 29670000,
              "КЗХ": {
                "weight": 18065.700000000004,
                "stavka_per_ton": 389139.96906522254,
                "revenue": 27158600,
                "Уголь каменный, не поименованный в алфавите": {
                  "weight": 4313.2,
                  "stavka_per_ton": 92991.40287654992,
                  "revenue": 6472000
                },
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 10726.650000000001,
                  "stavka_per_ton": 231073.24867551328,
                  "revenue": 16102800
                },
                "Уголь каменный марки Г-газовый": {
                  "weight": 572.9,
                  "stavka_per_ton": 12209.725897826353,
                  "revenue": 875600
                },
                "Уголь каменный марки Д": {
                  "weight": 2039.95,
                  "stavka_per_ton": 43886.93001233691,
                  "revenue": 3090200
                },
                "Уголь каменный марки Т-тощий": {
                  "weight": 206.35000000000002,
                  "stavka_per_ton": 4492.526013111665,
                  "revenue": 309000
                },
                "Уголь каменный марки К-коксовый": {
                  "weight": 206.64999999999998,
                  "stavka_per_ton": 4486.135589884588,
                  "revenue": 309000
                }
              },
              "РЖД": {
                "weight": 1258.7,
                "stavka_per_ton": 35892.99973012819,
                "revenue": 2511400,
                "Уголь каменный, не поименованный в алфавите": {
                  "weight": 910.65,
                  "stavka_per_ton": 26052.357156662554,
                  "revenue": 1826400
                },
                "Концентрат угольный": {
                  "weight": 69.75,
                  "stavka_per_ton": 1964.15770609319,
                  "revenue": 137000
                },
                "Уголь каменный марки Т-тощий": {
                  "weight": 208.60000000000002,
                  "stavka_per_ton": 5910.918152881764,
                  "revenue": 411000
                },
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 69.7,
                  "stavka_per_ton": 1965.5667144906743,
                  "revenue": 137000
                }
              }
            },
            "С": {
              "weight": 7245.049999999999,
              "stavka_per_ton": 159758.28979486012,
              "revenue": 11019000,
              "КЗХ": {
                "weight": 6831.699999999998,
                "stavka_per_ton": 147819.9566107604,
                "revenue": 10197000,
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 3927.0499999999993,
                  "stavka_per_ton": 85251.00722486652,
                  "revenue": 5871000
                },
                "Уголь каменный, не поименованный в алфавите": {
                  "weight": 1166.7999999999997,
                  "stavka_per_ton": 25525.501734453268,
                  "revenue": 1751000
                },
                "Уголь каменный марки Д": {
                  "weight": 1249.4499999999998,
                  "stavka_per_ton": 26709.694399126864,
                  "revenue": 1854000
                },
                "Уголь каменный марки Г-газовый": {
                  "weight": 418.8,
                  "stavka_per_ton": 8853.868194842407,
                  "revenue": 618000
                },
                "Уголь каменный марки Т-тощий": {
                  "weight": 69.6,
                  "stavka_per_ton": 1479.8850574712644,
                  "revenue": 103000
                }
              },
              "РЖД": {
                "weight": 413.35,
                "stavka_per_ton": 11938.333184099722,
                "revenue": 822000,
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 69.2,
                  "stavka_per_ton": 1979.7687861271675,
                  "revenue": 137000
                },
                "Уголь каменный марки Т-тощий": {
                  "weight": 205.1,
                  "stavka_per_ton": 6017.494714967387,
                  "revenue": 411000
                },
                "Концентрат угольный": {
                  "weight": 139.05,
                  "stavka_per_ton": 3941.069683005167,
                  "revenue": 274000
                }
              }
            },
            "СЛ": {
              "weight": 2148.2999999999997,
              "stavka_per_ton": 46076.43167449146,
              "revenue": 3193000,
              "КЗХ": {
                "weight": 2148.2999999999997,
                "stavka_per_ton": 46076.43167449146,
                "revenue": 3193000,
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 1316.2000000000003,
                  "stavka_per_ton": 28251.285390113655,
                  "revenue": 1957000
                },
                "Уголь каменный марки Д": {
                  "weight": 832.1,
                  "stavka_per_ton": 17825.146284377795,
                  "revenue": 1236000
                }
              }
            }
          }
        },
        "ТАТНЕФТЬ-ТРАНС, ООО": {
          "weight": 76338.89500000012,
          "stavka_per_ton": 2586364.016772771,
          "revenue": 173487783.69999978,
          "РЖД": {
            "weight": 76338.89500000012,
            "stavka_per_ton": 2586364.016772771,
            "revenue": 173487783.69999978,
            "А": {
              "weight": 52014.28199999998,
              "stavka_per_ton": 1743191.5844483916,
              "revenue": 117498324.89999989,
              "УЗ": {
                "weight": 23286.449999999993,
                "stavka_per_ton": 841191.0367089086,
                "revenue": 56572384,
                "Кокс нефтяной анодный": {
                  "weight": 23286.449999999993,
                  "stavka_per_ton": 841191.0367089086,
                  "revenue": 56572384
                }
              },
              "КЗХ": {
                "weight": 332.8,
                "stavka_per_ton": 0,
                "revenue": 0,
                "Кокс нефтяной анодный": {
                  "weight": 332.8,
                  "stavka_per_ton": 0,
                  "revenue": 0
                }
              },
              "РЖД": {
                "weight": 28395.031999999974,
                "stavka_per_ton": 902000.5477394836,
                "revenue": 60925940.900000066,
                "Кокс нефтяной анодный": {
                  "weight": 22495.999999999978,
                  "stavka_per_ton": 749848.5878790378,
                  "revenue": 50609986.90000001
                },
                "Сера": {
                  "weight": 5899.031999999994,
                  "stavka_per_ton": 152151.95986044608,
                  "revenue": 10315953.999999989
                }
              }
            },
            "С": {
              "weight": 19256.327999999987,
              "stavka_per_ton": 672367.1383128965,
              "revenue": 44602477.70000002,
              "РЖД": {
                "weight": 11882.027999999993,
                "stavka_per_ton": 401475.24162129377,
                "revenue": 26617037.700000007,
                "Кокс нефтяной анодный": {
                  "weight": 10200.599999999997,
                  "stavka_per_ton": 354531.635630744,
                  "revenue": 23462215.7
                },
                "Сера": {
                  "weight": 1681.428,
                  "stavka_per_ton": 46943.605990549644,
                  "revenue": 3154822.000000001
                }
              },
              "УЗ": {
                "weight": 7308.250000000005,
                "stavka_per_ton": 270891.89669160324,
                "revenue": 17985440,
                "Кокс нефтяной анодный": {
                  "weight": 7308.250000000005,
                  "stavka_per_ton": 270891.89669160324,
                  "revenue": 17985440
                }
              },
              "КЗХ": {
                "weight": 66.05,
                "stavka_per_ton": 0,
                "revenue": 0,
                "Кокс нефтяной анодный": {
                  "weight": 66.05,
                  "stavka_per_ton": 0,
                  "revenue": 0
                }
              }
            },
            "СЛ": {
              "weight": 2535.2349999999997,
              "stavka_per_ton": 82528.68811107388,
              "revenue": 5502373.8,
              "РЖД": {
                "weight": 2001.685,
                "stavka_per_ton": 62913.675546969076,
                "revenue": 4194341.8,
                "Кокс нефтяной анодный": {
                  "weight": 1665.6000000000001,
                  "stavka_per_ton": 57717.19548984068,
                  "revenue": 3845050
                },
                "Сера": {
                  "weight": 336.085,
                  "stavka_per_ton": 5196.480057128406,
                  "revenue": 349291.80000000005
                }
              },
              "УЗ": {
                "weight": 533.55,
                "stavka_per_ton": 19615.012564104778,
                "revenue": 1308032,
                "Кокс нефтяной анодный": {
                  "weight": 533.55,
                  "stavka_per_ton": 19615.012564104778,
                  "revenue": 1308032
                }
              }
            },
            "Ч": {
              "weight": 2533.05,
              "stavka_per_ton": 88276.60590041245,
              "revenue": 5884607.300000001,
              "РЖД": {
                "weight": 1592,
                "stavka_per_ton": 54216.57493599782,
                "revenue": 3595551.3,
                "Кокс нефтяной анодный": {
                  "weight": 1592,
                  "stavka_per_ton": 54216.57493599782,
                  "revenue": 3595551.3
                }
              },
              "УЗ": {
                "weight": 941.05,
                "stavka_per_ton": 34060.03096441464,
                "revenue": 2289056,
                "Кокс нефтяной анодный": {
                  "weight": 941.05,
                  "stavka_per_ton": 34060.03096441464,
                  "revenue": 2289056
                }
              }
            }
          }
        },
        "СДС-Уголь": {
          "weight": 44218.87000000002,
          "stavka_per_ton": 2817750.7565350607,
          "revenue": 76968000,
          "РЖД": {
            "weight": 44218.87000000002,
            "stavka_per_ton": 2817750.7565350607,
            "revenue": 76968000,
            "А": {
              "weight": 28924.569999999898,
              "stavka_per_ton": 2434406.6785968994,
              "revenue": 50448000,
              "РЖД": {
                "weight": 28924.569999999898,
                "stavka_per_ton": 2434406.6785968994,
                "revenue": 50448000,
                "Уголь каменный марки Д": {
                  "weight": 6848.850000000001,
                  "stavka_per_ton": 171440.19605842564,
                  "revenue": 11986800
                },
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 22075.719999999914,
                  "stavka_per_ton": 2262966.4825384733,
                  "revenue": 38461200
                }
              }
            },
            "С": {
              "weight": 13765.649999999987,
              "stavka_per_ton": 345348.3418379802,
              "revenue": 23880000,
              "РЖД": {
                "weight": 13765.649999999987,
                "stavka_per_ton": 345348.3418379802,
                "revenue": 23880000,
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 10805.549999999997,
                  "stavka_per_ton": 270357.3047866521,
                  "revenue": 18720000
                },
                "Уголь каменный марки Д": {
                  "weight": 2960.1,
                  "stavka_per_ton": 74991.03705132792,
                  "revenue": 5160000
                }
              }
            },
            "СЛ": {
              "weight": 1389.8999999999996,
              "stavka_per_ton": 34536.26540958012,
              "revenue": 2400000,
              "РЖД": {
                "weight": 1389.8999999999996,
                "stavka_per_ton": 34536.26540958012,
                "revenue": 2400000,
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 1389.8999999999996,
                  "stavka_per_ton": 34536.26540958012,
                  "revenue": 2400000
                }
              }
            },
            "Ч": {
              "weight": 138.75,
              "stavka_per_ton": 3459.470690595538,
              "revenue": 240000,
              "РЖД": {
                "weight": 138.75,
                "stavka_per_ton": 3459.470690595538,
                "revenue": 240000,
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 138.75,
                  "stavka_per_ton": 3459.470690595538,
                  "revenue": 240000
                }
              }
            }
          }
        },
        "КАРБОН УГОЛЬ, ООО": {
          "weight": 4615.599999999998,
          "stavka_per_ton": 61827.862426144966,
          "revenue": 4258800,
          "РЖД": {
            "weight": 4615.599999999998,
            "stavka_per_ton": 61827.862426144966,
            "revenue": 4258800,
            "А": {
              "weight": 3718.6999999999994,
              "stavka_per_ton": 49956.7298328517,
              "revenue": 3439800,
              "КЗХ": {
                "weight": 3718.6999999999994,
                "stavka_per_ton": 49956.7298328517,
                "revenue": 3439800,
                "Концентрат угольный": {
                  "weight": 3718.6999999999994,
                  "stavka_per_ton": 49956.7298328517,
                  "revenue": 3439800
                }
              }
            },
            "С": {
              "weight": 896.9000000000002,
              "stavka_per_ton": 11871.132593293278,
              "revenue": 819000,
              "КЗХ": {
                "weight": 896.9000000000002,
                "stavka_per_ton": 11871.132593293278,
                "revenue": 819000,
                "Концентрат угольный": {
                  "weight": 896.9000000000002,
                  "stavka_per_ton": 11871.132593293278,
                  "revenue": 819000
                }
              }
            }
          }
        },
        "Погрузка ТНТ": {
          "weight": 2095.3499999999995,
          "stavka_per_ton": 74998.13727491062,
          "revenue": 5068624,
          "РЖД": {
            "weight": 2095.3499999999995,
            "stavka_per_ton": 74998.13727491062,
            "revenue": 5068624,
            "А": {
              "weight": 1691.3499999999997,
              "stavka_per_ton": 60426.15722396083,
              "revenue": 4087600,
              "УЗ": {
                "weight": 1691.3499999999997,
                "stavka_per_ton": 60426.15722396083,
                "revenue": 4087600,
                "Кокс нефтяной анодный": {
                  "weight": 1691.3499999999997,
                  "stavka_per_ton": 60426.15722396083,
                  "revenue": 4087600
                }
              }
            },
            "С": {
              "weight": 404,
              "stavka_per_ton": 14571.980050949816,
              "revenue": 981024,
              "УЗ": {
                "weight": 404,
                "stavka_per_ton": 14571.980050949816,
                "revenue": 981024,
                "Кокс нефтяной анодный": {
                  "weight": 404,
                  "stavka_per_ton": 14571.980050949816,
                  "revenue": 981024
                }
              }
            }
          }
        },
        "РВК, ООО": {
          "weight": 7584.700000000003,
          "stavka_per_ton": 72853.98992743416,
          "revenue": 5022623,
          "РЖД": {
            "weight": 7584.700000000003,
            "stavka_per_ton": 72853.98992743416,
            "revenue": 5022623,
            "А": {
              "weight": 5264.300000000001,
              "stavka_per_ton": 49951.578861099144,
              "revenue": 3459839,
              "РЖД": {
                "weight": 5264.300000000001,
                "stavka_per_ton": 49951.578861099144,
                "revenue": 3459839,
                "Щебень, не поименованный в алфавите": {
                  "weight": 5264.300000000001,
                  "stavka_per_ton": 49951.578861099144,
                  "revenue": 3459839
                }
              }
            },
            "С": {
              "weight": 2320.4000000000005,
              "stavka_per_ton": 22902.411066335044,
              "revenue": 1562784,
              "РЖД": {
                "weight": 2320.4000000000005,
                "stavka_per_ton": 22902.411066335044,
                "revenue": 1562784,
                "Щебень, не поименованный в алфавите": {
                  "weight": 2320.4000000000005,
                  "stavka_per_ton": 22902.411066335044,
                  "revenue": 1562784
                }
              }
            }
          }
        },
        "Погрузка ППО": {
          "weight": 2132.2589999999996,
          "stavka_per_ton": 54104.35897918179,
          "revenue": 3720000,
          "РЖД": {
            "weight": 2132.2589999999996,
            "stavka_per_ton": 54104.35897918179,
            "revenue": 3720000,
            "А": {
              "weight": 1651.586,
              "stavka_per_ton": 41871.36917587177,
              "revenue": 2880000,
              "РЖД": {
                "weight": 1651.586,
                "stavka_per_ton": 41871.36917587177,
                "revenue": 2880000,
                "Глинозем": {
                  "weight": 1651.586,
                  "stavka_per_ton": 41871.36917587177,
                  "revenue": 2880000
                }
              }
            },
            "С": {
              "weight": 480.673,
              "stavka_per_ton": 12232.989803310014,
              "revenue": 840000,
              "РЖД": {
                "weight": 480.673,
                "stavka_per_ton": 12232.989803310014,
                "revenue": 840000,
                "Глинозем": {
                  "weight": 480.673,
                  "stavka_per_ton": 12232.989803310014,
                  "revenue": 840000
                }
              }
            }
          }
        },
        "ППО": {
          "weight": 23298.711,
          "stavka_per_ton": 599261.3308782375,
          "revenue": 40800000,
          "РЖД": {
            "weight": 23298.711,
            "stavka_per_ton": 599261.3308782375,
            "revenue": 40800000,
            "А": {
              "weight": 16158.31799999999,
              "stavka_per_ton": 413639.1951450861,
              "revenue": 28200000,
              "РЖД": {
                "weight": 16158.31799999999,
                "stavka_per_ton": 413639.1951450861,
                "revenue": 28200000,
                "Глинозем": {
                  "weight": 16158.31799999999,
                  "stavka_per_ton": 413639.1951450861,
                  "revenue": 28200000
                }
              }
            },
            "С": {
              "weight": 7003.314999999998,
              "stavka_per_ton": 182120.41265306465,
              "revenue": 12360000,
              "РЖД": {
                "weight": 7003.314999999998,
                "stavka_per_ton": 182120.41265306465,
                "revenue": 12360000,
                "Глинозем": {
                  "weight": 7003.314999999998,
                  "stavka_per_ton": 182120.41265306465,
                  "revenue": 12360000
                }
              }
            },
            "СЛ": {
              "weight": 137.078,
              "stavka_per_ton": 3501.723080087271,
              "revenue": 240000,
              "РЖД": {
                "weight": 137.078,
                "stavka_per_ton": 3501.723080087271,
                "revenue": 240000,
                "Глинозем": {
                  "weight": 137.078,
                  "stavka_per_ton": 3501.723080087271,
                  "revenue": 240000
                }
              }
            }
          }
        },
        "ДЛСГРУПП, ООО": {
          "weight": 1717,
          "stavka_per_ton": 17112.356795011037,
          "revenue": 1178000,
          "БЧ": {
            "weight": 1717,
            "stavka_per_ton": 17112.356795011037,
            "revenue": 1178000,
            "А": {
              "weight": 1240,
              "stavka_per_ton": 12489.59464667344,
              "revenue": 863000,
              "ГР": {
                "weight": 760,
                "stavka_per_ton": 7895.60487685247,
                "revenue": 548000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 760,
                  "stavka_per_ton": 7895.60487685247,
                  "revenue": 548000
                }
              },
              "РЖД": {
                "weight": 480,
                "stavka_per_ton": 4593.989769820972,
                "revenue": 315000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 480,
                  "stavka_per_ton": 4593.989769820972,
                  "revenue": 315000
                }
              }
            },
            "С": {
              "weight": 477,
              "stavka_per_ton": 4622.762148337596,
              "revenue": 315000,
              "ГР": {
                "weight": 273,
                "stavka_per_ton": 2637.468030690537,
                "revenue": 180000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 273,
                  "stavka_per_ton": 2637.468030690537,
                  "revenue": 180000
                }
              },
              "РЖД": {
                "weight": 204,
                "stavka_per_ton": 1985.2941176470588,
                "revenue": 135000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 204,
                  "stavka_per_ton": 1985.2941176470588,
                  "revenue": 135000
                }
              }
            }
          }
        },
        "ЧЭМК, АО": {
          "weight": 6234.2,
          "stavka_per_ton": 85043.97479794017,
          "revenue": 5819800,
          "РЖД": {
            "weight": 6234.2,
            "stavka_per_ton": 85043.97479794017,
            "revenue": 5819800,
            "С": {
              "weight": 1700.1,
              "stavka_per_ton": 24178.503144155206,
              "revenue": 1634000,
              "РЖД": {
                "weight": 1700.1,
                "stavka_per_ton": 24178.503144155206,
                "revenue": 1634000,
                "Концентраты марганцевой руды": {
                  "weight": 1700.1,
                  "stavka_per_ton": 24178.503144155206,
                  "revenue": 1634000
                }
              }
            },
            "А": {
              "weight": 4534.1,
              "stavka_per_ton": 60865.47165378496,
              "revenue": 4185800,
              "РЖД": {
                "weight": 4534.1,
                "stavka_per_ton": 60865.47165378496,
                "revenue": 4185800,
                "Концентраты марганцевой руды": {
                  "weight": 4534.1,
                  "stavka_per_ton": 60865.47165378496,
                  "revenue": 4185800
                }
              }
            }
          }
        },
        "ТОО «Тенгри Транс»": {
          "weight": 8115.5,
          "stavka_per_ton": 455772.2160597444,
          "revenue": 31863300,
          "КЗХ": {
            "weight": 8115.5,
            "stavka_per_ton": 455772.2160597444,
            "revenue": 31863300,
            "С": {
              "weight": 2783.5,
              "stavka_per_ton": 154744.85144708664,
              "revenue": 10780000,
              "БЧ": {
                "weight": 2783.5,
                "stavka_per_ton": 154744.85144708664,
                "revenue": 10780000,
                "Уголь каменный, не поименованный в алфавите": {
                  "weight": 2783.5,
                  "stavka_per_ton": 154744.85144708664,
                  "revenue": 10780000
                }
              }
            },
            "А": {
              "weight": 5332,
              "stavka_per_ton": 301027.36461265787,
              "revenue": 21083300,
              "БЧ": {
                "weight": 5332,
                "stavka_per_ton": 301027.36461265787,
                "revenue": 21083300,
                "Уголь каменный, не поименованный в алфавите": {
                  "weight": 5332,
                  "stavka_per_ton": 301027.36461265787,
                  "revenue": 21083300
                }
              }
            }
          }
        },
        "СИГМА, ООО": {
          "weight": 411.79999999999995,
          "stavka_per_ton": 3759.11876742355,
          "revenue": 258000,
          "БЧ": {
            "weight": 411.79999999999995,
            "stavka_per_ton": 3759.11876742355,
            "revenue": 258000,
            "А": {
              "weight": 206.2,
              "stavka_per_ton": 1876.8221574344025,
              "revenue": 129000,
              "РЖД": {
                "weight": 206.2,
                "stavka_per_ton": 1876.8221574344025,
                "revenue": 129000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 206.2,
                  "stavka_per_ton": 1876.8221574344025,
                  "revenue": 129000
                }
              }
            },
            "С": {
              "weight": 205.6,
              "stavka_per_ton": 1882.2966099891469,
              "revenue": 129000,
              "РЖД": {
                "weight": 205.6,
                "stavka_per_ton": 1882.2966099891469,
                "revenue": 129000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 205.6,
                  "stavka_per_ton": 1882.2966099891469,
                  "revenue": 129000
                }
              }
            }
          }
        },
        "БЦК": {
          "weight": 1891.8,
          "stavka_per_ton": 36909.87999999998,
          "revenue": 2493789.678,
          "КЗХ": {
            "weight": 1891.8,
            "stavka_per_ton": 36909.87999999998,
            "revenue": 2493789.678,
            "А": {
              "weight": 1416.8,
              "stavka_per_ton": 27682.40999999999,
              "revenue": 1867639.9280000008,
              "БЧ": {
                "weight": 1416.8,
                "stavka_per_ton": 27682.40999999999,
                "revenue": 1867639.9280000008,
                "Камень, щебень, отсев гипсовый и гипсоангидритовый": {
                  "weight": 1416.8,
                  "stavka_per_ton": 27682.40999999999,
                  "revenue": 1867639.9280000008
                }
              }
            },
            "С": {
              "weight": 475,
              "stavka_per_ton": 9227.470000000001,
              "revenue": 626149.7500000001,
              "БЧ": {
                "weight": 475,
                "stavka_per_ton": 9227.470000000001,
                "revenue": 626149.7500000001,
                "Камень, щебень, отсев гипсовый и гипсоангидритовый": {
                  "weight": 475,
                  "stavka_per_ton": 9227.470000000001,
                  "revenue": 626149.7500000001
                }
              }
            }
          }
        },
        "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО": {
          "weight": 17725.799999999992,
          "stavka_per_ton": 377534.99022193387,
          "revenue": 26394846.189999998,
          "РЖД": {
            "weight": 17725.799999999992,
            "stavka_per_ton": 377534.99022193387,
            "revenue": 26394846.189999998,
            "А": {
              "weight": 12330.099999999984,
              "stavka_per_ton": 265972.5351695691,
              "revenue": 18663099.79,
              "УЗ": {
                "weight": 4112.2,
                "stavka_per_ton": 92793.09215286585,
                "revenue": 6468039,
                "Уголь каменный марки Д": {
                  "weight": 4112.2,
                  "stavka_per_ton": 92793.09215286585,
                  "revenue": 6468039
                }
              },
              "РЖД": {
                "weight": 8217.899999999994,
                "stavka_per_ton": 173179.4430167031,
                "revenue": 12195060.789999997,
                "Уголь каменный марки Д": {
                  "weight": 7651.849999999993,
                  "stavka_per_ton": 166147.59080147947,
                  "revenue": 11691728
                },
                "Уголь бурый, кроме бурого угля подмосковного бассейна": {
                  "weight": 421.25,
                  "stavka_per_ton": 2937.3496166228883,
                  "revenue": 206525.78999999998
                },
                "Концентрат угольный": {
                  "weight": 144.8,
                  "stavka_per_ton": 4094.5025986007095,
                  "revenue": 296807
                }
              }
            },
            "С": {
              "weight": 4836.5,
              "stavka_per_ton": 98973.04160458274,
              "revenue": 6851746.399999999,
              "РЖД": {
                "weight": 2966.850000000001,
                "stavka_per_ton": 56209.04629357604,
                "revenue": 3891746.3999999994,
                "Уголь каменный марки Д": {
                  "weight": 2766.0000000000005,
                  "stavka_per_ton": 54801.35057246196,
                  "revenue": 3797646.3999999994
                },
                "Уголь бурый, кроме бурого угля подмосковного бассейна": {
                  "weight": 200.85000000000002,
                  "stavka_per_ton": 1407.695721114073,
                  "revenue": 94100
                }
              },
              "УЗ": {
                "weight": 1869.6500000000003,
                "stavka_per_ton": 42763.995311006685,
                "revenue": 2960000,
                "Уголь каменный марки Д": {
                  "weight": 1869.6500000000003,
                  "stavka_per_ton": 42763.995311006685,
                  "revenue": 2960000
                }
              }
            },
            "СЛ": {
              "weight": 559.1999999999999,
              "stavka_per_ton": 12589.413447782545,
              "revenue": 880000,
              "РЖД": {
                "weight": 559.1999999999999,
                "stavka_per_ton": 12589.413447782545,
                "revenue": 880000,
                "Уголь каменный марки Д": {
                  "weight": 559.1999999999999,
                  "stavka_per_ton": 12589.413447782545,
                  "revenue": 880000
                }
              }
            }
          }
        },
        "Карбо-трейд": {
          "weight": 4159.100000000004,
          "stavka_per_ton": 197201.27648766717,
          "revenue": 13665451.800000012,
          "РЖД": {
            "weight": 4159.100000000004,
            "stavka_per_ton": 197201.27648766717,
            "revenue": 13665451.800000012,
            "С": {
              "weight": 1510.5999999999995,
              "stavka_per_ton": 72829.72878988634,
              "revenue": 4997033.8,
              "РЖД": {
                "weight": 1510.5999999999995,
                "stavka_per_ton": 72829.72878988634,
                "revenue": 4997033.8,
                "Уголь каменный марки Д": {
                  "weight": 1510.5999999999995,
                  "stavka_per_ton": 72829.72878988634,
                  "revenue": 4997033.8
                }
              }
            },
            "А": {
              "weight": 2648.5000000000005,
              "stavka_per_ton": 124371.54769778103,
              "revenue": 8668418.000000004,
              "РЖД": {
                "weight": 2648.5000000000005,
                "stavka_per_ton": 124371.54769778103,
                "revenue": 8668418.000000004,
                "Уголь каменный марки Д": {
                  "weight": 2648.5000000000005,
                  "stavka_per_ton": 124371.54769778103,
                  "revenue": 8668418.000000004
                }
              }
            }
          }
        },
        "НАЦИО": {
          "weight": 7589,
          "stavka_per_ton": 0,
          "revenue": 0,
          "УЗ": {
            "weight": 7589,
            "stavka_per_ton": 0,
            "revenue": 0,
            "С": {
              "weight": 1569,
              "stavka_per_ton": 0,
              "revenue": 0,
              "УЗ": {
                "weight": 1569,
                "stavka_per_ton": 0,
                "revenue": 0,
                "Прочие грузы, не поименованные в алфавите": {
                  "weight": 111,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Уголь каменный марки Г-газовый": {
                  "weight": 339,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Чугун передельный высококачественный": {
                  "weight": 70,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Окатыши железорудные": {
                  "weight": 206,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Зерно кукурузы": {
                  "weight": 58,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Концентрат угольный": {
                  "weight": 136,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Концентрат железорудный (гематит, магнетит)": {
                  "weight": 210,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Руда железная агломерационная (аглоруда)": {
                  "weight": 70,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Сталь сортовая": {
                  "weight": 68,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Лом черных металлов, не поименованный в алфавите": {
                  "weight": 126,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Известняк для флюсования": {
                  "weight": 69,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Сталь листовая, не поименованная в алфавите": {
                  "weight": 66,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Лесоматериалы всяких пород длиной свыше 2 м": {
                  "weight": 40,
                  "stavka_per_ton": 0,
                  "revenue": 0
                }
              }
            },
            "А": {
              "weight": 5319,
              "stavka_per_ton": 0,
              "revenue": 0,
              "УЗ": {
                "weight": 5319,
                "stavka_per_ton": 0,
                "revenue": 0,
                "Слябы (заготовки стальные)": {
                  "weight": 119,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Уголь каменный марки Г-газовый": {
                  "weight": 1989,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Руда железная агломерационная (аглоруда)": {
                  "weight": 279,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Известняк для флюсования": {
                  "weight": 278,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Кокс доменный": {
                  "weight": 90,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Прокат черных металлов, не поименованный в алфавите": {
                  "weight": 191,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Шпалы и брусья для стрелочных переводов железобетонные": {
                  "weight": 128,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Конструкции железобетонные": {
                  "weight": 69,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Концентрат железорудный (гематит, магнетит)": {
                  "weight": 907,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Концентрат угольный": {
                  "weight": 280,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Окатыши железорудные": {
                  "weight": 556,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Прочие грузы, не поименованные в алфавите": {
                  "weight": 68,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Лом черных металлов, не поименованный в алфавите": {
                  "weight": 118,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Уголь каменный марки Ж-жирный": {
                  "weight": 110,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Заготовка стальная, не поименованная в алфавите": {
                  "weight": 68,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Сталь листовая, не поименованная в алфавите": {
                  "weight": 69,
                  "stavka_per_ton": 0,
                  "revenue": 0
                }
              }
            },
            "СЛ": {
              "weight": 701,
              "stavka_per_ton": 0,
              "revenue": 0,
              "УЗ": {
                "weight": 701,
                "stavka_per_ton": 0,
                "revenue": 0,
                "Зерно кукурузы": {
                  "weight": 501,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Глина фарфоровая (каолин)": {
                  "weight": 138,
                  "stavka_per_ton": 0,
                  "revenue": 0
                },
                "Пшеница": {
                  "weight": 62,
                  "stavka_per_ton": 0,
                  "revenue": 0
                }
              }
            }
          }
        },
        "Погрузка НГУК": {
          "weight": 68.9,
          "stavka_per_ton": 1756.1683599419448,
          "revenue": 121000,
          "РЖД": {
            "weight": 68.9,
            "stavka_per_ton": 1756.1683599419448,
            "revenue": 121000,
            "С": {
              "weight": 68.9,
              "stavka_per_ton": 1756.1683599419448,
              "revenue": 121000,
              "КЗХ": {
                "weight": 68.9,
                "stavka_per_ton": 1756.1683599419448,
                "revenue": 121000,
                "Антрацит": {
                  "weight": 68.9,
                  "stavka_per_ton": 1756.1683599419448,
                  "revenue": 121000
                }
              }
            }
          }
        },
        "УК Южный Альянс": {
          "weight": 4864,
          "stavka_per_ton": 44746.84909015951,
          "revenue": 3061987.8,
          "РЖД": {
            "weight": 4864,
            "stavka_per_ton": 44746.84909015951,
            "revenue": 3061987.8,
            "С": {
              "weight": 1153.1999999999998,
              "stavka_per_ton": 10359.767193073973,
              "revenue": 702403.8,
              "РЖД": {
                "weight": 1153.1999999999998,
                "stavka_per_ton": 10359.767193073973,
                "revenue": 702403.8,
                "Глина, не поименованная в алфавите": {
                  "weight": 271.09999999999997,
                  "stavka_per_ton": 3157.6017030965922,
                  "revenue": 214000
                },
                "Щебень, не поименованный в алфавите": {
                  "weight": 882.0999999999999,
                  "stavka_per_ton": 7202.16548997738,
                  "revenue": 488403.79999999993
                }
              }
            },
            "А": {
              "weight": 3710.7999999999993,
              "stavka_per_ton": 34387.08189708554,
              "revenue": 2359584,
              "РЖД": {
                "weight": 3710.7999999999993,
                "stavka_per_ton": 34387.08189708554,
                "revenue": 2359584,
                "Щебень, не поименованный в алфавите": {
                  "weight": 2278.2999999999993,
                  "stavka_per_ton": 17915.66967102791,
                  "revenue": 1236084.0000000007
                },
                "Глина, не поименованная в алфавите": {
                  "weight": 1432.5,
                  "stavka_per_ton": 16471.41222605763,
                  "revenue": 1123500
                }
              }
            }
          }
        },
        "СИБТРЕЙД, ООО": {
          "weight": 4871.950000000001,
          "stavka_per_ton": 124704.30686364292,
          "revenue": 8556800,
          "РЖД": {
            "weight": 4871.950000000001,
            "stavka_per_ton": 124704.30686364292,
            "revenue": 8556800,
            "С": {
              "weight": 1295.75,
              "stavka_per_ton": 33449.71980983684,
              "revenue": 2280000,
              "РЖД": {
                "weight": 1295.75,
                "stavka_per_ton": 33449.71980983684,
                "revenue": 2280000,
                "Уголь каменный марки Т-тощий": {
                  "weight": 1295.75,
                  "stavka_per_ton": 33449.71980983684,
                  "revenue": 2280000
                }
              }
            },
            "А": {
              "weight": 3576.2,
              "stavka_per_ton": 91254.58705380613,
              "revenue": 6276800,
              "РЖД": {
                "weight": 3576.2,
                "stavka_per_ton": 91254.58705380613,
                "revenue": 6276800,
                "Уголь каменный марки Т-тощий": {
                  "weight": 3576.2,
                  "stavka_per_ton": 91254.58705380613,
                  "revenue": 6276800
                }
              }
            }
          }
        },
        "Джетта Строй ЛТД": {
          "weight": 2866.3,
          "stavka_per_ton": 113386.43558196885,
          "revenue": 7926100,
          "КЗХ": {
            "weight": 2866.3,
            "stavka_per_ton": 113386.43558196885,
            "revenue": 7926100,
            "С": {
              "weight": 695,
              "stavka_per_ton": 27708.715470371797,
              "revenue": 1925000,
              "БЧ": {
                "weight": 695,
                "stavka_per_ton": 27708.715470371797,
                "revenue": 1925000,
                "Уголь каменный, не поименованный в алфавите": {
                  "weight": 695,
                  "stavka_per_ton": 27708.715470371797,
                  "revenue": 1925000
                }
              }
            },
            "А": {
              "weight": 2171.3,
              "stavka_per_ton": 85677.72011159707,
              "revenue": 6001100,
              "БЧ": {
                "weight": 2171.3,
                "stavka_per_ton": 85677.72011159707,
                "revenue": 6001100,
                "Уголь каменный, не поименованный в алфавите": {
                  "weight": 2171.3,
                  "stavka_per_ton": 85677.72011159707,
                  "revenue": 6001100
                }
              }
            }
          }
        },
        "СТРОЙСЕРВИС": {
          "weight": 4417.550000000001,
          "stavka_per_ton": 97711.59427956898,
          "revenue": 6744000,
          "РЖД": {
            "weight": 4417.550000000001,
            "stavka_per_ton": 97711.59427956898,
            "revenue": 6744000,
            "А": {
              "weight": 3250.250000000001,
              "stavka_per_ton": 71705.07185212382,
              "revenue": 4959000,
              "КЗХ": {
                "weight": 3250.250000000001,
                "stavka_per_ton": 71705.07185212382,
                "revenue": 4959000,
                "Уголь каменный марки Т-тощий": {
                  "weight": 3250.250000000001,
                  "stavka_per_ton": 71705.07185212382,
                  "revenue": 4959000
                }
              }
            },
            "С": {
              "weight": 1167.2999999999997,
              "stavka_per_ton": 26006.52242744516,
              "revenue": 1785000,
              "КЗХ": {
                "weight": 1167.2999999999997,
                "stavka_per_ton": 26006.52242744516,
                "revenue": 1785000,
                "Уголь каменный марки Т-тощий": {
                  "weight": 1167.2999999999997,
                  "stavka_per_ton": 26006.52242744516,
                  "revenue": 1785000
                }
              }
            }
          }
        },
        "Центр Комир KZ": {
          "weight": 4261,
          "stavka_per_ton": 156100.66543038868,
          "revenue": 10903750,
          "КЗХ": {
            "weight": 4261,
            "stavka_per_ton": 156100.66543038868,
            "revenue": 10903750,
            "СЛ": {
              "weight": 4261,
              "stavka_per_ton": 156100.66543038868,
              "revenue": 10903750,
              "УЗ": {
                "weight": 4261,
                "stavka_per_ton": 156100.66543038868,
                "revenue": 10903750,
                "Уголь каменный марки Д": {
                  "weight": 4261,
                  "stavka_per_ton": 156100.66543038868,
                  "revenue": 10903750
                }
              }
            }
          }
        },
        "Погрузка Евросиб": {
          "weight": 11.158,
          "stavka_per_ton": 3047.141064706937,
          "revenue": 34000,
          "РЖД": {
            "weight": 11.158,
            "stavka_per_ton": 3047.141064706937,
            "revenue": 34000,
            "А": {
              "weight": 11.158,
              "stavka_per_ton": 3047.141064706937,
              "revenue": 34000,
              "РЖД": {
                "weight": 11.158,
                "stavka_per_ton": 3047.141064706937,
                "revenue": 34000,
                "Обувь резиновая, не поименованная в алфавите": {
                  "weight": 11.158,
                  "stavka_per_ton": 3047.141064706937,
                  "revenue": 34000
                }
              }
            }
          }
        },
        "Газпром Нефть, ПАО": {
          "weight": 4172.740000000001,
          "stavka_per_ton": 79865.8049979635,
          "revenue": 5285595,
          "РЖД": {
            "weight": 4172.740000000001,
            "stavka_per_ton": 79865.8049979635,
            "revenue": 5285595,
            "С": {
              "weight": 1459.96,
              "stavka_per_ton": 27785.58728025099,
              "revenue": 1843038,
              "РЖД": {
                "weight": 1459.96,
                "stavka_per_ton": 27785.58728025099,
                "revenue": 1843038,
                "Сера": {
                  "weight": 1459.96,
                  "stavka_per_ton": 27785.58728025099,
                  "revenue": 1843038
                }
              }
            },
            "А": {
              "weight": 2712.7799999999997,
              "stavka_per_ton": 52080.217717712505,
              "revenue": 3442557,
              "РЖД": {
                "weight": 2712.7799999999997,
                "stavka_per_ton": 52080.217717712505,
                "revenue": 3442557,
                "Сера": {
                  "weight": 2712.7799999999997,
                  "stavka_per_ton": 52080.217717712505,
                  "revenue": 3442557
                }
              }
            }
          }
        },
        "УК Разрез Степной": {
          "weight": 676,
          "stavka_per_ton": 15760.49562117337,
          "revenue": 1063225,
          "РЖД": {
            "weight": 676,
            "stavka_per_ton": 15760.49562117337,
            "revenue": 1063225,
            "А": {
              "weight": 607,
              "stavka_per_ton": 14096.727505231342,
              "revenue": 948425,
              "РЖД": {
                "weight": 607,
                "stavka_per_ton": 14096.727505231342,
                "revenue": 948425,
                "Уголь каменный марки Д": {
                  "weight": 607,
                  "stavka_per_ton": 14096.727505231342,
                  "revenue": 948425
                }
              }
            },
            "С": {
              "weight": 69,
              "stavka_per_ton": 1663.768115942029,
              "revenue": 114800,
              "РЖД": {
                "weight": 69,
                "stavka_per_ton": 1663.768115942029,
                "revenue": 114800,
                "Уголь каменный марки Д": {
                  "weight": 69,
                  "stavka_per_ton": 1663.768115942029,
                  "revenue": 114800
                }
              }
            }
          }
        },
        "ПУТ": {
          "weight": 137,
          "stavka_per_ton": 3211.8499573742542,
          "revenue": 220000,
          "РЖД": {
            "weight": 137,
            "stavka_per_ton": 3211.8499573742542,
            "revenue": 220000,
            "А": {
              "weight": 137,
              "stavka_per_ton": 3211.8499573742542,
              "revenue": 220000,
              "РЖД": {
                "weight": 137,
                "stavka_per_ton": 3211.8499573742542,
                "revenue": 220000,
                "Уголь каменный марки Т-тощий": {
                  "weight": 137,
                  "stavka_per_ton": 3211.8499573742542,
                  "revenue": 220000
                }
              }
            }
          }
        },
        "Погрузка СДС-Уголь": {
          "weight": 69.6,
          "stavka_per_ton": 1724.1379310344828,
          "revenue": 120000,
          "РЖД": {
            "weight": 69.6,
            "stavka_per_ton": 1724.1379310344828,
            "revenue": 120000,
            "С": {
              "weight": 69.6,
              "stavka_per_ton": 1724.1379310344828,
              "revenue": 120000,
              "РЖД": {
                "weight": 69.6,
                "stavka_per_ton": 1724.1379310344828,
                "revenue": 120000,
                "Уголь каменный марки СС-слабоспекающийся": {
                  "weight": 69.6,
                  "stavka_per_ton": 1724.1379310344828,
                  "revenue": 120000
                }
              }
            }
          }
        },
        "Погрузка Степной": {
          "weight": 200.5,
          "stavka_per_ton": 1348.1696527316965,
          "revenue": 90075,
          "РЖД": {
            "weight": 200.5,
            "stavka_per_ton": 1348.1696527316965,
            "revenue": 90075,
            "А": {
              "weight": 200.5,
              "stavka_per_ton": 1348.1696527316965,
              "revenue": 90075,
              "РЖД": {
                "weight": 200.5,
                "stavka_per_ton": 1348.1696527316965,
                "revenue": 90075,
                "Уголь каменный марки Д": {
                  "weight": 200.5,
                  "stavka_per_ton": 1348.1696527316965,
                  "revenue": 90075
                }
              }
            }
          }
        },
        "ДублТранс": {
          "weight": 557,
          "stavka_per_ton": 5055.900621118012,
          "revenue": 352000,
          "БЧ": {
            "weight": 557,
            "stavka_per_ton": 5055.900621118012,
            "revenue": 352000,
            "А": {
              "weight": 417,
              "stavka_per_ton": 3798.7577639751553,
              "revenue": 264000,
              "РЖД": {
                "weight": 417,
                "stavka_per_ton": 3798.7577639751553,
                "revenue": 264000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 417,
                  "stavka_per_ton": 3798.7577639751553,
                  "revenue": 264000
                }
              }
            },
            "С": {
              "weight": 140,
              "stavka_per_ton": 1257.142857142857,
              "revenue": 88000,
              "РЖД": {
                "weight": 140,
                "stavka_per_ton": 1257.142857142857,
                "revenue": 88000,
                "Щебень гранитный фракции 5х20": {
                  "weight": 140,
                  "stavka_per_ton": 1257.142857142857,
                  "revenue": 88000
                }
              }
            }
          }
        },
        "ФЛК, ООО": {
          "weight": 190.895,
          "stavka_per_ton": 3328.7594704839626,
          "revenue": 211750,
          "РЖД": {
            "weight": 190.895,
            "stavka_per_ton": 3328.7594704839626,
            "revenue": 211750,
            "А": {
              "weight": 190.895,
              "stavka_per_ton": 3328.7594704839626,
              "revenue": 211750,
              "РЖД": {
                "weight": 190.895,
                "stavka_per_ton": 3328.7594704839626,
                "revenue": 211750,
                "Сталь листовая, не поименованная в алфавите": {
                  "weight": 190.895,
                  "stavka_per_ton": 3328.7594704839626,
                  "revenue": 211750
                }
              }
            }
          }
        },
        "Погрузка ДублТранс": {
          "weight": 69.8,
          "stavka_per_ton": 630.3724928366762,
          "revenue": 44000,
          "БЧ": {
            "weight": 69.8,
            "stavka_per_ton": 630.3724928366762,
            "revenue": 44000,
            "С": {
              "weight": 69.8,
              "stavka_per_ton": 630.3724928366762,
              "revenue": 44000,
              "РЖД": {
                "weight": 69.8,
                "stavka_per_ton": 630.3724928366762,
                "revenue": 44000,
                "Щебень гранитный фракции 5х10": {
                  "weight": 69.8,
                  "stavka_per_ton": 630.3724928366762,
                  "revenue": 44000
                }
              }
            }
          }
        },
        "испорченная накладная": {
          "weight": 68.8,
          "stavka_per_ton": 0,
          "revenue": 0,
          "РЖД": {
            "weight": 68.8,
            "stavka_per_ton": 0,
            "revenue": 0,
            "А": {
              "weight": 68.8,
              "stavka_per_ton": 0,
              "revenue": 0,
              "РЖД": {
                "weight": 68.8,
                "stavka_per_ton": 0,
                "revenue": 0,
                "Глинозем": {
                  "weight": 68.8,
                  "stavka_per_ton": 0,
                  "revenue": 0
                }
              }
            }
          }
        },
        "Погрузка УК Южный Альянс..": {
          "weight": 73.4,
          "stavka_per_ton": 514.5068119891008,
          "revenue": 37764.8,
          "РЖД": {
            "weight": 73.4,
            "stavka_per_ton": 514.5068119891008,
            "revenue": 37764.8,
            "А": {
              "weight": 73.4,
              "stavka_per_ton": 514.5068119891008,
              "revenue": 37764.8,
              "РЖД": {
                "weight": 73.4,
                "stavka_per_ton": 514.5068119891008,
                "revenue": 37764.8,
                "Щебень, не поименованный в алфавите": {
                  "weight": 73.4,
                  "stavka_per_ton": 514.5068119891008,
                  "revenue": 37764.8
                }
              }
            }
          }
        }
      },



    };
  },
  methods: {
    // countRows(obj) {
    //   return Object.keys(obj).filter(key => key !== 'stavka_per_ton' && key !== 'weight' && key !== 'revenue').length;
    // },
    // isObject(val) {
    //   return typeof val === 'object' && val !== null;
    // },
    // getNextKey(obj) {
    //   const keys = Object.keys(obj);
    //   let correctKeys = []
    //   for (let i of keys) {
    //     if (i === 'stavka_per_ton' || i === 'weight' || i === 'revenue') {
    //       continue
    //     }
    //     else {
    //       correctKeys.push(i)
    //     }
    //   }
    //   return correctKeys // предполагая, что следующий ключ - первый ключ в объекте
    // },
    countRows(obj) {
      return Object.keys(obj).filter(key => key !== 'stavka_per_ton' && key !== 'weight' && key !== 'revenue').length;
    },
     isObject(val) {
  if (typeof val !== 'object' || val === null) {
    return false;
  }

  const keys = Object.keys(val);
  for (let i of keys) {
    if (val[i] === undefined) {
      return false;
    }
  }

  return true;
},
    // isObject(val) {
    //   return typeof val === 'object' && val !== null;
    // },
    getNextKey(obj) {
     
      const keys = Object.keys(obj);
      let correctKeys = []
      for (let i of keys) {
        if (i === 'stavka_per_ton' || i === 'weight' || i === 'revenue') {
          continue
        }
        else {
          correctKeys.push(i)
        }
      }
      console.log(correctKeys)
      return correctKeys // предполагая, что следующий ключ - первый ключ в объекте
    },

    Translate(val) {
      switch (val) {
        case 'amount':
          return 'Количество'
          break
        case 'cost':
          return 'Сумма'
          break
        case 'weight':
          return 'Вес'
          break
        case 'stavka_per_ton':
          return 'Ставка за тонну'
          break
        case 'revenue':
          return 'Доход'
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
    //     OpenChildren(eventDiv = null, val) {
    //     // console.log(document.getElementById('TableReport8'))

    //   let collapse = "+";
    //   let val_copy = this.TEST(val);
    //   let hr = null;
    //   let resultName = eventDiv.innerHTML;
    //   // Проверяем наличие класса, указывающего на раскрытие
    //   let isOpened = eventDiv.classList.contains('opened');

    //   // Удаляем дочерние элементы, если вложенность уже раскрыта
    //   if (isOpened) {
    //     eventDiv.classList.remove('opened');
    //     while (eventDiv.childNodes.length > 1) {
    //       eventDiv.removeChild(eventDiv.lastChild);
    //     }
    //     return;
    //   }

    //   // Создаем таблицу
    //   let thead = [];
    //   let tbody = [];

    //   for (let i in val_copy) {
    //     let key = val_copy[i][0];
    //     let value = val_copy[i][1];

    //     if (typeof value == 'number' || typeof value == 'string' || Array.isArray(value)) {
    //       hr = null;
    //       let name = this.Translate(key);
    //       let value123 = Array.isArray(value)
    //         ? this.FilterValue(value.reduce((acc, item) => acc + item)?.toFixed(2))
    //         : this.FilterValue(value?.toFixed(2));

    //       thead.push(name);
    //       tbody.push(value123);
    //     } else {
    //       let div = document.createElement('div');
    //       div.innerHTML = `${this.Translate(key)} ${collapse}`;
    //       div.style = 'padding-left: 2% !important; font-weight: 500; color: darkblue; border: 1px solid lightgrey; padding: 1%;';

    //       div.addEventListener('click', (event) => {
    //         event.stopPropagation();
    //         this.OpenChildren(div, value);
    //       });

    //       eventDiv.appendChild(div);
    //     }
    //   }

    //   if (thead.length > 0 && tbody.length > 0) {
    //     let div = document.createElement('div');
    //     div.innerHTML = `
    //       <span style="margin: 0 1%; font-size: 20px">${resultName != "" ? `Итого ${resultName.slice(0, -1)}` : 'Общий итог'}</span>
    //       <table>
    //         <thead>
    //           <tr>
    //             ${thead.map((header, ind) => `<th style="white-space: nowrap; background: white">${header}</th>`).join('')}
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             ${tbody.map(value => `<td style="white-space: nowrap; background: white">${value}</td>`).join('')}
    //           </tr>
    //         </tbody>
    //       </table>
    //     `;
    //     div.style = 'font-weight: 500; color: black; padding: 1% 0; background: #dddddd;';

    //     // Добавляем класс, указывающий на раскрытие
    //     eventDiv.classList.add('opened');
    //     this.$nextTick(() => eventDiv.innerHTML.split('<')[0].slice(0, -1))

    //     eventDiv.appendChild(div);
    //   }
    // },

    // async processTables() {
    //   // Дождитесь, пока данные полностью накопятся
    //   await this.$nextTick();

    //   let childTables = this.$el.querySelectorAll('table');
    //   let tablesArray = Array.from(childTables);
    //   let uniqueTables = new Set();

    //   // Функция для получения строки из таблицы
    //   const getTableString = (table) => {
    //     let tableString = '';
    //     table.querySelectorAll('tr').forEach(row => {
    //       row.querySelectorAll('th, td').forEach(cell => {
    //         tableString += cell.textContent.trim();
    //       });
    //     });
    //     return tableString;
    //   };

    //   // Удалить повторяющиеся таблицы
    //   tablesArray.forEach((table, index) => {
    //     let tableString = getTableString(table);
    //     if (!uniqueTables.has(tableString)) {
    //       uniqueTables.add(tableString);
    //     } else {
    //       table.parentElement.removeChild(table);
    //     }
    //   });
    // },

    Actioned() {
      // if(document.getElementById(`TableReport6${this.id_page}`)){
      //   let blockDiv = document.getElementById(`TableReport6${this.id_page}`)
      //   blockDiv.innerHTML = ''
      // }

      this.loader = true;
      api
        .getUO46(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.dataReport6 = response.data;
          // this.OpenChildren(document.getElementById(`TableReport6${this.id_page}`), this.dataReport6)

        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
        });


    },

    rowspan: (attr2) => attr2.reduce((acc, n) => acc + n.attr3.length + 1, 0),

    normalizeObject() {
      const test = Object.keys(this.objects2).map((key) => {
        const obj = {
          road: key,

          attr1: Object.keys(this.objects2[key]).map((client) => {
            return {
              client,
              attr3: Object.keys(this.objects2.data[key][client]).map(
                (road) => {
                  return {
                    road,
                    cargo: Object.keys(
                      this.objects2.data[key][client][road]
                    ).map((cargo) => {
                      return {
                        name: cargo,
                        name_weight: Object.keys(this.objects2.data[key][client][road][cargo]),
                        name_cargo: Object.keys(this.objects2.data[key][client][road][cargo]).map(item => {
                          return {
                            ...this.objects2.data[key][client][road][cargo][item]
                          }
                        })
                        // cargo:  this.objects2.data[key].data[client].data[road].data[cargo]
                      };
                    }),
                  };
                }
              ),
              total: this.objects2.data[key][client]?.total,
            };
          }),
          TOTAL_ROAD: this.objects2[key]?.total,
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
    // Actioned() {
    //   this.loader = true;
    //   api
    //     .getUO46(this.date_begin, this.date_end, this.wag_type)
    //     .then((response) => {
    //       this.loader = false;
    //       this.objects2 = response;

    //       this.normalizeObject();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.loader = false;
    //     });
    // },
    getCurrentData(data) {
      this.date_begin = data.date_begin;
      this.date_end = data.date_end;
    },
  },

  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
    ifNull(value) {
      if (value == null || value == 'null') {
        return 'Неопределенно'
      }
      return value
    }
  },
};
</script>

