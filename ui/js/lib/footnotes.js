// Expands accordion according to # at end of uri
function expandAccordion() {
  if (location.hash) {
    var section = $(location.hash);
    if (section.hasClass('is-collapsed')) {
      section.removeClass('is-collapsed').addClass('is-expanded');
      section.get(0).scrollIntoView();
    }
  }
}

$(document).on('ready', function() {
  // Expand footnotes section if it's collapsed and you click on footnote anchor
  $('.footnote-body').on('click', function(e) {
    expandAccordion();
  });

  // If page-load links to footnote, expand accordion and scroll to it
  expandAccordion();

  // Original pattern library solution
  // var $fragment = $(location.hash);
  // var $fragmentContainer = $fragment.parents('.accordion--footnotes');
  // if ($fragmentContainer.length) {
  //   $fragmentContainer.removeClass('is-collapsed').addClass('is-expanded');
  //   $fragment.get(0).scrollIntoView();
  // }
});