describe("Chart controls", function() {

  var controlElem;

  function setInvalidCustomDateRange() {
    // Select the from date to be the last available date
    $('[data-chart-controls-from-month] > option:last-of-type').attr('selected', 'selected');
    $('[data-chart-controls-from-year] > option:last-of-type').attr('selected', 'selected');

    // Select the to date to be the first available date
    $('[data-chart-controls-to-month] > option:first-of-type').attr('selected', 'selected');
    $('[data-chart-controls-to-year] > option:first-of-type').attr('selected', 'selected');
  }

  function setEqualCustomDateRange() {
    // Select the from date to be the last available date
    $('[data-chart-controls-from-month] > option:first-of-type').attr('selected', 'selected');
    $('[data-chart-controls-from-year] > option:first-of-type').attr('selected', 'selected');

    // Select the to date to be the first available date
    $('[data-chart-controls-to-month] > option:first-of-type').attr('selected', 'selected');
    $('[data-chart-controls-to-year] > option:first-of-type').attr('selected', 'selected');
  }

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/tests/fixtures/';

    controlElem = $('[data-chart-controls]');
  });

  it('should be available as a plugin', function() {
    expect($.fn.chartControl).toBeDefined();
  });

  it('should display an error when the date filter start date is before the end date', function() {
    loadFixtures('chart-controls.html');

    // set up chart control plugin
    $('[data-chart-controls]').chartControl();

    setInvalidCustomDateRange();

    // Submit
    $('[data-chart-controls-submit]').click();

    // Assert prescence of error message and that the message text is as expected
    var errorMessageArea = $('.chart-area__controls__custom__errors');
    expect(errorMessageArea.find('> p').length).toEqual(1);
    expect(errorMessageArea.find('> p').text()).toEqual('Sorry, the chosen date range is not valid');
  });

  it('should display an error when the date filter start date is equal to the end date', function() {
    loadFixtures('chart-controls.html');

    // set up chart control plugin
    $('[data-chart-controls]').chartControl();

    setEqualCustomDateRange();

    // Submit
    $('[data-chart-controls-submit]').click();

    // Assert prescence of error message and that the message text is as expected
    var errorMessageArea = $('.chart-area__controls__custom__errors');
    expect(errorMessageArea.find('> p').length).toEqual(1);
    expect(errorMessageArea.find('> p').text()).toEqual('Sorry, the start date and end date cannot be the same');
  });

  it('should only display one error message of the same type', function() {
    loadFixtures('chart-controls.html');

    // set up chart control plugin
    $('[data-chart-controls]').chartControl();

    setInvalidCustomDateRange();

    // Submit, twice
    $('[data-chart-controls-submit]').click();
    $('[data-chart-controls-submit]').click();

    var errorMessageArea = $('.chart-area__controls__custom__errors');
    expect(errorMessageArea.find('> p').length).toEqual(1);
  });
});
