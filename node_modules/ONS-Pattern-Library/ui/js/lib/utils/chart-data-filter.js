/**
 * @file Utility file to:
 *
 * i)  Convert a chart data format that is optimised for space into a format
 *     suitable for the charts and data tables
 * ii) Provide a method by which this data can be filtered so that a date range
 *     and data by month, year and quarter can be viewed.
 *
 * @param data
 * @returns {DataFilter}
 * @constructor
 */

/**
 * @param data
 * @returns {DataFilter}
 * @constructor
 */
function DataFilter(data) {

  this.rawData = data;

  return this;
}

/**
 * Allow chart plugins to get the filtered data they require.
 *
 * A filter is of the following format:
 *
 * var defaultFilter = {
 *   scale: '<month|year|quarter>',
 *   period: {
 *     start: {
 *       year: <YYYY>,
 *       month: <MM>
 *     },
 *     end: {
 *       year: <YYYY>,
 *       month: <MM>
 *     }
 *   }
 * };
 *
 * @param filter
 * @returns {*}
 */
DataFilter.prototype.getData = function(filter) {
  return this._filter(filter, this.rawData);
};

/**
 * Filter the data
 *
 * @param filter
 * @param data
 * @returns {{labels: Array, values: Array}}
 * @private
 */
DataFilter.prototype._filter = function(filter, data) {

  var dataStartDate;
  var filterEndDate;
  var filterStartDate;
  var filteredDates = [];
  var currentDate;
  var labels = [];
  var values = [];


  filterStartDate = moment({
    year: filter.period.start.year,
    month: filter.period.start.month-1,
    day: 1
  });

  if ( !filterStartDate.isValid() ) {
    throw new Error('Invalid start filter date');
  }

  filterEndDate = moment({
    year: filter.period.end.year,
    month: filter.period.end.month-1,
    day: 1
  });

  if ( !filterEndDate.isValid() ) {
    throw new Error('Invalid end filter date');
  }

  dataStartDate = moment({
    year: data.start.year,
    month: data.start.month-1,
    day: 1
  });

  if ( !dataStartDate.isValid() ) {
    throw new Error('Invalid start data date');
  }

  /*
   * Ensure the filters are within the range of the data
   */
  if ( filterStartDate.isBefore(dataStartDate) ) {
    filterStartDate = dataStartDate;
  }


  /*
   * Get the difference between the filter start date, and the
   * beginning date of the data set.  This will give us the first
   * location in the array of the data.
   */
  var start = filterStartDate.diff(dataStartDate, 'months');

  /*
   * Get the difference between the start and end filter dates so
   * we know how many array values to include
   */
  var length = filterEndDate.diff(filterStartDate, 'months')+1;

  /*
   * Slice the data array
   */
  var filteredSet = data.values.slice(start, start + length);

  /*
   * Loop through the filtered set and add labels for year, quarter & month
   */

  currentDate = filterStartDate;

  for ( var i=0; i<filteredSet.length; i++ ) {
    if ( i > 0 ) {
      currentDate = filterStartDate.add(1, 'month');
    }

    filteredDates.push({
      'value': filteredSet[i],
      'month': currentDate.format('MMM YYYY'),
      'year': currentDate.year(),
      'quarter': 'Q' + currentDate.quarter() + ' ' + currentDate.year()
    });
  }

  /*
   * Now group by scale and average values
   */
  filteredDates = _.chain(filteredDates)
    .groupBy(filter.scale)
    .map(function(value, key) {
      var mean = _.reduce(value, function(sum, item) {
        sum += item.value;
        return sum;
      }, 0)  / value.length;

      return {
        label: key,
        total: Math.round(mean * 100) / 100
      };
    })
    .value();

  _.forEach(filteredDates, function(item) {
    labels.push(item.label);
    values.push(item.total);
  });

  return {
    labels: labels,
    values: values
  };
};
