All ONS charts are based on the [Highcharts](http://www.highcharts.com/) library.  The time-series chart is a single line graph, initialised using the `timeSeriesChart` jQuery plugin, and a data source, which is provided either in the DOM itself or explicitly as an object to the plugin.

## Usage

### Via Data attributes

A time-series chart will be automatically initialised if certain data-attributes are set on DOM elements.  Below is an example of this:

```
<div data-chart="timeseries"
     data-chart-title="Consumer Price Indices - CPI indices: 1988 to 2014"
     data-chart-tooltip="D7BT"
     data-chart-ylabel="D7BT"
     data-chart-data-id="chart1">
</div>

<script type="application/json" data-chart-data-for='["chart1"]'>
{
    "start": {
        "year": "1988",
        "month": "1"
    },
    "values": [61.9, 62.1, 62.3, 63.1, 63.4, 63.6, 63.6, 63.8, 64.1, 64.4, 64.7, 64.8, 65, 65.2, 65.5, 66.4, 66.7, 67, 66.9, 67, 67.5, 68, 68.2, 68.3, 68.6, 69, 69.4, 70.6, 71.3, 71.6, 71.4, 72.2, 72.9, 73.5, 73.6, 73.5, 73.5, 73.9, 74.1, 76.6, 77.2, 77.6, 77.4, 77.7, 78.1, 78.5, 78.8, 78.8, 78.6, 79, 79.4, 80.2, 80.5, 80.6, 80.2, 80.2, 80.5, 80.7, 80.8, 80.8, 80.4, 80.9, 81.3, 82.2, 82.5, 82.5, 82.2, 82.5, 82.9, 82.8, 82.6, 82.8, 82.5, 82.9, 83.1, 83.9, 84.1, 84.1, 83.6, 84.1, 84.2, 84, 84.1, 84.5, 84.5, 84.9, 85.3, 85.8, 86.2, 86.3, 85.8, 86.3, 86.7, 86.5, 86.5, 87, 86.8, 87.2, 87.5, 88, 88.3, 88.4, 87.8, 88.3, 88.7, 88.7, 88.7, 89, 88.6, 88.8, 89, 89.4, 89.6, 89.8, 89.5, 90, 90.3, 90.3, 90.4, 90.5, 89.9, 90.3, 90.5, 91, 91.5, 91.3, 90.8, 91.2, 91.6, 91.6, 91.7, 91.9, 91.4, 91.5, 92, 92.4, 92.7, 92.6, 92, 92.3, 92.7, 92.6, 92.7, 93, 92.1, 92.4, 92.6, 92.9, 93.2, 93.3, 92.8, 92.8, 93.6, 93.5, 93.7, 93.7, 92.9, 93.1, 93.4, 94, 94.7, 94.9, 94.2, 94.5, 94.8, 94.7, 94.5, 94.7, 94.4, 94.5, 94.9, 95.3, 95.5, 95.5, 95.2, 95.5, 95.7, 95.9, 95.9, 96.3, 95.7, 96, 96.3, 96.7, 96.7, 96.5, 96.5, 96.8, 97.1, 97.2, 97.2, 97.5, 97, 97.2, 97.4, 97.8, 98.1, 98.1, 97.8, 98.1, 98.2, 98.4, 98.6, 99.1, 98.6, 98.8, 99.3, 99.7, 100, 100, 100.1, 100.4, 100.6, 100.7, 100.7, 101, 100.5, 100.9, 101.1, 101.7, 102.2, 102.5, 102.5, 102.9, 103, 103.2, 103.4, 104, 103.2, 103.7, 104.2, 104.5, 104.8, 105, 104.4, 104.7, 104.8, 105.3, 105.6, 106.2, 105.5, 106.3, 106.7, 107.6, 108.3, 109, 109, 109.7, 110.3, 110, 109.9, 109.5, 108.7, 109.6, 109.8, 110.1, 110.7, 111, 110.9, 111.4, 111.5, 111.7, 112, 112.6, 112.4, 112.9, 113.5, 114.2, 114.4, 114.6, 114.3, 114.9, 114.9, 115.2, 115.6, 116.8, 116.9, 117.8, 118.1, 119.3, 119.5, 119.4, 119.4, 120.1, 120.9, 121, 121.2, 121.7, 121.1, 121.8, 122.2, 122.9, 122.8, 122.3, 122.5, 123.1, 123.5, 124.2, 124.4, 125, 124.4, 125.2, 125.6, 125.9, 126.1, 125.9, 125.8, 126.4, 126.8, 126.9, 127, 127.5, 126.7, 127.4, 127.7, 128.1, 128, 128.3, 127.8, 128.3, 128.4]
}
</script>
```

The data source is also stored in the DOM, and linked to the chart using the data-attribute `data-chart-data-for`.

Keeping the data in a script tag, and explicitly referencing the chart (rather than say, using element hierarchy) through a data-attribute allows the data block to be placed anywhere on the page.  From a performance perspective, this should be close to the bottom of the page.

The structure of the data object is in a format such that it only requires the first date to be defined, on the understanding that each item in the values array is a month value.  Only defining the first date is a performance consideration.


#### Use with Chart Controls

Chart controls are used with the chart components to allow a user to filter the data that is presented in the chart.

Extending the above example:

```

<!-- chart controls -->
<form data-chart-controls data-chart-controls-for='["chart1"]' >
   ...
</form>

<!-- time series chart -->
<div data-chart="timeseries"
     data-chart-title="Consumer Price Indices - CPI indices: 1988 to 2014"
     data-chart-tooltip="D7BT"
     data-chart-ylabel="D7BT"
     data-chart-data-id="chart1">
</div>

<!-- the data source for the controls and chart -->
<script type="application/json" data-chart-data-for='["chart1"]'>
{
    "start": {
        "year": "1988",
        "month": "1"
    },
    "values": [61.9, 62.1, 62.3, 63.1, 63.4, 63.6, 63.6, 63.8, 64.1, 64.4, 64.7, 64.8, 65, 65.2, 65.5, 66.4, 66.7, 67, 66.9, 67, 67.5, 68, 68.2, 68.3, 68.6, 69, 69.4, 70.6, 71.3, 71.6, 71.4, 72.2, 72.9, 73.5, 73.6, 73.5, 73.5, 73.9, 74.1, 76.6, 77.2, 77.6, 77.4, 77.7, 78.1, 78.5, 78.8, 78.8, 78.6, 79, 79.4, 80.2, 80.5, 80.6, 80.2, 80.2, 80.5, 80.7, 80.8, 80.8, 80.4, 80.9, 81.3, 82.2, 82.5, 82.5, 82.2, 82.5, 82.9, 82.8, 82.6, 82.8, 82.5, 82.9, 83.1, 83.9, 84.1, 84.1, 83.6, 84.1, 84.2, 84, 84.1, 84.5, 84.5, 84.9, 85.3, 85.8, 86.2, 86.3, 85.8, 86.3, 86.7, 86.5, 86.5, 87, 86.8, 87.2, 87.5, 88, 88.3, 88.4, 87.8, 88.3, 88.7, 88.7, 88.7, 89, 88.6, 88.8, 89, 89.4, 89.6, 89.8, 89.5, 90, 90.3, 90.3, 90.4, 90.5, 89.9, 90.3, 90.5, 91, 91.5, 91.3, 90.8, 91.2, 91.6, 91.6, 91.7, 91.9, 91.4, 91.5, 92, 92.4, 92.7, 92.6, 92, 92.3, 92.7, 92.6, 92.7, 93, 92.1, 92.4, 92.6, 92.9, 93.2, 93.3, 92.8, 92.8, 93.6, 93.5, 93.7, 93.7, 92.9, 93.1, 93.4, 94, 94.7, 94.9, 94.2, 94.5, 94.8, 94.7, 94.5, 94.7, 94.4, 94.5, 94.9, 95.3, 95.5, 95.5, 95.2, 95.5, 95.7, 95.9, 95.9, 96.3, 95.7, 96, 96.3, 96.7, 96.7, 96.5, 96.5, 96.8, 97.1, 97.2, 97.2, 97.5, 97, 97.2, 97.4, 97.8, 98.1, 98.1, 97.8, 98.1, 98.2, 98.4, 98.6, 99.1, 98.6, 98.8, 99.3, 99.7, 100, 100, 100.1, 100.4, 100.6, 100.7, 100.7, 101, 100.5, 100.9, 101.1, 101.7, 102.2, 102.5, 102.5, 102.9, 103, 103.2, 103.4, 104, 103.2, 103.7, 104.2, 104.5, 104.8, 105, 104.4, 104.7, 104.8, 105.3, 105.6, 106.2, 105.5, 106.3, 106.7, 107.6, 108.3, 109, 109, 109.7, 110.3, 110, 109.9, 109.5, 108.7, 109.6, 109.8, 110.1, 110.7, 111, 110.9, 111.4, 111.5, 111.7, 112, 112.6, 112.4, 112.9, 113.5, 114.2, 114.4, 114.6, 114.3, 114.9, 114.9, 115.2, 115.6, 116.8, 116.9, 117.8, 118.1, 119.3, 119.5, 119.4, 119.4, 120.1, 120.9, 121, 121.2, 121.7, 121.1, 121.8, 122.2, 122.9, 122.8, 122.3, 122.5, 123.1, 123.5, 124.2, 124.4, 125, 124.4, 125.2, 125.6, 125.9, 126.1, 125.9, 125.8, 126.4, 126.8, 126.9, 127, 127.5, 126.7, 127.4, 127.7, 128.1, 128, 128.3, 127.8, 128.3, 128.4]
}
</script>
```

See the [chart controls component](/components-charts-chart-controls.html) for more details, and the [T5 - Time Series page](/templates-templates-time-series-page-t5.html) for a concrete example.


### Programmatically

A time-series chart can also be created programmatically.  To create a new time series chart using Javascript, the jQuery `timeSeriesChart` plugin is used on the target element:

```
<div data-chart>
    <!-- this is a no-js image representation of the graph, which needs to be built on the server -->
    <noscript>
        <img src="http://placehold.it/1000x500&amp;text=No+-+JS+Chart+area+goes+here" alt="">
    </noscript>
</div>

<script>
$(document).ready(function() {
    $('[data-chart]').timeSeriesChart(options);
});
</script>

```



#### Options

##### `data`

Contains the data that sets the values for the chart and the labels for the y-axis.

The object is of the format:
```
{
  "labels": ["Jan 2013", "Feb 2013", "Mar 2013", "Apr 2013", "May 2013", "Jun 2013", "July 2013"],
  "values": [59,83,86,88,85,56,27]
};

```

##### `chart`

Is an object that is passed to the `Highcharts` plugin.  See details on the [Highchart API](http://api.highcharts.com/highcharts) for more information.

For example, you can set the tooltip label, the chart title and the y-axis label using the following options.

```
<script>
$(document).ready(function() {
    $('[data-chart]').timeSeriesChart(
        data: {
            ...
        },
        chart: {
            series: [{
                name: "tooltip label"
            }],
            title: {
                text: "chart title"
            },
            yAxis: {
                title: {
                    text: "y axis label"
                }
            }
        });
    });
});
</script>

```
