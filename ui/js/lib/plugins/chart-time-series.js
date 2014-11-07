(function ($) {

  var marker = {
    symbol:'circle',
    states: {
      hover: {
        fillColor: '#007dc3',
        radiusPlus: 0,
        lineWidthPlus: 0
      }
    }
  };


  /**
   * Time Series Chart defaults.  The main Highcharts defaults
   * are set in the charts controller.
   *
   */
  var defaults = {
    series: [{
      marker: marker
    }],
    chart: {
      type: 'line',
      spacingTop: 70,
      spacingRight: 40
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        shadow: false,
        marker: {
          enabled: false
        }
      }
    }
  };


  /**
   * @param element
   * @param options
   * @constructor
   */
  function TimeSeriesChart( element, options ) {
    this.element = element;

    this.chartId = $(this.element).data('chart-data-id');

    this.options = $.extend(true, {}, {
      chart: defaults
    }, options, this.formatData(options.data));

    this.init();
  }

  /**
   * Update the chart according to a change in the filter
   */
  TimeSeriesChart.prototype.updateChart = function(data) {

    var chartData = this.formatData(data);
    var chart;

    /*
     * Update the chart
     */
    chart = this.chart.highcharts();

    chart.series[0].setData(chartData.chart.series[0].data, true, true);
    chart.xAxis[0].setCategories(chartData.chart.xAxis.categories, true, true);

    this.setMarkers();
  };

  /**
   * Only show the markers if the width of the chart is big enough to ensure
   * they aren't too close together.
   *
   * @todo determine whether this should be fire on chart redraw, rather than
   * we explcitly change the data, or initialise the chart.
   */
  TimeSeriesChart.prototype.setMarkers = function() {

    var chart = this.chart.highcharts();

    if ( chart && (chart.series[0].points.length * 14) < chart.chartWidth ) {
      _.each(chart.series[0].points, function (point) {
        point.update({
          marker: {
            enabled: true
          }
        });
      });
    }
  };

  /**
   * Format the data according to HighCharts format.
   * @param filter
   * @param data
   */
  TimeSeriesChart.prototype.formatData = function(data) {

    /*
     * Re-arrange the data so that it is inline with how highcharts expects it.
     */
    var chartData = {
      series: [{
        data: data.values
      }],
      xAxis: {
        categories: data.labels
      }
    };

    return {
      chart: chartData
    };
  };

  /**
   * Initialise the Highchart
   */
  TimeSeriesChart.prototype.init = function () {
    this.chart = $(this.element).highcharts(this.options.chart);
    this.setMarkers();
  };

  /**
   * Attach the plugin to the JQuery object.
   *
   * @param options
   * @returns {*}
   */
  $.fn.timeSeriesChart = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_chart')) {
        $.data(this, 'plugin_chart', new TimeSeriesChart( this, options ));
      }
    });
  };

})( jQuery );


