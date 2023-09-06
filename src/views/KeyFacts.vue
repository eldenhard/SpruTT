<template>
    <div>
        <Loader :loader="loader"></Loader>
        <br>
        <!-- <KeyFactsSpeedWagon /> -->
        <div style="display: flex; justify-content: space-around; width: 100%">
            <h2 style="text-align: left; " class="signature">Количесто вагонов</h2>
        <h2 style="text-align: left; " class="signature">Скорость вагонов</h2>
        </div>
       
             
        <div style="display: flex;">
            <div class="hello" ref="chartdiv"></div>
            <div>
                
                <div class="filters_key_facts">
                   
                    <label for="">Тип вагона <br>
                        <select name="" id="" v-model="wagon_type" class="textarea">
                            <option value="Полувагон">ПВ</option>
                            <option value="Цистерна">ЦС</option>
                        </select>
                    </label>
                    <label for="">Месяц <br>
                        <input type="month" v-model="month" class="textarea">
                    </label>
                    <label for="">
                        <button class="Accept" @click="getDataSpeedWagonForMonth()">Запросить</button>
                    </label>
                </div>
               
                <div class="chartdiv44"></div>

            </div>
        </div>






        <!-- <div class="col-md-6">
                <h2 style="text-align: left; padding-left:5%;" class="signature">Скорость вагонов на текущий день</h2>
                <div class="hello" ref="chartdiv2"></div>
            </div> -->


        <div class="row container-fluid">
            <!-- <div class="col-md-12">
                <keyFactsMileageTonVue></keyFactsMileageTonVue>
            </div>

            <div class="col-md-12">
                <KeyFactsMileageVue></KeyFactsMileageVue>
            </div> -->
            <div class="col-md-12">
                <KeyFactsMileageDislocationsTon />
            </div>
            <div class="col-md-12">
                <KeyFactsMileageDislocations />
            </div>
        </div>

        <!-- <div class="row container">
        
            <div class="col-md-3">
                <KeyFactsMileageDislocationsTon />
            </div>
            <div class="col-md-3">
                <KeyFactsMileageDislocations />
            </div>
        </div>  -->
        <br><br>


    </div>
