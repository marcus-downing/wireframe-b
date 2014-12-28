function preload(urls) {
  jQuery(function ($) {
    $("body").append("<div id='_preload' class='invisible'></div>");
    var container = $("#_preload");

    _.each(urls, function (url) {
      container.append("<img src='"+url+"'/>");
    });
  });  
}