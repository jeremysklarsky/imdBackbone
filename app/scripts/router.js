define([
  'jquery',
  'underscore',
  'backbone',
  'views/shows',
  'views/show',
], function($, _, Backbone, ShowsView, ShowView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      // 'shows': 'shows',
      // 'show/:id': 'show'
      
      // Default
      '*actions': 'shows'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter();
    
    app_router.on('route:shows', function(){
   
        // Call render on the module we loaded in via the dependency array
        var showsView = new ShowsView();
        // showsView.render();

    });

    app_router.on('route:show', function (id) {
    
        // Like above, call render but know that this view has nested sub views which 
        // handle loading and displaying data from the GitHub API  
        var showView = new ShowView({id:id});
    });

    // app_router.on('route:defaultAction', function (actions) {
     
    //    // We have no matching route, lets display the home page 
    //     var homeView = new ShowsView();
    //     // homeView.render();
    // });

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
    // var footerView = new FooterView();

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});