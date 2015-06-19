/**
 * @fileOverview A jQuery UI Widget to set headers and wrappers in a container to equal height
 * @author Andy Mantell
 * @name $.cx.equal_heights
 */

(function($) {
  'use strict';

  $.widget('cx.equal_heights', {
    options: {
      resize_throttle: 50,
      targetSelector: '.grid-col'
    },
    _create: function() {
      var self = this;

      self._timeout = '';

      // Keep track of the width of the window between resize events so that we know whether the expensive resize function needs to run
      self._windowWidth = 0;

      // IE8 runs this resize event in an infinite loop, since changing the size of something inside a resize event
      // triggers the resize event in IE8!
      // To protect against this slightly, IE8 gets a much higher timeout than other browsers
      if($('html').hasClass('lt-ie8')) {
        self.options.resize_throttle = 500;
      }

      self._target = self.element.children(self.options.targetSelector);

      // Listen for the window resize event, clear then set a timeout to throttle the resizing.
      self.window.on('resize.' + self.widgetFullName + self.uuid, function() {
        clearTimeout(self._timeout);

        self._timeout = setTimeout(function(){
          self._resize();
        }, self.options.resize_throttle);
      });

      // Dont trigger the initial resize until the fonts are loaded otherwise the heights will be wrong.
      self.window.bind('load', function() {
        setTimeout(function() {
          self._resize();
        }, 0);
      });
    },

    _init: function() {
      var self = this;

      self._equalHeights();
    },

    _resize: function() {
      var self = this;

      // Don't run this slightly expensive function if the window width hasn't actually changed
      // Initially conceived as additional protection against crashing IE8 but it makes sense not to run this function
      // in *any* browser if there is nothing to actually do!
      // The main effect of this is that in IE8 it will stop the resize event from running infinitely (Which occurs when things change dimensions inside a resize event in IE8)
      if(self._windowWidth === $(window).width()) {
        return;
      }

      self._windowWidth = $(window).width();

      self._resetHeights();

      self._equalHeights();

    },

    _resetHeights: function() {
      var self = this;
      self._target.height('auto');
    },


    _equalHeights: function() {
      var self = this;
      var maxHeight = 0;

      $.each(self._target, function(index, item){
        var $item = $(item);

        var itemHeight = $item.innerHeight();
        if (itemHeight > maxHeight) {
          maxHeight = itemHeight;
        }
      });

      self._target.height(maxHeight);
    },

    _destroy: function() {
      var self = this;

      clearTimeout(self._timeout);

      self.window.off('resize.' + self.widgetFullName + self.uuid);

      self._resetHeights();

    }

  });
})(jQuery);
