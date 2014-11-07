## General Chart Approach

All ONS charts are based on the [Highcharts](http://www.highcharts.com/) library.

## Usage

The Javascript for this pattern can be seen [here](/sg-assets/js/charts.js) and shows an example of how the chart is initialised.

```
var data = {
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

var options = {
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

$('[data-chart]').highcharts(options);
```