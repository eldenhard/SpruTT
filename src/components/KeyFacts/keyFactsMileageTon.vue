<template>
    <div>
    <h2>Цистерна</h2>
    <div class="hello1" ref="chartdiv3"></div>
</div>
</template>
<style>
.hello1 {
    width: 100%;
    height: 500px;
}
</style>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_lang_RU from "@amcharts/amcharts5/locales/ru_RU"

import * as am5xy from "@amcharts/amcharts5/xy";
import { mapState } from "vuex";
import api from "@/api/wagonPark"
import Loader from "@/components/loader/loader.vue"

export default {

    //     }
    mounted() {
        api.getKeyFacts()
        .then(response => {
            let mileage = response.data.mileage['Цистерна']
            console.log(mileage)
      
        let root = am5.Root.new(this.$refs.chartdiv3);
        root.locale = am5geodata_lang_RU;


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);




        let data = []

        for (let elem of mileage) {
            data.push(
                {
                    'date': new Date(elem.quarter).getTime(),
                    'value': elem.speed,
                    'distance' : elem.distance
                }
            )
        }



        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.2,
            baseInterval: {
                timeUnit: "day",
                count: 10
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{distance}"
            })
        }));


        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));


        // Set data
        series.data.setAll(data)



        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    })
    }
}
</script>