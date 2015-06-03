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