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
