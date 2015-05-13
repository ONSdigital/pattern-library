/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/



;(function(e,t,n,r){e.fn.doubleTapToGo=function(r){if(!("ontouchstart"in t)&&!navigator.msMaxTouchPoints&&!navigator.userAgent.toLowerCase().match(/windows phone os 7/i))return false;this.each(function(){var t=false;e(this).on("click",function(n){var r=e(this);if(r[0]!=t[0]){n.preventDefault();t=r}});e(n).on("click touchstart MSPointerDown",function(n){var r=true,i=e(n.target).parents();for(var s=0;s<i.length;s++)if(i[s]==t[0])r=false;if(r)t=false})});return this}})(jQuery,window,document);

$(document).ready(function() {

  $('.content-reveal').each(function() {
    // Create two actions (show/hide) for each content reveal element.
    // To keep the markup clean and for progressive enhancement,
    // clone the action in JS.
    var clone = $(this).find('.content-reveal__action')
                  .clone()
                    .addClass('content-reveal__action--clone')
                    .text('See less');

    // find element to append the clone to and add a space between element and clone
    var lastChild = $(this).find('.content-reveal__hidden :last-child');
    var lastChildText = lastChild.text();
    lastChild.text(lastChildText + ' ').append(clone);
  });

  // Hide both and only show the original at first
  $('[data-content-reveal]:not(.content-reveal__action--clone)')
    .removeClass('hidden');
  $('.content-reveal__hidden').addClass('hidden');

  $('[data-content-reveal]').on('click', function() {
    var activatedToggleLink = $(this),
        contentReveal = activatedToggleLink.parents('.content-reveal'),
        allToggleLinks = contentReveal.find('.content-reveal__action');

    // Toggle the display of link that wasn't clicked
    allToggleLinks.removeClass('hidden');
    activatedToggleLink.addClass('hidden');

    contentReveal.find('.content-reveal__hidden').toggleClass('hidden');
  });
});

$(document).on('ready', function() {
  // Expand footnotes section if it's collapsed and you click on footnote anchor
  $('.footnote-body').on('click', function(e) {
    var footnotesSection = $('.accordion--footnotes');
    if (footnotesSection.hasClass('is-collapsed')) {
      footnotesSection.removeClass('is-collapsed').addClass('is-expanded');
    }
  });

  // If pageload links to a footnote, expand footnotes section and scroll to it
  if (location.hash) {
    var $fragment = $(location.hash);
    var $fragmentContainer = $fragment.parents('.accordion--footnotes');
    if ($fragmentContainer.length) {
      $fragmentContainer.removeClass('is-collapsed').addClass('is-expanded');
      $fragment.get(0).scrollIntoView();
    }
  }
});

function toggleSubnav(element) {
  element
    .toggleClass('js-expandable-active')
    .find('.js-expandable__content').toggleClass('js-nav-hidden');
}

function expandSubnav(element) {
  if (!(element.hasClass('js-expandable-active'))) {
    element
      .addClass('js-expandable-active')
      .find('.js-expandable__content')
        .removeClass('js-nav-hidden');
  }
}

function collapseSubnav(element) {
  if (element.hasClass('js-expandable-active')) {
    element
      .removeClass('js-expandable-active')
      .find('.js-expandable__content')
        .addClass('js-nav-hidden');
  }
}

function showMenu(toggleElement, menuElement) {
  toggleElement.addClass('menu-is-expanded');
  menuElement.removeClass('nav-main--hidden');
  menuElement.attr('aria-expanded', true);
}

function hideMenu(toggleElement, menuElement) {
  toggleElement.removeClass('menu-is-expanded');
  menuElement.addClass('nav-main--hidden');
  menuElement.attr('aria-expanded', false);
}

function showSearch(toggleElement, searchElement) {
  toggleElement.addClass('search-is-expanded');
  toggleElement.find('.nav--controls__icon')
    .removeClass('icon-search-1')
    .addClass('icon-cancel');
  toggleElement.find('.nav--controls__text').text('Hide');
  searchElement.removeClass('nav-search--hidden');
  searchElement.attr('aria-expanded', true);
}

function hideSearch(toggleElement, searchElement) {
  toggleElement.removeClass('search-is-expanded');
  toggleElement.find('.nav--controls__icon')
    .removeClass('icon-cancel')
    .addClass('icon-search-1');
  toggleElement.find('.nav--controls__text').text('Search');
  searchElement.addClass('nav-search--hidden');
  searchElement.attr('aria-expanded', false);
}

