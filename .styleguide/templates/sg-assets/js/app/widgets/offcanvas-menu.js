/**
 * @fileOverview A jQuery UI Widget to provide mobile menu functionality, in conjunction with some css
 * @author Andy Mantell
 * @name $.cx.offcanvas_menu
 * @dependencies: jQuery, jQuery UI widget factory
 */

(function($) {
  'use strict';

  $.widget('cx.offcanvas_menu', {
    options: {
      buttonSelector: '.offcanvas-menu-toggle',
      bodyClass: 'js-offcanvas-menu-visible',
      delay: 500
    },

    /**
     * Constructor
     */
    _create: function() {
      var self = this;

      // Cache a reference to the jQueried body element as we use it a lot
      self._body = $('body');

      self._open = false;

      // Bind the click handler to the open / close buttons
      self._on((function() {
        var events = {};
        events['click ' + self.options.buttonSelector] = self._toggleMenu;
        return events;

      })());
    },

    /**
     * Click event handler to toggle the menu
     */
    _toggleMenu: function(e) {
      var self = this;
      e.preventDefault();

      !self._open ? self._openMenu() : self._closeMenu();

      self._open = !self._open;

    },

    /**
     * Event handler to open the menu
     */
    _openMenu: function(e) {
      var self = this;

      self._body.addClass(self.options.bodyClass);


      setTimeout(function() {
        self.element.css({
          'transform': 'translate3d(0, 0, 0)'
        });
      }, self.options.delay);


    },

    /**
     * Event handler to close the menu
     */
    _closeMenu: function(e) {
      var self = this;

      self._body.removeClass(self.options.bodyClass);


      setTimeout(function() {
        self.element.css({
          'transform': 'none'
        });
      }, self.options.delay);

    },

    /**
     * Destroy
     */
    _destroy: function() {
      var self = this;

      self._body.removeClass(self.options.bodyClass);
    }
  });

})(jQuery);
