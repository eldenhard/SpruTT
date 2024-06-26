<!-- <template>
    <section class="chart_row">
        <div class="column_chart pie" ref="chartdiv2"></div>
        <div class="column_chart column" ref="chartdiv"></div>

    </section>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


export default {
    // props: ['column_chart_data_BP', 'column_chart_data_B', 'column_chart_data_plan', 'column_chart_pie'],
    props: {
        column_chart_data_BP: {
            type: Number,
            default: 0
        },
        column_chart_data_B: {
            type: Number,
            default: 0
        },
        column_chart_data_plan: {
            type: Number,
            default: 0
        },
        column_chart_pie: {
            type: Array,
            default: () => []
        },
        wagon_type: {
            type: String
        }
    },
    data() {
        return {
            chartInitialized: false,
            chart: null,
            chart2: null,
            root1: null,
            root2: null
        }
    },
    watch: {
        column_chart_pie: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal && newVal !== oldVal && this.wagon_type == 'Полувагон') {
                 
                    this.initializeChart()
                    this.initializePieChart()
                   
                }
            }
            // if (this.wagon_type == 'Полувагон') {
            //     if (newVal.length > 0 ) {
            //         console.log('123')
            //         console.log(this.column_chart_pie, 'column_chart_pie son')
            //         this.initializeChart()
            //         this.initializePieChart()
                   
            //     }
            // }
        },
        column_chart_data_BP: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal && newVal !== oldVal ) {
                 
                    this.initializeChart()
                    this.initializePieChart()
                   
                }
            }
        }
    },


    methods: {
        initializeChart() {

            let root = am5.Root.new(this.$refs.chartdiv);
            root.locale = am5locales_ru_RU;
            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panY: false,
                    layout: root.verticalLayout
                })
            );

            // Define data
            let data = [{
                category: "Бизнес-план",
                value1: this.column_chart_data_BP,
            },
            {
                category: "Текущий план",
                value1: this.column_chart_data_B,
            }, {
                category: "Факт текущий",
                value1: this.column_chart_data_plan,
            },
            {
                category: "",
                value1: 0,
            }
            ];

            // Create Y-axis
            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );

            // Create X-Axis
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    categoryField: "category"
                })
            );
            xAxis.data.setAll(data);

            // Create series
            // let series1 = chart.series.push(
            //     am5xy.ColumnSeries.new(root, {
            //         name: "Series",
            //         xAxis: xAxis,
            //         yAxis: yAxis,
            //         valueYField: "value1",
            //         categoryXField: "category",
            //         width: 50,
            //     })
            // );
            // Создание серии столбцов
            let series1 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Series",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value1",
                    categoryXField: "category",
                    // Установка ширины столбцов
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{value1}",
                    }),
                })
            );
            series1.columns.template.setAll({
                width: 35
            });
            series1.data.setAll(data);

            series1.set("tooltipText", "{categoryX}: {valueY}");
            // Add legend
            let legend = chart.children.push(am5.Legend.new(root, {}));
            legend.data.setAll(chart.series.values);

            // Add cursor
            chart.set("cursor", am5xy.XYCursor.new(root, {}));

            this.root = root;

        },
        initializePieChart() {
            am4core.useTheme(am4themes_animated);
            // Themes end

            let chart = am4core.create(this.$refs.chartdiv2, am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.legend = new am4charts.Legend();
            chart.data = [...this.column_chart_pie].sort((a, b) => b.metric_current_plan - a.metric_current_plan);


            let series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "metric_current_plan";
            series.dataFields.category = "client";
        },
    },
    beforeDestroy() {
        if (this.chart1) {
            this.chart1.dispose();
        }
        if (this.chart2) {
            this.chart2.dispose();
        }
    }
}
</script>

<style scoped>
.chart_row {
    display: flex;
    flex-direction: column;
}

.column_chart {
    width: 100%;

}

.pie {
    height: 40vw;
}

.column {
    height: 20vw;
}

.column .am5xy-ColumnSeries-Slice {
    width: 5px !important;
}
</style> -->


