<template>
    <div>
        <Loader :loader="loader"></Loader>
        <br>
       
        <div class="row">
            <div class="col-md-6">
                <h2 style="text-align: left; padding-left:5%;" class="signature">Количесто вагонов</h2>
                <div class="hello" ref="chartdiv"></div></div>
            <div class="col-md-6">
                <h2 style="text-align: left; padding-left:5%;" class="signature">Скорость вагонов на текущий день</h2>
                <div class="hello" ref="chartdiv2"></div></div>
        </div>

        <div class="row container-fluid">
            <!-- <div class="col-md-12">
                <keyFactsMileageTonVue></keyFactsMileageTonVue>
            </div>

            <div class="col-md-12">
                <KeyFactsMileageVue></KeyFactsMileageVue>
            </div> -->
            <!-- <div class="col-md-12">
                <KeyFactsMileageDislocationsTon />
            </div>
            <div class="col-md-12">
                <KeyFactsMileageDislocations />
            </div> -->
        </div>

        <!-- <div class="row container">
        
            <div class="col-md-3">
                <KeyFactsMileageDislocationsTon />
            </div>
            <div class="col-md-3">
                <KeyFactsMileageDislocations />
            </div>
        </div> -->
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
import api from '@/api/report'
import Loader from "@/components/loader/loader.vue"
// import KeyFactsMileageVue from "../components/KeyFacts/KeyFactsMileage.vue";
// import keyFactsMileageTonVue from "@/components/KeyFacts/keyFactsMileageTon.vue";
import KeyFactsMileageDislocations from "@/components/KeyFacts/KeyFactsMileageDislocations.vue";
import KeyFactsMileageDislocationsTon from "@/components/KeyFacts/KeyFactsMileageDislocationsTon.vue";
export default {
    name: 'KeyFacts',
    data() {
        return {
            loader: false,
            wagon_ton: '',
            wagon: '',
        }
    },
    components: { Loader, KeyFactsMileageDislocations, KeyFactsMileageDislocationsTon },
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
                keyfacts = response.data.wagons

                let data = []
                for (let key in keyfacts) {
                    if (key == 'Всего') {
                        continue
                    } if (keyfacts[key] == 0) {
                        continue
                    } else {
                        let amount = keyfacts[key]
                        data.push({
                            'wagon_type': key,
                            'amount': amount
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
         

            api.getKeyFacts()
            .then(response => {
                let keyfacts;
                keyfacts = response.data.mileage_by_dislocations
// console.log(keyfacts)

                let data = []
                for (let key in keyfacts) {
                    if (key == 'Всего') {
                        continue
                    } if (keyfacts[key] == 0) {
                        continue
                    } else {
                        let amount = keyfacts[key].slice(-1)
                        data.push({
                            'wagon_type': key,
                            'amount': Math.floor(amount[0].speed),
                        })
  
                      
                    }


                }
                
                keyfacts = data
                keyfacts.push({
                    'wagon_type': '',
                    'amount': 0
                })
                console.log(keyfacts)
            


                let root = am5.Root.new(this.$refs.chartdiv2);

                root.setThemes([
                    am5themes_Animated.new(root)
                ]);

                let chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
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
                        labelText: "{amount} км/день"
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


}


// let value = 1000;
// let volume = 100000;



</script>
  

<style scoped>
.hello {
    width: 100%;
    height: 600px;

}

.signature {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #242424;
}
</style>