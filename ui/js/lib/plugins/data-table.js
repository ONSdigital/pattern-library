(function ($) {

  /**
   * The mustache template
   * @type {string}
   */
  var template = '<table class="tablesaw">' +
    '<thead>' +
    '<tr>' +
      '<th data-priority="persist">Period</th>' +
      '<th>{{colLabel}}</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
      '{{#rows}}' +
      '<tr>' +
        '<th>{{label}}</th>' +
        '<td>{{value}}</td>' +
      '</tr>' +
      '{{/rows}}' +
    '</tbody>' +
    '</table>';


  var defaults = {
    tableTemplate: template
  };

  /**
   * @param element
   * @param options
   * @constructor
   */
  function DataTable( element, options ) {
    this.element = element;

    this.options = $.extend(true, {}, defaults, options);

    this.init();
  }

  /**
   * Render the table using the template
   */
  DataTable.prototype.render = function(data) {

    var rows = [];

    for ( var i=0; i<data.labels.length; i++ ) {
      rows.push({
        label: data.labels[i],
        value: data.values[i]
      });
    }

    var output = Mustache.render(this.options.tableTemplate, {
      colLabel: this.options.colLabel,
      rows: rows
    });

    $(this.element).html(output);
  };

  /**
   * Update the chart with new data
   * @param data
   */
  DataTable.prototype.updateChart = function(data) {
    this.options.data = data;
    this.render(data);
  };

  /**
   * Initialise the datatable
   */
  DataTable.prototype.init = function () {
    this.render(this.options.data);
  };

  /**
   * Attach the plugin to the JQuery object.
   *
   * @param options
   * @returns {*}
   */
  $.fn.dataTable = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_chart')) {
        $.data(this, 'plugin_chart', new DataTable( this, options ));
      }
    });
  };

})( jQuery );