</template>
  
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_lang_RU from "@amcharts/amcharts5/locales/ru_RU"
import * as am5xy from "@amcharts/amcharts5/xy";
import { mapState } from "vuex";
import api from '@/api/report';
import Loader from "@/components/loader/loader.vue"
// import KeyFactsMileageVue from "../components/KeyFacts/KeyFactsMileage.vue";
// import keyFactsMileageTonVue from "@/components/KeyFacts/keyFactsMileageTon.vue";
import KeyFactsMileageDislocations from "@/components/KeyFacts/KeyFactsMileageDislocations.vue";
import KeyFactsMileageDislocationsTon from "@/components/KeyFacts/KeyFactsMileageDislocationsTon.vue";
import KeyFactsSpeedWagon from "@/components/KeyFacts/KeyFactsSpeedWagon.vue";
export default {
    name: 'KeyFacts',
    data() {
        return {
            loader: false,
            wagon_ton: '',
            wagon: '',
            root: "",
            wagon_type: "Полувагон",
            month: "",
            numbers: [],
            data: "",
        }
    },
    components: { Loader, KeyFactsMileageDislocations, KeyFactsMileageDislocationsTon, KeyFactsSpeedWagon },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    mounted() {

        this.loader = true
        setTimeout(() => this.loader = false, 4000)
        api.getKeyFacts()
            .then(response => {
                let keyfacts;
                keyfacts = response.data
                let data = []
                // console.log('111', keyfacts)
                for (let key in keyfacts) {
                    if (key == 'Всего') {
                        continue
                    } if (keyfacts[key] == 0) {
                        continue
                    } else {
                        let amount = keyfacts[key]
                        data.push({
                            'wagon_type': amount.wagon_type,
                            'amount': amount.amount
                        })
                    }


                }
                keyfacts = data


                let root = am5.Root.new(this.$refs.chartdiv);

                root.setThemes([
                    am5themes_Animated.new(root)
                ]);

                let chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true
                }));

                let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
                cursor.lineY.set("visible", false);


                let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
                xRenderer.labels.template.setAll({
                    rotation: -50,
                    centerY: am5.p50,
                    centerX: am5.p100,
                    paddingRight: 10
                });

                let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    maxDeviation: 0.3,
                    categoryField: "wagon_type",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: am5xy.AxisRendererY.new(root, {})
                }));

                let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,

                    valueYField: "amount",
                    sequencedInterpolation: true,
                    categoryXField: "wagon_type",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY}"
                    })
                }));

                series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
                series.columns.template.adapters.add("fill", function (fill, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                series.columns.template.adapters.add("stroke", function (stroke, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                xAxis.data.setAll(keyfacts);
                series.data.setAll(keyfacts);

                series.appear(1000);
                chart.appear(1000, 100);
            })



    },
    methods: {

        async getDataSpeedWagonForMonth() {
            this.loader = true;
            let yui = document.querySelector('.chartdiv44')
            let div = document.createElement('div')
            if (document.getElementById('chartdiv44')) {
                yui.innerHTML = ""
            }
            div.setAttribute('id', "chartdiv44")
            div.style = 'display: block; position: absolute;top: 0 !important;z-index: 10000 !important; width: 100% !important; height: 400px !important;'
            yui.append(div)
            let responseData = [];

            try {
                let parts = this.month.split('-');
                let month = parseInt(parts[1], 10);
                this.numbers = Array.from({ length: month }, (_, index) => index + 1);

                for (let i = 0; i < this.numbers.length; i++) {
                    let response = await api.getSpeedForWagon(this.wagon_type, this.numbers[i]);
                    responseData.push(response.data);
                }
                let current_year = new Date().getFullYear()
                for (var i = 0; i < responseData.length; i++) {
                    var monthNumber = responseData[i].month;
                    var date = new Date(current_year + '-' + monthNumber + '-01');
                    responseData[i] = {
                        "date": date.getTime(),
                        "value": responseData[i].speed,
                    };
                }

                this.printGraph(responseData);
                this.loader = false
            } catch (error) {
                this.loader = false
                console.error("Ошибка при создании графика:", error);
            }
        },
        // async getDataSpeedWagonForMonth() {
        //     let yui = document.querySelector('.chartdiv44')
        //     let div = document.createElement('div')
        //     if(document.getElementById('chartdiv44')){
        //         yui.innerHTML = ""

        //     }

        //     div.setAttribute('id', "chartdiv44")
        //     div.style = 'display: block; position: absolute;top: 0 !important;z-index: 10000 !important; width: 100% !important; height: 400px !important;'
        //     yui.append(div)
        //     let responseData = []
        //     try {
        //         let parts = this.month.split('-');
        //         let month = parseInt(parts[1], 10);
        //         this.numbers = Array.from({ length: month }, (_, index) => index + 1);


        //         await Promise.all(this.numbers.map(async (i) => {
        //             let response = await api.getSpeedForWagon(this.wagon_type, i);
        //             responseData.push(response.data);
        //         }));

        //         for (var i = 0; i < responseData.length; i++) {
        //             var monthNumber = responseData[i].month;
        //             var date = new Date(new Date().getFullYear() + monthNumber + '-01');
        //             responseData[i] = {
        //                 "date": date.getTime(),
        //                 "value": responseData[i].speed,
        //             };
        //         }
        //         console.log(responseData)
        //         this.printGraph(responseData)

        //     } catch (error) {
        //         console.error("Ошибка при создании графика:", error);
        //     }
        // },


        printGraph(data_arr) {
            console.log(document.getElementById('chartdiv44'))
            let root = am5.Root.new('chartdiv44');

            root.locale = am5geodata_lang_RU;

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
                am5themes_Animated.new(root)
            ]);


            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }));


            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                behavior: "none"
            }));
            cursor.lineY.set("visible", false);



            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
                maxDeviation: 0.2,
                baseInterval: {
                    timeUnit: "month",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {})
            }));

            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            }));


            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            var series = chart.series.push(am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",

                tooltip: am5.Tooltip.new(root, {
                    labelText: "{value} км/мес",
                })
            }));


            // Add scrollbar
            // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
            chart.set("scrollbarX", am5.Scrollbar.new(root, {
                orientation: "horizontal"
            }));


            // Set data
            var data = data_arr;
            // console.log(data_arr)
            series.data.setAll(data);


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear(1000);
            chart.appear(1000, 100);


            // console.log(document.querySelector('.chartdiv44').innerHTML = "")


        }
    }


}






</script>
  

<style scoped>
.chartdiv44 {
    position: relative;
    height: 50vh;
    width: 50vw;
}

#chartdiv44 {
    position: absolute;
    top: 0;
    border: 1px solid red;
    z-index: 10000 !important;
}

.filters_key_facts {
    display: flex;
    justify-content: center;
    gap: 2%;

}

.filters_key_facts button {
    margin-top: 17%;
}

.hello {
    width: 50%;
    height: 600px;
    margin-right: 2%;

}

.signature {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #242424;
}
</style>