<template>
    <section class="chart_row">
      <div class="column_chart pie" ref="chartdiv2"></div>
      <div class="column_chart column" ref="chartdiv"></div>
    </section>
  </template>
  
  <script>
  import * as am5 from '@amcharts/amcharts5';
  import * as am5xy from '@amcharts/amcharts5/xy';
  import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
  import * as am5percent from "@amcharts/amcharts5/percent";
  import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU";
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";
  
  export default {
    props: {
      column_chart_data_BP: {
        type: Number,
        default: 0
      },
      column_chart_data_B: {
        type: Number,
        default: 0
      },
      column_chart_data_plan: {
        type: Number,
        default: 0
      },
      column_chart_pie: {
        type: Array,
        default: () => []
      },
      wagon_type: {
        type: String
      }
    },
    data() {
      return {
        chartInitialized: false,
        chart1: null,
        chart2: null,
        root1: null,
        root2: null
      }
    },
    watch: {
      column_chart_pie: 'updateCharts',
      column_chart_data_BP: 'updateCharts',
      column_chart_data_B: 'updateCharts',
      column_chart_data_plan: 'updateCharts'
    },
    methods: {
      updateCharts() {
        this.clearChartData();
          this.initializeChart();
          this.initializePieChart();
        
      },
      clearChartData() {
        if (this.root1) {
          this.root1.dispose();
          this.root1 = null;
        }
        if (this.root2) {
          this.root2.dispose();
          this.root2 = null;
        }
      },
      initializeChart() {
        this.root1 = am5.Root.new(this.$refs.chartdiv);
        this.root1.locale = am5locales_ru_RU;
        this.root1.setThemes([am5themes_Animated.new(this.root1)]);
  
        let chart = this.root1.container.children.push(
          am5xy.XYChart.new(this.root1, {
            panY: false,
            layout: this.root1.verticalLayout
          })
        );
  
        let data = [{
          category: "Бизнес-план",
          value1: this.column_chart_data_BP,
        },
        {
          category: "Текущий план",
          value1: this.column_chart_data_B,
        }, {
          category: "Факт текущий",
          value1: this.column_chart_data_plan,
        },
        {
          category: "",
          value1: 0,
        }
        ];
  
        let yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(this.root1, {
            renderer: am5xy.AxisRendererY.new(this.root1, {})
          })
        );
  
        let xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(this.root1, {
            renderer: am5xy.AxisRendererX.new(this.root1, {}),
            categoryField: "category"
          })
        );
        xAxis.data.setAll(data);
  
        let series1 = chart.series.push(
          am5xy.ColumnSeries.new(this.root1, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value1",
            categoryXField: "category",
            tooltip: am5.Tooltip.new(this.root1, {
              labelText: "{value1}",
            }),
          })
        );
        series1.columns.template.setAll({
          width: 35
        });
        series1.data.setAll(data);
  
        series1.set("tooltipText", "{categoryX}: {valueY}");
        let legend = chart.children.push(am5.Legend.new(this.root1, {}));
        legend.data.setAll(chart.series.values);
  
        chart.set("cursor", am5xy.XYCursor.new(this.root1, {}));
  
        this.chart1 = chart;
      },
      initializePieChart() {
        am4core.useTheme(am4themes_animated);
  
        this.root2 = am4core.create(this.$refs.chartdiv2, am4charts.PieChart3D);
        this.root2.hiddenState.properties.opacity = 0;
  
        this.root2.legend = new am4charts.Legend();
        this.root2.data = [...this.column_chart_pie].sort((a, b) => b.metric_current_plan - a.metric_current_plan);
  
        let series = this.root2.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "metric_current_plan";
        series.dataFields.category = "client";
    },
  },
  beforeDestroy() {
    this.clearChartData();
  }
}
</script>

<style scoped>
.chart_row {
  display: flex;
  flex-direction: column;
}

.column_chart {
  width: 100%;
}

.pie {
  height: 40vw;
}

.column {
  height: 20vw;
}

.column .am5xy-ColumnSeries-Slice {
  width: 5px !important;
}
</style>