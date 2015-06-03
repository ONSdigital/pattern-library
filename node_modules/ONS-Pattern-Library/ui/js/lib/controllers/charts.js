/**
 * @file a controller to intialise the appropriate plugins,
 * deal with chart control events and to provide custom chart
 * functions to external libraries.
 */

var ONS = ONS || {};

ONS.charts = ONS.charts || {};

ONS.charts = (function() {


  /**
   * Convert a stacked bar chart from vertical to horizontal.
   *
   * @param chart
   * @param options
   */
  var stackedResize = function(chart, options){

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if(w<768){
      options.chart.type="bar";
      options.plotOptions.column = {};
      options.plotOptions.series = {stacking: 'normal'};
      stackedBar =  chart.highcharts(options);

    } else {
      options.chart.type="column";

      yAxis = chart.highcharts().yAxis[0]
      titleWidth=0;

      if(yAxis.axisTitle){
        titleWidth = yAxis.axisTitle.getBBox().width;
        yAxis.update({
          title: {
            offset: -titleWidth,
            align: 'high'
          }
        });
      }

      options.plotOptions.series = {};
      options.plotOptions.column = {stacking: 'normal'};
      stackedBar = chart.highcharts(options);

    }
  };


  /**
   * A generic Highcharts tooltip formatter.
   *
   * @param title
   * @param content
   * @returns {string}
   */
  var textTooltipFormatter = function(title, content) {

    var html = '<div id="custom-tooltip">';

    html += '<div class="maintext">';
    html += '<h4 class="maintext__title">' + title + ': </h4>';
    html += '<div class="tiptext">' + content + '</div>'
    html += '</div></div>';

    return html;
  };


  /**
   * Format the tooltip for mainly time-series and multi-series charts.
   * This is the default tooltip formatter.
   *
   * @returns {string}
   */
  var tooltipFormatter = function() {

    var id = '<div id="custom-tooltip" class="tooltip-left tooltip-right">';
    var block = id + '<div class="sidebar">';
    var title = '<h4 class="maintext__title">' + this.x + ': </h4>';
    var symbol = ['<div class="circle">●</div>', '<div class="square">■</div>', '<div class="diamond">♦</div>', '<div class="triangle">▲</div>', '<div class="triangle">▼</div>'];

    var content = block + '<div class="title">&nbsp;</div>';

    // symbols
    $.each(this.points, function (i, val) {
      content += symbol[i];
    });

    content += '</div>';
    content += '<div class="maintext">';
    content += title;

    // series names and values
    $.each(this.points, function (i, val) {
      content += '<div class="tiptext"><b>' + val.point.series.chart.series[i].name + '= </b>' + Highcharts.numberFormat(val.y, 2) + '</div>';
    });

    content += '</div>';
    return content;

  };



  /**
   * Position the tooltip.  The position is conditional on the chart type.
   *
   * @param labelWidth
   * @param labelHeight
   * @param point
   * @returns {{x: number, y: number}}
   */
  var tooltipPositioner = function (labelWidth, labelHeight, point) {

    /*
     * We've only applied a custom formatter to the line charts.
     */
    if ( this.chart.options.chart.type !== 'line' ) {

      $('#custom-tooltip').removeClass('tooltip-right tooltip-left');


      /*
       * This is the default Highcharts position, adjusted
       * for our custom tooltip style.
       */
      return {
        x: point.plotX + this.chart.plotLeft - 100,
        y: point.plotY + this.chart.plotTop
      };
    }

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var points = {x: 30, y: 42};
    var tooltipX, tooltipY;

    if (w > 768) {

      if (point.plotX + labelWidth > this.chart.plotWidth) {
        tooltipX = point.plotX + this.chart.plotLeft - labelWidth - 10;
        $('#custom-tooltip').removeClass('tooltip-left');
      } else {
        tooltipX = point.plotX + this.chart.plotLeft + 10;
        $('#custom-tooltip').removeClass('tooltip-right');
      }

      tooltipY = 100;
      points = {x: tooltipX, y: tooltipY};
    } else {
      $('#custom-tooltip').removeClass('tooltip-left');
      $('#custom-tooltip').removeClass('tooltip-right');
    }

    return points;
  };


  /**
   * Format the xaxis labels.
   *
   * @returns {string}
   */

  var labelFormatter = function() {

    /*
     * We've only applied a custom formatter to the line charts.
     */
    if ( this.chart.options.chart.type !== 'line' ) {
      return this.value;
    }

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var response = '';
    var items = this.chart.xAxis[0].categories.length;

    var maxItemsDesktop = 8;
    var maxItemsTablet = 4;

    var modulo;

    if( w < 768 ){
      modulo = Math.round(items / maxItemsTablet);
    }
    else {
      modulo = Math.round(items / maxItemsDesktop);
    }

    if(this.isFirst){
      count=0;
    }
    if(count % modulo===0){
      response = this.value;
    }

    count++;

    return response;
  };


  return {
    textTooltipFormatter: textTooltipFormatter,
    tooltipFormatter: tooltipFormatter,
    labelFormatter: labelFormatter,
    tooltipPositioner: tooltipPositioner,
    stackedResize: stackedResize
  };
}());


