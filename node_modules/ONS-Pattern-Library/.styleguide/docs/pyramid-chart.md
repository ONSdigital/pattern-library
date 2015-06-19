## General Chart Approach

All ONS charts are based on the [Highcharts](http://www.highcharts.com/) library.

## Usage

The Javascript for this pattern can be seen [here](/sg-assets/js/charts.js) and shows an example of how the chart is initialised.


```

var data = {

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

var options = {

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

$('[data-chart]').highcharts(options);

```