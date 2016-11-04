// Accordion to tabs by Frank LANG
// Live demo: https://jsfiddle.net/frontenddeveloper/nw0daxq3/1/

$(document).ready(function(){
  var ulFacetNav = $('ul.nav-accordion2tabs');
  var liFacetNavItem = $('li.nav-accordion2tabs-item');
  var aFacetNavItemLevel0Link = $('a.level0');
  var facetNavTargetElements = $('ul.nav-accordion2tabs'); // la navigation ne doit pas se fermer au clic sur ces éléments

  // on réinitialise le DOM à l'état initial (pour refermer la nav, notamment)
  function DOMreset(){
      ulFacetNav.removeAttr('style');
      aFacetNavItemLevel0Link.each(function(){
        $(this).removeClass('is-active');
      });
      $('ul.nav-accordion2tabs-sublevel').each(function(){
        $(this).addClass('is-closed');
      });
  }

  // au clic à l'extérieur de la nav, cette dernière se referme
  $(document).on('click', function(){
    DOMreset();
  });

  // la navigation ne doit pas se fermer au clic sur ces éléments
  facetNavTargetElements.on('click', function(e){
    e.stopPropagation();
  });

  // vue Mobile (nav accordion)
  enquire.register("screen and (max-width: 767px)", {
    match : function() {
      ulFacetNav.removeClass('is-desktop-nav').addClass('is-mobile-nav');
      DOMreset();

      liFacetNavItem.off('click', '.level0').on('click', '.level0', function(e){
        $(this).toggleClass('is-active').next('ul.nav-accordion2tabs-sublevel').toggleClass('is-closed');
        e.preventDefault();
      });
    },
    unmatch : function() {}
  });

  // vue Desktop (nav tabs)
  enquire.register("screen and (min-width: 768px)", {
    match : function() {
      ulFacetNav.removeClass('is-mobile-nav').addClass('is-desktop-nav');
      DOMreset();

      liFacetNavItem.off('click', '.level0').on('click', '.level0', function(e){
        if($(this).hasClass('is-active')){
          DOMreset();
        }
        else{
          DOMreset();
          $(this).toggleClass('is-active').next('ul.nav-accordion2tabs-sublevel').toggleClass('is-closed');
          var getOpenedFacetNavSublevelHeight = $(this).next('ul.nav-accordion2tabs-sublevel').height();
          ulFacetNav.css('margin-bottom', getOpenedFacetNavSublevelHeight);
        }
        e.preventDefault();
      });
    },
    unmatch : function() {}
  });
});