$(document).ready(function() {
  var $primaryNav = $('#nav-primary');
  var $searchBar = $('#searchBar');

  // Duplicate top-level nav item into the subnav to access on devices where
  // tapping on the top-level item will expand the subnav
  $primaryNav.find('.nav__expandable').each(function() {
    var subNav = $(this).find('.nav--primary__sub');
    $(this).find(' > a').clone()
      .prependTo(subNav)
      .wrap('<li class="nav__top-level-duplicate"></li>');
  });

  $primaryNav.addClass('nav-main--hidden').attr('aria-expanded', false);
  $searchBar.addClass('nav-search--hidden').attr('aria-expanded', false);

  $('.js-expandable').on('click' ,function(event) {
    if ($(window).width() < 800) {
      event.preventDefault();
      toggleSubnav($(this));
    }
  });

  $('.js-expandable').doubleTapToGo();

  // stop parent element from taking over all click events
  $('.js-expandable > .nav--primary__sub').on('click', function(event) {
    event.stopPropagation();
  });

  $('.js-expandable').on('keydown' ,function(event) {
    // Enter || spacebar
    if (event.keyCode === 13 || event.keyCode === 32) {
      if ($(window).width() < 800) {
        event.preventDefault();
        toggleSubnav($(this));
      }
    }

    // Right arrow
    if (event.keyCode === 39) {
      if ($(window).width() < 800) {
        event.preventDefault();
        expandSubnav($(this));
      }
      else {
        // TODO: Make sure the large viewport breakpoint is exact
        // This should move the focus to the next nav item and expand its subnav
      }
    }

    // Left arrow
    if (event.keyCode === 37) {
      if ($(window).width() < 800) {
        event.preventDefault();
        collapseSubnav($(this));
      }
      else {
        // TODO: Make sure the large viewport breakpoint is exact
        // This should move the focus to the previous item and expand its subnav
      }
    }
  });

  // stop parent element from taking over enter/space events
  $('.js-expandable > .nav--primary__sub').on('keydown', function(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.stopPropagation();
    }
  });

  var $menuToggle = $('#menu-toggle').parent();
  var $searchToggle = $('#search-toggle').parent();

  $('#menu-toggle').on('click', function(event) {
    event.preventDefault();

    if ($primaryNav.hasClass('nav-main--hidden')) {
      showMenu($menuToggle, $primaryNav);
      hideSearch($searchToggle, $searchBar);
    }
    else {
      hideMenu($menuToggle, $primaryNav);
    }
  });

  $('#search-toggle').on('click', function(event) {
    event.preventDefault();
    var $searchToggle = $(this).parent();

    if ($searchBar.hasClass('nav-search--hidden')) {
      showSearch($searchToggle, $searchBar);
      hideMenu($menuToggle, $primaryNav);
    }

    else {
      hideSearch($searchToggle, $searchBar);
    }
  });


  // The following function to enable focus-tabbing through menu graciously
  // taken from Simply Accessible — thank you kindly.
  // http://simplyaccessible.com/article/better-for-accessibility

  $(function(){
    $primaryNav.setup_navigation();
  });

  $.fn.setup_navigation = function(settings) {
    settings = jQuery.extend({
      focusClass: 'menu-focus',
    }, settings);

    // Set tabIndex to -1 so that links can't receive focus until menu is open
    $(this).find('> li > a').next('ul').find('a').attr('tabIndex',-1);

    $(this).find('> li > a').hover(function(){
      $(this).closest('ul')
        .find('.'+settings.focusClass).removeClass(settings.focusClass)
        .find('a').attr('tabIndex',-1);
    });
    $(this).find('> li > a').focus(function(){
      $(this).closest('ul')
        .find('.'+settings.focusClass).removeClass(settings.focusClass)
        .find('a').attr('tabIndex',-1);
      $(this).next('ul')
        .addClass(settings.focusClass)
        .find('a').attr('tabIndex',0);
    });

    // Hide menu if click or focus occurs outside of navigation
    $(this).find('a').last().keydown(function(e){
      if(e.keyCode === 9) {
        // If the user tabs out of the navigation hide all menus
        $('.'+settings.focusClass)
        .removeClass(settings.focusClass)
        .find('a').attr('tabIndex',-1);
      }
    });
    $(document).click(function(){
      $('.'+settings.focusClass)
      .removeClass(settings.focusClass)
      .find('a').attr('tabIndex',-1);
    });

    $(this).click(function(e){
      e.stopPropagation();
    });
  };

});

