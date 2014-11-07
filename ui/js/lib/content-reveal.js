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
