describe("Time series chart", function() {

  var chartData;
  var filter;
  var chart;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/tests/fixtures/';

    chartData = {
      "labels": [],
      "values": [59,83,86,88,85,56,27,77,26,77,100,87,61,56,49,96,3,78,38,81,56,66,91,57,17,77,29,95,79,77,64,36,7,60,89,69,82,33,19,84,75,28,12,72,69,10,13,30,56,53,91,79,19,6,98,61,54,42,33,84,62,17,66,66,13,8,52,16,44,63,22,28,81,84,64,86,4,82,55,90,38,5,52,38,89,93,7,81,41,68,96,89,27,9,74,33,99,7,48,33,18,16,44,94,71,57,10,29,92,56,68,15,97,55,29,41,31,54,83,21,70,95,13,79,13,29,84,67,91,11,51,89,40,88,49,12,72,1,6,70,61,17,39,26,68,37,84,88,44,56,62,52,16,88,6,72,64,79,17,80,53,75,81,19,58,100,19,47,2,56,4,39,64,40,35,100,49,23,32,75,40,24,46,71,44,38,50,74,89,16,20,76,35,57,79,4,6,68,36,43,6,31,61,96,65,69,60,30,2,34,13,40,33,100,98,32,29,32,100,43,82,16,20,91,61,38,60,11,85,56,3,62,88,52,49,38,69,49,15,69,15,79,57,93,72,16,17,82,94,38,57,41,78,8,70,49,30,94,83,54,57,82,57,98,35,38,53,78,21,16,11,53,16,63,47,23,44,65,67,96,59,57,17,30,76,60,53,65,1,98,71,22,1,78,10,38,47,96,23,71,46,41,35,42,71,14,54,6,81,58,96,26,23,36,22,96,10,13,99,46,12,1,67,2,80,90,67,32,97,58,86,94,70,59,89,61,14,77,11,94,23,59,61,99,26,10,93,61,29,38,16,60,74,95,66,49,3,92,56,76,40,31,4,97,77,81,48,87,2,66,90,23,23,11,64,89,90,66,14,91,57,95,14,6,33,86,78,3,64,69,46,87,8,20,61,40,29,79,46,90,85,1,1,93,25,60,7,87,36,31,53,69,68,89,27,96,25,89,71,26,32,64,74,98,54,66,14,76,56,5,26,86,41,10,78,60,15,40,92,94,6,83,23,98,59,93,98,95,80,42,62,74,92,71,79,30,14,92,44,2,18,58,78,20,44,38,77,6,29,16,56,74,34,12,46,81,87,87,8,21,29,3,85,7,80,43,45,28,13,45,87,34,81,62,10,45,9,57,100,8,96,33,39,93,74,42,70,41,13,14,23,90,63,51,95,83,74,20,66,54,42,89,85,96,18,17,71,36,17,75,50,17,44,77,84,2,49,34,80,80,99,13,26,33,10,69,4,35,4,84,62,60,43,30,1,56,88,75,3,96,80,27,57,21,44,19,100,21,98,37,5,50,25,98,61,43,64,65,38,66,84,21,87,56,100,93,3,56,10,86,60,100,31,16,89,41,58,58,47,84]
    };

    filter = {
      scale: 'month',
      period: {
        start: {
          year: 2012,
          month: 1
        },
        end: {
          year: 2013,
          month: 12
        }
      }
    };
  });


  it('should be available as a plugin', function() {
    expect($.fn.timeSeriesChart).toBeDefined();
  });


  it('should contain the correct highcharts data', function() {

    loadFixtures('time-series.html');

    $('[data-chart="timeseries"]').timeSeriesChart({
      data: chartData
    });

    chart = $('[data-chart="timeseries"]').data('plugin_chart');

    expect(chart.options.chart.series[0].data).toEqual(chartData.values);

  });


  it('should create a highcharts object', function() {

    loadFixtures('time-series.html');

    $('[data-chart="timeseries"]').timeSeriesChart({
      data: chartData
    });

    chart = $('[data-chart="timeseries"]').data('plugin_chart');

    expect(chart.chart.highcharts()).toBeDefined();

  });


  it('should update the chart data when new data is applied', function() {

    var newChartData;
    var test;
    var expected;

    loadFixtures('time-series.html');

    $('[data-chart="timeseries"]').timeSeriesChart({
      data: chartData
    });

    chart = $('[data-chart="timeseries"]').data('plugin_chart');

    newChartData = {
      "labels": [],
      "values": [59,83,86,88,85,56,27,77,26]
    };

    var expected = _.clone(newChartData.values);

    chart.updateChart(newChartData);

    test = _.map($('[data-chart="timeseries"]').highcharts().series[0].data, function(data) {
      return data.y;
    });

    expect(test).toEqual(expected);
  });



});