$(document).on('ready', function() {

  // set up ARIA roles
  $('.accordion-container')
    .attr('role', 'tablist')
    .attr('aria-multiselectable', 'true');

  $('.accordion__title')
    .attr('role', 'tab')
    .attr('tabindex', '0')
    .attr('aria-selected', 'false');

  $('.accordion__content')
    .attr('role', 'tabpanel');

  $('.accordion.is-collapsed > .accordion__content')
    .attr('aria-expanded', 'true');

  $('.accordion.is-expanded > .accordion__content')
    .attr('aria-expanded', 'false');

  $('.accordion__title').on('click', function() {
    toggleAccordion($(this));
  });

  $('.accordion__title').on('keydown', function(e) {
    // Listen for space / enter, respectively
    if (e.keyCode === 32 || e.keyCode === 13) {
      toggleAccordion($(this));
    }

    // left arrow / up arrow
    if (e.keyCode === 37 || e.keyCode === 38) {
      $(this).parent('.accordion')
        .prev('.accordion')
        .find('.accordion__title')
        .focus();
    }

    // right arrow / down arrow
    if (e.keyCode === 39 || e.keyCode === 40) {
      $(this).parent('.accordion')
        .next('.accordion')
        .find('.accordion__title')
        .focus();
    }
  });

  function toggleAccordion(element) {
    var $accordionContainer = element.parent('.accordion');
    $accordionContainer.toggleClass('is-expanded is-collapsed');
    if ($accordionContainer.hasClass('is-expanded')) {
      element.attr('aria-selected', true);
      element.siblings('.accordion__content').attr('aria-expanded', false);
    }
    else {
      element.attr('aria-selected', false);
      element.siblings('.accordion__content').attr('aria-expanded', true);
    }
  }
});

$(document).ready(function() {

  // Function to check select box associated with table rows
  $( '.table--selectable' ).on( 'click', '.list--table__body', function(e) {

    // target clicks on selectable table that's not a link or an (i)
    if ($(e.target).not('a, .information > span, .list--table__item__body--select, input[type="checkbox"]').length) {
      $(this).find('input').click();
    }
  });

  $( '.table--selectable' ).on( 'touchend', '.list--table__body', function(e) {
    // prevent hover state on mobile from being triggered from a tap on the body
    $(this).addClass('hover-override');
  });

  // Listens to select all functionality
  $( '.list--table__item__body--select-all input' ).change(function() {
    var checkboxes = $(this).closest('li').siblings().find('input[type=checkbox]');
    if (this.checked) {
      checkboxes.prop('checked', true);
    }
    else {
      checkboxes.prop('checked', false);
    }
  });

  // Programmatically determine the state of select all button when triggering checkboxes
  $( '.table--selectable .list--table__body' ).on( 'click', 'input[type=checkbox]', function(e) {
    var checkboxes = $(this).closest('ol').find('.list--table__body input[type=checkbox]');

    if (checkboxes.length !== checkboxes.filter(':checked').length) {
      $('.list--table__item__body--select-all input').prop('checked', false);
    }
    else {
      $('.list--table__item__body--select-all input').prop('checked', true);
    }
  });
});

