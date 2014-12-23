function preload(urls) {
  jQuery(function ($) {
    var container = $("body").append("<div id='_preload' class='hidden'>");

    _.each(urls, function (url) {
      container.append("<img src='"+url+"'>");
    });
  });  
}