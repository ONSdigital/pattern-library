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
