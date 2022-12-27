<template>
    <div>
        <h2>Полувагон</h2>
        <div class="hello1" ref="chartdiv2"></div>
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
    //     mounted(){
    // let root = am5.Root.new(this.$refs.chartdiv2);
    //         // Set themes
    //         // https://www.amcharts.com/docs/v5/concepts/themes/
    //         root.setThemes([
    //             am5themes_Animated.new(root)
    //         ]);


    //         // Create chart
    //         // https://www.amcharts.com/docs/v5/charts/xy-chart/
    //         let chart = root.container.children.push(am5xy.XYChart.new(root, {
    //             panX: true,
    //             panY: true,
    //             wheelX: "panX",
    //             wheelY: "zoomX",
    //             pinchZoomX: true
    //         }));


    //         // Add cursor
    //         // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //         let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    //             behavior: "none"
    //         }));
    //         cursor.lineY.set("visible", false);

    //         let mileage = [
    //             {
    //                 "day": "2022-09-14T00:00:00",
    //                 "distance": 16300.0,
    //                 "speed": 4.01
    //             },
    //             {
    //                 "day": "2022-09-24T00:00:00",
    //                 "distance": 762.0,
    //                 "speed": 0.19
    //             },
    //             {
    //                 "day": "2022-09-24T00:00:00",
    //                 "distance": 1938.0,
    //                 "speed": 0.48
    //             },
    //             {
    //                 "day": "2022-09-24T00:00:00",
    //                 "distance": 13226.0,
    //                 "speed": 3.26
    //             },
    //             {
    //                 "day": "2022-09-24T00:00:00",
    //                 "distance": 2516.0,
    //                 "speed": 0.62
    //             },
    //             {
    //                 "day": "2022-09-25T00:00:00",
    //                 "distance": 25366.0,
    //                 "speed": 6.25
    //             },
    //             {
    //                 "day": "2022-09-26T00:00:00",
    //                 "distance": 2306.0,
    //                 "speed": 0.57
    //             },
    //             {
    //                 "day": "2022-09-27T00:00:00",
    //                 "distance": 0.0,
    //                 "speed": 0.19
    //             },
    //             {
    //                 "day": "2022-09-30T00:00:00",
    //                 "distance": 190.0,
    //                 "speed": 0.05
    //             },
    //             {
    //                 "day": "2022-09-30T00:00:00",
    //                 "distance": 0.0,
    //                 "speed": 0.19
    //             },
    //             {
    //                 "day": "2022-10-01T00:00:00",
    //                 "distance": 22.0,
    //                 "speed": 0.01
    //             },
    //             {
    //                 "day": "2022-10-02T00:00:00",
    //                 "distance": 511.0,
    //                 "speed": 0.13
    //             },
    //             {
    //                 "day": "2022-10-03T00:00:00",
    //                 "distance": 2418.0,
    //                 "speed": 0.6
    //             },
    //             {
    //                 "day": "2022-10-03T00:00:00",
    //                 "distance": 1345.0,
    //                 "speed": 0.33
    //             },
    //             {
    //                 "day": "2022-10-04T00:00:00",
    //                 "distance": 0.0,
    //                 "speed": 0.19
    //             },
    //             {
    //                 "day": "2022-10-04T00:00:00",
    //                 "distance": 9663.0,
    //                 "speed": 2.38
    //             },
    //             {
    //                 "day": "2022-10-05T00:00:00",
    //                 "distance": 22.0,
    //                 "speed": 0.01
    //             },
    //             {
    //                 "day": "2022-10-05T00:00:00",
    //                 "distance": 5879.0,
    //                 "speed": 1.45
    //             },
    //             {
    //                 "day": "2022-10-05T00:00:00",
    //                 "distance": 818.0,
    //                 "speed": 0.2
    //             },
    //             {
    //                 "day": "2022-10-05T00:00:00",
    //                 "distance": 20.0,
    //                 "speed": 0.0
    //             },
    //             {
    //                 "day": "2022-10-05T00:00:00",
    //                 "distance": 0.0,
    //                 "speed": 0.19
    //             },
    //             {
    //                 "day": "2022-10-05T00:00:00",
    //                 "distance": 3114.0,
    //                 "speed": 0.77
    //             },
    //             {
    //                 "day": "2022-10-06T00:00:00",
    //                 "distance": 48792.0,
    //                 "speed": 12.02
    //             },
    //             {
    //                 "day": "2022-10-06T00:00:00",
    //                 "distance": 1857.0,
    //                 "speed": 0.46
    //             },
    //             {
    //                 "day": "2022-10-06T00:00:00",
    //                 "distance": 10905.0,
    //                 "speed": 2.69
    //             },
    //         ]
    //         // for(let i of  mileage){
    //         //     console.log(i)
    //         // }
    //         let date = mileage.map((mile) => {
    //                 return mile.day
    //         })

    //         let value = mileage.map((mile) => {
    //             return mile.distance})

    //         let volume = mileage.map((mile) => {
    //             return mile.speed})


    // // Generate random data
    // // var date = new Date();

    // // var value = 1000;
    // // var volume = 100000;

    // function generateData() {
    //   return {
    //     date: date,
    //     value: value,
    //     volume: volume
    //   };
    // }

    // function generateDatas() {
    //   let data = [];

    //     data.push(generateData());
    //     console.log(data)

    //   return data;
    // }


    // // Create axes
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    // var xAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
    //   maxDeviation: 0,
    //   baseInterval: {
    //     timeUnit: "day",
    //     count: 1
    //   },
    //   renderer: am5xy.AxisRendererX.new(root, {}),
    //   tooltip: am5.Tooltip.new(root, {})
    // }));

    // var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    //   extraMin: 0.2,
    //   renderer: am5xy.AxisRendererY.new(root, {})
    // }));


    // // Add series
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    // var series = chart.series.push(am5xy.LineSeries.new(root, {
    //   name: "Series",
    //   xAxis: xAxis,
    //   yAxis: yAxis,
    //   valueYField: "value",
    //   valueXField: "date",
    //   tooltip: am5.Tooltip.new(root, {
    //     labelText: "{valueY}"
    //   })
    // }));

    // // y axis for volume
    // var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {});
    // volumeAxisRenderer.grid.template.set("forceHidden", true);
    // volumeAxisRenderer.labels.template.set("forceHidden", true);

    // var volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    //   height: am5.percent(25),
    //   y: am5.percent(100),
    //   centerY: am5.percent(100),
    //   panY:false,
    //   renderer: volumeAxisRenderer
    // }));

    // // Add series
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    // var volumeSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
    //   name: "Volume Series",
    //   xAxis: xAxis,
    //   yAxis: volumeAxis,
    //   valueYField: "volume",
    //   valueXField: "date",
    //   tooltip: am5.Tooltip.new(root, {
    //     labelText: "{valueY}"
    //   })
    // }));

    // volumeSeries.columns.template.setAll({ fillOpacity: 0.8, strokeOpacity:0, width: am5.percent(40) })


    // // Add scrollbar
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //   orientation: "horizontal"
    // }));


    // // Set data
    // var data = generateDatas(200);
    // series.data.setAll(data);
    // volumeSeries.data.setAll(data);


    // // Make stuff animate on load
    // // https://www.amcharts.com/docs/v5/concepts/animations/
    // series.appear(1000);
    // chart.appear(1000, 100);


    //     }
    mounted() {
        api.getKeyFacts()
            .then(response => {
                let mileage = response.data.mileage['Полувагон']
                console.log(mileage)

                let root = am5.Root.new(this.$refs.chartdiv2);
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
                    pinchZoomX: true,
                    layout: root.verticalLayout

                }));

                let legend = chart.children.push(am5.Legend.new(root, {
                    nameField: "name",
                    fillField: "color",
                    strokeField: "color",
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                }));

                legend.data.setAll([{
                    name: "Интервал",
                }]);


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
                            'distance': elem.distance,
                            'wagons': elem.wagons
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
                    numberFormat: " #.'км/день'",
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
                        labelText: "{distance} км.\n{wagons} шт."
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