<template>
    <div >
        <SelectRange @selectCurrentRange="selectCurrentRange" v-model="selectSearch" />
        <h2 style="font-family: 'Montserrat', sans-serif;font-size: 18px;color:#242424;"> Средняя скорость <strong>цистерн</strong> по дислокациям</h2>
        <div class="hello1 d" ref="chartdiv2" v-show="day">
        </div>
        <div class="hello1 m" ref="chartdiv3" v-show="month" >
        </div>
        <div class="hello1 k" ref="chartdiv4" v-show="kvartal"  >
        </div>

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
import api from "@/api/report"
import Loader from "@/components/loader/loader.vue"
import SelectRange from "@/components/ui/SelectRange.vue"


export default {
    data() {
        return {
            selectSearch: '',
            Mounth: '',
            Kvartal: '',
            allData: '',
            Mileage: '',
            day: true,
            month: false,
            kvartal: false,
        }
    },
    components: { SelectRange },

    watch: {
        selectSearch() {
            if (this.selectSearch == 1) {
                this.day = true
                this.month = false,
                this.kvartal =  false,
                console.log('I WORK')
                this.getGraph()

            } if (this.selectSearch == 30) {
                this.kvartal = false
                this.day = false
                this.month = true
                this.getGraphMonth()
                console.log('AND I WORK')

            } else {
                this.kvartal = true
                this.day = false
                this.month = false
                this.getGraphQuarter()
                console.log('kvartal')
            }
        }
    },
    methods: {
        selectCurrentRange(selectSearch) {
            this.selectSearch = selectSearch;

            if (this.selectSearch == 1) {
                // this.getGraph(this.mileage)
                this.day = false
                this.month = false
                // console.log('1')
            }
            else if (this.selectSearch == 30) {
                this.day = false
                this.month = true
                // console.log('30')
            } else {
                // console.log('Ошибка')
            }


        },
        getGraph() {
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
            for (let elem of this.Mileage) {
                data.push(
                    {
                        'date': new Date(elem.day).getTime(),
                        'value': Math.round(elem.speed),
                        'distance': elem.distance,
                        'wagons': elem.wagons
                    }
                )
            }

            let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
                maxDeviation: 0.2,
                baseInterval: {
                    timeUnit: "day",
                    count: 1
                },

                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {})
            }));

            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                numberFormat: " #.'км/день'",
                renderer: am5xy.AxisRendererY.new(root, {})
            }));

            let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{value} км/день"
                })
            }));

            chart.set("scrollbarX", am5.Scrollbar.new(root, {
                orientation: "horizontal"
            }));


            series.data.setAll(data)

            series.appear(1000);
            chart.appear(1000, 100);
        },
        getGraphMonth() {
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

            for (let elem in this.allData) {
                let mainElem = this.allData[elem]
                    data.push(
                        {
                            'date': new Date(mainElem.day).getTime(),
                            'value': Math.round(mainElem.speed),
                            'distance': mainElem.distance,
                            'wagons': mainElem.wagons
                        }
                    )


            }
            console.log(data, 'ЭТОТ ТОТ МАССИВ 11')
            // console.log(data, 'ЭТОТ ТОТ МАССИВ')
            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
                maxDeviation: 0.2,
                baseInterval: {
                    timeUnit: "month",
                    count: 1
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
                    labelText: "{value} км/день"
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
        },
        getGraphQuarter() {
            let root = am5.Root.new(this.$refs.chartdiv4);
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




            let preData = []




            for (let elem in this.Kvartal) {
                if (this.Kvartal[elem] != undefined && this.Kvartal[elem] != null) {
                preData.push(
                    {   
                        'hash': this.Kvartal[elem].hash,
                        'date': new Date(this.Kvartal[elem].day).getTime(),
                        'value': Math.round(this.Kvartal[elem].speed),
                        'distance': this.Kvartal[elem].distance,
                        'wagons': this.Kvartal[elem].wagons
                    }
                )
                } else {
                    return data
                }

            }
            let data = preData.filter(item => item.hash != undefined);
           
            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
                maxDeviation: 0.2,
                baseInterval: {
                    timeUnit: "day",
                    count: 1
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
                    labelText: "{hash} кв. \n{value} км/день"
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
        }
    },
    mounted() {
        api.getKeyFactsSpeedTon()
            .then(response => {
                this.Mileage = response.data
                let a = this.Mileage
                this.getGraph(this.Mileage)
                this.allData = this.Mileage.reduce((acc, { day, speed, distance, wagons }) => {
                    const yearMonth = day.substring(0, 7);
                    if (acc[yearMonth]) {
                        acc[yearMonth].day = day
                        acc[yearMonth].speed += speed / 30;
                        acc[yearMonth].distance += distance / 30;
                        acc[yearMonth].wagons += wagons;
                    } else {
                        acc[yearMonth] = { day, speed, distance, wagons };
                    }
                    return acc;
                }, {})



                const AllKvartal = a.map(({ day, ...rest }) => {
                    const quarter = ['I', 'II', 'III', 'IV'][Math.floor((+day.substring(5, 7) - 1) / 3)];
                    const year = day.substring(0, 4);
                    const hash = `${year}-${quarter}`; // "2022-IV"
                    return { hash, day, ...rest }
                    // return { hash, day, ...rest };
                })

                this.Kvartal = AllKvartal.reduce((acc, { hash, day, speed, distance, wagons }) => {
                    const kvartal = hash;
                    if (acc[kvartal]) {
                        acc[kvartal].hash = hash
                        acc[kvartal].speed += speed / 90;
                        acc[kvartal].distance += distance / 90;
                        acc[kvartal].wagons += wagons;
                    } else {
                        acc[kvartal] = { hash, day, speed, distance, wagons };
                    }
                    return acc;
                })
                // console.log(this.Kvartal, '11')


            })
    }

}
</script>