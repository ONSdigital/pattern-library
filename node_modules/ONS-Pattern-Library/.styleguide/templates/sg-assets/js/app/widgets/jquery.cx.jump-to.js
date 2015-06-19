/**
 * @fileOverview A jQuery UI Widget to jump to positions in the page
 * @author Joel Mitchell
 * @name $.cx.jump_to
 * @dependencies: jQuery, jQuery UI widget factory
 */

(function($) {
  'use strict';

  $.widget('cx.jump_to', {

    options: {
      'speed': 300
    },

    // Add an underscore to the event prefix
    widgetEventPrefix: 'jump_to_',

    /**
     * Constructor
     */
    _create: function() {
      var self = this;

      self._on({
        'change': function() {
          self._scrollTo(self.element.val());
        }
      });

    },

    _scrollTo: function(element) {
      var self = this,
        options = self.options,
        $elem = $('#'+ element);
        if(typeof $elem === 'undefined'){
          return;
        }

      //   include both html and body for some browsers, but use a promise to not duplicate calls
      $('html,body')
        .animate({
            scrollTop: $elem.offset().top
          },
          options.speed)
        .promise()
        .done(function() {

        });

    },



    /**
     * Destroy
     */
    _destroy: function() {
      var self = this;

      self._off('change');

    }
  });

})(jQuery);
