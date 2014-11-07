(function ($) {
  'use strict';

  /* ======================================================
  Breakpoints
  Pixel values converted to ems based on a 16px base font size
  ems are used here because ems and rems (relative ems) are tantamount to the same thing when you are *at* the root
  @OPTIMIZE: Remove matchMedia polyfill and just run the desktop breakpoint match function for browers that don't support media queries (To correspond with our oldie css)
  ======================================================*/
  var bp_mobile_max = 767 / 16;
  var bp_desktop_min = 768 / 16;

  // Based on these breakpoints, construct the corresponding media queries
  var mq_mobile = 'screen and (max-width:' + bp_mobile_max + 'em)';
  var mq_desktop = 'screen and (min-width:' + bp_desktop_min + 'em)';

  /* ======================================================
  Grab a few commonly used elements to avoid re-selecting them in multiple places
  ======================================================*/

  var $header = $('.sgcxp__header');




  /* ======================================================
  Breakpoint agnostic code
  ======================================================*/

  $('.form__field--select').uniform();
  $('.js-jump-to').jump_to();

  /*
   * Close flyout on second click of the main nav.  This doesn't feel nice.
   */
  $('.sgcxp__nav__link').on("touchstart", function(e) {
    var elem = $(this);
    if ( elem.data('expanded') ) {
      elem.data('expanded', false);
      elem.parent('li').find('.sgcxp__nav__dropdown').css('display', 'none');
      elem.parent('.sgcxp__nav__item').addClass('hover-cancel');
      elem.parent('.sgcxp__nav__item').removeClass('hover');
    }
    else {
      elem.data('expanded', true);
      elem.parent('li').find('.sgcxp__nav__dropdown').css('display', 'block');
      elem.parent('.sgcxp__nav__item').addClass('hover');
      elem.parent('.sgcxp__nav__item').removeClass('hover-cancel');
    }

  });


  /* ======================================================
  Breakpoint specific code
  ======================================================*/
  enquire
    .register(mq_mobile, { // Mobile
      setup: function () {},
      match: function () {
        $header.offcanvas_menu();

        // After all the plugins are initiated, raise a domupdated event
        $.publish('domupdated', document.body);
      },
      unmatch: function () {
        $header.offcanvas_menu('destroy');
      }
    })
    .register(mq_desktop, { // Desktop
      setup: function () {},
      match: function () {
        // After all the plugins are initiated, raise a domupdated event
        $.publish('domupdated', document.body);
      },
      unmatch: function () {
      }
    });

})(jQuery);
