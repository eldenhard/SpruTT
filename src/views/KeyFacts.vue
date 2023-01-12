<template>
    <div>
        <Loader :loader="loader"></Loader>
                <div class="hello" ref="chartdiv"></div>

       
        <div class="row">
            <div class="col-md-6">
                <keyFactsMileageTonVue></keyFactsMileageTonVue>
            </div>

            <div class="col-md-6">
                <KeyFactsMileageVue></KeyFactsMileageVue>
            </div>

        </div>

        <div class="row">
            <div class="col-md-6">
                <KeyFactsMileageDislocationsTon />
            </div>
            <div class="col-md-6">
                <KeyFactsMileageDislocations />
            </div>
        </div>
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
import api from "@/api/wagonPark"
import Loader from "@/components/loader/loader.vue"
import KeyFactsMileageVue from "../components/KeyFacts/KeyFactsMileage.vue";
import keyFactsMileageTonVue from "@/components/KeyFacts/keyFactsMileageTon.vue";
import KeyFactsMileageDislocations from "@/components/KeyFacts/KeyFactsMileageDislocations.vue";
import KeyFactsMileageDislocationsTon from "@/components/KeyFacts/KeyFactsMileageDislocationsTon.vue";
export default {
    name: 'KeyFacts',
    data() {
        return {
            loader: false
        }
    },
    components: { Loader, KeyFactsMileageVue, keyFactsMileageTonVue, KeyFactsMileageDislocations, KeyFactsMileageDislocationsTon },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    mounted() {
        // this.loader = true
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
                // console.log(keyfacts)


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
}


// let value = 1000;
// let volume = 100000;



</script>
  

<style scoped>
.hello {
    width: 25%;
    height: 500px;

}
</style>