require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'jquery-ui': 'vendor/jquery-ui/jquery-ui',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone': 'vendor/backbone-amd/backbone',
    'hogan': 'vendor/hogan-amd/hogan-2.0.0.amd',
    'Chart': 'vendor/Chart.js/Chart',
    'models': 'models',
    'collections': 'collections',
    'templates': 'templates',
    'router': 'router'
  }
});

require([
  // Load our app module and pass it to our definition function
  'backbone',
  'app',
  'Chart'

], function(Backbone, App, Chart){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  var oldSync = Backbone.sync;
  
  Backbone.sync = function(method, model, options) {
      var url = _.isFunction(model.url) ? model.url() : model.url;

      if (url) {  // If no url, don't override, let Backbone.sync do its normal fail
          options = options || {};
          options.url = "https://imdb-on-rails-api.herokuapp.com" + url;
      }

      // Let normal Backbone.sync do its thing
      return oldSync.call(this, method, model, options);
  };

  _.mixin({
  capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  });

  App.initialize();
});

