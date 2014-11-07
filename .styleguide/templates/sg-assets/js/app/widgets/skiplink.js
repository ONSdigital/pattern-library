/**
 * @fileOverview A jQuery UI Widget to handle slideshows
 * @author Andy Mantell
 * @name $.cx.skiplink
 * @dependencies: jQuery, jQuery UI widget factory
 */

(function($) {
  'use strict';

  $.widget('cx.skiplink', {

    options: {
    },

    // Add an underscore to the event prefix to make event names easier to read
    widgetEventPrefix: 'skiplink_',

    /**
    * Constructor
    */
    _create: function() {
      var self = this;

      // Find the target of the skiplink
      self._target = $(self.element.attr('href'));

      // Allow the target to be receive focus via js
      self._target.attr('tabindex', -1);

      // Bind a click event on the skiplink
      self._on({ 'click': self._skip });
    },

    /**
     * Skip to the element defined
     */
    _skip: function(e) {
      var self = this;

      // Focus on the target
      self._target.focus();
    },

    /**
     * Destroy
     */
    _destroy: function() {
      var self = this;
    }
  });

})(jQuery);
