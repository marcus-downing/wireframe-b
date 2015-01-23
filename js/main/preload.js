function preload(urls) {
  jQuery(function ($) {
    var preloadBlocks = _.map(urls, function (url) {
      return "<img src='"+url+"'/>";
    });
    if (!_.isEmpty(preloadBlocks)) {
      var preload = "<div id='_preload' class='invisible'>"+preloadBlocks.join('')+"</div>";
      $("body").append(preload);
    }
  });  
}