(function ($) {

  var marker = {
    states: {
      hover: {
        radiusPlus: 0,
        lineWidthPlus: 0
      }
    }
  };

  /**
   * These are global chart options
   */
  function setOptions() {

    Highcharts.setOptions({
      colors: ['#007dc3', '#409ed2', '#7fbee1', '#007dc3', '#409ed2', '#7fbee1'],
      series: [{
        marker: marker
      }],
      chart: {
        style: {
          fontFamily: 'open-sans-n4',
          color:'#000'
        },
        spacingTop: 70,
        spacingLeft: 30,
        spacingBottom: 60,
        backgroundColor:'#fff'
      },

      title: {
        align: 'left',
        y: -15,
        x: 15
      },

      plotOptions: {
        series: {
          shadow:false,
          marker: {
            enabled: true
          },
          animation: false,
          states: {
            hover:{
              halo: {
                size: 0
              },
              enabled:true,
              shadow:false,
              lineWidth: 2,
              lineWidthPlus: 0,
              marker:{
                height:0,
                width:0,
                halo:false,
                enabled: true,
                fillColor: null,
                radiusPlus: null,
                lineWidth: 3,
                lineWidthPlus: 0
              }
            }
          }
        },
        line: {
          marker: {
            radius: 4,
            fillColor: '#fff',
            lineColor: null,
            lineWidth: 2
          },
          shadow:true,
          dataLabels: {
            enabled: false
          }
        }
      },
      xAxis: {
        labels: {
          formatter: ONS.charts.labelFormatter,
          step: 1
        },
        tickmarkPlacement: 'on'
      },
      yAxis: {
        lineWidth: 1,
        title: {
          style: {
            color: '#000',
            fontWeight:300
          },
          offset: -30,
          align: 'high',
          rotation: 0,
          y: -15
        }

      },

      legend: {
        borderColor: null,
        borderRadius: 0,
        borderWidth: 1
      },

      credits:{
        enabled:false
      },

      tooltip: {
        shared: true,
        crosshairs: {
          width: 1,
          color: '#f37121'
        },
        positioner: ONS.charts.tooltipPositioner,
        formatter: ONS.charts.tooltipFormatter,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 0,
        borderColor: 'rgba(255, 255, 255, 0)',
        shadow: false,
        useHTML: true
      }
    });
  }


  $(document).ready(function(){

    var processedData = [];
    var defaultFilter;


    /*
     * Set default chart options
     */
    setOptions();

    /*
     * Get an format the data on the page.  We are using a data object
     * that may at first appear a bit wrong.  Specifically, it only contains
     * the start date.  This is because we want to keep this object as small
     * as possible to aid performance.  If we know that each value is a month,
     * and we know the start month, then the full data range month lables will
     * be known.
     */
    $('[data-chart-data-for]').each(function() {
      var dataElem = $(this);
      var chartData = dataElem.data('chart-data-for');

      /*
       * Determine defaults from selected dropdowns (i.e. set by server)
       */
      defaultFilter = {
        scale: 'month',
        period: {
          start: {
            year: $('select[data-chart-controls-from-year] option:selected').val(),
            month: $('select[data-chart-controls-from-month] option:selected').val()
          },
          end: {
            year: $('select[data-chart-controls-to-year] option:selected').val(),
            month: $('select[data-chart-controls-to-month] option:selected').val()
          }
        }
      };


      /*
       * Reformat the data so that we can use it in our
       * tables and charts
       */
      var data = new DataFilter($.parseJSON(dataElem.html()));

      /*
       * For each chart and table it is data for, initialise
       * the chart or table.
       */
      _.each(chartData, function(elem) {
        processedData[elem] = data;
      });
    });

    /**
     * Auto initialise the charts
     */
    $('[data-chart]').each(function() {
      var chart = $(this);

      switch ( chart.data('chart') ) {
        case 'timeseries':
          chart.timeSeriesChart({
            data: processedData[chart.data('chart-data-id')].getData(defaultFilter),
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

        case 'datatable':
          chart.dataTable({
            data: processedData[chart.data('chart-data-id')].getData(defaultFilter),
            colLabel: chart.data('chart-col-label')
          });
          break;
      }

    });

    /*
     * Initialise the chart controls
     */
    $('[data-chart-controls]').chartControl();

    /*
     * List for changes in chart controls
     */
    $('[data-chart-controls]').on('chart-filter-change', function(e, data) {

      var newData;
      var chart;

      /*
       * Get the target chart
       */
      _.each(data.chartIds, function(chartId) {
        newData = processedData[chartId].getData(data.filter);

        chart = $('[data-chart-data-id="' + chartId + '"]').data('plugin_chart');

        /*
         * Update the chart
         */
        chart.updateChart(newData);
      });
    });
  });

})( jQuery );