$(document).ready(function() {
  // many thanks to Heydon Pickering for this code
  // http://heydonworks.com/practical_aria_examples/#tab-interface

  // The class for the container div

  var $container = '.tab-pane';

  // The setup

  $($container +' ul').attr('role','tablist').addClass('nav tab-pane__tabs-container').removeClass('nav--block--spaced');
  $($container +' [role="tablist"] li').attr('role','presentation').addClass('tab-pane__tab-container');
  $('[role="tablist"] a').attr({
    'role' : 'tab',
    'tabindex' : '-1'
  }).addClass('tab-pane__tab');

  // Make each aria-controls correspond id of targeted section (re href)

  $($container + ' [role="tablist"] a').each(function() {
    $(this).attr(
      'aria-controls', $(this).attr('href').substring(1)
    );
  });

  // Make the first tab selected by default and allow it focus

  $($container + ' [role="tablist"] li:first-child a').attr({
    'aria-selected' : 'true',
    'tabindex' : '0'
  }).addClass('tab-pane__tab--selected');

  // Make each section focusable and give it the tabpanel role

  $($container +' section').attr({
    'role' : 'tabpanel'
  }).addClass('tab-pane__panel');

  // Make all but the first section hidden (ARIA state and display CSS)

  $($container + ' [role="tabpanel"]:not(:first-of-type)').attr({
    'aria-hidden' : 'true'
  }).addClass('tab-pane__tab--inactive');


  // Change focus between tabs with arrow keys

  $($container + ' [role="tab"]').on('keydown', function(e) {

    // define current, previous and next (possible) tabs

    var $original = $(this);
    var $prev = $(this).parents('li').prev().children('[role="tab"]');
    var $next = $(this).parents('li').next().children('[role="tab"]');
    var $target;

    // find the direction (prev or next)

    switch (e.keyCode) {
      case 37:
        $target = $prev;
        break;
      case 39:
        $target = $next;
        break;
      default:
        $target = false;
        break;
    }

    if ($target.length) {
        $original.attr({
          'tabindex' : '-1',
          'aria-selected' : null
        }).removeClass('tab-pane__tab--selected');
        $target.attr({
          'tabindex' : '0',
          'aria-selected' : true
        }).addClass('tab-pane__tab--selected').focus();
    }

    // Hide panels

    $($container +' [role="tabpanel"]')
      .attr('aria-hidden', 'true')
      .addClass('tab-pane__tab--inactive');

    // Show panel which corresponds to target

    $('#' + $(document.activeElement).attr('href').substring(1))
      .attr('aria-hidden', null)
      .removeClass('tab-pane__tab--inactive');
  });

  // Handle click on tab to show + focus tabpanel

  $($container + ' [role="tab"]').on('click', function(e) {

    e.preventDefault();

    // remove focusability [sic] and aria-selected

    $($container + ' [role="tab"]').attr({
      'tabindex': '-1',
      'aria-selected' : null
      }).removeClass('tab-pane__tab--selected');

    // replace above on clicked tab

    $(this).attr({
      'aria-selected' : true,
      'tabindex' : '0'
    }).addClass('tab-pane__tab--selected');

    // Hide panels

    $($container +' [role="tabpanel"]').attr('aria-hidden', 'true').addClass('tab-pane__tab--inactive');

    // show corresponding panel

    $('#' + $(this).attr('href').substring(1))
      .attr('aria-hidden', null)
      .removeClass('tab-pane__tab--inactive');
  });

});

$(document).ready(function() {

  $('.tablesaw-columntoggle-btn').on('click', function(e) {
    $(this).toggleClass('is-active');
  });

  /*
   * When user clicks on the dialog background, trigger a click
   * event on the close icon.
   */
  $('.dialog-background').on('click', function() {
    $('.tablesaw-columntoggle-btn').trigger('click');
  });

});
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
/**
 * @file a controller to intialise the appropriate plugins,
 * deal with chart control events and to provide custom chart
 * functions to external libraries.
 */

var ONS = ONS || {};

ONS.charts = ONS.charts || {};

