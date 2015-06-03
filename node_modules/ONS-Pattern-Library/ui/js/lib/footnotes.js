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
