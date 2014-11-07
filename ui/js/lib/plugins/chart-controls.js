(function ($) {

  var defaults = {
    filter: {
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
    }
  };

  /**
   * Collect the values from the various controls
   */
  ChartControl.prototype.getValues = function() {
    return {
      scale: $('input[data-chart-controls-scale]:checked').val(),
      period: {
        start: {
          year: $('[data-chart-controls-from-year]').val(),
          month: $('[data-chart-controls-from-month]').val()
        },
        end: {
          year: $('[data-chart-controls-to-year]').val(),
          month: $('[data-chart-controls-to-month]').val()
        }
      }
    };
  };

  /**
   * Toggle the UI selected state for the buttons
   */
  ChartControl.prototype.toggleSelectedButton = function() {

    var selectedElement = $('input:checked', this.element);
    $('label', this.element).removeClass('btn--secondary--active');

    selectedElement.each(function() {
      $(this).parent('label').addClass('btn--secondary--active');
    });

  };

  /**
   * Toggle the UI selected state for the links
   */
  ChartControl.prototype.toggleSelectedLink = function(clickedElem) {
    $('a', this.element).removeClass('chart-area__controls__active');
    clickedElem.addClass('chart-area__controls__active');
  };

  /**
   * Validate the entered dates.  The chart does validation as well, but this
   * is for the controls interface.
   *
   * @param filter
   */
  ChartControl.prototype.validate = function(filter) {

    var filterStartDate;
    var filterEndDate;

    filterStartDate = moment({
      year: filter.period.start.year,
      month: filter.period.start.month-1,
      day: 1
    });

    filterEndDate = moment({
      year: filter.period.end.year,
      month: filter.period.end.month-1,
      day: 1
    });

    if ( filterEndDate.isSame(filterStartDate) ) {
      throw new Error('Sorry, the start date and end date cannot be the same');
    } else if ( filterEndDate.isBefore(filterStartDate) ) {
      throw new Error('Sorry, the chosen date range is not valid');
    }

  };

  /**
   * Add events to the all / 5yr / 10yr links
   */
  ChartControl.prototype.attachLinkEvents = function() {

    var self = this;

    $('[data-chart-controls-range]', this.element).on('click', function(e) {

      var elem = $(this);
      var filterDate;
      var fromYear;
      var fromMonth;

      e.preventDefault();

      self.toggleSelectedLink(elem);

      /*
       * Work out what the dates are
       */

      switch ( elem.data('chart-controls-range') ) {
        case '10yr':
          filterDate = moment().subtract(10, 'years');

          fromMonth = filterDate.month()+1;
          fromYear = filterDate.year();

          break;

        case '5yr':
          filterDate = moment().subtract(5, 'years');

          fromMonth = filterDate.month()+1;
          fromYear = filterDate.year();

          break;

        case 'all':

          fromMonth = $('[data-chart-controls-from-month] option:first-child', this.element).val();
          fromYear = $('[data-chart-controls-from-year] option:first-child', this.element).val();

          break;
      }

      /*
       * Set the select options
       */
      $('[data-chart-controls-from-month]', this.element).find('option[value="' + fromMonth + '"]').attr('selected', true);
      $('[data-chart-controls-from-year]', this.element).find('option[value="' + fromYear + '"]').attr('selected', true);
      $('[data-chart-controls-to-month]', this.element).find('option[value="' + (moment().month()+1) + '"]').attr('selected', true);
      $('[data-chart-controls-to-year]', this.element).find('option[value="' + moment().year() + '"]').attr('selected', true);

      /*
       * Trigger a click
       */
      $('[data-chart-controls-submit]').trigger('click', {
        custom: false
      });
    });
  };

  /**
   * Update the filter: validate user input and trigger event.
   */
  ChartControl.prototype.updateFilter = function() {

    var newFilter;

    newFilter = this.getValues();

    try {
      $('.chart-area__controls__custom__errors').empty();
      this.validate(newFilter);

    } catch ( err ) {
      $('<p>' + err.message +'</p>').appendTo('.chart-area__controls__custom__errors');
      return;
    }

    $(this.element).trigger('chart-filter-change', {
      filter: newFilter,
      chartIds: this.chartIds
    });

    this.options.filter = newFilter;
  };

  /**
   * Add the collape / expand behaviour to the custom date filter
   */
  ChartControl.prototype.setCollapsible = function() {

    var customControl = $('[data-chart-control-custom-range]', self.element);
    var elem;
    var target;

    $('[data-chart-control-custom-trigger-for]', customControl).on('click', function(e) {
      elem = $(this);
      target = $('.' + elem.data('chart-control-custom-trigger-for'));

      if ( customControl.data('chart-control-custom-expanded') == true ) {
        target.slideUp('fast', function() {
          customControl.data('chart-control-custom-expanded', false);
          customControl.removeClass('chart-area__controls__custom--active');
          $('.icon-up-open-big', customControl)
            .removeClass('icon-up-open-big')
            .addClass('icon-down-open-big');
        });

      }
      else {
        customControl.addClass('chart-area__controls__custom--active');

        // remove our nice no-js friendly hiding now we know js is active
        target.hide().removeClass('js-hidden');

        target.slideDown('fast', function() {
          customControl.data('chart-control-custom-expanded', true);
          $('.icon-down-open-big', customControl)
            .removeClass('icon-down-open-big')
            .addClass('icon-up-open-big');

        });
      }

    });

    //
    // remove .js-hidden00

  };

  /**
   * Initialise
   */
  ChartControl.prototype.init = function() {

    var self = this;

    this.toggleSelectedButton();

    this.setCollapsible();

    this.attachLinkEvents();

    /*
     * Add event to submit button
     */
    $('[data-chart-controls-submit]', this.element).on('click', function(e, data) {

      data = data || {};

      e.preventDefault();

      _.defaults(data, {
        custom: true
      });

      if ( data.custom !== false ) {
        self.toggleSelectedLink($('.link-complex', self.element));
      }

      self.updateFilter();
    });

    /*
     * Add click handlers to the controls
     */
    $('[data-chart-controls-scale]', this.element).on('click', function(e, data) {
      self.toggleSelectedButton();
      self.updateFilter();
    });

    $('[data-chart-controls-type]', this.element).on('click', function(e, data) {
      self.toggleSelectedButton();

      $('[data-chart]').addClass('js-hidden');
      $('[data-chart-data-id="' + $(this).val() + '"]').removeClass('js-hidden');

    });
  };

  /**
   * @param element
   * @param options
   * @constructor
   */
  function ChartControl( element, options ) {
    this.element = element;

    this.chartIds = $(this.element).data('chart-controls-for');

    this.options = $.extend(true, {}, defaults, options) ;

    this.init();
  }

  /**
   * Attach the plugin to the JQuery object.
   *
   * @param options
   * @returns {*}
   */
  $.fn.chartControl = function ( options ) {
    return this.each(function() {
      if (!$.data(this, 'plugin_chartControl')) {
        $.data(this, 'plugin_chartControl', new ChartControl( this, options ));
      }
    });
  };

})( jQuery );