ONS.charts = (function() {


  /**
   * Convert a stacked bar chart from vertical to horizontal.
   *
   * @param chart
   * @param options
   */
  var stackedResize = function(chart, options){

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if(w<768){
      options.chart.type="bar";
      options.plotOptions.column = {};
      options.plotOptions.series = {stacking: 'normal'};
      stackedBar =  chart.highcharts(options);

    } else {
      options.chart.type="column";

      yAxis = chart.highcharts().yAxis[0]
      titleWidth=0;

      if(yAxis.axisTitle){
        titleWidth = yAxis.axisTitle.getBBox().width;
        yAxis.update({
          title: {
            offset: -titleWidth,
            align: 'high'
          }
        });
      }

      options.plotOptions.series = {};
      options.plotOptions.column = {stacking: 'normal'};
      stackedBar = chart.highcharts(options);

    }
  };


  /**
   * A generic Highcharts tooltip formatter.
   *
   * @param title
   * @param content
   * @returns {string}
   */
  var textTooltipFormatter = function(title, content) {

    var html = '<div id="custom-tooltip">';

    html += '<div class="maintext">';
    html += '<h4 class="maintext__title">' + title + ': </h4>';
    html += '<div class="tiptext">' + content + '</div>'
    html += '</div></div>';

    return html;
  };


  /**
   * Format the tooltip for mainly time-series and multi-series charts.
   * This is the default tooltip formatter.
   *
   * @returns {string}
   */
  var tooltipFormatter = function() {

    var id = '<div id="custom-tooltip" class="tooltip-left tooltip-right">';
    var block = id + '<div class="sidebar">';
    var title = '<h4 class="maintext__title">' + this.x + ': </h4>';
    var symbol = ['<div class="circle">●</div>', '<div class="square">■</div>', '<div class="diamond">♦</div>', '<div class="triangle">▲</div>', '<div class="triangle">▼</div>'];

    var content = block + '<div class="title">&nbsp;</div>';

    // symbols
    $.each(this.points, function (i, val) {
      content += symbol[i];
    });

    content += '</div>';
    content += '<div class="maintext">';
    content += title;

    // series names and values
    $.each(this.points, function (i, val) {
      content += '<div class="tiptext"><b>' + val.point.series.chart.series[i].name + '= </b>' + Highcharts.numberFormat(val.y, 2) + '</div>';
    });

    content += '</div>';
    return content;

  };



  /**
   * Position the tooltip.  The position is conditional on the chart type.
   *
   * @param labelWidth
   * @param labelHeight
   * @param point
   * @returns {{x: number, y: number}}
   */
  var tooltipPositioner = function (labelWidth, labelHeight, point) {

    /*
     * We've only applied a custom formatter to the line charts.
     */
    if ( this.chart.options.chart.type !== 'line' ) {

      $('#custom-tooltip').removeClass('tooltip-right tooltip-left');


      /*
       * This is the default Highcharts position, adjusted
       * for our custom tooltip style.
       */
      return {
        x: point.plotX + this.chart.plotLeft - 100,
        y: point.plotY + this.chart.plotTop
      };
    }

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var points = {x: 30, y: 42};
    var tooltipX, tooltipY;

    if (w > 768) {

      if (point.plotX + labelWidth > this.chart.plotWidth) {
        tooltipX = point.plotX + this.chart.plotLeft - labelWidth - 10;
        $('#custom-tooltip').removeClass('tooltip-left');
      } else {
        tooltipX = point.plotX + this.chart.plotLeft + 10;
        $('#custom-tooltip').removeClass('tooltip-right');
      }

      tooltipY = 100;
      points = {x: tooltipX, y: tooltipY};
    } else {
      $('#custom-tooltip').removeClass('tooltip-left');
      $('#custom-tooltip').removeClass('tooltip-right');
    }

    return points;
  };


  /**
   * Format the xaxis labels.
   *
   * @returns {string}
   */

  var labelFormatter = function() {

    /*
     * We've only applied a custom formatter to the line charts.
     */
    if ( this.chart.options.chart.type !== 'line' ) {
      return this.value;
    }

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var response = '';
    var items = this.chart.xAxis[0].categories.length;

    var maxItemsDesktop = 8;
    var maxItemsTablet = 4;

    var modulo;

    if( w < 768 ){
      modulo = Math.round(items / maxItemsTablet);
    }
    else {
      modulo = Math.round(items / maxItemsDesktop);
    }

    if(this.isFirst){
      count=0;
    }
    if(count % modulo===0){
      response = this.value;
    }

    count++;

    return response;
  };


  return {
    textTooltipFormatter: textTooltipFormatter,
    tooltipFormatter: tooltipFormatter,
    labelFormatter: labelFormatter,
    tooltipPositioner: tooltipPositioner,
    stackedResize: stackedResize
  };
}());


