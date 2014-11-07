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
