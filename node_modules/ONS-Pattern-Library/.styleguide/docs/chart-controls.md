The chart control component is a control that allows users to filter the output of any graphs and data tables that are displayed within the page.

## General Chart Approach

All ONS charts are based on the [Highcharts](http://www.highcharts.com/) library.

## Usage

### Via Data attributes

The HTML in the above example shows how the DOM needs to be structured to ensure the plugin works correctly.  The plugin will be auto invoked when the boolean data-attribute `data-chart-controls` features in the DOM.

```
<form data-chart-controls>
  ...
</form>
```

The data-attribute `data-chart-controls-for="['chart1', 'table1']` tells the plugin which components it controls, where the id is set by the data-attribute `data-chart-data-id` on the target graph or data-table element.

For example:

```
<!-- the chart controls -->
<form data-chart-controls="" data-chart-controls-for="['chart1', 'table1']">
  ...
</form>

<div data-chart="timeseries"
      data-chart-title="Consumer Price Indices - CPI indices: 1988 to 2014"
      data-chart-tooltip="D7BT"
      data-chart-ylabel="D7BT"
      data-chart-data-id="chart1" class="chart">
      ...
</div>

<div data-chart="datatable"
     data-chart-data-id="table1"
     data-chart-col-label="D7BT" class="visuallyhidden">
     ...
</div>
```

The same `data-chart-data-id` values are used by the control 'type' selector (for example "table" or "chart") to determine which component is shown.

The data-attribute `data-chart-controls-type` is used to determine, on click, which component is shown.

In the following, clicking on the 'Chart' input will cause the element with `data-chart-data-id="chart1"` to be shown, and all other components hidden.

```
<label class="btn btn--secondary btn--small btn--narrow btn--thin btn--secondary--active">
    Chart
    <input type="radio" name="type" data-chart-controls-type value="chart1" checked />
</label>
<label class="btn btn--secondary btn--small btn--narrow btn--thin">
    Table
    <input type="radio" name="type" data-chart-controls-type value="table1"/>
</label>
```

## No-JS

The chart control is made up of HTML form components.  As such, on browsers with no Javascript, the user will be able to submit the required values to the server.  The suggested outcome of this would be to set a dynamic image based on the submitted values.

For example:

```
<noscript>
    <img src="/dynamically-generated-chart.png" alt="Consumer Price Indices - CPI indices: 1988 to 2014" width="750" height="400">
</noscript>
```

## Events

The chart control is de-coupled from any charts or data tables so that it could be used independently of any other page components.

Communication to other components is achieved through the use of events.

- #### `chart-filter-change`

    When a user changes a control value, the component will trigger an event `chart-filter-change`.  The event contains information about the selected controls.

    ```
    $('[data-chart-controls]').on('chart-filter-change', function(e, data) {
      // get the new filter range:
      var newFilter = data.filter;

      // get the target charts
      var targets = data.chartIds;
    });

    ```

The `data.filter` will be an object in the form of:

```
{
  scale: 'month',
  period: {
    start: {
      year: 2010,
      month: 1
    },
    end: {
      year: 2011,
      month: 12
    }
  }
};
```

The `data.chartIds` value will contain an array of values taken from the `data-chart-controls-for` data-attribute.

For example, using `data-chart-controls-for="['chart1', 'table1']"` would result in:

```
// data.chartIds
data.chartIds = ["chart1", "table1"]
```

This event can then be used to update the table and chart, for example:

```
var chart;
var dataFilter = new DataFilter({
  // chart data
});

$('[data-chart-controls]').on('chart-filter-change', function(e, data) {
    _.each(data.chartIds, function(chartId) {
        newData = dataFilter.getData(data.filter);

        // get the chart or table plugin
        chart = $('[data-chart-data-id="' + chartId + '"]').data('plugin_chart');

        // update it's values
        chart.updateChart(newData);
    });
});
```

## Date Filter

A Javascript utility function is provided to allow the filtering of data according to the event raised by the chart controls (shown above).

```
// The raw data - each element in the values array represents
// a monthly value, starting from the date defined in the
// start value.
var rawData = {
    "start": {
        "year": "1988",
        "month": "1"
    },
    "values": [61.9, 62.1, 62.3, 63.1, 63.4, 63.6, 63.6, 63.8, 64.1, 64.4, 64.7, 64.8, 65, 65.2, 65.5, 66.4, 66.7, 67, 66.9, 67, 67.5, 68, 68.2, 68.3, 68.6, 69, 69.4, 70.6, 71.3, 71.6, 71.4, 72.2, 72.9, 73.5, 73.6, 73.5, 73.5, 73.9, 74.1, 76.6, 77.2, 77.6, 77.4, 77.7, 78.1, 78.5, 78.8, 78.8, 78.6, 79, 79.4, 80.2, 80.5, 80.6, 80.2, 80.2, 80.5, 80.7, 80.8, 80.8, 80.4, 80.9, 81.3, 82.2, 82.5, 82.5, 82.2, 82.5, 82.9, 82.8, 82.6, 82.8, 82.5, 82.9, 83.1, 83.9, 84.1, 84.1, 83.6, 84.1, 84.2, 84, 84.1, 84.5, 84.5, 84.9, 85.3, 85.8, 86.2, 86.3, 85.8, 86.3, 86.7, 86.5, 86.5, 87, 86.8, 87.2, 87.5, 88, 88.3, 88.4, 87.8, 88.3, 88.7, 88.7, 88.7, 89, 88.6, 88.8, 89, 89.4, 89.6, 89.8, 89.5, 90, 90.3, 90.3, 90.4, 90.5, 89.9, 90.3, 90.5, 91, 91.5, 91.3, 90.8, 91.2, 91.6, 91.6, 91.7, 91.9, 91.4, 91.5, 92, 92.4, 92.7, 92.6, 92, 92.3, 92.7, 92.6, 92.7, 93, 92.1, 92.4, 92.6, 92.9, 93.2, 93.3, 92.8, 92.8, 93.6, 93.5, 93.7, 93.7, 92.9, 93.1, 93.4, 94, 94.7, 94.9, 94.2, 94.5, 94.8, 94.7, 94.5, 94.7, 94.4, 94.5, 94.9, 95.3, 95.5, 95.5, 95.2, 95.5, 95.7, 95.9, 95.9, 96.3, 95.7, 96, 96.3, 96.7, 96.7, 96.5, 96.5, 96.8, 97.1, 97.2, 97.2, 97.5, 97, 97.2, 97.4, 97.8, 98.1, 98.1, 97.8, 98.1, 98.2, 98.4, 98.6, 99.1, 98.6, 98.8, 99.3, 99.7, 100, 100, 100.1, 100.4, 100.6, 100.7, 100.7, 101, 100.5, 100.9, 101.1, 101.7, 102.2, 102.5, 102.5, 102.9, 103, 103.2, 103.4, 104, 103.2, 103.7, 104.2, 104.5, 104.8, 105, 104.4, 104.7, 104.8, 105.3, 105.6, 106.2, 105.5, 106.3, 106.7, 107.6, 108.3, 109, 109, 109.7, 110.3, 110, 109.9, 109.5, 108.7, 109.6, 109.8, 110.1, 110.7, 111, 110.9, 111.4, 111.5, 111.7, 112, 112.6, 112.4, 112.9, 113.5, 114.2, 114.4, 114.6, 114.3, 114.9, 114.9, 115.2, 115.6, 116.8, 116.9, 117.8, 118.1, 119.3, 119.5, 119.4, 119.4, 120.1, 120.9, 121, 121.2, 121.7, 121.1, 121.8, 122.2, 122.9, 122.8, 122.3, 122.5, 123.1, 123.5, 124.2, 124.4, 125, 124.4, 125.2, 125.6, 125.9, 126.1, 125.9, 125.8, 126.4, 126.8, 126.9, 127, 127.5, 126.7, 127.4, 127.7, 128.1, 128, 128.3, 127.8, 128.3, 128.4]
};

// Reformat the data for use in the data-table or chart
var processedData = new DataFilter(rawData);

// define a filter
var filter = {
    scale: 'month',
    period: {
        start: {
            year: 2010,
            month: 1
        },
        end: {
            year: 2011,
            month: 12
        }
     }
};

// filteredData is an object containing just the appropriate
// values from rawData as determined by the filter.
var filteredData = processedData.getData(filter);

```



## Server Requirements

The control relies on some aspects of the control being correctly set by the server rather than added by the clientside Javascript.

- Chart download title

    The correct date range in the title *"Download this entire time series from 1988—2014"* needs to be in the page generated by the server.

- Default date range

    The correct default date range is *"Last 5yrs"*.  As such both the year and month dropdowns for the start and end dates need to have the correct `selected` attributes set.

- Default scale

    The correct default scale is *"Month"*.  This is specified by adding a `checked` attribute to the 'month' radio (as shown in the HTML above).

