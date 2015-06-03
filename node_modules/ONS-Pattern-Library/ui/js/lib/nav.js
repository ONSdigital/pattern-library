function toggleSubnav(element) {
  element
    .toggleClass('js-expandable-active')
    .find('.js-expandable__content').toggleClass('js-nav-hidden');
}

function expandSubnav(element) {
  if (!(element.hasClass('js-expandable-active'))) {
    element
      .addClass('js-expandable-active')
      .find('.js-expandable__content')
        .removeClass('js-nav-hidden');
  }
}

function collapseSubnav(element) {
  if (element.hasClass('js-expandable-active')) {
    element
      .removeClass('js-expandable-active')
      .find('.js-expandable__content')
        .addClass('js-nav-hidden');
  }
}

function showMenu(toggleElement, menuElement) {
  toggleElement.addClass('menu-is-expanded');
  menuElement.removeClass('nav-main--hidden');
  menuElement.attr('aria-expanded', true);
}

function hideMenu(toggleElement, menuElement) {
  toggleElement.removeClass('menu-is-expanded');
  menuElement.addClass('nav-main--hidden');
  menuElement.attr('aria-expanded', false);
}

function showSearch(toggleElement, searchElement) {
  toggleElement.addClass('search-is-expanded');
  toggleElement.find('.nav--controls__icon')
    .removeClass('icon-search-1')
    .addClass('icon-cancel');
  toggleElement.find('.nav--controls__text').text('Hide');
  searchElement.removeClass('nav-search--hidden');
  searchElement.attr('aria-expanded', true);
}

function hideSearch(toggleElement, searchElement) {
  toggleElement.removeClass('search-is-expanded');
  toggleElement.find('.nav--controls__icon')
    .removeClass('icon-cancel')
    .addClass('icon-search-1');
  toggleElement.find('.nav--controls__text').text('Search');
  searchElement.addClass('nav-search--hidden');
  searchElement.attr('aria-expanded', false);
}

$(document).ready(function() {
  var $primaryNav = $('#nav-primary');
  var $searchBar = $('#searchBar');

  // Duplicate top-level nav item into the subnav to access on devices where
  // tapping on the top-level item will expand the subnav
  $primaryNav.find('.nav__expandable').each(function() {
    var subNav = $(this).find('.nav--primary__sub');
    $(this).find(' > a').clone()
      .prependTo(subNav)
      .wrap('<li class="nav__top-level-duplicate"></li>');
  });

  $primaryNav.addClass('nav-main--hidden').attr('aria-expanded', false);
  $searchBar.addClass('nav-search--hidden').attr('aria-expanded', false);

  $('.js-expandable').on('click' ,function(event) {
    if ($(window).width() < 800) {
      event.preventDefault();
      toggleSubnav($(this));
    }
  });

  $('.js-expandable').doubleTapToGo();

  // stop parent element from taking over all click events
  $('.js-expandable > .nav--primary__sub').on('click', function(event) {
    event.stopPropagation();
  });

  $('.js-expandable').on('keydown' ,function(event) {
    // Enter || spacebar
    if (event.keyCode === 13 || event.keyCode === 32) {
      if ($(window).width() < 800) {
        event.preventDefault();
        toggleSubnav($(this));
      }
    }

    // Right arrow
    if (event.keyCode === 39) {
      if ($(window).width() < 800) {
        event.preventDefault();
        expandSubnav($(this));
      }
      else {
        // TODO: Make sure the large viewport breakpoint is exact
        // This should move the focus to the next nav item and expand its subnav
      }
    }

    // Left arrow
    if (event.keyCode === 37) {
      if ($(window).width() < 800) {
        event.preventDefault();
        collapseSubnav($(this));
      }
      else {
        // TODO: Make sure the large viewport breakpoint is exact
        // This should move the focus to the previous item and expand its subnav
      }
    }
  });

  // stop parent element from taking over enter/space events
  $('.js-expandable > .nav--primary__sub').on('keydown', function(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.stopPropagation();
    }
  });

  var $menuToggle = $('#menu-toggle').parent();
  var $searchToggle = $('#search-toggle').parent();

  $('#menu-toggle').on('click', function(event) {
    event.preventDefault();

    if ($primaryNav.hasClass('nav-main--hidden')) {
      showMenu($menuToggle, $primaryNav);
      hideSearch($searchToggle, $searchBar);
    }
    else {
      hideMenu($menuToggle, $primaryNav);
    }
  });

  $('#search-toggle').on('click', function(event) {
    event.preventDefault();
    var $searchToggle = $(this).parent();

    if ($searchBar.hasClass('nav-search--hidden')) {
      showSearch($searchToggle, $searchBar);
      hideMenu($menuToggle, $primaryNav);
    }

    else {
      hideSearch($searchToggle, $searchBar);
    }
  });


  // The following function to enable focus-tabbing through menu graciously
  // taken from Simply Accessible — thank you kindly.
  // http://simplyaccessible.com/article/better-for-accessibility

  $(function(){
    $primaryNav.setup_navigation();
  });

  $.fn.setup_navigation = function(settings) {
    settings = jQuery.extend({
      focusClass: 'menu-focus',
    }, settings);

    // Set tabIndex to -1 so that links can't receive focus until menu is open
    $(this).find('> li > a').next('ul').find('a').attr('tabIndex',-1);

    $(this).find('> li > a').hover(function(){
      $(this).closest('ul')
        .find('.'+settings.focusClass).removeClass(settings.focusClass)
        .find('a').attr('tabIndex',-1);
    });
    $(this).find('> li > a').focus(function(){
      $(this).closest('ul')
        .find('.'+settings.focusClass).removeClass(settings.focusClass)
        .find('a').attr('tabIndex',-1);
      $(this).next('ul')
        .addClass(settings.focusClass)
        .find('a').attr('tabIndex',0);
    });

    // Hide menu if click or focus occurs outside of navigation
    $(this).find('a').last().keydown(function(e){
      if(e.keyCode === 9) {
        // If the user tabs out of the navigation hide all menus
        $('.'+settings.focusClass)
        .removeClass(settings.focusClass)
        .find('a').attr('tabIndex',-1);
      }
    });
    $(document).click(function(){
      $('.'+settings.focusClass)
      .removeClass(settings.focusClass)
      .find('a').attr('tabIndex',-1);
    });

    $(this).click(function(e){
      e.stopPropagation();
    });
  };

});
