## General Chart Approach

All ONS charts are based on the [Highcharts](http://www.highcharts.com/) library.

## Usage

The Javascript for this pattern can be seen [here](/sg-assets/js/charts.js) and shows an example of how the chart is initialised.

```

var data = {
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

var options = {
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
    },
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

$('[data-charts]').highcharts(options);

```