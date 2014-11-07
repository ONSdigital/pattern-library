/**
 * File to invoke pattern library JS demos
 */

$(document).ready(function(e) {

  var options;
  var data;

  /*
   * Create an example chart for the time-series page
   */
  $('[data-chart]').each(function() {

    var chart = $(this);

    switch ( chart.data("chart") ) {
      case 'time-series':

        chart.timeSeriesChart({
          data: {
            "labels": ['Jan 2013', 'Feb 2013', 'Mar 2013', 'Apr 2013', 'May 2013', 'Jun 2013', 'Jul 2013', 'Aug 2013', 'Sep 2013', 'Oct 2013', 'Nov 2013'],
            "values": [59,83,86,88,85,56,27,77,26]
          },
          chart: {
            series: [{
              name: chart.data('chart-tooltip')
            }],
            title: {
              text: chart.data('chart-title')
            },
            yAxis: {
              title: {
                text: chart.data('chart-ylabel')
              }
            }
          }
        });

        break;

      case 'stacked-bar':

        data = {
          xAxis: {
            categories: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]
          },
          series: [
            {
              name: 'Net imports',
              data: [1.0, '', '', '', '', 1.4, '', '', '', '', 1.2, 0.9, 0.7, 0.2, 0.6, 0.7, 0.6, 0.4, 0.9, 0.2, 0.2]
            },
            {
              name: 'Renewable sources',
              data: [1.3, '', '', '', '', 2.1, '', '', '', '', 2.7, 2.8, 3.0, 3.1, 3.6, 4.3, 4.6, 5.0, 6.0, 6.6, 7.1]
            },
            {
              name: 'Nuclear',
              data: [16.3, '', '', '', '', 21.3, '', '', '', '', 19.6, 20.8, 20.1, 20.0, 18.2, 18.4, 17.1, 14.0, 11.9, 15.2, 13.9]
            },
            {
              name: 'Fossil Fuels',
              data: [201.1, null, null, null, null, 199.7, null, null, null, null, 214.0, 219.1, 213.9, 218.1, 221.9, 221.6, 218.0, 215.6, 213.7, 195.2, 202.6]
            }
          ]
        };

        options = {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Energy Consumption by Source, 1990 to 2010'
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            },
            stackLabels: {
              enabled: true,
              formatter: function () {
                if (this.total === null || this.total === undefined) {
                  return '<i>N/A</i>';
                } else {
                  return '';
                }
              }
            }
          },
          legend: {
            backgroundColor: '#F9F9F9',
            shadow: false
          },
          tooltip: {
            shared: false,
            formatter: function () {
              return ONS.charts.textTooltipFormatter(this.x, this.series.name + ': ' + this.y + '<br/>' + 'Total: ' + this.point.stackTotal);
            }
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {}
            },
            bar: {}
          }

        };

        $.extend(true, options, data);

        chart.highcharts(options);

        /*
         * Ensure that on page resize the chart is changed from vertical
         * to horizontal.
         */
        window.onresize = function(event) {
          ONS.charts.stackedResize($('[data-chart]'), options);
        };

        /*
         * Trigger resize
         */
        ONS.charts.stackedResize(chart, options);


        break;

      case 'horizontal-bar':

        data = {
          xAxis: {
            categories: [
              "Food",
              "Alcohol",
              "Clothing",
              "Housing",
              "Furniture",
              "Health",
              "Transport",
              "Communication",
              "Recreation",
              "Education",
              "Restaurant",
              "Miscellaneous"
            ]
          },
          series: [{
            name: 'Contribution',
            data: [0.08, -0.02, -0.05, -0.05, null, 0.01, -0.29, null, -0.05, 0, -0.06, 0]
          }]
        };

        options = {
          chart: {
            type: 'bar',
            height: 500
          },
          title: {
            text: 'Figure B: Contribution to 12 months growth rate (0.5%), February 2014'
          },
          xAxis: {
            alternateGridColor: '#f1f1f1',
            reversed: true,
            tickmarkPlacement: 'between',
            labels: {
              formatter: null,
              y: 0
            }
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              format : '{value} %'
            }
            ,
            min: -.4,
            max: .2 ,
            gridZIndex:4,
            gridLineColor:'#F9F9F9',
            plotLines: [{
              color: '#ccc',
              width: 1,
              value: 0,
              zIndex:4
            }]
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
                formatter: function() {
                  if (this.y===null) {
                    return '<i>N/A</i>';
                  } else if (this.y=== 0) {
                    return '<i>0.0%</i>';
                  } else {
                    return '';
                  }
                }
              }
            }
          },
          legend:{
            enabled:false
          }
        };


        $.extend(true, options, data);

        chart.highcharts(options);


        break;

      case 'multi-series':

        data = {
          xAxis: {
            categories: ['Feb 2013', 'Mar 2013', 'Apr 2013', 'May 2013', 'Jun 2103', 'Jul 2013', 'Aug 2013', 'Sept 2013', 'Oct 2013', 'Nov 2013', 'Dec 2013', 'Jan 2014', 'Feb 2014'],
          },

          series: [{
            name: 'CPI % change',
            data: [1.7, 1.9, 2, 2.1, 2.2, 2.7, 2.7, 2.8, 2.9, 2.7, 2.4, 2.8, 2.8],
            marker: {
              symbol: "circle",
              states: {
                hover: {
                  fillColor: '#007dc3'
                }
              }
            },
            dashStyle: 'Solid'
          }, {
            name: ' CPIH % change',
            data: [1.6, 1.8, 1.9, 1.9, 2, 2.5, 2.5, 2.5, 2.7, 2.5, 2.2, 2.6, 2.6],
            marker: {
              symbol: "square",
              states: {
                hover: {
                  fillColor: '#409ed2'
                }
              }
            },
            dashStyle: 'longdash'
          }, {
            name: 'RPIJ % change',
            data: [2, 2.1, 2, 2, 1.9, 2.5, 2.6, 2.6, 2.7, 2.5, 2.3, 2.7, 2.6],
            marker: {
              symbol: "diamond",
              states: {
                hover: {
                  fillColor: '#7fbee1'
                }
              }
            },
            dashStyle: 'shortdot'
          }, {
            name: 'RPI % change',
            data: [2.7, 2.8, 2.7, 2.6, 2.6, 3.2, 3.3, 3.1, 3.3, 3.1, 2.9, 3.3, 3.2],
            marker: {
              symbol: "triangle",
              states: {
                hover: {
                  fillColor: '#007dc3'
                }
              }
            },
            dashStyle: 'Dot'
          }]

        };

        options = {
          chart: {
            type: 'line'
          },
          series: [{
            name: "X-Axis label"
          }],
          title: {
            text: "The Chart Title"
          }
        };

        $.extend(true, options, data);

        chart.highcharts(options);

        break;

      case 'pyramid':

        data = {

          series: [
            {
              name: 'Female',
              data: [-1951153, -1776769, -1745043, -1913324, -2140693, -2165760, -2130739, -2027676, -2313633, -2372899, -2137943, -1864375, -1848213, -1719021, -1305796, -1118131, -896135, -590364, -372291]
            },
            {
              name: 'Male',
              data: [2045247, 1864230, 1831322, 2013226, 2191539, 2152085, 2109169, 2008678, 2253651, 2312799, 2097878, 1819823, 1776207, 1626032, 1170152, 928768, 637528, 335580, 141158]
            }

          ],
          xAxis: {
            categories: ['0-4', '5-9', '10-14', '15-19',
              '20-24', '25-29', '30-34', '35-39', '40-44',
              '45-49', '50-54', '55-59', '60-64', '65-69',
              '70-74', '75-79', '80-84', '85-89', '90 +']
          }
        };

        options = {

          chart: {
            type: 'bar'
          },
          title: {
            text: 'Population pyramid for England, midyear 2012'
          },
          xAxis: {
            alternateGridColor: '#f1f1f1',
            reversed: false,
            labels: {
              step: 1
            },
            tickmarkPlacement: 'between'
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              formatter: function () {
                return (Math.abs(this.value) / 1000000) + 'M';
              }
            },
            min: -2500000,
            max: 2500000,
            gridZIndex: 4,
            gridLineColor: '#F9F9F9'
          },
          tooltip: {
            shared: false,
            formatter: function () {
              return ONS.charts.textTooltipFormatter(this.series.name + ', age ' + this.point.category, 'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0));
            }
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          }
        };

        $.extend(true, options, data);

        chart.highcharts(options);

        break;
    }

  });
});