(function ($) {

  var marker = {
    states: {
      hover: {
        radiusPlus: 0,
        lineWidthPlus: 0
      }
    }
  };

  /**
   * These are global chart options
   */
  function setOptions() {

    Highcharts.setOptions({
      colors: ['#007dc3', '#409ed2', '#7fbee1', '#007dc3', '#409ed2', '#7fbee1'],
      series: [{
        marker: marker
      }],
      chart: {
        style: {
          fontFamily: 'open-sans-n4',
          color:'#000'
        },
        spacingTop: 70,
        spacingLeft: 30,
        spacingBottom: 60,
        backgroundColor:'#fff'
      },

      title: {
        align: 'left',
        y: -15,
        x: 15
      },

      plotOptions: {
        series: {
          shadow:false,
          marker: {
            enabled: true
          },
          animation: false,
          states: {
            hover:{
              halo: {
                size: 0
              },
              enabled:true,
              shadow:false,
              lineWidth: 2,
              lineWidthPlus: 0,
              marker:{
                height:0,
                width:0,
                halo:false,
                enabled: true,
                fillColor: null,
                radiusPlus: null,
                lineWidth: 3,
                lineWidthPlus: 0
              }
            }
          }
        },
        line: {
          marker: {
            radius: 4,
            fillColor: '#fff',
            lineColor: null,
            lineWidth: 2
          },
          shadow:true,
          dataLabels: {
            enabled: false
          }
        }
      },
      xAxis: {
        labels: {
          formatter: ONS.charts.labelFormatter,
          step: 1
        },
        tickmarkPlacement: 'on'
      },
      yAxis: {
        lineWidth: 1,
        title: {
          style: {
            color: '#000',
            fontWeight:300
          },
          offset: -30,
          align: 'high',
          rotation: 0,
          y: -15
        }

      },

      legend: {
        borderColor: null,
        borderRadius: 0,
        borderWidth: 1
      },

      credits:{
        enabled:false
      },

      tooltip: {
        shared: true,
        crosshairs: {
          width: 1,
          color: '#f37121'
        },
        positioner: ONS.charts.tooltipPositioner,
        formatter: ONS.charts.tooltipFormatter,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 0,
        borderColor: 'rgba(255, 255, 255, 0)',
        shadow: false,
        useHTML: true
      }
    });
  }


  $(document).ready(function(){

    var processedData = [];
    var defaultFilter;


    /*
     * Set default chart options
     */
    setOptions();

    /*
     * Get an format the data on the page.  We are using a data object
     * that may at first appear a bit wrong.  Specifically, it only contains
     * the start date.  This is because we want to keep this object as small
     * as possible to aid performance.  If we know that each value is a month,
     * and we know the start month, then the full data range month lables will
     * be known.
     */
    $('[data-chart-data-for]').each(function() {
      var dataElem = $(this);
      var chartData = dataElem.data('chart-data-for');

      /*
       * Determine defaults from selected dropdowns (i.e. set by server)
       */
      defaultFilter = {
        scale: 'month',
        period: {
          start: {
            year: $('select[data-chart-controls-from-year] option:selected').val(),
            month: $('select[data-chart-controls-from-month] option:selected').val()
          },
          end: {
            year: $('select[data-chart-controls-to-year] option:selected').val(),
            month: $('select[data-chart-controls-to-month] option:selected').val()
          }
        }
      };


      /*
       * Reformat the data so that we can use it in our
       * tables and charts
       */
      var data = new DataFilter($.parseJSON(dataElem.html()));

      /*
       * For each chart and table it is data for, initialise
       * the chart or table.
       */
      _.each(chartData, function(elem) {
        processedData[elem] = data;
      });
    });

    /**
     * Auto initialise the charts
     */
    $('[data-chart]').each(function() {
      var chart = $(this);

      switch ( chart.data('chart') ) {
        case 'timeseries':
          chart.timeSeriesChart({
            data: processedData[chart.data('chart-data-id')].getData(defaultFilter),
            chart: {
              series: [{
                name: chart.data('chart-tooltip')
              }],
              title: {
                text: chart.data('chart-title')
              },
              yAxis: {
                title: {
                  text: chart.data('chart-ylabel')
                }
              }
            }
          });
          break;

        case 'datatable':
          chart.dataTable({
            data: processedData[chart.data('chart-data-id')].getData(defaultFilter),
            colLabel: chart.data('chart-col-label')
          });
          break;
      }

    });

    /*
     * Initialise the chart controls
     */
    $('[data-chart-controls]').chartControl();

    /*
     * List for changes in chart controls
     */
    $('[data-chart-controls]').on('chart-filter-change', function(e, data) {

      var newData;
      var chart;

      /*
       * Get the target chart
       */
      _.each(data.chartIds, function(chartId) {
        newData = processedData[chartId].getData(data.filter);

        chart = $('[data-chart-data-id="' + chartId + '"]').data('plugin_chart');

        /*
         * Update the chart
         */
        chart.updateChart(newData);
      });
    });
  });

})( jQuery );

$(document).ready(function() {

  $('body').addClass('js');

  $('.tooltip').tooltipster({
    'maxWidth': 270
  });

  $('.tooltip').on('focus', function() {
    console.log($(this));
    $(this).tooltipster('show');
  }).on('blur', function() {
    $(this).tooltipster('hide');
  });

  var placeHolderConfig = {
    className: 'placeholder-polyfill'
  };

  /* global svgeezy */
  svgeezy.init(false, 'png'); // this will let the plugin check all images

});
